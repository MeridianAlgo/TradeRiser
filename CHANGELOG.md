# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.1] - 2025-10-18

### Changed
- Removed emojis from output
- Cleaned directory structure
- Organized all documentation in docs folder
- Updated README with complete documentation links

### Fixed
- All CI/CD issues resolved
- Directory structure optimized

---

## [1.1.0-beta] - 2025-10-18

### Changed
- **Rebranded** from "crypto-trading-bot" to "TradeRiser"
- **Fixed** CI/CD pipeline to work without package-lock.json
- **Updated** all documentation with TradeRiser branding
- **Improved** GitHub Actions workflow for better compatibility

### Fixed
- CI/CD pipeline `npm ci` error - now uses `npm install`
- Missing `.env.example` file - now included
- Security check false positive - improved regex pattern
- Example API keys in documentation - changed to safe examples
- All repository URLs updated to TradeRiser
- Package name updated to `traderiser`

### Added
- `.env.example` file for easy setup
- Improved security checks in CI/CD
- Better secret detection patterns

---

## [1.0.0] - 2025-10-17

### 🎉 Initial Release

#### Added
- **Core Trading Bot**
  - MA Crossover strategy with TP/SL
  - Real-time price data from Alpaca API
  - Paper trading by default
  - One position at a time per symbol
  - Automatic Take Profit (3%) and Stop Loss (1.5%)
  
- **Indicators**
  - Simple Moving Average (SMA)
  - Exponential Moving Average (EMA)
  - Relative Strength Index (RSI)
  - MACD (Moving Average Convergence Divergence)
  - Bollinger Bands
  - ATR (Average True Range)
  - Volume Filter
  
- **Features**
  - Position tracking to prevent duplicate buys
  - Comprehensive error handling
  - Real-time console output
  - Configurable parameters
  - Multiple symbol support
  
- **Documentation**
  - Complete beginner's guide (GETTING_STARTED.md)
  - Strategy explanation (STRATEGY_EXPLAINED.md)
  - Strategy examples (STRATEGY_GUIDE.md)
  - Indicators guide (INDICATORS_GUIDE.md)
  - Files overview (FILES_OVERVIEW.md)
  - Quick start guide (QUICK_START.txt)
  - And 6 more comprehensive guides
  
- **GitHub Integration**
  - CI/CD pipeline (GitHub Actions)
  - Security scanning (CodeQL)
  - Issue templates (bug report, feature request)
  - Pull request template
  - Contributing guidelines
  - Security policy
  - MIT License
  
- **Project Structure**
  - Organized source code in `src/`
  - All documentation in `docs/`
  - GitHub config in `.github/`
  - Clean root directory

#### Fixed
- **Multiple Buy Issue** - Bot now properly tracks positions and only holds one position at a time per symbol
- **Position Management** - Improved position tracking across bot restarts
- **Error Handling** - Comprehensive error handling throughout the codebase

#### Security
- API keys stored in `.env` (not committed)
- Secure `.gitignore` configuration
- Security scanning via CodeQL
- Dependency vulnerability checks

---

## [Unreleased]

### Planned Features
- [ ] Backtesting functionality
- [ ] Web dashboard
- [ ] Support for more exchanges
- [ ] Machine learning strategies
- [ ] Portfolio rebalancing
- [ ] Advanced order types (limit, stop-limit)
- [ ] Trade history logging
- [ ] Performance analytics
- [ ] Email/SMS notifications
- [ ] Multi-timeframe analysis

---

## Version History

### Version 1.0.0 (2025-10-17)
- Initial public release
- Core trading functionality
- Complete documentation
- GitHub CI/CD integration

---

## How to Update

### From Source
```bash
cd TradeRiser
git pull origin main
npm install
npm test
```

### Breaking Changes
None yet - this is the initial release!

---

## Migration Guide

### Upgrading to 1.0.0
This is the initial release, no migration needed.

---

## Contributors

Thank you to all contributors who helped make this project possible!

- Initial development and documentation
- Strategy implementation
- Testing and bug fixes

---

## Support

For questions, issues, or feature requests:
- 📖 Read the [documentation](docs/)
- 🐛 [Report bugs](https://github.com/yourusername/TradeRiser/issues)
- 💡 [Request features](https://github.com/yourusername/TradeRiser/issues)
- 🤝 [Contribute](CONTRIBUTING.md)

---

**Note:** This project is for educational purposes. Always use paper trading first and never risk more than you can afford to lose.
