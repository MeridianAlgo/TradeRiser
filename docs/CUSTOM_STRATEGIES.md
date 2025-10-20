# Custom Strategies Guide

Build your own trading strategies with TradeRiser.

## Quick Links
- [Main README](../README.md)
- [Getting Started](GETTING_STARTED.md) - Setup guide
- [Strategy Examples](STRATEGY_GUIDE.md) - Pre-built strategies
- [Indicators Guide](INDICATORS_GUIDE.md) - Available indicators
- [External Libraries](EXTERNAL_LIBRARIES.md) - Advanced libraries
- [API Reference](API_REFERENCE.md) - Complete API docs
- [Troubleshooting](TROUBLESHOOTING.md) - Fix issues
- [All Documentation](NAVIGATION.md)

---

## Overview

TradeRiser is designed to be fully customizable. You can implement any trading strategy by editing `src/strategy.js`.

## How Custom Strategies Work

### Basic Structure

Your strategy must implement the `analyze()` method that returns:
- `'BUY'` - Bot will buy
- `'SELL'` - Bot will sell
- `'HOLD'` - Bot does nothing

### Example Custom Strategy

```javascript
async analyze(data) {
  const { symbol, currentPrice, position, bars } = data;
  
  // Your custom logic here
  if (/* your buy condition */) {
    return 'BUY';
  }
  
  if (/* your sell condition */) {
    return 'SELL';
  }
  
  return 'HOLD';
}
```

## Using External Libraries

TradeRiser automatically detects and helps install missing dependencies!

### Quick Start

1. **Add import to strategy.js:**
   ```javascript
   import { RSI, MACD } from 'technicalindicators';
   ```

2. **Run the bot:**
   ```bash
   npm start
   ```

3. **Bot detects missing package and shows install command**

4. **Auto-install (optional):**
   ```bash
   npm run install-deps -- --auto
   ```

### Check Dependencies Manually

```bash
npm run check-deps
```

This will:
1. Scan your strategy.js for imports
2. Check if packages are installed
3. Suggest installation commands

### Example with External Library

```javascript
// At top of strategy.js
import { RSI, MACD, BollingerBands } from 'technicalindicators';

class Strategy {
  async analyze(data) {
    const { bars } = data;
    const prices = bars.map(b => parseFloat(b.c));
    
    // Use external library
    const rsi = RSI.calculate({
      values: prices,
      period: 14
    });
    
    if (rsi[rsi.length - 1] < 30) {
      return 'BUY';
    }
    
    return 'HOLD';
  }
}
```

**Want to learn more about external libraries?** Check out the **[External Libraries Guide](EXTERNAL_LIBRARIES.md)** for 10+ popular libraries with examples!

## Common Strategy Patterns

### 1. Multiple Indicator Strategy

```javascript
async analyze(data) {
  const { currentPrice, bars, position } = data;
  const prices = bars.map(b => b.c);
  
  const rsi = this.calculateRSI(prices, 14);
  const sma20 = this.calculateSMA(prices, 20);
  const sma50 = this.calculateSMA(prices, 50);
  
  // Buy when RSI oversold AND price above SMA20
  if (rsi < 30 && currentPrice > sma20 && !position) {
    return 'BUY';
  }
  
  // Sell when RSI overbought OR price below SMA50
  if ((rsi > 70 || currentPrice < sma50) && position) {
    return 'SELL';
  }
  
  return 'HOLD';
}
```

### 2. Machine Learning Strategy

```javascript
import * as tf from '@tensorflow/tfjs-node';

class Strategy {
  constructor() {
    this.model = null;
    this.loadModel();
  }
  
  async loadModel() {
    this.model = await tf.loadLayersModel('file://./models/my-model.json');
  }
  
  async analyze(data) {
    const { bars } = data;
    const features = this.prepareFeatures(bars);
    const prediction = this.model.predict(features);
    
    if (prediction > 0.7) return 'BUY';
    if (prediction < 0.3) return 'SELL';
    return 'HOLD';
  }
}
```

### 3. News Sentiment Strategy

```javascript
import axios from 'axios';

class Strategy {
  async analyze(data) {
    const { symbol } = data;
    
    // Fetch news sentiment
    const sentiment = await this.getNewsSentiment(symbol);
    
    if (sentiment > 0.6) return 'BUY';
    if (sentiment < 0.4) return 'SELL';
    return 'HOLD';
  }
  
  async getNewsSentiment(symbol) {
    const response = await axios.get(`https://api.example.com/sentiment/${symbol}`);
    return response.data.score;
  }
}
```

## Error Handling

### Missing Dependencies

If you see:

```
Error: Cannot find module 'technicalindicators'
```

Install the missing package:

```bash
npm install technicalindicators
```

### API Rate Limits

If using external APIs, implement rate limiting:

```javascript
class Strategy {
  constructor() {
    this.lastApiCall = 0;
    this.apiCallInterval = 1000; // 1 second
  }
  
