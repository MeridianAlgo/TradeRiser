# 🔧 Troubleshooting Guide

Common issues and solutions for TradeRiser.

## Quick Links
- [Main README](../README.md)
- [Getting Started](GETTING_STARTED.md)
- [Custom Strategies](CUSTOM_STRATEGIES.md)
- [Navigation](NAVIGATION.md)

---

## Installation Issues

### "npm: command not found"

**Problem:** Node.js is not installed

**Solution:**
1. Download Node.js from https://nodejs.org
2. Install LTS version (16.x or higher)
3. Restart terminal
4. Verify: `node --version`

---

### "npm install" fails

**Problem:** Package installation errors

**Solutions:**

**Try 1: Clear cache**
```bash
npm cache clean --force
npm install
```

**Try 2: Delete node_modules**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Try 3: Use different registry**
```bash
npm install --registry=https://registry.npmjs.org/
```

---

### "Permission denied" on npm install

**Problem:** Insufficient permissions

**Solution (Mac/Linux):**
```bash
sudo npm install
```

**Solution (Windows):**
Run Command Prompt as Administrator

---

## API & Authentication Issues

### "Authentication failed" or "401 error"

**Problem:** Invalid API keys

**Solutions:**

**Check 1: Verify .env file**
```bash
# Open .env and check:
ALPACA_API_KEY=AKXXXXXXXXXXXXXXXXXX
ALPACA_API_SECRET=your_secret_key_here
ALPACA_PAPER=true
```

**Check 2: No extra spaces**
```bash
# Wrong:
ALPACA_API_KEY= AKXXX  # Space before key

# Correct:
ALPACA_API_KEY=AKXXX
```

**Check 3: Paper trading keys**
- Make sure you're using paper trading keys
- Not live trading keys

**Check 4: Regenerate keys**
1. Go to https://alpaca.markets
2. Navigate to API Keys
3. Delete old keys
4. Generate new keys
5. Update .env file

---

### "Market is closed"

**Problem:** Trying to trade when market is closed

**Solution:**
- Crypto markets (BTC/USD, ETH/USD) are 24/7
- Stock markets have trading hours
- Check symbol: `BTC/USD` not `BTCUSD`

---

### "Insufficient buying power"

**Problem:** Not enough funds to place order

**Solutions:**

**Check 1: Verify account balance**
```bash
npm test
# Look for "Cash:" in output
```

**Check 2: Reduce position size**
```javascript
// In strategy.js
this.positionSizePercent = 0.05;  // Use 5% instead of 10%
```

**Check 3: Paper trading account**
- Paper accounts start with $100,000
- If you see $0, reset paper account on Alpaca website

---

## Strategy Issues

### Bot keeps saying "HOLD" and never trades

**Problem:** Strategy conditions not met

**Solutions:**

**Check 1: Not enough data**
```
⚠️  Not enough data for BTC/USD (need 30 bars, have 10)
```
**Solution:** Wait a few minutes for data to accumulate

**Check 2: Conditions too strict**
```javascript
// If using multiple filters:
this.useRSI = false;     // Disable RSI filter
this.useVolume = false;  // Disable volume filter
```

**Check 3: Try simpler strategy**
Use the basic MA crossover without filters

**Check 4: Check current market**
```bash
npm test
# Look at current prices and MAs
```

---

### Bot buys multiple times for same symbol

**Problem:** Position tracking not working

**Solution:**
This should be fixed in v1.1.0+. If still happening:

```javascript
// In strategy.js, check this exists:
if (this.hasPosition[symbol]) {
  return 'HOLD';
}
```

---

### Strategy not using my custom code

**Problem:** Changes not taking effect

**Solutions:**

**Check 1: Restart bot**
```bash
# Stop bot: Ctrl+C
# Start again:
npm start
```

**Check 2: Check syntax errors**
```bash
node src/strategy.js
# Should show no errors
```

**Check 3: Verify file saved**
- Make sure you saved strategy.js
- Check file modification time

---

## Dependency Issues

