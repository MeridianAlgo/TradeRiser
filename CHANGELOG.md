# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.3] - 2025-10-19

### Fixed
- CI/CD pipeline now uses `npm install` instead of `npm ci` (no package-lock.json)
- Removed npm cache from GitHub Actions (not needed without lock file)
- Fixed all CI/CD job failures

---

## [1.3.2] - 2025-10-19

### Added
- Enhanced CI/CD pipeline with 8 comprehensive jobs
- Automated release process via GitHub Actions
- Release preparation script (scripts/prepare-release.sh)
- Comprehensive CI/CD documentation (docs/CI_CD_PIPELINE.md)
- Multi-platform testing (Ubuntu, Windows, macOS)
- Security scanning for exposed secrets
- Project structure validation
- Dependency checking automation

### Improved
- CI/CD pipeline now more robust and organized
- Better error messages and status reporting
- Automated GitHub releases on version tags
- Cross-platform compatibility testing
- Security checks for API keys and private keys

### Changed
- Updated CI workflow to use latest GitHub Actions (v4)
- Improved test matrix (Node 18.x and 20.x)
- Enhanced security scanning
- Better documentation organization

---

## [1.3.1] - 2025-10-19

### Changed
- Removed all emojis from source code files (src/*.js)
- Cleaner console output
- Professional appearance

---

## [1.3.0] - 2025-10-19

### Major Update: Single Symbol Trading & Initialization Period

### Added
- **Single Symbol Trading** - Bot now trades one symbol at a time (configurable)
  - Set via environment variable: `TRADING_SYMBOL=ETH/USD`
  - Or directly in `src/config.js`
  - Supports crypto (BTC/USD, ETH/USD, etc.) and stocks (AAPL, TSLA, etc.)
  
- **Initialization Period** - Bot collects data before trading
  - Configurable initialization period (default: 2 checks)
  - Prevents false signals on startup
  - Clear console messages showing initialization progress
  - Only starts trading after collecting baseline data
  
- **Global Variables System** - Access market data anywhere
  - `globals.currentPrice` - Latest price
  - `globals.currentBars` - Historical bars
  - `globals.currentPosition` - Current position
  - `globals.isInitialized` - Initialization status
  - `globals.getLatestPrice()` - Helper function
  - Real-time data support (WebSocket ready)
  
- **New Documentation**
  - [GLOBAL_VARIABLES.md](docs/GLOBAL_VARIABLES.md) - Complete guide to global variables and real-time data
  - WebSocket integration examples
  - Real-time data fetching guide
  - Configuration reference

### Changed
- **Single symbol focus** - Removed multi-symbol trading for simplicity
- **Enhanced console output** - Shows initialization progress and status
- **Improved configuration** - Clearer structure with comments
- **Better data management** - Global variables for easy access
- **.env.example** - Added TRADING_SYMBOL configuration

### Improved
- More accurate trading (waits for initialization)
- Clearer bot status messages
- Easier to customize (change symbol in .env)
- Better for beginners (single symbol is simpler)
- Ready for real-time data (WebSocket support)

---

## [1.2.1] - 2025-10-19

### 🐛 Critical Fix: True Crossover Detection

### Fixed
- **CRITICAL:** Fixed MA crossover logic to detect actual crossovers, not just "above"
  - Previous behavior: Bot would buy whenever Short MA > Long MA (even if already above)
  - New behavior: Bot only buys when Short MA crosses from below to above Long MA
  - Added previous MA value tracking per symbol
  - First run now collects data before trading (prevents immediate false signals)
  - Clear console messages show crossover status:
    - "Collecting data..." on first run
    - "CROSSOVER DETECTED!" when actual crossover happens
    - "Short MA is above Long MA, but no crossover (already above)" when already above
    - "Waiting for crossover" when still below

### Changed
- Strategy now requires one iteration to collect baseline data before trading
- More detailed console output showing previous vs current MA values
- Updated strategy header comments to clarify crossover detection

---

## [1.2.0] - 2025-10-19

### 🚀 Major Update: Automatic Dependency Management & Enhanced Documentation

### Added
- **Automatic Dependency Detection**
  - Bot now automatically detects missing packages when you use external libraries
  - Shows clear error messages with install commands
  - New `npm run check-deps` command to check dependencies
  - New `npm run install-deps -- --auto` command to auto-install missing packages
  
- **Auto-Install Script** (`scripts/install-strategy-deps.js`)
  - Automatically scans strategy.js for imports
  - Detects both ES6 imports and require() statements
  - Installs missing packages with one command
  - Supports scoped packages (@org/package)
  
- **New Documentation**
  - **[NAVIGATION.md](docs/NAVIGATION.md)** - Complete documentation index with quick links
  - **[EXTERNAL_LIBRARIES.md](docs/EXTERNAL_LIBRARIES.md)** - Comprehensive guide to 10+ popular libraries
    - Technical analysis libraries (technicalindicators, tulind, ta-lib)
    - Machine learning libraries (TensorFlow.js, brain.js)
    - Data processing libraries (lodash, mathjs, simple-statistics)
    - External data sources (axios, WebSocket)
    - Complete examples for each library
  - **[API_REFERENCE.md](docs/API_REFERENCE.md)** - Complete API documentation
    - All Strategy class methods documented
    - Data structure definitions
    - TypeScript-style type definitions
    - Complete code examples
  - **[TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)** - Comprehensive troubleshooting guide
    - Installation issues
    - API & authentication issues
    - Strategy issues
    - Dependency issues
    - Performance issues
    - Runtime errors
    - Quick fixes checklist

### Enhanced
- **Enhanced Dependency Checker** (`scripts/check-dependencies.js`)
  - Better error messages with emojis
  - Detects both ES6 imports and require()
  - Handles scoped packages correctly
  - Shows clear installation instructions
  - Suggests auto-install option
  
- **Documentation Cross-Linking**
  - All documentation files now have "Quick Links" section at the top
  - Every guide links to related guides
  - Navigation.md provides central hub for all docs
  - README.md organized by user level (Beginner/Intermediate/Advanced)
  - Consistent navigation footer on all docs
  
- **Improved Documentation Organization**
  - [GETTING_STARTED.md](docs/GETTING_STARTED.md) - Added links to all related guides
  - [CUSTOM_STRATEGIES.md](docs/CUSTOM_STRATEGIES.md) - Enhanced with auto-install instructions
  - [INDICATORS_GUIDE.md](docs/INDICATORS_GUIDE.md) - Added links to external libraries
  - [README.md](README.md) - Reorganized with clear sections for different user levels

### Changed
- **package.json**
  - Added `install-deps` script for automatic dependency installation
  - Updated `prestart` hook to check dependencies before running
  
- **README.md**
  - Reorganized documentation section by user level
  - Added comprehensive feature list with checkmarks
  - Highlighted automatic dependency management
  - Added links to all new documentation

### Fixed
- Dependency detection now handles scoped packages (@org/package)
- Better error handling in dependency scripts
- Improved cross-platform compatibility

---

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
