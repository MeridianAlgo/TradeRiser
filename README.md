# 🚀 TradeRiser
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org)

**TradeRiser** - A modular cryptocurrency trading bot that's easy to customize - even for non-coders!

✅ Uses **REAL LIVE PRICES** from Alpaca  
✅ **Paper trading** by default (safe testing)  
✅ **Comprehensive error handling**  
✅ **Easy strategy customization** - just edit one file!  
✅ **One position at a time** - no duplicate buys!

---

## 📖 Quick Links

- 🚀 **[Quick Start Guide](docs/GETTING_STARTED.md)** - Get started in 5 minutes
- 📊 **[Strategy Guide](docs/STRATEGY_GUIDE.md)** - 5+ ready-to-use strategies
- 🔧 **[Deployment Guide](docs/DEPLOYMENT.md)** - Deploy to production
- 📚 **[Full Documentation](docs/START_HERE.md)** - Complete documentation index
- 🤝 **[Contributing](CONTRIBUTING.md)** - How to contribute
- 🔒 **[Security Policy](SECURITY.md)** - Security guidelines
- 📝 **[Changelog](CHANGELOG.md)** - Version history

---

## 🚀 Quick Start (5 Minutes!)

### 1. Clone & Install
```bash
git clone https://github.com/MeridianAlgo/TradeRiser.git
cd TradeRiser
npm install
```

### 2. Configure API Keys
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your Alpaca API keys
# Get free keys at: https://alpaca.markets
```

Your `.env` file should look like:
```env
ALPACA_API_KEY=your_key_here
ALPACA_API_SECRET=your_secret_here
ALPACA_PAPER=true
```

### 3. Test Everything
```bash
npm test
```

### 4. Run the Bot!
```bash
npm start
```

### 5. Customize Your Strategy
```bash
# Open src/strategy.js in your editor
# Change lines 40-41 for TP/SL
# Change lines 35-36 for MA periods
```

---

## 📊 Current Strategy

**MA Crossover + Take Profit/Stop Loss**

- **Entry:** Buy when Short MA (10) crosses above Long MA (30)
- **Exit:** Sell at Take Profit (3%) OR Stop Loss (1.5%)
- **Position:** ONE at a time per symbol (no duplicate buys!)
- **Risk Management:** Built-in TP/SL for every trade

---

## 🎯 Features

### Core Features
- ✅ Real-time price data from Alpaca API
- ✅ Paper trading by default (safe!)
- ✅ One position at a time per symbol
- ✅ Automatic Take Profit & Stop Loss
- ✅ Comprehensive error handling
- ✅ Easy to customize

### Available Indicators
- ✅ SMA (Simple Moving Average)
- ✅ EMA (Exponential Moving Average)
- ✅ RSI (Relative Strength Index)
- ✅ MACD (Moving Average Convergence Divergence)
- ✅ Bollinger Bands
- ✅ ATR (Average True Range)
- ✅ Volume Filter

### Optional Filters
- 📊 RSI Filter (prevents overbought entries)
- 📊 Volume Filter (only buys on high volume)
- 📊 EMA Option (faster than SMA)

---

## 📁 Project Structure

```
TradeRiser/
├── src/                    # Source code
│   ├── index.js           # Main entry point
│   ├── broker.js          # Alpaca API integration
│   ├── portfolio.js       # Portfolio management
│   ├── strategy.js        # Trading strategy ⭐ CUSTOMIZE THIS!
│   ├── config.js          # Configuration
│   └── test.js            # Test suite
├── docs/                   # Documentation
│   ├── START_HERE.md      # Main entry point
│   ├── GETTING_STARTED.md # Complete beginner guide
│   ├── STRATEGY_GUIDE.md  # Strategy examples
│   ├── INDICATORS_GUIDE.md # All indicators explained
│   └── ...                # More guides
├── .github/                # GitHub workflows & templates
├── .env.example            # Environment variables template
├── .gitignore             # Git ignore rules
├── package.json           # Dependencies
├── LICENSE                # MIT License
├── CONTRIBUTING.md        # Contribution guidelines
├── SECURITY.md            # Security policy
└── README.md              # This file
```

---

## 🎨 Easy Customization

### Quick Edits (No Coding Required!)

#### 1. Change Take Profit / Stop Loss
```bash
# Open src/strategy.js
# Find lines 40-41
```
```javascript
this.takeProfitPercent = 3.0;   // Change to 5.0 for 5% profit
this.stopLossPercent = 1.5;     // Change to 2.0 for 2% stop loss
```

#### 2. Change Moving Average Periods
```bash
# Open src/strategy.js
# Find lines 35-36
```
```javascript
this.shortWindow = 10;  // Change to 5 for faster signals
this.longWindow = 30;   // Change to 50 for slower signals
```

#### 3. Change Position Size
```bash
# Open src/strategy.js
# Find line 63
```
```javascript
this.positionSizePercent = 0.1;  // 0.1 = 10%, 0.2 = 20%, etc.
```

#### 4. Change Trading Symbols
```bash
# Open src/config.js
# Find line 13
```
```javascript
symbols: ['BTC/USD', 'ETH/USD', 'LTC/USD']  // Add or remove
```

#### 5. Change Check Interval
```bash
# Open src/config.js
# Find line 14
```
```javascript
checkInterval: 60000  // 60000 = 1 minute, 30000 = 30 seconds
```

### Advanced Customization

#### Enable RSI Filter
```bash
# Open src/strategy.js, line 52
```
```javascript
this.useRSI = true;  // Prevents buying when overbought
```

#### Enable Volume Filter
```bash
# Open src/strategy.js, line 57
```
```javascript
this.useVolume = true;  // Only buys on high volume
```

#### Use EMA Instead of SMA
```bash
# Open src/strategy.js, line 60
```
```javascript
this.useEMA = true;  // Faster signals than SMA
```

### After Making Changes
```bash
# Always test after changes
npm test