### "Cannot find module 'package-name'"

**Problem:** Missing dependency

**Solutions:**

**Auto-detect:**
```bash
npm run check-deps
```

**Auto-install:**
```bash
npm run install-deps -- --auto
```

**Manual install:**
```bash
npm install package-name
```

---

### "technicalindicators" not working

**Problem:** Library not installed or import error

**Solutions:**

**Check 1: Install library**
```bash
npm install technicalindicators
```

**Check 2: Correct import**
```javascript
// Correct:
import { RSI, MACD } from 'technicalindicators';

// Wrong:
import technicalindicators from 'technicalindicators';
```

**Check 3: Verify installation**
```bash
npm list technicalindicators
```

---

## Performance Issues

### Bot is slow or laggy

**Problem:** Too much data processing

**Solutions:**

**Solution 1: Limit bars**
```javascript
// In config.js
dataLimit: 50  // Instead of 100
```

**Solution 2: Increase check interval**
```javascript
// In config.js
checkInterval: 120000  // 2 minutes instead of 1
```

**Solution 3: Optimize calculations**
```javascript
// Cache expensive calculations
if (this.cache.has(symbol)) {
  return this.cache.get(symbol);
}
```

---

### High CPU usage

**Problem:** Intensive calculations

**Solutions:**

**Check 1: Reduce symbols**
```javascript
// In config.js
symbols: ['BTC/USD']  // Trade only one symbol
```

**Check 2: Use faster libraries**
```bash
# Instead of technicalindicators, use tulind
npm install tulind
```

**Check 3: Limit data processing**
```javascript
// Only use recent bars
const recentBars = bars.slice(-50);
```

---

## Runtime Errors

### "TypeError: Cannot read property 'c' of undefined"

**Problem:** Missing or invalid bar data

**Solution:**
```javascript
// Add safety check:
if (!bars || bars.length === 0) {
  return 'HOLD';
}

// Check each bar:
const prices = bars
  .filter(b => b && b.c)
  .map(b => parseFloat(b.c));
```

---

### "RangeError: Invalid array length"

**Problem:** Trying to create array with invalid size

**Solution:**
```javascript
// Check window size:
if (window > prices.length) {
  return 'HOLD';
}
```

---

### "Division by zero" or "NaN" in calculations

**Problem:** Invalid mathematical operation

**Solution:**
```javascript
// Check before division:
if (denominator === 0) {
  return 0;  // or some default value
}

// Check for NaN:
if (isNaN(result)) {
  return 'HOLD';
}
```

---

## External API Issues

### "ECONNREFUSED" or "ETIMEDOUT"

**Problem:** Cannot connect to external API

**Solutions:**

**Check 1: Internet connection**
```bash
ping google.com
```

**Check 2: API endpoint**
- Verify URL is correct
- Check if API is down

**Check 3: Add timeout**
```javascript
const response = await axios.get(url, {
  timeout: 5000  // 5 second timeout
});
```

**Check 4: Add error handling**
```javascript
try {
  const data = await externalAPI.getData();
} catch (error) {
  console.log('API unavailable, using fallback');
  return 'HOLD';
}
```

---

### "Rate limit exceeded"

**Problem:** Too many API requests

**Solutions:**

**Solution 1: Increase check interval**
```javascript
// In config.js
checkInterval: 300000  // 5 minutes
```

**Solution 2: Implement rate limiting**
```javascript
class Strategy {
  constructor() {
    this.lastApiCall = 0;
    this.apiCallInterval = 60000;  // 1 minute
  }
  
  async analyze(data) {
    const now = Date.now();
    if (now - this.lastApiCall < this.apiCallInterval) {
      return 'HOLD';
    }
    this.lastApiCall = now;
    // ... your code
  }
}
```

---

## Testing Issues

### "npm test" fails

**Problem:** Test errors

**Solutions:**

**Check 1: API keys**
- Verify .env file has correct keys

**Check 2: Internet connection**
- Tests require connection to Alpaca API

**Check 3: Market hours**
- Some tests may fail outside market hours
- Crypto tests should work 24/7

