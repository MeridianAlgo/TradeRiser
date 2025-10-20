# 🌐 Global Variables & Real-Time Data Guide

Complete guide to using global variables and accessing real-time market data in TradeRiser v1.3.0.

## Quick Links
- [Main README](../README.md)
- [Custom Strategies](CUSTOM_STRATEGIES.md)
- [API Reference](API_REFERENCE.md)
- [Navigation](NAVIGATION.md)

---

## 🎯 What's New in v1.3.0

- ✅ **Single Symbol Trading** - Trade one asset at a time
- ✅ **Initialization Period** - Collect data before trading
- ✅ **Global Variables** - Access market data anywhere
- ✅ **Easy Configuration** - Change symbol via environment variable
- ✅ **Real-Time Data Support** - WebSocket integration ready

---

## 📊 Global Variables

### Accessing Globals

```javascript
import { globals } from './config.js';

// In your strategy
async analyze(data) {
  // Access current price
  const price = globals.currentPrice;
  
  // Check if initialized
  if (!globals.isInitialized) {
    return 'HOLD';  // Still collecting data
  }
  
  // Access current bars
  const bars = globals.currentBars;
  
  // Check current position
  const position = globals.currentPosition;
}
```

### Available Global Variables

```javascript
globals = {
  // ═══════════════════════════════════════════════════════════════════
  // 📈 CURRENT MARKET DATA (Updated every check)
  // ═══════════════════════════════════════════════════════════════════
  currentPrice: 0,          // Latest price from Alpaca
  currentBars: [],          // Array of OHLCV bars
  currentPosition: null,    // Current position object (or null)
  
  // ═══════════════════════════════════════════════════════════════════
  // 🔄 INITIALIZATION TRACKING
  // ═══════════════════════════════════════════════════════════════════
  initializationCount: 0,   // Number of checks completed
  isInitialized: false,     // true when ready to trade
  
  // ═══════════════════════════════════════════════════════════════════
  // ⚡ REAL-TIME DATA (For WebSocket implementations)
  // ═══════════════════════════════════════════════════════════════════
  realtimePrice: 0,         // Latest WebSocket price
  realtimeTrades: [],       // Recent trades from WebSocket
  realtimeQuotes: [],       // Recent quotes from WebSocket
  
  // ═══════════════════════════════════════════════════════════════════
  // 🛠️ HELPER FUNCTIONS
  // ═══════════════════════════════════════════════════════════════════
  getLatestPrice() {
    return this.realtimePrice || this.currentPrice;
  },
  
  isReady() {
    return this.isInitialized;
  }
}
```

---

## 🎯 Single Symbol Trading

### Change Trading Symbol

**Method 1: Environment Variable (.env file)**
```bash
# In .env file
TRADING_SYMBOL=ETH/USD
```

**Method 2: Direct in config.js**
```javascript
// In src/config.js
trading: {
  symbol: 'ETH/USD',  // Change this
  // ...
}
```

**Supported Symbols:**
- Crypto: `BTC/USD`, `ETH/USD`, `LTC/USD`, `DOGE/USD`, `SOL/USD`
- Stocks: `AAPL`, `TSLA`, `GOOGL`, `MSFT`, `AMZN`

---

## 🔄 Initialization Period

### How It Works

```
Check #1: Collecting data... (1/2)
          └─ Fetches bars, calculates MAs, stores values
          └─ Does NOT trade yet

Check #2: Collecting data... (2/2)
          └─ Fetches bars, calculates MAs, stores values
          └─ Does NOT trade yet

═══════════════════════════════════════════════════════════════
✅ INITIALIZATION COMPLETE - Bot is now ready to trade!
═══════════════════════════════════════════════════════════════

Check #3: Trading mode active
          └─ Detects crossovers
          └─ Executes trades
```

### Configure Initialization Period

```javascript
// In src/config.js
trading: {
  initializationPeriod: 2,  // Number of checks
  checkInterval: 60000,     // 60 seconds per check
  // = 2 minutes total initialization time
}
```

**Recommendations:**
- **Fast trading (1Min bars):** 2-3 checks
- **Medium trading (5Min bars):** 3-5 checks
- **Slow trading (15Min+ bars):** 5-10 checks

---

## 📊 Accessing Market Data

### Current Price

```javascript
import { globals } from './config.js';

// Method 1: Direct access
const price = globals.currentPrice;

// Method 2: Helper function (prefers WebSocket if available)
const price = globals.getLatestPrice();
```

### Historical Bars

```javascript
// Access all bars
const bars = globals.currentBars;

// Get prices array
const prices = bars.map(b => parseFloat(b.c));

// Get latest bar
const latestBar = bars[bars.length - 1];
console.log('Latest close:', latestBar.c);
console.log('Latest volume:', latestBar.v);
```

