# 📚 External Libraries Guide

Complete guide to using external libraries with TradeRiser for advanced trading strategies.

## Quick Links
- [Main README](../README.md)
- [Custom Strategies](CUSTOM_STRATEGIES.md)
- [Indicators Guide](INDICATORS_GUIDE.md)
- [API Reference](API_REFERENCE.md)
- [Navigation](NAVIGATION.md)

---

## Why Use External Libraries?

Built-in indicators are great, but external libraries offer:
- Advanced technical indicators
- Machine learning capabilities
- Statistical analysis tools
- Real-time data processing
- Backtesting frameworks

---

## Automatic Dependency Management

TradeRiser automatically detects and helps install missing dependencies!

### How It Works

1. **Add import to strategy.js:**
   ```javascript
   import { RSI, MACD } from 'technicalindicators';
   ```

2. **Run the bot:**
   ```bash
   npm start
   ```

3. **Bot detects missing package:**
   ```
   ⚠️  Missing dependencies:
      - technicalindicators
   
   💡 To install: npm install technicalindicators
   ```

4. **Auto-install (optional):**
   ```bash
   npm run install-deps -- --auto
   ```

### Manual Check

Check dependencies without running the bot:
```bash
npm run check-deps
```

---

## Popular Libraries

### 1. Technical Indicators

#### technicalindicators
**Best for:** Comprehensive technical analysis  
**Indicators:** 50+ indicators including RSI, MACD, Bollinger Bands, Stochastic, etc.

**Installation:**
```bash
npm install technicalindicators
```

**Usage:**
```javascript
import { RSI, MACD, BollingerBands, SMA, EMA } from 'technicalindicators';

class Strategy {
  async analyze(data) {
    const { bars } = data;
    const prices = bars.map(b => parseFloat(b.c));
    
    // RSI
    const rsi = RSI.calculate({
      values: prices,
      period: 14
    });
    
    // MACD
    const macd = MACD.calculate({
      values: prices,
      fastPeriod: 12,
      slowPeriod: 26,
      signalPeriod: 9,
      SimpleMAOscillator: false,
      SimpleMASignal: false
    });
    
    // Bollinger Bands
    const bb = BollingerBands.calculate({
      period: 20,
      values: prices,
      stdDev: 2
    });
    
    // Trading logic
    const currentRSI = rsi[rsi.length - 1];
    const currentBB = bb[bb.length - 1];
    
    if (currentRSI < 30 && prices[prices.length - 1] < currentBB.lower) {
      return 'BUY';
    }
    
    if (currentRSI > 70 && prices[prices.length - 1] > currentBB.upper) {
      return 'SELL';
    }
    
    return 'HOLD';
  }
}
```

**Available Indicators:**
- Trend: SMA, EMA, WMA, VWAP, MACD
- Momentum: RSI, Stochastic, CCI, Williams %R
- Volatility: Bollinger Bands, ATR, Keltner Channels
- Volume: OBV, Volume Profile, MFI
- And 40+ more!

**Documentation:** https://github.com/anandanand84/technicalindicators

---

#### tulind
**Best for:** Fast C-based indicators  
**Performance:** 10x faster than JavaScript implementations

**Installation:**
```bash
npm install tulind
```

**Usage:**
```javascript
import tulind from 'tulind';

class Strategy {
  async analyze(data) {
    const { bars } = data;
    const prices = bars.map(b => parseFloat(b.c));
    
    // RSI (returns a promise)
    const rsi = await new Promise((resolve, reject) => {
      tulind.indicators.rsi.indicator([prices], [14], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });
    
    const currentRSI = rsi[rsi.length - 1];
    
    if (currentRSI < 30) return 'BUY';
    if (currentRSI > 70) return 'SELL';
    return 'HOLD';
  }
}
```

**Documentation:** https://tulipindicators.org/

---

#### ta-lib
**Best for:** Industry-standard indicators  
**Note:** Requires compilation (more complex setup)

**Installation:**
```bash
npm install ta-lib
```

**Documentation:** https://github.com/oransel/node-talib

---

### 2. Machine Learning

#### TensorFlow.js
**Best for:** Neural networks and deep learning

**Installation:**
```bash
npm install @tensorflow/tfjs-node
```

