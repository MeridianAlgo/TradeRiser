# 📖 API Reference

Complete API documentation for TradeRiser.

## Quick Links
- [Main README](../README.md)
- [Custom Strategies](CUSTOM_STRATEGIES.md)
- [External Libraries](EXTERNAL_LIBRARIES.md)
- [Navigation](NAVIGATION.md)

---

## Strategy Class

### Constructor

```javascript
constructor()
```

Initialize your strategy with custom parameters.

**Example:**
```javascript
class Strategy {
  constructor() {
    this.name = 'My Custom Strategy';
    this.shortWindow = 10;
    this.longWindow = 30;
    this.takeProfitPercent = 3.0;
    this.stopLossPercent = 1.5;
  }
}
```

---

### analyze(data)

Main strategy method called every check interval.

**Parameters:**
- `data` (Object) - Market data object

**Returns:**
- `'BUY'` - Place buy order
- `'SELL'` - Place sell order
- `'HOLD'` - Do nothing

**Data Object Structure:**
```javascript
{
  symbol: 'BTC/USD',           // Trading pair
  currentPrice: 50000.00,      // Current market price
  position: {                  // Current position (null if no position)
    symbol: 'BTC/USD',
    qty: '0.01',
    avg_entry_price: '49500.00',
    market_value: '500.00',
    unrealized_pl: '5.00'
  },
  bars: [                      // Historical price bars
    {
      t: '2024-01-01T00:00:00Z',  // Timestamp
      o: '49000.00',              // Open
      h: '50000.00',              // High
      l: '48500.00',              // Low
      c: '49500.00',              // Close
      v: '1000.00'                // Volume
    },
    // ... more bars
  ]
}
```

**Example:**
```javascript
async analyze(data) {
  const { symbol, currentPrice, position, bars } = data;
  
  if (!bars || bars.length < 30) {
    return 'HOLD';
  }
  
  const prices = bars.map(b => parseFloat(b.c));
  const sma = this.calculateSMA(prices, 20);
  
  if (currentPrice > sma && !position) {
    return 'BUY';
  }
  
  if (currentPrice < sma && position) {
    return 'SELL';
  }
  
  return 'HOLD';
}
```

---

## Built-in Helper Methods

### calculateSMA(prices, window)

Calculate Simple Moving Average.

**Parameters:**
- `prices` (Array<number>) - Array of prices
- `window` (number) - Period length

**Returns:** (number) - SMA value

**Example:**
```javascript
const prices = [100, 102, 101, 103, 105];
const sma = this.calculateSMA(prices, 3);
// Returns: 103 (average of last 3 prices)
```

---

### calculateEMA(prices, window)

Calculate Exponential Moving Average.

**Parameters:**
- `prices` (Array<number>) - Array of prices
- `window` (number) - Period length

**Returns:** (number) - EMA value

**Example:**
```javascript
const prices = [100, 102, 101, 103, 105];
const ema = this.calculateEMA(prices, 3);
// Returns: ~103.5 (weighted average, more weight on recent)
```

---

### calculateRSI(prices, period)

Calculate Relative Strength Index.

**Parameters:**
- `prices` (Array<number>) - Array of prices
- `period` (number) - RSI period (default: 14)

**Returns:** (number) - RSI value (0-100)

**Example:**
```javascript
const prices = [100, 102, 101, 103, 105, 104, 106, 108];
const rsi = this.calculateRSI(prices, 14);
// Returns: ~65 (momentum indicator)
```

**Interpretation:**
- RSI > 70: Overbought
- RSI < 30: Oversold
- RSI = 50: Neutral

---

### calculateMACD(prices)

Calculate MACD (Moving Average Convergence Divergence).

**Parameters:**
- `prices` (Array<number>) - Array of prices

**Returns:** (Object)
```javascript
{
  macdLine: number,  // MACD line (EMA12 - EMA26)
  ema12: number,     // 12-period EMA
  ema26: number      // 26-period EMA
}
```

**Example:**
```javascript
const prices = [/* 50+ prices */];
const { macdLine, ema12, ema26 } = this.calculateMACD(prices);

if (macdLine > 0) {
  console.log('Bullish trend');
}
```

---

### calculateBollingerBands(prices, period, stdDev)

Calculate Bollinger Bands.

**Parameters:**
- `prices` (Array<number>) - Array of prices
- `period` (number) - Period length (default: 20)
- `stdDev` (number) - Standard deviations (default: 2)

**Returns:** (Object)
```javascript
{
  upper: number,   // Upper band
  middle: number,  // Middle band (SMA)
  lower: number    // Lower band
}
```

**Example:**
```javascript
const prices = [/* prices */];
const { upper, middle, lower } = this.calculateBollingerBands(prices, 20, 2);

if (currentPrice < lower) {
  console.log('Price at lower band - oversold');
}
```

---

### calculateATR(bars, period)

Calculate Average True Range (volatility indicator).

