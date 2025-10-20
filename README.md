# TradeRiser

[![CI/CD Pipeline](https://github.com/yourusername/TradeRiser/workflows/CI/CD%20Pipeline/badge.svg)](https://github.com/yourusername/TradeRiser/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org)
[![Version](https://img.shields.io/badge/version-1.3.6-blue.svg)](https://github.com/yourusername/TradeRiser/releases)

**TradeRiser v1.3.0** - A modular cryptocurrency trading bot using Alpaca API with MA Crossover + TP/SL strategy.

**NEW in v1.3.0:** Single symbol trading, initialization period, and global variables for easy customization!

## Features

### 🎯 v1.3.0 New Features
- ✅ **Single symbol trading** - Trade one asset at a time (BTC/USD, ETH/USD, AAPL, etc.)
- ✅ **Initialization period** - Collects data before trading (prevents false signals)
- ✅ **Global variables** - Access market data anywhere in your code
- ✅ **Easy configuration** - Change symbol via .env file
- ✅ **True crossover detection** - Only buys on actual MA crossovers

### Core Features
- ✅ Real-time price data from Alpaca API
- ✅ Paper trading by default (safe testing)
- ✅ One position at a time (prevents multiple buys)
- ✅ Automatic Take Profit (3%) and Stop Loss (1.5%)
- ✅ 6 built-in technical indicators (SMA, EMA, RSI, MACD, Bollinger Bands, ATR)
- ✅ **Automatic dependency detection** - Bot tells you what to install!
- ✅ **Auto-install missing packages** - One command to install everything
- ✅ Comprehensive error handling
- ✅ Easy to customize - 5+ pre-built strategies included
- ✅ Support for external libraries (50+ indicators available)
- ✅ Complete documentation with examples
- ✅ WebSocket support ready (real-time data)

## Quick Start

📋 **[Quick Reference Card](QUICK_REFERENCE.md)** - Essential commands and links

### Installation

```bash
git clone https://github.com/yourusername/TradeRiser.git
cd TradeRiser
npm install
```

### Configuration

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` and add your Alpaca API keys:
```env
ALPACA_API_KEY=your_key_here
ALPACA_API_SECRET=your_secret_here
ALPACA_PAPER=true

# Choose what to trade (change this!)
TRADING_SYMBOL=BTC/USD
```

**Supported symbols:**
- Crypto: `BTC/USD`, `ETH/USD`, `LTC/USD`, `DOGE/USD`, `SOL/USD`
- Stocks: `AAPL`, `TSLA`, `GOOGL`, `MSFT`, `AMZN`

Get free API keys at: https://alpaca.markets

### Testing

```bash
npm test
```

### Running

```bash
npm start
```

## Strategy

**MA Crossover + Take Profit/Stop Loss (v1.3.0)**

- **Initialization:** Collects 2 data points before trading (prevents false signals)
- **Entry:** Buy when 10-period MA crosses above 30-period MA (actual crossover, not just "above")
- **Exit:** Sell at Take Profit (3%) OR Stop Loss (1.5%)
- **Position:** One at a time (single symbol trading)
- **Symbol:** Configurable via .env file (default: BTC/USD)

## Customization

### Change Take Profit / Stop Loss

Edit `src/strategy.js` lines 40-41:

```javascript
this.takeProfitPercent = 3.0;   // Change to 5.0 for 5%
this.stopLossPercent = 1.5;     // Change to 2.0 for 2%
```

### Change Moving Average Periods

Edit `src/strategy.js` lines 35-36:

```javascript
this.shortWindow = 10;  // Change to 5 for faster signals
this.longWindow = 30;   // Change to 50 for slower signals
```

### Enable Additional Filters

Edit `src/strategy.js`:

```javascript
this.useRSI = true;      // Line 52 - RSI filter
this.useVolume = true;   // Line 57 - Volume filter
this.useEMA = true;      // Line 60 - Use EMA instead of SMA
```

### Change Trading Symbol

**Method 1: Environment Variable (Recommended)**

Edit `.env` file:
```env
TRADING_SYMBOL=ETH/USD
```

**Method 2: Direct in config**

Edit `src/config.js`:
```javascript
symbol: 'ETH/USD',  // Change this
```

**Supported symbols:** BTC/USD, ETH/USD, LTC/USD, DOGE/USD, SOL/USD, AAPL, TSLA, etc.

## Documentation

### 📚 [Complete Documentation Index](docs/NAVIGATION.md)

### 🎉 [What's New in v1.2.0](docs/WHATS_NEW.md)
- Automatic dependency detection & installation
- 5 new comprehensive guides
- Complete cross-linking between all docs
- 10+ external libraries documented

### For Beginners
- **[Getting Started Guide](docs/GETTING_STARTED.md)** - Complete setup instructions (start here!)
- **[Strategy Explained](docs/STRATEGY_EXPLAINED.md)** - How the default strategy works
- **[Indicators Guide](docs/INDICATORS_GUIDE.md)** - All 6 built-in indicators explained

### For Intermediate Users
- **[Strategy Guide](docs/STRATEGY_GUIDE.md)** - 5+ pre-built strategies to copy/paste
- **[Custom Strategies](docs/CUSTOM_STRATEGIES.md)** - Build your own strategy
- **[External Libraries](docs/EXTERNAL_LIBRARIES.md)** - Use 50+ advanced indicators

### For Advanced Users
- **[API Reference](docs/API_REFERENCE.md)** - Complete API documentation
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Production deployment (VPS, Docker, PM2)
- **[Troubleshooting](docs/TROUBLESHOOTING.md)** - Common issues and solutions

### Project Information
- **[Directory Structure](docs/DIRECTORY_STRUCTURE.md)** - Project organization
- **[Technical Summary](docs/SUMMARY.md)** - Technical details
- **[Contributing](CONTRIBUTING.md)** - How to contribute
- **[Security](SECURITY.md)** - Security best practices
- **[Changelog](CHANGELOG.md)** - Version history

## Project Structure

```
TradeRiser/
├── src/              # Source code
│   ├── index.js     # Main bot
│   ├── broker.js    # Alpaca API
│   ├── strategy.js  # Trading strategy (customize this!)
│   ├── portfolio.js # Portfolio management
│   └── config.js    # Configuration
├── docs/            # Documentation
├── .github/         # CI/CD workflows
└── README.md        # This file
```

## Available Indicators

- Simple Moving Average (SMA)
- Exponential Moving Average (EMA)
- Relative Strength Index (RSI)
- MACD
- Bollinger Bands
- ATR (Average True Range)
- Volume Filter

## Commands

```bash
npm install    # Install dependencies
npm test       # Run tests
npm start      # Start the bot
npm audit      # Security check
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## Security

See [SECURITY.md](SECURITY.md) for security policy and reporting vulnerabilities.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Disclaimer

This software is for educational purposes only. Cryptocurrency trading carries significant risk. Only trade with money you can afford to lose. Always start with paper trading. The authors are not responsible for any financial losses.

## Support

- **[Documentation Index](docs/NAVIGATION.md)** - All documentation
- **[Troubleshooting Guide](docs/TROUBLESHOOTING.md)** - Common issues
- **[GitHub Issues](https://github.com/yourusername/TradeRiser/issues)** - Ask questions
- **[GitHub Discussions](https://github.com/yourusername/TradeRiser/discussions)** - Community help
- **[Security Policy](SECURITY.md)** - Report vulnerabilities
