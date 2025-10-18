# 🎯 Complete Strategy Guide - For Everyone!

## 📚 Table of Contents
1. [Quick Start](#quick-start)
2. [Understanding the Basics](#understanding-the-basics)
3. [How to Create Your Strategy](#how-to-create-your-strategy)
4. [Ready-to-Use Strategy Examples](#ready-to-use-strategy-examples)
5. [Advanced Tips](#advanced-tips)

---

## 🚀 Quick Start

### Where is the Strategy File?
Open `strategy.js` - this is where ALL your trading logic lives!

### What Does It Do?
Every 60 seconds, the bot:
1. Gets current price data
2. Runs YOUR `analyze()` function
3. You return: `'BUY'`, `'SELL'`, or `'HOLD'`
4. Bot executes your decision!

### The 3-Step Process:
```
1. STEP 1: Name your strategy (line 35)
2. STEP 2: Set parameters (lines 42-45)
3. STEP 3: Write your buy/sell rules (lines 90-110)
```

---

## 📖 Understanding the Basics

### What Data Do You Get?

Every time `analyze()` runs, you automatically receive:

| Variable | What It Is | Example |
|----------|-----------|---------|
| `symbol` | The crypto you're trading | `'BTC/USD'` |
| `currentPrice` | Current market price | `67000.50` |
| `position` | Your current holdings | `null` (if you don't own any) |
| `bars` | Last 100 minutes of price data | Array of price bars |
| `portfolio` | Your account balance | Object with cash/equity |

### What Should You Return?


Your `analyze()` function must return ONE of these:

- **`'BUY'`** → Bot will buy the crypto
- **`'SELL'`** → Bot will sell your position  
- **`'HOLD'`** → Bot does nothing

---

## 🛠️ How to Create Your Strategy

### Method 1: Modify the Existing Strategy (Easiest!)

The default strategy uses Moving Averages. Just change the numbers:

```javascript
// In constructor() around line 42:
this.shortWindow = 10;  // Change to 5 for faster signals
this.longWindow = 30;   // Change to 50 for slower signals
```

**What this does:**
- Smaller numbers = More trades (reacts faster)
- Larger numbers = Fewer trades (more stable)

### Method 2: Use a Ready-Made Strategy (Copy & Paste!)

See [Ready-to-Use Examples](#ready-to-use-strategy-examples) below.

Just copy the entire `analyze()` function and replace the existing one!

### Method 3: Create Your Own (For Adventurous Users!)

Follow this template:

```javascript
async analyze(data) {
  const { symbol, currentPrice, position, bars } = data;
  
  // YOUR LOGIC HERE
  
  if (/* your buy condition */) {
    console.log('🔔 BUY signal!');
    return 'BUY';
  }
  
  if (/* your sell condition */) {
    console.log('🔔 SELL signal!');
    return 'SELL';
  }
  
  return 'HOLD';
}
```

---

## 💡 Ready-to-Use Strategy Examples

### Strategy 1: Simple Price Threshold
**Concept:** Buy low, sell high at specific prices

**When to use:** You believe BTC will bounce between $65k-$70k


```javascript
async analyze(data) {
  const { symbol, currentPrice, position } = data;
  
  const BUY_PRICE = 65000;   // Buy when price is below this
  const SELL_PRICE = 70000;  // Sell when price is above this
  
  console.log(`   ${symbol} - Price: $${currentPrice.toFixed(2)}`);
  
  if (currentPrice < BUY_PRICE && !position) {
    console.log(`   🔔 BUY: Price $${currentPrice} is below $${BUY_PRICE}`);
    return 'BUY';
  }
  
  if (currentPrice > SELL_PRICE && position) {
    console.log(`   🔔 SELL: Price $${currentPrice} is above $${SELL_PRICE}`);
    return 'SELL';
  }
  
  return 'HOLD';
}
```

**How to customize:**
- Change `BUY_PRICE` to your target buy price
- Change `SELL_PRICE` to your target sell price

---

### Strategy 2: RSI Overbought/Oversold
**Concept:** Buy when oversold, sell when overbought

**When to use:** You want to catch price reversals

```javascript
async analyze(data) {
  const { symbol, currentPrice, position, bars } = data;
  
  if (!bars || bars.length < 15) return 'HOLD';
  
  const prices = bars.map(bar => parseFloat(bar.c));
  const rsi = this.calculateRSI(prices, 14);
  
  console.log(`   ${symbol} - Price: $${currentPrice.toFixed(2)} | RSI: ${rsi.toFixed(2)}`);
  
  if (rsi < 30 && !position) {
    console.log(`   🔔 BUY: RSI ${rsi.toFixed(2)} is oversold (< 30)`);
    return 'BUY';
  }
  
  if (rsi > 70 && position) {
    console.log(`   🔔 SELL: RSI ${rsi.toFixed(2)} is overbought (> 70)`);
    return 'SELL';
  }
  
  return 'HOLD';
}
```

**How to customize:**
- Change `30` to `20` for more aggressive buying (more oversold)
- Change `70` to `80` for more aggressive selling (more overbought)

---

### Strategy 3: Take Profit / Stop Loss
**Concept:** Sell when you gain 5% OR lose 2%

**When to use:** You want automatic profit taking and loss protection


```javascript
async analyze(data) {
  const { symbol, currentPrice, position } = data;
  
  // If we don't have a position, buy
  if (!position) {
    console.log(`   🔔 BUY: Entering market at $${currentPrice.toFixed(2)}`);
    return 'BUY';
  }
  
  // If we have a position, check profit/loss
  const entryPrice = parseFloat(position.avg_entry_price);
  const changePercent = this.getPriceChange(entryPrice, currentPrice);
  
  console.log(`   ${symbol} - Entry: $${entryPrice.toFixed(2)} | Current: $${currentPrice.toFixed(2)} | P/L: ${changePercent.toFixed(2)}%`);
  
  // Take profit at 5% gain
  if (changePercent >= 5) {
    console.log(`   🔔 SELL: Taking profit at ${changePercent.toFixed(2)}% gain`);
    return 'SELL';
  }
  
  // Stop loss at 2% loss
  if (changePercent <= -2) {
    console.log(`   🔔 SELL: Stop loss at ${changePercent.toFixed(2)}% loss`);
    return 'SELL';
  }
  
  return 'HOLD';
}
```

**How to customize:**
- Change `5` to your desired profit target (e.g., `10` for 10%)
- Change `-2` to your desired stop loss (e.g., `-5` for 5% loss)

---

### Strategy 4: Buy the Dip
**Concept:** Buy when price drops, sell when it recovers

**When to use:** You believe dips are buying opportunities

```javascript
async analyze(data) {
  const { symbol, currentPrice, position, bars } = data;
  
  if (!bars || bars.length < 20) return 'HOLD';
  
  const prices = bars.map(bar => parseFloat(bar.c));
  const recentHigh = Math.max(...prices.slice(-20));
  const dropPercent = this.getPriceChange(recentHigh, currentPrice);
  
  console.log(`   ${symbol} - Current: $${currentPrice.toFixed(2)} | Recent High: $${recentHigh.toFixed(2)} | Drop: ${dropPercent.toFixed(2)}%`);
  
  // Buy when price drops 3% from recent high
  if (dropPercent <= -3 && !position) {
    console.log(`   🔔 BUY: Price dropped ${Math.abs(dropPercent).toFixed(2)}% from recent high`);
    return 'BUY';
  }
  
  // Sell when price recovers 5% from entry
  if (position) {
    const entryPrice = parseFloat(position.avg_entry_price);
    const gainPercent = this.getPriceChange(entryPrice, currentPrice);
    
    if (gainPercent >= 5) {
      console.log(`   🔔 SELL: Price recovered ${gainPercent.toFixed(2)}% from entry`);
      return 'SELL';
    }
  }
  
  return 'HOLD';
}
```

**How to customize:**
- Change `-3` to buy on bigger/smaller dips (e.g., `-5` for 5% dip)
- Change `5` to sell at different recovery levels

---


### Strategy 5: Trend Following (EMA Crossover)
**Concept:** Follow the trend using fast and slow EMAs

**When to use:** You want to ride trends up and down

```javascript
async analyze(data) {
  const { symbol, currentPrice, position, bars } = data;
  
  if (!bars || bars.length < 50) return 'HOLD';
  
  const prices = bars.map(bar => parseFloat(bar.c));
  const fastEMA = this.calculateEMA(prices, 12);
  const slowEMA = this.calculateEMA(prices, 26);
  
  console.log(`   ${symbol} - Price: $${currentPrice.toFixed(2)} | Fast EMA: $${fastEMA.toFixed(2)} | Slow EMA: $${slowEMA.toFixed(2)}`);
  
  // Buy when fast EMA crosses above slow EMA
  if (fastEMA > slowEMA && !position) {
    console.log(`   🔔 BUY: Fast EMA crossed above Slow EMA (uptrend)`);
    return 'BUY';
  }
  
  // Sell when fast EMA crosses below slow EMA
  if (fastEMA < slowEMA && position) {
    console.log(`   🔔 SELL: Fast EMA crossed below Slow EMA (downtrend)`);
    return 'SELL';
  }
  
  return 'HOLD';
}
```

---

## 🎓 Advanced Tips

### Tip 1: Combine Multiple Indicators

You can use multiple conditions:

```javascript
if (rsi < 30 && shortSMA > longSMA && !position) {
  return 'BUY';  // Only buy if BOTH conditions are true
}
```

### Tip 2: Access Price Bar Data

Each bar has these properties:
- `bar.o` = Open price
- `bar.h` = High price
- `bar.l` = Low price
- `bar.c` = Close price
- `bar.v` = Volume

Example:
```javascript
const closePrices = bars.map(bar => bar.c);
const highPrices = bars.map(bar => bar.h);
const volumes = bars.map(bar => bar.v);
```

### Tip 3: Check Your Position

```javascript
if (position) {
  const entryPrice = parseFloat(position.avg_entry_price);
  const quantity = parseFloat(position.qty);
  const currentValue = parseFloat(position.market_value);
  
  console.log(`You own ${quantity} at $${entryPrice} (worth $${currentValue})`);
}
```

### Tip 4: Adjust Position Size

In the constructor, change how much to invest per trade:

```javascript
this.positionSizePercent = 0.1;  // 10% of buying power
this.positionSizePercent = 0.25; // 25% of buying power
this.positionSizePercent = 0.5;  // 50% of buying power
```

### Tip 5: Test Before Going Live!

1. Run with paper trading first (default)
2. Watch the console output
3. Verify your logic works as expected
4. Only then consider live trading

---

## 🔧 Helper Functions Available

These are already built-in and ready to use:


### `calculateSMA(prices, window)`
Simple Moving Average
```javascript
const sma20 = this.calculateSMA(prices, 20);
```

### `calculateEMA(prices, window)`
Exponential Moving Average (more weight on recent prices)
```javascript
const ema12 = this.calculateEMA(prices, 12);
```

### `calculateRSI(prices, period)`
Relative Strength Index (0-100, >70 overbought, <30 oversold)
```javascript
const rsi = this.calculateRSI(prices, 14);
```

### `getPriceChange(oldPrice, newPrice)`
Get percentage change between two prices
```javascript
const change = this.getPriceChange(100, 110); // Returns 10 (10% increase)
```

### `isPriceAboveMA(currentPrice, prices, window)`
Check if current price is above a moving average
```javascript
if (this.isPriceAboveMA(currentPrice, prices, 50)) {
  // Price is above 50-period MA
}
```

---

## 📝 Step-by-Step: Changing Your Strategy

### Example: Let's change from MA to RSI strategy

**Step 1:** Open `strategy.js`

**Step 2:** Find the `analyze()` function (around line 60)

**Step 3:** Delete everything inside the `try { }` block

**Step 4:** Copy one of the example strategies from above

**Step 5:** Paste it inside the `try { }` block

**Step 6:** Save the file

**Step 7:** Run `npm start` to test!

---

## ⚠️ Common Mistakes to Avoid

### Mistake 1: Not Checking for Position
```javascript
// ❌ WRONG - Will try to buy even if you already own it
if (currentPrice < 65000) {
  return 'BUY';
}

// ✅ CORRECT - Only buy if you don't have a position
if (currentPrice < 65000 && !position) {
  return 'BUY';
}
```

### Mistake 2: Not Checking for Enough Data
```javascript
// ❌ WRONG - Might crash if not enough bars
const sma50 = this.calculateSMA(prices, 50);

// ✅ CORRECT - Check first
if (bars.length < 50) return 'HOLD';
const sma50 = this.calculateSMA(prices, 50);
```

### Mistake 3: Forgetting to Return
```javascript
// ❌ WRONG - No return statement
if (rsi < 30) {
  console.log('Buy signal');
}

// ✅ CORRECT - Always return BUY, SELL, or HOLD
if (rsi < 30) {
  console.log('Buy signal');
  return 'BUY';
}
```

---

## 🎯 Quick Reference Card


```javascript
// BASIC TEMPLATE
async analyze(data) {
  const { symbol, currentPrice, position, bars } = data;
  
  // Get price data
  const prices = bars.map(bar => bar.c);
  
  // Calculate indicators
  const sma = this.calculateSMA(prices, 20);
  const rsi = this.calculateRSI(prices, 14);
  
  // BUY logic
  if (/* your condition */ && !position) {
    return 'BUY';
  }
  
  // SELL logic
  if (/* your condition */ && position) {
    return 'SELL';
  }
  
  return 'HOLD';
}
```

### Common Conditions:

| Condition | Code |
|-----------|------|
| Price below X | `currentPrice < 65000` |
| Price above X | `currentPrice > 70000` |
| RSI oversold | `rsi < 30` |
| RSI overbought | `rsi > 70` |
| Short MA > Long MA | `shortSMA > longSMA` |
| Price dropped X% | `dropPercent <= -3` |
| Profit is X% | `changePercent >= 5` |
| Loss is X% | `changePercent <= -2` |
| Don't have position | `!position` |
| Have position | `position` |

---

## 🚀 Next Steps

1. **Choose a strategy** from the examples above
2. **Copy and paste** it into `strategy.js`
3. **Customize the numbers** to your preference
4. **Test it:** Run `npm test` to verify it works
5. **Run the bot:** Run `npm start` to see it in action
6. **Monitor:** Watch the console for buy/sell signals
7. **Iterate:** Adjust and improve based on results

---

## 💬 Need Help?

### Understanding Your Strategy Output

When the bot runs, you'll see:
```
BTC/USD - Price: $67000.50 | Short SMA: $66800.00 | Long SMA: $67200.00
```

This tells you:
- Current price
- Your indicator values
- Whether conditions are met

### Testing Your Strategy

Run `npm test` to:
- ✅ Verify your code has no errors
- ✅ See what your strategy would do right now
- ✅ Check if indicators are calculating correctly

---

## 🎉 You're Ready!

You now have everything you need to create and customize your own trading strategy. Start simple, test thoroughly, and gradually add complexity as you learn!

**Remember:** 
- Start with paper trading
- Test your strategy thoroughly
- Never risk more than you can afford to lose
- Past performance doesn't guarantee future results

Happy trading! 🚀