# Then restart the bot
npm start
```

---

## 📚 Documentation

### 🎯 Getting Started
- **[START_HERE.md](docs/START_HERE.md)** ⭐ - Main entry point, choose your path
- **[GETTING_STARTED.md](docs/GETTING_STARTED.md)** - Complete beginner's setup guide
- **[QUICK_START.txt](docs/QUICK_START.txt)** - Visual quick reference card

### 📊 Strategy & Trading
- **[STRATEGY_EXPLAINED.md](docs/STRATEGY_EXPLAINED.md)** - How the current strategy works
- **[STRATEGY_GUIDE.md](docs/STRATEGY_GUIDE.md)** - 5+ ready-to-use strategy examples
- **[INDICATORS_GUIDE.md](docs/INDICATORS_GUIDE.md)** - All 6 indicators explained

### 🔧 Technical Documentation
- **[DIRECTORY_STRUCTURE.md](docs/DIRECTORY_STRUCTURE.md)** - Clean directory layout
- **[FILES_OVERVIEW.md](docs/FILES_OVERVIEW.md)** - What each file does
- **[PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md)** - Complete project structure
- **[SUMMARY.md](docs/SUMMARY.md)** - Technical details & test results

### 🚀 Deployment & Updates
- **[DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Complete deployment guide
- **[DEPLOY_NOW.txt](docs/DEPLOY_NOW.txt)** - Quick deploy commands
- **[WHATS_NEW.md](docs/WHATS_NEW.md)** - Latest updates & changes
- **[FIXES_AND_IMPROVEMENTS.md](docs/FIXES_AND_IMPROVEMENTS.md)** - What's been fixed
- **[CI_FIXES_v2.md](docs/CI_FIXES_v2.md)** - CI/CD fixes documentation

### 📖 Complete Index
- **[DOCUMENTATION_INDEX.md](docs/DOCUMENTATION_INDEX.md)** - Complete documentation index
- **[FINAL_SUMMARY.md](docs/FINAL_SUMMARY.md)** - Comprehensive project summary

---

## ⚙️ Configuration

### Trading Symbols
Edit `src/config.js`:
```javascript
symbols: ['BTC/USD', 'ETH/USD']  // Add or remove symbols
```

### Check Interval
```javascript
checkInterval: 60000  // 60 seconds (change to 30000 for 30 sec)
```

### Position Size
Edit `src/strategy.js`:
```javascript
this.positionSizePercent = 0.1;  // 10% of buying power per trade
```

---

## 🧪 Testing & Commands

### Essential Commands
```bash
# Install dependencies
npm install