---

## Logging & Debugging

### Enable verbose logging

```javascript
// In src/index.js, add:
console.log('Debug info:', JSON.stringify(data, null, 2));
```

### Check specific values

```javascript
async analyze(data) {
  console.log('Current price:', data.currentPrice);
  console.log('Bars count:', data.bars.length);
  console.log('Position:', data.position);
  
  // ... your strategy
}
```

### Log indicator values

```javascript
const sma = this.calculateSMA(prices, 20);
console.log('SMA:', sma);
console.log('Price:', currentPrice);
console.log('Above SMA:', currentPrice > sma);
```

---

## Common Mistakes

### 1. Forgetting to await async functions

**Wrong:**
```javascript
const result = this.someAsyncFunction();
```

**Correct:**
```javascript
const result = await this.someAsyncFunction();
```

---

### 2. Not checking for position before buying

**Wrong:**
```javascript
if (buyCondition) {
  return 'BUY';  // Will buy multiple times!
}
```

**Correct:**
```javascript
if (buyCondition && !position && !this.hasPosition[symbol]) {
  return 'BUY';
}
```

---

### 3. Using wrong data types

**Wrong:**
```javascript
const price = bar.c;  // String!
const sma = this.calculateSMA(prices, 20);
if (price > sma) {  // String comparison!
```

**Correct:**
```javascript
const price = parseFloat(bar.c);  // Number
const sma = this.calculateSMA(prices, 20);
if (price > sma) {  // Number comparison
```

---

### 4. Not handling errors

**Wrong:**
```javascript
const data = await externalAPI.getData();
// What if API fails?
```

**Correct:**
```javascript
try {
  const data = await externalAPI.getData();
} catch (error) {
  console.error('API error:', error.message);
  return 'HOLD';
}
```

---

## Getting Help

### Before asking for help:

1. **Check this guide** - Most issues are covered here
2. **Read error message** - Often tells you exactly what's wrong
3. **Check logs** - Look for error messages in console
4. **Test with default strategy** - Isolate if it's your custom code
5. **Verify API keys** - Most common issue

### When asking for help:

Include:
- Error message (full text)
- What you were trying to do
- Your strategy code (if custom)
- Node.js version: `node --version`
- OS: Windows/Mac/Linux

### Where to get help:

- [GitHub Issues](https://github.com/yourusername/TradeRiser/issues)
- [GitHub Discussions](https://github.com/yourusername/TradeRiser/discussions)
- [Documentation](NAVIGATION.md)

---

## Quick Fixes Checklist

When something goes wrong, try these in order:

- [ ] Restart the bot
- [ ] Check .env file for correct API keys
- [ ] Run `npm run check-deps`
- [ ] Run `npm test` to verify setup
- [ ] Check internet connection
- [ ] Clear npm cache: `npm cache clean --force`
- [ ] Reinstall dependencies: `rm -rf node_modules && npm install`
- [ ] Try default strategy (remove custom code)
- [ ] Check Node.js version: `node --version` (need 16+)
- [ ] Read error message carefully

---

## Still Having Issues?

If none of the above solutions work:

1. **Create a GitHub Issue:**
   - Go to: https://github.com/yourusername/TradeRiser/issues
   - Click "New Issue"
   - Describe your problem
   - Include error messages and code

2. **Check Discussions:**
   - Someone may have had the same issue
   - https://github.com/yourusername/TradeRiser/discussions

3. **Review Documentation:**
   - [Getting Started](GETTING_STARTED.md)
   - [Custom Strategies](CUSTOM_STRATEGIES.md)
   - [API Reference](API_REFERENCE.md)

---

## Related Documentation

- [Getting Started Guide](GETTING_STARTED.md)
- [Custom Strategies](CUSTOM_STRATEGIES.md)
- [External Libraries](EXTERNAL_LIBRARIES.md)
- [API Reference](API_REFERENCE.md)

---

[Back to Navigation](NAVIGATION.md) | [Main README](../README.md)