  async analyze(data) {
    const now = Date.now();
    if (now - this.lastApiCall < this.apiCallInterval) {
      return 'HOLD'; // Skip this iteration
    }
    
    this.lastApiCall = now;
    // Your API call here
  }
}
```

## Testing Your Strategy

### 1. Dry Run Test

```javascript
// Add to strategy.js
if (import.meta.url === `file://${process.argv[1]}`) {
  const strategy = new Strategy();
  const testData = {
    symbol: 'BTC/USD',
    currentPrice: 50000,
    position: null,
    bars: [/* test data */]
  };
  
  strategy.analyze(testData).then(signal => {
    console.log('Signal:', signal);
  });
}
```

Run: `node src/strategy.js`

### 2. Backtest (Manual)

Create `scripts/backtest.js`:

```javascript
import Strategy from '../src/strategy.js';

const strategy = new Strategy();
const historicalData = [/* your data */];

let wins = 0;
let losses = 0;

for (const data of historicalData) {
  const signal = await strategy.analyze(data);
  // Track results
}

console.log(`Wins: ${wins}, Losses: ${losses}`);
```

## Performance Optimization

### 1. Cache Calculations

```javascript
class Strategy {
  constructor() {
    this.cache = new Map();
  }
  
  async analyze(data) {
    const cacheKey = `${data.symbol}-${data.bars.length}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }
    
    // Calculate...
    const result = /* your logic */;
    
    this.cache.set(cacheKey, result);
    return result;
  }
}
```

### 2. Limit Data Processing

```javascript
async analyze(data) {
  const { bars } = data;
  
  // Only use last 100 bars instead of all
  const recentBars = bars.slice(-100);
  
  // Your analysis
}
```

## Common Pitfalls

### 1. Async/Await Issues

Wrong:
```javascript
async analyze(data) {
  const result = this.someAsyncFunction(); // Missing await!
  return result;
}
```

Correct:
```javascript
async analyze(data) {
  const result = await this.someAsyncFunction();
  return result;
}
```

### 2. Not Checking Position

Wrong:
```javascript
if (price < 50000) {
  return 'BUY'; // Will buy multiple times!
}
```

Correct:
```javascript
if (price < 50000 && !position) {
  return 'BUY'; // Only buy if no position
}
```

### 3. Division by Zero

```javascript
const avgVolume = volumes.reduce((a, b) => a + b, 0) / volumes.length;

if (volumes.length === 0) {
  return 'HOLD'; // Prevent division by zero
}
```

## Popular Libraries for Strategies

### Technical Analysis

```bash
npm install technicalindicators
npm install tulind
npm install ta-lib
```

### Machine Learning

```bash
npm install @tensorflow/tfjs-node
npm install brain.js
npm install ml-regression
```

### Data Processing

```bash
npm install lodash
npm install mathjs
npm install simple-statistics
```

### External Data

```bash
npm install axios
npm install node-fetch
npm install ws  # WebSocket for real-time data
```

## Getting Help

- **[Strategy Examples](STRATEGY_GUIDE.md)** - Pre-built strategies to learn from
- **[Indicators Guide](INDICATORS_GUIDE.md)** - Built-in indicators
- **[External Libraries](EXTERNAL_LIBRARIES.md)** - Advanced libraries
- **[API Reference](API_REFERENCE.md)** - Complete code reference
- **[Troubleshooting](TROUBLESHOOTING.md)** - Common issues
- **[GitHub Issues](https://github.com/yourusername/TradeRiser/issues)** - Ask questions
- **[Contributing](../CONTRIBUTING.md)** - Share your strategy

## Next Steps

1. **Study** [Strategy Examples](STRATEGY_GUIDE.md) - Learn from working code
2. **Understand** [Indicators](INDICATORS_GUIDE.md) - Know your tools
3. **Explore** [External Libraries](EXTERNAL_LIBRARIES.md) - Advanced features
4. **Reference** [API Documentation](API_REFERENCE.md) - Complete API
5. **Test** with paper trading - No risk!
6. **Monitor** and iterate - Improve over time

---

[Back to Navigation](NAVIGATION.md) | [Main README](../README.md)
