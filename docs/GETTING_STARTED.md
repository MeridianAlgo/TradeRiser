# 🎯 Getting Started - Complete Beginner's Guide

## Quick Links
- [Main README](../README.md)
- [Strategy Guide](STRATEGY_GUIDE.md) - Pre-built strategies
- [Indicators Guide](INDICATORS_GUIDE.md) - Available indicators
- [Custom Strategies](CUSTOM_STRATEGIES.md) - Build your own
- [Troubleshooting](TROUBLESHOOTING.md) - Fix issues
- [All Documentation](NAVIGATION.md)

---

## 👋 Welcome!

This guide assumes you know **NOTHING** about coding. We'll walk through everything step by step.

---

## 📋 What You Need

Before starting, make sure you have:

1. ✅ A computer (Windows, Mac, or Linux)
2. ✅ Internet connection
3. ✅ Node.js installed ([Download here](https://nodejs.org))
4. ✅ A text editor (VS Code recommended - [Download here](https://code.visualstudio.com))
5. ✅ An Alpaca account (free - we'll set this up)

---

## 🚀 Step-by-Step Setup

### Step 1: Get the Bot Files

You should already have these files on your computer. If you see these files, you're good:
- `strategy.js`
- `index.js`
- `package.json`
- `.env`

### Step 2: Install Dependencies

1. Open your **terminal** (Command Prompt on Windows, Terminal on Mac)
2. Navigate to the bot folder (where the files are)
3. Type this command and press Enter:
   ```bash
   npm install
   ```
4. Wait for it to finish (you'll see a progress bar)

**What this does:** Downloads all the code libraries the bot needs to work.

### Step 3: Get Your Alpaca API Keys

1. Go to https://alpaca.markets
2. Click "Sign Up" (top right)
3. Choose "Paper Trading" (it's FREE!)
4. Fill out the form and create your account
5. Once logged in, go to "Your API Keys" section
6. You'll see two things:
   - **API Key ID** (looks like: `AKXXXXXXXXXXXXXXXXXX`)
   - **Secret Key** (looks like: `your_secret_key_here`)
7. **Copy both** - you'll need them in the next step

### Step 4: Add Your API Keys

1. Open the `.env` file in your text editor
2. You'll see this:
   ```
   ALPACA_API_KEY=YOUR_API_KEY_HERE
   ALPACA_API_SECRET=YOUR_API_SECRET_HERE
   ALPACA_PAPER=true
   ```
3. Replace `YOUR_API_KEY_HERE` with your actual API Key
4. Replace `YOUR_API_SECRET_HERE` with your actual Secret Key
5. Keep `ALPACA_PAPER=true` (this means paper trading - no real money!)
6. **Save the file**

**Example of what it should look like:**
```
ALPACA_API_KEY=AKXXXXXXXXXXXXXXXXXX
ALPACA_API_SECRET=your_secret_key_here
ALPACA_PAPER=true
```

### Step 5: Test Everything Works

1. In your terminal, type:
   ```bash
   npm test
   ```
2. Press Enter
3. You should see green checkmarks ✅ and "All tests passed!"

**If you see errors:**
- Check your API keys are correct
- Make sure you have internet connection
- Make sure you copied the keys without extra spaces

### Step 6: Run the Bot!

1. In your terminal, type:
   ```bash
   npm start
   ```
2. Press Enter
3. The bot is now running! You'll see it checking prices every 60 seconds

**To stop the bot:** Press `Ctrl+C` (Windows/Linux) or `Cmd+C` (Mac)

---

## 🎯 Understanding What You See

When the bot runs, you'll see output like this:

```
🤖 Initializing Trading Bot...
📝 Strategy: Simple Moving Average Strategy
🔧 Mode: PAPER TRADING

📊 Portfolio Status:
   Cash: $96087.56
   Equity: $96087.56
   Buying Power: $192175.12

🚀 Trading bot started!

⏰ 10/17/2025, 10:01:30 PM - Checking markets...
   BTC/USD - Price: $106,648.29 | Short SMA: $106,609.71 | Long SMA: $106,731.74
```

**What this means:**
- **Cash:** How much money you have available
- **Price:** Current Bitcoin price
- **Short SMA:** Short-term average price
- **Long SMA:** Long-term average price

When the bot wants to trade, you'll see:
```
   🔔 BUY signal detected for BTC/USD
   ✅ BUY order placed: 0.01 BTC/USD at market
```

---

## 🎨 Customizing Your Strategy (The Fun Part!)

### Option 1: Change the Numbers (Easiest!)

1. Open `strategy.js` in your text editor
2. Find these lines (around line 42):
   ```javascript
   this.shortWindow = 10;
   this.longWindow = 30;
   ```
3. Change the numbers:
   - **Smaller numbers** = More trades (reacts faster to price changes)
   - **Larger numbers** = Fewer trades (more stable, less reactive)

**Example:**
```javascript
this.shortWindow = 5;   // Very fast
this.longWindow = 50;   // Very slow
```

4. Save the file
5. Stop the bot (Ctrl+C) and restart it (`npm start`)

### Option 2: Use a Different Strategy (Copy & Paste!)

1. Open **[Strategy Guide](STRATEGY_GUIDE.md)**
2. Find a strategy you like (there are 5+ examples)
3. **Copy the entire code block**
4. Open `strategy.js`
5. Find the `analyze()` function (starts around line 60)
6. **Select everything inside the `try {` and `}` block**
7. **Paste** the new strategy code
8. **Save** the file
9. Restart the bot

**That's it!** You just changed your entire trading strategy!

**Want to build your own?** Check out the **[Custom Strategies Guide](CUSTOM_STRATEGIES.md)**

---

## 📊 Monitoring Your Bot

### Check Your Alpaca Account

1. Log into https://alpaca.markets
2. Go to "Portfolio" or "Activity"
3. You'll see all the trades your bot made!

### Understanding the Console Output

The bot tells you everything it's doing:

| Symbol | Meaning |
|--------|---------|
| ⏰ | Checking markets (happens every 60 seconds) |
| 🔔 | Trading signal detected |
| ✅ | Order successfully placed |
| ❌ | Error occurred |
| ⚠️ | Warning (not enough data, etc.) |

---

## 🛠️ Common Tasks

### Change What Crypto to Trade

1. Open `config.js`
2. Find this line:
   ```javascript
   symbols: ['BTC/USD', 'ETH/USD']
   ```
3. Add or remove symbols:
   ```javascript
   symbols: ['BTC/USD', 'ETH/USD', 'LTC/USD']  // Added Litecoin
   ```
4. Save and restart

### Change How Often It Checks

1. Open `config.js`
2. Find this line:
   ```javascript
   checkInterval: 60000
   ```
3. Change the number:
   - `30000` = 30 seconds
   - `60000` = 60 seconds (1 minute)
   - `300000` = 5 minutes
4. Save and restart

### Change How Much to Invest Per Trade

1. Open `strategy.js`
2. Find this line (around line 45):
   ```javascript
   this.positionSizePercent = 0.1;
   ```
3. Change the number:
   - `0.05` = 5% of your buying power
   - `0.1` = 10% of your buying power
   - `0.25` = 25% of your buying power
4. Save and restart

---

## ⚠️ Important Safety Tips

### ✅ DO:
- ✅ Start with paper trading (fake money)
- ✅ Test your strategy for at least a week
- ✅ Start with small position sizes
- ✅ Monitor the bot regularly
- ✅ Keep your API keys secret

### ❌ DON'T:
- ❌ Use real money until you're confident
- ❌ Share your API keys with anyone
- ❌ Leave the bot running unmonitored for days
- ❌ Invest more than you can afford to lose
- ❌ Expect to get rich quick

---

## 🆘 Troubleshooting

### "npm: command not found"
**Problem:** Node.js is not installed  
**Solution:** Download and install Node.js from https://nodejs.org

### "Authentication failed" or "401 error"
**Problem:** API keys are wrong  
**Solution:** 
1. Check your `.env` file
2. Make sure you copied the keys correctly
3. No extra spaces before or after the keys
4. Make sure you're using paper trading keys

### Bot keeps saying "HOLD" and never trades
**Problem:** Strategy conditions aren't being met  
**Solution:**
1. This is normal! The strategy is waiting for the right moment
2. Try a simpler strategy from **[Strategy Guide](STRATEGY_GUIDE.md)**
3. Adjust the numbers in your strategy

### "No bar data available"
**Problem:** Market might be closed or symbol is wrong  
**Solution:**
1. Crypto markets are 24/7, so this is rare
2. Check your internet connection
3. Try a different symbol (BTC/USD is most reliable)

**More issues?** Check the **[Troubleshooting Guide](TROUBLESHOOTING.md)**

---

## 📚 Learning Resources

### Want to Learn More?

1. **Read the guides:**
   - **[Strategy Guide](STRATEGY_GUIDE.md)** - 5+ ready-to-use strategies
   - **[Indicators Guide](INDICATORS_GUIDE.md)** - All available indicators
   - **[Custom Strategies](CUSTOM_STRATEGIES.md)** - Build your own
   - **[External Libraries](EXTERNAL_LIBRARIES.md)** - Advanced indicators
   - **[API Reference](API_REFERENCE.md)** - Complete code reference
   - **[Main README](../README.md)** - Quick reference

2. **Experiment:**
   - Try different strategies
   - Change the numbers
   - Watch what happens (with paper trading!)

3. **Learn about trading:**
   - Google "moving averages trading"
   - Google "RSI indicator"
   - Watch YouTube videos on technical analysis

---

## 🎉 You're All Set!

Congratulations! You now have a working crypto trading bot!

### Next Steps:

1. ✅ Let it run for a few days with paper trading
2. ✅ Watch how it behaves
3. ✅ Try different strategies from `STRATEGY_GUIDE.md`
4. ✅ Adjust and improve
5. ✅ Learn and have fun!

### Remember:
- 🧪 This is for learning and experimentation
- 📊 Paper trading is risk-free
- 🎓 Take your time to understand how it works
- 💡 Start simple, then get more advanced

**Happy trading! 🚀**

---

## 💬 Quick Command Reference

```bash
npm install    # Install dependencies (do this once)
npm test       # Test if everything works
npm start      # Run the bot
Ctrl+C         # Stop the bot
```

That's all you need to know! 🎉

---

## Next Steps

- **[Try Different Strategies](STRATEGY_GUIDE.md)** - 5+ pre-built strategies
- **[Learn About Indicators](INDICATORS_GUIDE.md)** - Understand the tools
- **[Build Custom Strategy](CUSTOM_STRATEGIES.md)** - Create your own
- **[Deploy to Production](DEPLOYMENT.md)** - Run 24/7
- **[Browse All Docs](NAVIGATION.md)** - Complete documentation

---

[Back to Navigation](NAVIGATION.md) | [Main README](../README.md)