### Current Position

```javascript
// Check if we have a position
if (globals.currentPosition) {
  const qty = parseFloat(globals.currentPosition.qty);
  const entryPrice = parseFloat(globals.currentPosition.avg_entry_price);
  const currentValue = parseFloat(globals.currentPosition.market_value);
  
  console.log(`Position: ${qty} @ $${entryPrice}`);
  console.log(`Current value: $${currentValue}`);
}
```

---

## ⚡ Real-Time Data with WebSockets

### Setup WebSocket Connection

```javascript
// In your strategy or separate file
import WebSocket from 'ws';
import { globals, config } from './config.js';

class RealtimeData {
  constructor() {
    this.ws = null;
    this.connect();
  }
  
  connect() {
    // Alpaca WebSocket URL
    const wsUrl = config.alpaca.paper
      ? 'wss://stream.data.alpaca.markets/v2/test'
      : 'wss://stream.data.alpaca.markets/v2/iex';
    
    this.ws = new WebSocket(wsUrl);
    
    this.ws.on('open', () => {
      console.log('✅ WebSocket connected');
      
      // Authenticate
      this.ws.send(JSON.stringify({
        action: 'auth',
        key: config.alpaca.keyId,
        secret: config.alpaca.secretKey
      }));
    });
    
    this.ws.on('message', (data) => {
      const message = JSON.parse(data);
      this.handleMessage(message);
    });
    
    this.ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
    
    this.ws.on('close', () => {
      console.log('WebSocket closed, reconnecting...');
      setTimeout(() => this.connect(), 5000);
    });
  }
  
  handleMessage(message) {
    message.forEach(msg => {
      if (msg.T === 't') {
        // Trade update
        globals.realtimePrice = parseFloat(msg.p);
        globals.realtimeTrades.push(msg);
        
        // Keep only last 100 trades
        if (globals.realtimeTrades.length > 100) {
          globals.realtimeTrades.shift();
        }
      }
      
      if (msg.T === 'q') {
        // Quote update
        globals.realtimeQuotes.push(msg);
        
        // Keep only last 100 quotes
        if (globals.realtimeQuotes.length > 100) {
          globals.realtimeQuotes.shift();
        }
      }
    });
  }
  
  subscribe(symbol) {
    // Subscribe to trades and quotes
    this.ws.send(JSON.stringify({
      action: 'subscribe',
      trades: [symbol],
      quotes: [symbol]
    }));
    
    console.log(`📡 Subscribed to ${symbol} real-time data`);
  }
}

// Create and export instance
export const realtimeData = new RealtimeData();
```

### Use WebSocket Data in Strategy

```javascript
import { globals } from './config.js';

class Strategy {
  async analyze(data) {
    // Use real-time price if available, otherwise use REST API price
    const price = globals.getLatestPrice();
    
    // Check if we have recent trades
    if (globals.realtimeTrades.length > 0) {
      const recentTrades = globals.realtimeTrades.slice(-10);
      const avgTradeSize = recentTrades.reduce((sum, t) => sum + t.s, 0) / recentTrades.length;
      
      console.log(`Recent avg trade size: ${avgTradeSize}`);
    }
    
    // Your strategy logic here
    // ...
  }
}
```

---

## 🛠️ Configuration Reference

### Complete config.js Structure

```javascript
export const config = {
  alpaca: {
    keyId: process.env.ALPACA_API_KEY,
    secretKey: process.env.ALPACA_API_SECRET,
    paper: process.env.ALPACA_PAPER === 'true',
    baseUrl: '...'
  },
  
  trading: {
    // Single symbol to trade
    symbol: process.env.TRADING_SYMBOL || 'BTC/USD',
    
    // Check interval (milliseconds)
    checkInterval: 60000,  // 1 minute
    
    // Initialization period (number of checks)
    initializationPeriod: 2,
    
    // Data settings
    dataTimeframe: '1Min',
    dataLimit: 100
  }
};

export const globals = {
  // Market data
  currentPrice: 0,
  currentBars: [],
  currentPosition: null,
  
  // Initialization
  initializationCount: 0,
  isInitialized: false,
  
  // Real-time data
  realtimePrice: 0,
  realtimeTrades: [],
  realtimeQuotes: [],
  
  // Helpers
  getLatestPrice() { return this.realtimePrice || this.currentPrice; },
  isReady() { return this.isInitialized; }
};
```

---

## 📝 Example: Complete Custom Strategy