**Usage:**
```javascript
import * as tf from '@tensorflow/tfjs-node';

class Strategy {
  constructor() {
    super();
    this.model = null;
    this.loadModel();
  }
  
  async loadModel() {
    // Load pre-trained model
    this.model = await tf.loadLayersModel('file://./models/price-predictor/model.json');
  }
  
  async analyze(data) {
    const { bars } = data;
    
    // Prepare features
    const features = this.prepareFeatures(bars);
    const tensor = tf.tensor2d([features]);
    
    // Predict
    const prediction = this.model.predict(tensor);
    const predictionValue = await prediction.data();
    
    // Trading logic
    if (predictionValue[0] > 0.7) return 'BUY';
    if (predictionValue[0] < 0.3) return 'SELL';
    return 'HOLD';
  }
  
  prepareFeatures(bars) {
    // Extract features from bars
    const prices = bars.map(b => parseFloat(b.c));
    const volumes = bars.map(b => parseFloat(b.v));
    
    // Normalize and return features
    return [
      this.calculateSMA(prices, 10),
      this.calculateSMA(prices, 30),
      this.calculateRSI(prices, 14),
      volumes[volumes.length - 1] / this.calculateSMA(volumes, 20)
    ];
  }
}
```

**Documentation:** https://www.tensorflow.org/js

---

#### brain.js
**Best for:** Simple neural networks (easier than TensorFlow)

**Installation:**
```bash
npm install brain.js
```

**Usage:**
```javascript
import brain from 'brain.js';

class Strategy {
  constructor() {
    super();
    this.net = new brain.NeuralNetwork();
    this.trainModel();
  }
  
  trainModel() {
    // Train with historical data
    const trainingData = [
      { input: [0.1, 0.2, 0.3], output: [1] },  // Buy
      { input: [0.9, 0.8, 0.7], output: [0] },  // Sell
      // ... more training data
    ];
    
    this.net.train(trainingData);
  }
  
  async analyze(data) {
    const { bars } = data;
    const features = this.prepareFeatures(bars);
    const output = this.net.run(features);
    
    if (output[0] > 0.7) return 'BUY';
    if (output[0] < 0.3) return 'SELL';
    return 'HOLD';
  }
}
```

**Documentation:** https://github.com/BrainJS/brain.js

---

### 3. Data Processing

#### lodash
**Best for:** Array and object manipulation

**Installation:**
```bash
npm install lodash
```

**Usage:**
```javascript
import _ from 'lodash';

class Strategy {
  async analyze(data) {
    const { bars } = data;
    const prices = bars.map(b => parseFloat(b.c));
    
    // Calculate percentiles
    const p25 = _.nth(_.sortBy(prices), Math.floor(prices.length * 0.25));
    const p75 = _.nth(_.sortBy(prices), Math.floor(prices.length * 0.75));
    
    // Group by price ranges
    const grouped = _.groupBy(prices, price => {
      if (price < p25) return 'low';
      if (price > p75) return 'high';
      return 'mid';
    });
    
    // Trading logic based on distribution
    if (grouped.low && grouped.low.length > prices.length * 0.4) {
      return 'BUY';  // Many low prices = oversold
    }
    
    return 'HOLD';
  }
}
```

---

#### mathjs
**Best for:** Advanced mathematical operations

**Installation:**
```bash
npm install mathjs
```

**Usage:**
```javascript
import { create, all } from 'mathjs';

const math = create(all);

class Strategy {
  async analyze(data) {
    const { bars } = data;
    const prices = bars.map(b => parseFloat(b.c));
    
    // Statistical analysis
    const mean = math.mean(prices);
    const std = math.std(prices);
    const currentPrice = prices[prices.length - 1];
    
    // Z-score
    const zScore = (currentPrice - mean) / std;
    
    // Trading logic
    if (zScore < -2) return 'BUY';   // 2 std devs below mean
    if (zScore > 2) return 'SELL';   // 2 std devs above mean
    return 'HOLD';
  }
}
```

---

#### simple-statistics
**Best for:** Statistical analysis

**Installation:**
```bash
npm install simple-statistics
```