**Parameters:**
- `bars` (Array<Object>) - Array of OHLC bars
- `period` (number) - Period length (default: 14)

**Returns:** (number) - ATR value

**Example:**
```javascript
const bars = data.bars;
const atr = this.calculateATR(bars, 14);

// Use ATR for dynamic stop loss
const stopLossDistance = atr * 2;
console.log(`Stop loss: ${stopLossDistance} points`);
```

---

### getPriceChange(oldPrice, newPrice)

Calculate percentage price change.

**Parameters:**
- `oldPrice` (number) - Starting price
- `newPrice` (number) - Ending price

**Returns:** (number) - Percentage change

**Example:**
```javascript
const change = this.getPriceChange(100, 105);
// Returns: 5 (5% increase)

const change2 = this.getPriceChange(100, 95);
// Returns: -5 (5% decrease)
```

---

### isPriceAboveMA(currentPrice, prices, window)

Check if current price is above moving average.

**Parameters:**
- `currentPrice` (number) - Current price
- `prices` (Array<number>) - Historical prices
- `window` (number) - MA period

**Returns:** (boolean) - true if above MA

**Example:**
```javascript
const prices = [100, 102, 101, 103, 105];
const isAbove = this.isPriceAboveMA(106, prices, 5);
// Returns: true
```

---

### calculatePositionSize(price, portfolio)

Calculate position size based on buying power.

**Parameters:**
- `price` (number) - Asset price
- `portfolio` (Object) - Portfolio object

**Returns:** (number) - Quantity to buy

**Example:**
```javascript
const qty = this.calculatePositionSize(currentPrice, portfolio);
console.log(`Buy ${qty} units`);
```

---

## Configuration Properties

### Strategy Parameters

```javascript
class Strategy {
  constructor() {
    // Strategy identification
    this.name = 'My Strategy';
    
    // Moving average settings
    this.shortWindow = 10;
    this.longWindow = 30;
    
    // Risk management
    this.takeProfitPercent = 3.0;
    this.stopLossPercent = 1.5;
    
    // Position sizing
    this.positionSizePercent = 0.1;  // 10% of buying power
    
    // Indicator filters
    this.useRSI = false;
    this.rsiPeriod = 14;
    this.rsiOverbought = 70;
    this.rsiOversold = 30;
    
    this.useVolume = false;
    this.volumeMultiplier = 1.5;
    
    this.useEMA = false;  // Use EMA instead of SMA
    
    // Position tracking
    this.hasPosition = {};
  }
}
```

---

## Config Module

### config.js

```javascript
export default {
  // Trading symbols
  symbols: ['BTC/USD', 'ETH/USD'],
  
  // Check interval (milliseconds)
  checkInterval: 60000,  // 60 seconds
  
  // Alpaca API settings
  alpaca: {
    keyId: process.env.ALPACA_API_KEY,
    secretKey: process.env.ALPACA_API_SECRET,
    paper: process.env.ALPACA_PAPER === 'true',
    baseUrl: process.env.ALPACA_PAPER === 'true'
      ? 'https://paper-api.alpaca.markets'
      : 'https://api.alpaca.markets'
  },
  
  // Data settings
  dataTimeframe: '1Min',  // Bar timeframe
  dataLimit: 100          // Number of bars to fetch
};
```

---

## Broker Module

### Methods

#### getAccount()

Get account information.

**Returns:** (Promise<Object>)
```javascript
{
  cash: '100000.00',
  portfolio_value: '105000.00',
  buying_power: '200000.00'
}
```

---

#### getPosition(symbol)

Get current position for symbol.

**Parameters:**
- `symbol` (string) - Trading pair

**Returns:** (Promise<Object|null>)
```javascript
{
  symbol: 'BTC/USD',
  qty: '0.01',
  avg_entry_price: '50000.00',
  market_value: '500.00',
  unrealized_pl: '5.00'
}
```

---

#### getBars(symbol, timeframe, limit)

Get historical price bars.

**Parameters:**
- `symbol` (string) - Trading pair
- `timeframe` (string) - Bar timeframe ('1Min', '5Min', '1Hour', etc.)
- `limit` (number) - Number of bars

**Returns:** (Promise<Array<Object>>)
```javascript
[
  {
    t: '2024-01-01T00:00:00Z',
    o: '50000.00',
    h: '50100.00',
    l: '49900.00',
    c: '50050.00',
    v: '100.00'
  },
  // ... more bars
]
```

---

#### placeOrder(symbol, qty, side)

Place market order.

**Parameters:**
- `symbol` (string) - Trading pair
- `qty` (number) - Quantity
- `side` (string) - 'buy' or 'sell'

**Returns:** (Promise<Object>)
```javascript
{
  id: 'order-id-123',
  symbol: 'BTC/USD',
  qty: '0.01',
  side: 'buy',
  type: 'market',
  status: 'filled'
}
```

---

## Portfolio Module

### Methods

#### getPortfolio()

Get portfolio summary.

