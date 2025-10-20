# 📦 Dependency Management Guide

Automatic dependency detection and installation for custom strategies.

## Quick Links
- [Main README](../README.md)
- [Custom Strategies](CUSTOM_STRATEGIES.md)
- [External Libraries](EXTERNAL_LIBRARIES.md)
- [Troubleshooting](TROUBLESHOOTING.md)
- [Navigation](NAVIGATION.md)

---

## Overview

TradeRiser automatically detects when your custom strategy needs external packages and helps you install them!

---

## How It Works

### 1. Add External Library to Your Strategy

```javascript
// In src/strategy.js
import { RSI, MACD, BollingerBands } from 'technicalindicators';

class Strategy {
  async analyze(data) {
    const { bars } = data;
    const prices = bars.map(b => parseFloat(b.c));
    
    const rsi = RSI.calculate({ values: prices, period: 14 });
    
    if (rsi[rsi.length - 1] < 30) {
      return 'BUY';
    }
    
    return 'HOLD';
  }
}
```

### 2. Run the Bot

```bash
npm start
```

### 3. Bot Detects Missing Package

```
🔍 Checking strategy dependencies...

📦 External dependencies found:
   - technicalindicators

⚠️  Missing dependencies:
   - technicalindicators

💡 To install missing dependencies, run:
   npm install technicalindicators

Or use the auto-installer:
   npm run install-deps -- --auto
```

### 4. Install Dependencies

**Option A: Manual Install**
```bash
npm install technicalindicators
```

**Option B: Auto-Install**
```bash
npm run install-deps -- --auto
```

### 5. Run Bot Again

```bash
npm start
```

Now it works! ✅

---

## Commands

### Check Dependencies

Check what external packages your strategy needs:

```bash
npm run check-deps
```

**Output if no dependencies:**
```
✅ No external dependencies found in strategy.js
   You are using only built-in indicators.
```

**Output if dependencies found:**
```
📦 External dependencies found:
   - technicalindicators
   - axios

✅ All dependencies are installed!
```

**Output if dependencies missing:**
```
📦 External dependencies found:
   - technicalindicators
   - axios

⚠️  Missing dependencies:
   - axios

💡 To install: npm install axios
```

---

### Auto-Install Dependencies

Automatically install all missing dependencies:

```bash
npm run install-deps -- --auto
```

**What it does:**
1. Scans strategy.js for imports
2. Checks which packages are missing
3. Installs them automatically
4. Shows success/error messages

**Output:**
```
🔍 Scanning strategy.js for dependencies...

📦 External dependencies detected:
   - technicalindicators
   - axios

⚠️  Missing dependencies:
   - axios

🚀 Auto-installing missing dependencies...

Running: npm install axios

added 5 packages in 2s

✅ All dependencies installed successfully!
```

---

### Manual Install

Install specific package:

```bash
npm install package-name
```

Install multiple packages:

```bash
npm install package1 package2 package3
```

---

## Supported Import Styles

The dependency detector supports both ES6 and CommonJS:

### ES6 Imports (Recommended)

```javascript
import { RSI } from 'technicalindicators';
import axios from 'axios';
import * as tf from '@tensorflow/tfjs-node';
```

### CommonJS Require

```javascript
const { RSI } = require('technicalindicators');
const axios = require('axios');
const tf = require('@tensorflow/tfjs-node');
```

### Scoped Packages

```javascript
import * as tf from '@tensorflow/tfjs-node';
import { AlpacaClient } from '@alpacahq/alpaca-trade-api';
```

---

## Common Workflows

### Workflow 1: Adding One Library

1. Add import to strategy.js
2. Run `npm start`
3. See error message with install command
4. Run `npm install package-name`
5. Run `npm start` again

### Workflow 2: Adding Multiple Libraries

1. Add all imports to strategy.js
2. Run `npm run check-deps`
3. See list of missing packages
4. Run `npm run install-deps -- --auto`
5. Run `npm start`

### Workflow 3: Checking Before Running

1. Edit strategy.js
2. Run `npm run check-deps`
3. If missing packages, install them
4. Run `npm start`

---

## Examples

### Example 1: Technical Indicators

**Add to strategy.js:**
```javascript
import { RSI, MACD, BollingerBands } from 'technicalindicators';
```

**Install:**
```bash
npm install technicalindicators
```

**Or auto-install:**
```bash
npm run install-deps -- --auto
```

---

### Example 2: External Data