```javascript
import { globals, config } from './config.js';

class MyCustomStrategy {
  constructor() {
    this.name = 'My Custom Strategy';
    // Your parameters
  }
  
  async analyze(data) {
    // ═══════════════════════════════════════════════════════════════
    // 1. CHECK INITIALIZATION
    // ═══════════════════════════════════════════════════════════════
    if (!globals.isInitialized) {
      console.log(`Initializing... (${globals.initializationCount}/${config.trading.initializationPeriod})`);
      // Still collecting data, calculate indicators but don't trade
      this.calculateIndicators(data);
      return 'HOLD';
    }
    
    // ═══════════════════════════════════════════════════════════════
    // 2. GET CURRENT DATA
    // ═══════════════════════════════════════════════════════════════
    const price = globals.getLatestPrice();
    const bars = globals.currentBars;
    const position = globals.currentPosition;
    
    // ═══════════════════════════════════════════════════════════════
    // 3. CALCULATE INDICATORS
    // ═══════════════════════════════════════════════════════════════
    const prices = bars.map(b => parseFloat(b.c));
    const sma20 = this.calculateSMA(prices, 20);
    const sma50 = this.calculateSMA(prices, 50);
    
    // ═══════════════════════════════════════════════════════════════
    // 4. CHECK EXIT CONDITIONS (if we have a position)
    // ═══════════════════════════════════════════════════════════════
    if (position) {
      const entryPrice = parseFloat(position.avg_entry_price);
      const profitPercent = ((price - entryPrice) / entryPrice) * 100;
      
      if (profitPercent >= 3.0) {
        console.log(`Take profit hit: +${profitPercent.toFixed(2)}%`);
        return 'SELL';
      }
      
      if (profitPercent <= -1.5) {
        console.log(`Stop loss hit: ${profitPercent.toFixed(2)}%`);
        return 'SELL';
      }
      
      return 'HOLD';
    }
    
    // ═══════════════════════════════════════════════════════════════
    // 5. CHECK ENTRY CONDITIONS (if no position)
    // ═══════════════════════════════════════════════════════════════
    if (sma20 > sma50 && price > sma20) {
      console.log(`Buy signal: SMA20 (${sma20.toFixed(2)}) > SMA50 (${sma50.toFixed(2)})`);
      return 'BUY';
    }
    
    return 'HOLD';
  }
  
  calculateSMA(prices, window) {
    const slice = prices.slice(-window);
    return slice.reduce((a, b) => a + b, 0) / slice.length;
  }
  
  calculateIndicators(data) {
    // Calculate and store indicators during initialization
    // This ensures they're ready when trading starts
  }
}

export default MyCustomStrategy;
```

---

## 🎓 Best Practices

### 1. Always Check Initialization

```javascript
if (!globals.isInitialized) {
  // Collect data but don't trade
  return 'HOLD';
}
```

### 2. Use Helper Functions

```javascript
// Good
const price = globals.getLatestPrice();

// Also good, but less flexible
const price = globals.currentPrice;
```

### 3. Handle Missing Data

```javascript
if (!globals.currentBars || globals.currentBars.length === 0) {
  console.log('No bar data available');
  return 'HOLD';
}
```

### 4. Log Important Events

```javascript
if (globals.initializationCount === 1) {
  console.log('First data point collected');
}

if (globals.isInitialized && globals.initializationCount === config.trading.initializationPeriod) {
  console.log('Initialization complete, ready to trade!');
}
```

---

## 🔧 Troubleshooting

### "globals is not defined"

**Solution:** Import globals
```javascript
import { globals } from './config.js';
```

### "isInitialized is always false"

**Solution:** Check initialization period in config
```javascript
// In src/config.js
initializationPeriod: 2,  // Make sure this is set
```

### "currentPrice is 0"

**Solution:** Wait for first data fetch
```javascript
if (globals.currentPrice === 0) {
  console.log('Waiting for price data...');
  return 'HOLD';
}
```

---

## 📚 Related Documentation

- [Custom Strategies](CUSTOM_STRATEGIES.md) - Build your own strategy
- [API Reference](API_REFERENCE.md) - Complete API docs
- [External Libraries](EXTERNAL_LIBRARIES.md) - Advanced indicators
- [Troubleshooting](TROUBLESHOOTING.md) - Common issues

---

## 🎉 Summary

**v1.3.0 introduces:**
- ✅ Single symbol trading (easy to configure)
- ✅ Initialization period (collect data before trading)
- ✅ Global variables (access data anywhere)
- ✅ Real-time data support (WebSocket ready)
- ✅ Simplified configuration

**Start trading with confidence!**

---

[Back to Navigation](NAVIGATION.md) | [Main README](../README.md)