**Returns:** (Object)
```javascript
{
  cash: 100000.00,
  equity: 105000.00,
  buyingPower: 200000.00
}
```

---

#### calculatePositionSize(price, percent)

Calculate position size.

**Parameters:**
- `price` (number) - Asset price
- `percent` (number) - Percentage of buying power (0-1)

**Returns:** (number) - Quantity

**Example:**
```javascript
const qty = portfolio.calculatePositionSize(50000, 0.1);
// Returns: 0.02 (10% of buying power / price)
```

---

## Environment Variables

### Required

```bash
ALPACA_API_KEY=your_api_key
ALPACA_API_SECRET=your_secret_key
ALPACA_PAPER=true
```

### Optional

```bash
# Check interval (milliseconds)
CHECK_INTERVAL=60000

# Data settings
DATA_TIMEFRAME=1Min
DATA_LIMIT=100

# Logging
LOG_LEVEL=info
```

---

## Error Handling

### Common Errors

#### Authentication Error
```javascript
Error: Authentication failed
```
**Solution:** Check API keys in `.env`

#### Insufficient Buying Power
```javascript
Error: Insufficient buying power
```
**Solution:** Reduce position size or add funds

#### Market Closed
```javascript
Error: Market is closed
```
**Solution:** Crypto markets are 24/7, check symbol

#### Rate Limit
```javascript
Error: Rate limit exceeded
```
**Solution:** Increase check interval

---

## Type Definitions

### Bar Object
```typescript
interface Bar {
  t: string;    // ISO timestamp
  o: string;    // Open price
  h: string;    // High price
  l: string;    // Low price
  c: string;    // Close price
  v: string;    // Volume
}
```

### Position Object
```typescript
interface Position {
  symbol: string;
  qty: string;
  avg_entry_price: string;
  market_value: string;
  unrealized_pl: string;
}
```

### Account Object
```typescript
interface Account {
  cash: string;
  portfolio_value: string;
  buying_power: string;
}
```

---

## Examples

### Complete Strategy Example

```javascript
class Strategy {
  constructor() {
    this.name = 'RSI + MA Strategy';
    this.shortWindow = 10;
    this.longWindow = 30;
    this.rsiPeriod = 14;
    this.takeProfitPercent = 3.0;
    this.stopLossPercent = 1.5;
    this.hasPosition = {};
  }
  
  async analyze(data) {
    const { symbol, currentPrice, position, bars } = data;
    
    // Check data availability
    if (!bars || bars.length < this.longWindow) {
      return 'HOLD';
    }
    
    // Extract prices
    const prices = bars.map(b => parseFloat(b.c));
    
    // Calculate indicators
    const shortMA = this.calculateSMA(prices, this.shortWindow);
    const longMA = this.calculateSMA(prices, this.longWindow);
    const rsi = this.calculateRSI(prices, this.rsiPeriod);
    
    // Exit logic (if we have a position)
    if (position) {
      this.hasPosition[symbol] = true;
      const entryPrice = parseFloat(position.avg_entry_price);
      const profitLoss = this.getPriceChange(entryPrice, currentPrice);
      
      if (profitLoss >= this.takeProfitPercent) {
        this.hasPosition[symbol] = false;
        return 'SELL';
      }
      
      if (profitLoss <= -this.stopLossPercent) {
        this.hasPosition[symbol] = false;
        return 'SELL';
      }
      
      return 'HOLD';
    } else {
      this.hasPosition[symbol] = false;
    }
    
    // Entry logic (if no position)
    if (this.hasPosition[symbol]) {
      return 'HOLD';
    }
    
    // Buy conditions
    const maCrossover = shortMA > longMA;
    const rsiOversold = rsi < 30;
    
    if (maCrossover && rsiOversold) {
      this.hasPosition[symbol] = true;
      return 'BUY';
    }
    
    return 'HOLD';
  }
  
  // Helper methods
  calculateSMA(prices, window) {
    const slice = prices.slice(-window);
    return slice.reduce((a, b) => a + b, 0) / slice.length;
  }
  
  calculateRSI(prices, period) {
    if (prices.length < period + 1) return 50;
    let gains = 0;
    let losses = 0;
    for (let i = prices.length - period; i < prices.length; i++) {
      const change = prices[i] - prices[i - 1];
      if (change > 0) gains += change;
      else losses -= change;
    }
    const avgGain = gains / period;
    const avgLoss = losses / period;
    if (avgLoss === 0) return 100;
    const rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
  }
  
  getPriceChange(oldPrice, newPrice) {
    return ((newPrice - oldPrice) / oldPrice) * 100;
  }
}

export default Strategy;
```

---

## Related Documentation

- [Custom Strategies Guide](CUSTOM_STRATEGIES.md)
- [External Libraries](EXTERNAL_LIBRARIES.md)
- [Indicators Guide](INDICATORS_GUIDE.md)
- [Strategy Examples](STRATEGY_GUIDE.md)

---

[Back to Navigation](NAVIGATION.md) | [Main README](../README.md)
