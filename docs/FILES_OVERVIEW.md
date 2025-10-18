# 📁 Files Overview - What Each File Does

## 🎯 Files You Should Edit

### `strategy.js` ⭐ MAIN FILE TO CUSTOMIZE
**What it does:** Contains YOUR trading strategy logic  
**When to edit:** When you want to change how the bot trades  
**Difficulty:** Easy - heavily commented with examples  
**Key sections:**
- Lines 35-50: Strategy parameters (easy to change numbers!)
- Lines 60-120: Your buy/sell logic (the `analyze()` function)
- Lines 130+: Helper functions you can use

**Quick tip:** Just change the numbers in lines 42-45 to customize!

---

### `.env` ⭐ YOUR API KEYS
**What it does:** Stores your Alpaca API credentials  
**When to edit:** Once during setup  
**Difficulty:** Super easy - just copy/paste your keys  
**Format:**
```
ALPACA_API_KEY=your_key_here
ALPACA_API_SECRET=your_secret_here
ALPACA_PAPER=true
```

**⚠️ IMPORTANT:** Never share this file or commit it to git!

---

### `config.js` - Bot Settings
**What it does:** Configure which cryptos to trade and how often  
**When to edit:** To change symbols or check interval  
**Difficulty:** Easy  
**What you can change:**
- `symbols`: Which cryptos to trade (line 13)
- `checkInterval`: How often to check prices (line 14)

**Example:**
```javascript
symbols: ['BTC/USD', 'ETH/USD', 'LTC/USD'],  // Add more cryptos
checkInterval: 30000,  // Check every 30 seconds instead of 60
```

---

## 📚 Documentation Files (Read These!)

### `GETTING_STARTED.md` ⭐ START HERE!
**For:** Complete beginners  
**Contains:** Step-by-step setup instructions  
**Read if:** You've never done this before  
**Time:** 10 minutes

### `STRATEGY_GUIDE.md` ⭐ STRATEGY EXAMPLES
**For:** Everyone!  
**Contains:** 5+ ready-to-use strategies with full code  
**Read if:** You want to customize your strategy  
**Time:** 15 minutes  
**Includes:**
- Simple Price Threshold
- RSI Overbought/Oversold
- Take Profit / Stop Loss
- Buy the Dip
- Trend Following

### `README.md` - Quick Reference
**For:** Quick overview  
**Contains:** Installation, basic usage, features  
**Read if:** You want a quick summary

### `SUMMARY.md` - Technical Details
**For:** Technical users  
**Contains:** Test results, architecture, features  
**Read if:** You want to understand how it works

### `QUICK_START.txt` - Visual Quick Start
**For:** Visual learners  
**Contains:** ASCII art guide with commands  
**Read if:** You want a visual reference

---

## 🔧 Core Bot Files (Don't Need to Edit!)

### `index.js` - Main Bot Orchestrator
**What it does:** Runs the main loop, coordinates everything  
**When to edit:** Rarely (only for advanced customization)  
**Key functions:**
- Initializes the bot
- Runs the 60-second check loop
- Calls your strategy
- Executes trades

### `broker.js` - Alpaca API Integration
**What it does:** Talks to Alpaca API to get prices and place orders  
**When to edit:** Rarely (only if changing data source)  
**Key functions:**
- `getLatestPrice()` - Gets current price
- `getBars()` - Gets historical data
- `buy()` / `sell()` - Places orders
- `getPosition()` - Checks your holdings

### `portfolio.js` - Portfolio Management
**What it does:** Manages your account balance and positions  
**When to edit:** Rarely  
**Key functions:**
- `update()` - Refreshes account data
- `getBalance()` - Gets your cash/equity
- `getPosition()` - Gets position for a symbol
- `calculatePositionSize()` - Calculates how much to buy

### `test.js` - Test Suite
**What it does:** Tests that everything works  
**When to edit:** Never  
**How to use:** Run `npm test`

---

## 📦 Configuration Files

### `package.json` - Dependencies
**What it does:** Lists required npm packages  
**When to edit:** Never (unless adding new features)  
**Contains:**
- Project name and version
- Dependencies (Alpaca API, dotenv)
- Scripts (start, test)

### `.gitignore` - Git Ignore Rules
**What it does:** Tells git which files to ignore  
**When to edit:** Never  
**Protects:** Your `.env` file from being committed

### `.env.example` - Example Environment File
**What it does:** Shows what `.env` should look like  
**When to edit:** Never  
**Use:** As a template for your `.env` file

---

## 📊 Quick File Priority

### Must Edit:
1. ✅ `.env` - Add your API keys (once)
2. ✅ `strategy.js` - Your trading logic (customize anytime)

### Might Edit:
3. 📝 `config.js` - Change symbols or interval (optional)

### Just Read:
4. 📖 `GETTING_STARTED.md` - Setup guide
5. 📖 `STRATEGY_GUIDE.md` - Strategy examples
6. 📖 `README.md` - Quick reference

### Don't Touch:
7. 🔒 `index.js` - Main bot
8. 🔒 `broker.js` - API integration
9. 🔒 `portfolio.js` - Portfolio management
10. 🔒 `test.js` - Tests
11. 🔒 `package.json` - Dependencies
12. 🔒 `.gitignore` - Git rules

---

## 🎯 Common Tasks → Which File to Edit

| Task | File to Edit | Line Number |
|------|-------------|-------------|
| Change buy/sell logic | `strategy.js` | 60-120 |
| Change MA periods | `strategy.js` | 42-43 |
| Change position size | `strategy.js` | 45 |
| Add/remove cryptos | `config.js` | 13 |
| Change check interval | `config.js` | 14 |
| Add API keys | `.env` | 1-3 |

---

## 💡 Pro Tips

### For Non-Coders:
- **Only edit `strategy.js`** - that's all you need!
- **Start by changing numbers** in lines 42-45
- **Copy strategies** from `STRATEGY_GUIDE.md`
- **Don't touch** the other files

### For Coders:
- `strategy.js` - Your strategy logic
- `index.js` - Main loop and orchestration
- `broker.js` - API calls and data fetching
- `portfolio.js` - Account management
- All files have comprehensive error handling

### For Everyone:
- **Read `GETTING_STARTED.md` first**
- **Use `STRATEGY_GUIDE.md` for examples**
- **Run `npm test` before starting**
- **Keep `.env` secret!**

---

## 🆘 Troubleshooting by File

### Bot won't start?
→ Check `.env` file (API keys correct?)

### Strategy not working?
→ Check `strategy.js` (syntax errors? logic correct?)

### Want different cryptos?
→ Edit `config.js` (symbols array)

### Need help?
→ Read `GETTING_STARTED.md` (troubleshooting section)

---

**Remember:** You only need to edit `strategy.js` to customize your trading! Everything else works automatically. 🎉