**Add to strategy.js:**
```javascript
import axios from 'axios';
```

**Install:**
```bash
npm install axios
```

---

### Example 3: Machine Learning

**Add to strategy.js:**
```javascript
import * as tf from '@tensorflow/tfjs-node';
```

**Install:**
```bash
npm install @tensorflow/tfjs-node
```

---

### Example 4: Multiple Libraries

**Add to strategy.js:**
```javascript
import { RSI } from 'technicalindicators';
import axios from 'axios';
import _ from 'lodash';
```

**Check what's needed:**
```bash
npm run check-deps
```

**Auto-install all:**
```bash
npm run install-deps -- --auto
```

---

## Troubleshooting

### "Cannot find module 'package-name'"

**Problem:** Package not installed

**Solution:**
```bash
npm install package-name
```

---

### "npm install" fails

**Problem:** Network or permission issues

**Solutions:**

**Try 1: Clear cache**
```bash
npm cache clean --force
npm install package-name
```

**Try 2: Use sudo (Mac/Linux)**
```bash
sudo npm install package-name
```

**Try 3: Run as Administrator (Windows)**
- Right-click Command Prompt
- Select "Run as Administrator"
- Run install command

---

### Dependency checker not detecting package

**Problem:** Import syntax not recognized

**Solution:** Make sure you're using standard import syntax:

**Correct:**
```javascript
import { RSI } from 'technicalindicators';
import axios from 'axios';
```

**Not detected:**
```javascript
const RSI = require('technicalindicators').RSI;  // Dynamic require
```

---

### Auto-install not working

**Problem:** Script fails to install

**Solution:** Install manually:
```bash
npm install package-name
```

Then check if it worked:
```bash
npm run check-deps
```

---

## Best Practices

### 1. Check Before Running

Always check dependencies before running the bot:
```bash
npm run check-deps && npm start
```

### 2. Install Development Dependencies Separately

For development tools (testing, linting):
```bash
npm install --save-dev package-name
```

### 3. Keep package.json Updated

After installing packages, commit package.json:
```bash
git add package.json package-lock.json
git commit -m "Add technicalindicators dependency"
```

### 4. Document Your Dependencies

Add comments in strategy.js:
```javascript
// External dependencies:
// - technicalindicators: Advanced technical indicators
// - axios: HTTP requests for external data
import { RSI } from 'technicalindicators';
import axios from 'axios';
```

### 5. Test After Installing

Always test after installing new packages:
```bash
npm test
npm start
```

---

## Advanced Usage

### Prestart Hook

The bot automatically checks dependencies before starting:

```json
{
  "scripts": {
    "prestart": "node scripts/check-dependencies.js",
    "start": "node src/index.js"
  }
}
```

This means `npm start` will:
1. Check dependencies first
2. Show error if missing
3. Only start if all dependencies installed

### Disable Prestart Check

If you want to skip the check:

```bash
npm start --ignore-scripts
```

Or remove from package.json:
```json
{
  "scripts": {
    "start": "node src/index.js"
  }
}
```

---

## Popular Libraries Quick Install

### Technical Analysis
```bash
npm install technicalindicators
npm install tulind
npm install ta-lib
```

### Machine Learning
```bash
npm install @tensorflow/tfjs-node
npm install brain.js
```

### Data Processing
```bash
npm install lodash
npm install mathjs
npm install simple-statistics
```

### External Data
```bash
npm install axios
npm install ws
npm install node-fetch
```

### All at Once
```bash
npm install technicalindicators axios lodash
```

---

## Related Documentation

- **[External Libraries Guide](EXTERNAL_LIBRARIES.md)** - Detailed library documentation
- **[Custom Strategies](CUSTOM_STRATEGIES.md)** - Build your own strategy
- **[API Reference](API_REFERENCE.md)** - Complete API docs
- **[Troubleshooting](TROUBLESHOOTING.md)** - Fix issues

---

## Summary

TradeRiser makes dependency management easy:

1. ✅ **Automatic Detection** - Bot detects missing packages
2. ✅ **Clear Messages** - Shows exactly what to install
3. ✅ **Auto-Install** - One command to install everything
4. ✅ **Prestart Check** - Catches issues before running
5. ✅ **Multiple Import Styles** - Supports ES6 and CommonJS

**Just add your imports and let TradeRiser handle the rest!**

---

[Back to Navigation](NAVIGATION.md) | [Main README](../README.md)