# Run the bot
npm start

# Run tests
npm test

# Check for security vulnerabilities
npm audit

# Fix security issues (if any)
npm audit fix
```

### Development Commands
```bash
# Check code style (placeholder)
npm run lint

# Format code (placeholder)
npm run format

# View project structure
tree -L 2 -I node_modules  # Linux/Mac
# or
dir /s /b | findstr /v node_modules  # Windows
```

### File Locations
```bash
# Edit strategy
code src/strategy.js
# or
nano src/strategy.js

# Edit configuration
code src/config.js

# View documentation
cd docs/
ls  # or dir on Windows

# View logs (if bot is running)
# Console output shows all activity
```

---

## 🛡️ Security

- ✅ Paper trading by default
- ✅ API keys in `.env` (not committed)
- ✅ Comprehensive error handling
- ✅ One position at a time
- ✅ Built-in TP/SL protection

See [SECURITY.md](SECURITY.md) for more details.

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

### Quick Contribution Guide:
1. Fork the repo
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## ⚠️ Disclaimer

**This software is for educational purposes only.**

- Cryptocurrency trading carries significant risk
- Past performance does not guarantee future results
- Only trade with money you can afford to lose
- Always start with paper trading
- The authors are not responsible for any financial losses

---

## 🎯 Roadmap

- [ ] Add more strategy templates
- [ ] Implement backtesting
- [ ] Add web dashboard
- [ ] Support more exchanges
- [ ] Add machine learning strategies
- [ ] Implement portfolio rebalancing

---

## 🔧 Troubleshooting

### Common Issues

#### "Cannot find module" error
```bash
# Make sure you're in the project root
cd TradeRiser

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### "API key not found" error
```bash
# Check your .env file exists in project root
ls -la .env  # Linux/Mac
dir .env     # Windows

# Make sure it has your keys
cat .env     # Linux/Mac
type .env    # Windows
```

#### Bot keeps buying multiple times
This has been fixed! Make sure you have the latest version:
```bash
git pull origin main
npm install
```

#### Tests failing
```bash
# Check Node version (needs 16+)
node --version

# Update dependencies
npm install

# Check .env file
cat .env
```

### Getting Help

- 📖 Read the [documentation](docs/)
- 🐛 Report bugs via [GitHub Issues](https://github.com/MeridianAlgo/TradeRiser/issues)
- 💡 Request features via [GitHub Issues](https://github.com/MeridianAlgo/TradeRiser/issues)
- 🤝 Contribute via [Pull Requests](https://github.com/MeridianAlgo/TradeRiser/pulls)
- 📧 Security issues: See [SECURITY.md](SECURITY.md)

---

## 🌟 Star History

If you find this project useful, please consider giving it a star! ⭐

---

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/MeridianAlgo/TradeRiser?style=social)
![GitHub forks](https://img.shields.io/github/forks/MeridianAlgo/TradeRiser?style=social)
![GitHub issues](https://img.shields.io/github/issues/MeridianAlgo/TradeRiser)
![GitHub pull requests](https://img.shields.io/github/issues-pr/MeridianAlgo/TradeRiser)

---

**Happy Trading! 🚀**

Made with ❤️ by the community
