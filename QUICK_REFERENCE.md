# TradeRiser Quick Reference

## 🚀 Essential Commands

```bash
npm install              # Install dependencies
npm test                 # Test bot setup
npm start                # Run the bot
npm run check-deps       # Check for missing dependencies
npm run install-deps -- --auto  # Auto-install missing packages
```

## 📚 Documentation Quick Links

| Topic | Link |
|-------|------|
| **Setup** | [Getting Started](docs/GETTING_STARTED.md) |
| **Strategies** | [Strategy Guide](docs/STRATEGY_GUIDE.md) |
| **Custom Code** | [Custom Strategies](docs/CUSTOM_STRATEGIES.md) |
| **Indicators** | [Indicators Guide](docs/INDICATORS_GUIDE.md) |
| **Libraries** | [External Libraries](docs/EXTERNAL_LIBRARIES.md) |
| **API Docs** | [API Reference](docs/API_REFERENCE.md) |
| **Help** | [Troubleshooting](docs/TROUBLESHOOTING.md) |
| **All Docs** | [Navigation](docs/NAVIGATION.md) |

## ⚙️ Configuration Files

| File | Purpose |
|------|---------|
| `.env` | API keys and settings |
| `src/config.js` | Trading symbols, intervals |
| `src/strategy.js` | Your trading strategy |

## 🎯 Quick Customization

### Change Take Profit / Stop Loss
```javascript
// In src/strategy.js (lines 40-41)
this.takeProfitPercent = 3.0;   // 3% profit
this.stopLossPercent = 1.5;     // 1.5% loss
```

### Change Moving Averages
```javascript
// In src/strategy.js (lines 35-36)
this.shortWindow = 10;  // Fast MA
this.longWindow = 30;   // Slow MA
```

### Enable Filters
```javascript
// In src/strategy.js
this.useRSI = true;      // RSI filter
this.useVolume = true;   // Volume filter
this.useEMA = true;      // Use EMA instead of SMA
```

### Change Symbols
```javascript
// In src/config.js (line 13)
symbols: ['BTC/USD', 'ETH/USD', 'LTC/USD']
```

## 🔧 Common Tasks

### Add External Library

1. Add import to `src/strategy.js`:
   ```javascript
   import { RSI } from 'technicalindicators';
   ```

2. Run bot (it will detect missing package):
   ```bash
   npm start
   ```

3. Install package:
   ```bash
   npm run install-deps -- --auto
   ```

### Try Different Strategy

1. Open [Strategy Guide](docs/STRATEGY_GUIDE.md)
2. Copy a strategy code
3. Paste into `src/strategy.js` (replace `analyze()` method)
4. Save and restart bot

### Fix "Cannot find module" Error

```bash
npm run check-deps              # See what's missing
npm run install-deps -- --auto  # Install everything
npm start                       # Try again
```

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| "npm: command not found" | Install Node.js from nodejs.org |
| "Authentication failed" | Check API keys in `.env` |
| Bot says "HOLD" always | Try simpler strategy or adjust parameters |
| "Cannot find module" | Run `npm run install-deps -- --auto` |
| Bot is slow | Reduce symbols or increase check interval |

**More help:** [Troubleshooting Guide](docs/TROUBLESHOOTING.md)

## 📊 Built-in Indicators

- ✅ SMA (Simple Moving Average)
- ✅ EMA (Exponential Moving Average)
- ✅ RSI (Relative Strength Index)
- ✅ MACD (Moving Average Convergence Divergence)
- ✅ Bollinger Bands
- ✅ ATR (Average True Range)

**Want more?** [External Libraries Guide](docs/EXTERNAL_LIBRARIES.md)

## 🎓 Learning Path

### Beginner
1. [Getting Started](docs/GETTING_STARTED.md) - Setup
2. [Strategy Explained](docs/STRATEGY_EXPLAINED.md) - Understand default
3. [Strategy Guide](docs/STRATEGY_GUIDE.md) - Try examples

### Intermediate
1. [Indicators Guide](docs/INDICATORS_GUIDE.md) - Learn indicators
2. [Custom Strategies](docs/CUSTOM_STRATEGIES.md) - Build your own
3. [External Libraries](docs/EXTERNAL_LIBRARIES.md) - Advanced features

### Advanced
1. [API Reference](docs/API_REFERENCE.md) - Complete API
2. [Dependency Management](docs/DEPENDENCY_MANAGEMENT.md) - Auto-install
3. [Deployment](docs/DEPLOYMENT.md) - Production setup

## 🔐 Safety Tips

- ✅ Start with paper trading (`ALPACA_PAPER=true`)
- ✅ Test for at least a week
- ✅ Start with small position sizes
- ✅ Never share API keys
- ✅ Monitor the bot regularly

## 📞 Get Help

1. **Check docs:** [Navigation](docs/NAVIGATION.md)
2. **Troubleshooting:** [Troubleshooting Guide](docs/TROUBLESHOOTING.md)
3. **Ask questions:** [GitHub Issues](https://github.com/yourusername/TradeRiser/issues)
4. **Community:** [GitHub Discussions](https://github.com/yourusername/TradeRiser/discussions)

## 🎉 What's New in v1.2.0

- ✅ **Automatic dependency detection** - Bot tells you what to install
- ✅ **Auto-install script** - One command to install everything
- ✅ **5 new guides** - External libraries, API reference, troubleshooting, etc.
- ✅ **Complete cross-linking** - Easy navigation between docs
- ✅ **10+ libraries documented** - With complete examples

**Details:** [What's New](docs/WHATS_NEW.md)

---

## 📖 Full Documentation

**[Complete Documentation Index](docs/NAVIGATION.md)**

---

**Happy Trading! 🚀**

[Main README](README.md) | [All Documentation](docs/NAVIGATION.md)
