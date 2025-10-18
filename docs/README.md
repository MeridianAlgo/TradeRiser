# 🤖 Crypto Trading Bot - Alpaca Paper Trading

A **modular** cryptocurrency trading bot that's easy to customize - even for non-coders!

✅ Uses **REAL LIVE PRICES** from Alpaca  
✅ **Paper trading** by default (safe testing)  
✅ **Comprehensive error handling**  
✅ **Easy strategy customization** - just edit one file!

---

## 🚀 Quick Start (5 Minutes!)

### Step 1: Install
```bash
npm install
```

### Step 2: Get API Keys
1. Go to https://alpaca.markets
2. Sign up for a FREE paper trading account
3. Get your API Key and Secret

### Step 3: Configure
1. Open the `.env` file
2. Add your API credentials:
```
ALPACA_API_KEY=your_key_here
ALPACA_API_SECRET=your_secret_here
ALPACA_PAPER=true
```

### Step 4: Test
```bash
npm test
```

### Step 5: Run!
```bash
npm start
```

That's it! Your bot is now running! 🎉

---

## 🎯 How to Create Your Strategy (Super Easy!)

### For Non-Coders: Copy & Paste Method

1. Open `strategy.js`
2. Find the `analyze()` function (around line 60)
3. **Copy one of the ready-made strategies** from `STRATEGY_GUIDE.md`
4. **Paste it** to replace the existing code
5. **Change the numbers** to your preference
6. Save and run!

### Example: Simple Buy Low, Sell High

```javascript
async analyze(data) {
  const { symbol, currentPrice, position } = data;
  
  const BUY_PRICE = 65000;   // ← Change this number
  const SELL_PRICE = 70000;  // ← Change this number
  
  if (currentPrice < BUY_PRICE && !position) {
    return 'BUY';
  }
  
  if (currentPrice > SELL_PRICE && position) {
    return 'SELL';
  }
  
  return 'HOLD';
}
```

**That's it!** Just change the numbers and you have a custom strategy!

---

## 📚 Documentation

- **`STRATEGY_GUIDE.md`** - Complete guide with 5+ ready-to-use strategies
- **`SUMMARY.md`** - Technical details and test results
- **`strategy.js`** - Your strategy file (heavily commented!)

---

## 📁 Project Structure

```
├── strategy.js       ← YOUR STRATEGY (edit this!)
├── index.js          ← Main bot (don't need to touch)
├── broker.js         ← Alpaca API (don't need to touch)
├── portfolio.js      ← Portfolio management (don't need to touch)
├── config.js         ← Settings (symbols, interval)
└── .env              ← Your API keys
```

**You only need to edit `strategy.js`!**

---

## 🎓 Ready-Made Strategies

Choose from 5+ strategies in `STRATEGY_GUIDE.md`:

1. **Simple Price Threshold** - Buy at $X, sell at $Y
2. **RSI Overbought/Oversold** - Buy low RSI, sell high RSI
3. **Take Profit / Stop Loss** - Automatic profit taking
4. **Buy the Dip** - Buy when price drops X%
5. **Trend Following** - Follow the trend with EMAs

All strategies are **copy-paste ready** with clear instructions!

---

## ⚙️ Configuration

### Change Trading Symbols
Edit `config.js`:
```javascript
symbols: ['BTC/USD', 'ETH/USD']  // Add or remove symbols
```

### Change Check Interval
```javascript
checkInterval: 60000  // 60 seconds (change to 30000 for 30 sec)
```

### Change Position Size
Edit `strategy.js`:
```javascript
this.positionSizePercent = 0.1;  // 10% of buying power per trade
```

---

## 📊 What You'll See

When running, the bot shows:

```
⏰ 10/17/2025, 10:01:30 PM - Checking markets...
   BTC/USD - Price: $106,648.29 | Short SMA: $106,609.71 | Long SMA: $106,731.74
   ETH/USD - Price: $3,852.30 | Short SMA: $3,852.39 | Long SMA: $3,859.22
```

When it trades:
```
   🔔 BUY signal detected for BTC/USD
   ✅ BUY order placed: 0.01 BTC/USD at market
```

---

## 🛡️ Safety Features

✅ **Paper trading by default** - No real money at risk  
✅ **Comprehensive error handling** - Won't crash on API errors  
✅ **Position checks** - Won't double-buy or sell without position  
✅ **Data validation** - Checks for valid prices and data  
✅ **Auto-retry** - Recovers from temporary failures  

---

## ⚠️ Important Reminders

- 📝 This is for **educational purposes**
- 🧪 Always **test thoroughly** with paper trading
- 💰 **Never risk** more than you can afford to lose
- 📈 **Past performance** doesn't guarantee future results
- 🔒 **Never share** your API keys

---

## 🆘 Troubleshooting

### Bot won't start?
- Check your `.env` file has correct API keys
- Run `npm test` to diagnose issues

### No trades happening?
- Your strategy conditions might not be met
- Check the console output for indicator values
- Try a simpler strategy first

### Getting errors?
- Make sure you have internet connection
- Verify your Alpaca account is active
- Check you're using paper trading credentials

---

## 🚀 Next Steps

1. ✅ Get the bot running with default strategy
2. 📖 Read `STRATEGY_GUIDE.md` for strategy ideas
3. 🎯 Pick a strategy and customize it
4. 🧪 Test with paper trading
5. 📊 Monitor and improve
6. 🎓 Learn and iterate!

---

## 💡 Pro Tips

- Start with the **simplest strategy** first
- **Monitor for a few days** before making changes
- **Keep a trading journal** of what works
- **Backtest** your ideas before implementing
- **Join trading communities** to learn more

---

**Happy Trading! 🎉**

Questions? Check `STRATEGY_GUIDE.md` for detailed help!