**Usage:**
```javascript
import * as ss from 'simple-statistics';

class Strategy {
  async analyze(data) {
    const { bars } = data;
    const prices = bars.map(b => parseFloat(b.c));
    
    // Linear regression
    const points = prices.map((price, i) => [i, price]);
    const regression = ss.linearRegression(points);
    const slope = regression.m;
    
    // Correlation
    const volumes = bars.map(b => parseFloat(b.v));
    const correlation = ss.sampleCorrelation(prices, volumes);
    
    // Trading logic
    if (slope > 0 && correlation > 0.7) {
      return 'BUY';  // Uptrend with volume confirmation
    }
    
    return 'HOLD';
  }
}
```

---

### 4. External Data Sources

#### axios
**Best for:** HTTP requests (news, sentiment, external APIs)

**Installation:**
```bash
npm install axios
```

**Usage:**
```javascript
import axios from 'axios';

class Strategy {
  async analyze(data) {
    const { symbol } = data;
    
    // Fetch news sentiment
    try {
      const response = await axios.get(`https://api.example.com/sentiment/${symbol}`, {
        headers: { 'Authorization': `Bearer ${process.env.NEWS_API_KEY}` }
      });
      
      const sentiment = response.data.score;
      
      if (sentiment > 0.7) return 'BUY';
      if (sentiment < 0.3) return 'SELL';
      
    } catch (error) {
      console.error('Failed to fetch sentiment:', error.message);
    }
    
    return 'HOLD';
  }
}
```

---

#### ws (WebSocket)
**Best for:** Real-time data streams

**Installation:**
```bash
npm install ws
```

**Usage:**
```javascript
import WebSocket from 'ws';

class Strategy {
  constructor() {
    super();
    this.orderBookData = {};
    this.connectWebSocket();
  }
  
  connectWebSocket() {
    const ws = new WebSocket('wss://api.exchange.com/orderbook');
    
    ws.on('message', (data) => {
      const orderBook = JSON.parse(data);
      this.orderBookData = orderBook;
    });
  }
  
  async analyze(data) {
    const { symbol } = data;
    
    // Use real-time order book data
    const orderBook = this.orderBookData[symbol];
    
    if (orderBook) {
      const bidVolume = orderBook.bids.reduce((sum, [price, vol]) => sum + vol, 0);
      const askVolume = orderBook.asks.reduce((sum, [price, vol]) => sum + vol, 0);
      
      // More bids than asks = bullish
      if (bidVolume > askVolume * 1.5) return 'BUY';
      if (askVolume > bidVolume * 1.5) return 'SELL';
    }
    
    return 'HOLD';
  }
}
```

---

## Complete Example: Multi-Library Strategy

```javascript
import { RSI, MACD, BollingerBands } from 'technicalindicators';
import * as ss from 'simple-statistics';
import axios from 'axios';
import _ from 'lodash';

class Strategy {
  async analyze(data) {
    const { symbol, currentPrice, position, bars } = data;
    
    if (!bars || bars.length < 50) return 'HOLD';
    
    const prices = bars.map(b => parseFloat(b.c));
    const volumes = bars.map(b => parseFloat(b.v));
    
    // 1. Technical Indicators
    const rsi = RSI.calculate({ values: prices, period: 14 });
    const macd = MACD.calculate({
      values: prices,
      fastPeriod: 12,
      slowPeriod: 26,
      signalPeriod: 9
    });
    const bb = BollingerBands.calculate({
      period: 20,
      values: prices,
      stdDev: 2
    });
    
    // 2. Statistical Analysis
    const priceVolCorrelation = ss.sampleCorrelation(prices.slice(-20), volumes.slice(-20));
    const recentPrices = prices.slice(-10);
    const priceStd = ss.standardDeviation(recentPrices);
    
    // 3. External Data (with error handling)
    let sentiment = 0.5;
    try {
      const response = await axios.get(`https://api.sentiment.com/${symbol}`, {
        timeout: 2000
      });
      sentiment = response.data.score;
    } catch (error) {
      console.log('Sentiment API unavailable, using neutral');
    }
    
    // 4. Combine Signals
    const currentRSI = rsi[rsi.length - 1];
    const currentMACD = macd[macd.length - 1];
    const currentBB = bb[bb.length - 1];
    
    let buySignals = 0;
    let sellSignals = 0;
    
    // RSI signal
    if (currentRSI < 30) buySignals++;
    if (currentRSI > 70) sellSignals++;
    
    // MACD signal
    if (currentMACD && currentMACD.MACD > currentMACD.signal) buySignals++;
    if (currentMACD && currentMACD.MACD < currentMACD.signal) sellSignals++;
    
    // Bollinger Bands signal
    if (currentPrice < currentBB.lower) buySignals++;
    if (currentPrice > currentBB.upper) sellSignals++;
    
    // Volume-price correlation
    if (priceVolCorrelation > 0.7) buySignals++;
    if (priceVolCorrelation < -0.7) sellSignals++;
    
    // Sentiment
    if (sentiment > 0.7) buySignals++;
    if (sentiment < 0.3) sellSignals++;
    
    // Decision
    if (buySignals >= 4 && !position) {
      console.log(`   🔔 BUY: ${buySignals} buy signals detected`);
      return 'BUY';
    }
    
    if (sellSignals >= 4 && position) {
      console.log(`   🔔 SELL: ${sellSignals} sell signals detected`);
      return 'SELL';
    }
    
    return 'HOLD';
  }
}

