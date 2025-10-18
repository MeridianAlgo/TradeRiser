# Contributing to TradeRiser

First off, thank you for considering contributing to TradeRiser! 🎉

## Code of Conduct

This project and everyone participating in it is governed by our commitment to providing a welcoming and inspiring community for all.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if relevant**
- **Include your environment details** (OS, Node version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any alternative solutions you've considered**

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code, add tests
3. Ensure the test suite passes (`npm test`)
4. Make sure your code follows the existing style
5. Write a clear commit message
6. Open a pull request!

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/TradeRiser.git
   cd TradeRiser
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Add your Alpaca API keys
   ```

4. **Run tests**
   ```bash
   npm test
   ```

5. **Start the bot**
   ```bash
   npm start
   ```

## Project Structure

```
TradeRiser/
├── src/              # Source code
│   ├── index.js      # Main entry point
│   ├── broker.js     # Alpaca API integration
│   ├── portfolio.js  # Portfolio management
│   ├── strategy.js   # Trading strategy
│   ├── config.js     # Configuration
│   └── test.js       # Test suite
├── docs/             # Documentation
├── .github/          # GitHub workflows
├── .env              # Environment variables (not committed)
├── .gitignore        # Git ignore rules
├── package.json      # Dependencies
├── LICENSE           # MIT License
└── README.md         # Main documentation
```

## Coding Guidelines

### JavaScript Style

- Use ES6+ features
- Use `const` and `let`, avoid `var`
- Use arrow functions where appropriate
- Add comments for complex logic
- Keep functions small and focused
- Use meaningful variable names

### Example:

```javascript
// Good
const calculateSMA = (prices, window) => {
  const slice = prices.slice(-window);
  return slice.reduce((a, b) => a + b, 0) / slice.length;
};

// Avoid
function calc(p, w) {
  var s = p.slice(-w);
  var sum = 0;
  for (var i = 0; i < s.length; i++) {
    sum += s[i];
  }
  return sum / s.length;
}
```

### Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters
- Reference issues and pull requests after the first line

### Example:

```
Add RSI indicator filter

- Implement RSI calculation
- Add configuration options
- Update documentation
- Add tests

Fixes #123
```

## Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Test with paper trading before suggesting live trading features
- Include edge cases in tests

## Documentation

- Update README.md if you change functionality
- Add comments to complex code
- Update relevant docs in `/docs` folder
- Include examples for new features

## Strategy Contributions

If you're contributing a new trading strategy:

1. Create a new file in `src/strategies/`
2. Follow the existing strategy interface
3. Include comprehensive comments
4. Add documentation in `docs/`
5. Test thoroughly with paper trading
6. Include risk warnings

## Security

- Never commit API keys or secrets
- Use environment variables for sensitive data
- Report security vulnerabilities privately
- See SECURITY.md for details

## Questions?

Feel free to open an issue with the `question` label!

## Recognition

Contributors will be recognized in the README.md file.

Thank you for contributing! 🚀