export default Strategy;
```

---

## Best Practices

### 1. Error Handling

Always wrap external library calls in try-catch:

```javascript
try {
  const rsi = RSI.calculate({ values: prices, period: 14 });
} catch (error) {
  console.error('RSI calculation failed:', error.message);
  return 'HOLD';
}
```

### 2. Timeouts for External APIs

```javascript
const response = await axios.get(url, {
  timeout: 3000  // 3 second timeout
});
```

### 3. Caching

Cache expensive calculations:

```javascript
class Strategy {
  constructor() {
    super();
    this.cache = new Map();
  }
  
  async analyze(data) {
    const cacheKey = `${data.symbol}-${data.bars.length}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }
    
    // Expensive calculation
    const result = /* ... */;
    
    this.cache.set(cacheKey, result);
    return result;
  }
}
```

### 4. Graceful Degradation

If external service fails, fall back to built-in indicators:

```javascript
let rsi;
try {
  rsi = await externalAPI.getRSI(symbol);
} catch (error) {
  console.log('External API failed, using built-in RSI');
  rsi = this.calculateRSI(prices, 14);
}
```

---

## Troubleshooting

### Package Won't Install

**Problem:** `npm install package-name` fails

**Solutions:**
1. Check Node.js version: `node --version` (need 16+)
2. Clear npm cache: `npm cache clean --force`
3. Delete node_modules: `rm -rf node_modules && npm install`
4. Check package compatibility with your OS

### Import Errors

**Problem:** `Cannot find module 'package-name'`

**Solutions:**
1. Run: `npm run check-deps`
2. Install missing package: `npm install package-name`
3. Restart bot: `npm start`

### Performance Issues

**Problem:** Bot is slow with external libraries

**Solutions:**
1. Use caching (see Best Practices)
2. Limit data processing (use recent bars only)
3. Use faster libraries (tulind instead of technicalindicators)
4. Implement rate limiting for external APIs

---

## Library Comparison

| Library | Speed | Ease of Use | Indicators | Best For |
|---------|-------|-------------|------------|----------|
| technicalindicators | Medium | Easy | 50+ | General use |
| tulind | Fast | Medium | 100+ | Performance |
| ta-lib | Fast | Hard | 150+ | Advanced users |
| brain.js | Slow | Easy | N/A | ML beginners |
| tensorflow.js | Medium | Hard | N/A | Advanced ML |

---

## Next Steps

1. **Start Simple** - Try one library at a time
2. **Test Thoroughly** - Use paper trading
3. **Monitor Performance** - Check execution time
4. **Read Docs** - Each library has unique features
5. **Share Your Strategy** - Contribute back to the community!

---

## Related Documentation

- [Custom Strategies Guide](CUSTOM_STRATEGIES.md) - Build your own strategy
- [Indicators Guide](INDICATORS_GUIDE.md) - Built-in indicators
- [API Reference](API_REFERENCE.md) - Complete API docs
- [Troubleshooting](TROUBLESHOOTING.md) - Common issues

---

[Back to Navigation](NAVIGATION.md) | [Main README](../README.md)
