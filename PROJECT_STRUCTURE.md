# 📁 Project Structure

## Overview

This document explains the complete project structure and organization.

---

## 📂 Directory Structure

```
crypto-trading-bot/
│
├── 📁 src/                          # Source code (main application)
│   ├── index.js                     # Main entry point & bot orchestrator
│   ├── broker.js                    # Alpaca API integration
│   ├── portfolio.js                 # Portfolio & position management
│   ├── strategy.js                  # Trading strategy ⭐ CUSTOMIZE THIS!
│   ├── config.js                    # Configuration settings
│   └── test.js                      # Test suite
│
├── 📁 docs/                         # Documentation (all guides)
│   ├── START_HERE.md               # Main entry point for docs
│   ├── GETTING_STARTED.md          # Complete beginner guide
│   ├── STRATEGY_EXPLAINED.md       # Current strategy explained
│   ├── STRATEGY_GUIDE.md           # 5+ ready-to-use strategies
│   ├── INDICATORS_GUIDE.md         # All indicators explained
│   ├── FILES_OVERVIEW.md           # File-by-file guide
│   ├── FIXES_AND_IMPROVEMENTS.md   # What's been fixed
│   ├── WHATS_NEW.md                # Latest updates
│   ├── SUMMARY.md                  # Technical details
│   ├── DOCUMENTATION_INDEX.md      # Complete doc index
│   └── QUICK_START.txt             # Visual quick reference
│
├── 📁 .github/                      # GitHub configuration
│   ├── workflows/                   # CI/CD pipelines
│   │   ├── ci.yml                  # Main CI workflow
│   │   └── codeql.yml              # Security scanning
│   ├── ISSUE_TEMPLATE/             # Issue templates
│   │   ├── bug_report.md           # Bug report template
│   │   └── feature_request.md      # Feature request template
│   └── PULL_REQUEST_TEMPLATE.md    # PR template
│
├── 📄 .env.example                  # Environment variables template
├── 📄 .env                          # Your API keys (NOT committed)
├── 📄 .gitignore                    # Git ignore rules
├── 📄 package.json                  # Dependencies & scripts
├── 📄 README.md                     # Main documentation
├── 📄 LICENSE                       # MIT License
├── 📄 CONTRIBUTING.md               # Contribution guidelines
├── 📄 SECURITY.md                   # Security policy
└── 📄 PROJECT_STRUCTURE.md          # This file
```

---

## 📝 File Descriptions

### Root Files

| File | Purpose | Edit? |
|------|---------|-------|
| `README.md` | Main project documentation | ❌ No |
| `LICENSE` | MIT License | ❌ No |
| `CONTRIBUTING.md` | How to contribute | ❌ No |
| `SECURITY.md` | Security policy | ❌ No |
| `PROJECT_STRUCTURE.md` | This file | ❌ No |
| `.gitignore` | Git ignore rules | ❌ No |
| `.env.example` | Environment template | ❌ No |
| `.env` | Your API keys | ✅ Yes (once) |
| `package.json` | Dependencies | ❌ No |

### Source Files (`src/`)

| File | Purpose | Edit? | Lines |
|------|---------|-------|-------|
| `index.js` | Main bot orchestrator | ❌ Rarely | ~150 |
| `broker.js` | Alpaca API calls | ❌ Rarely | ~200 |
| `portfolio.js` | Portfolio management | ❌ Rarely | ~80 |
| `strategy.js` | **YOUR STRATEGY** | ✅ **YES!** | ~300 |
| `config.js` | Bot configuration | ✅ Maybe | ~20 |
| `test.js` | Test suite | ❌ No | ~100 |

### Documentation (`docs/`)

| File | Purpose | Read? |
|------|---------|-------|
| `START_HERE.md` | Main entry point | ✅ First! |
| `GETTING_STARTED.md` | Setup guide | ✅ Yes |
| `STRATEGY_EXPLAINED.md` | Current strategy | ✅ Yes |
| `STRATEGY_GUIDE.md` | Strategy examples | ✅ Yes |
| `INDICATORS_GUIDE.md` | Indicators explained | ✅ Yes |
| `FILES_OVERVIEW.md` | File guide | ✅ Maybe |
| `FIXES_AND_IMPROVEMENTS.md` | What's fixed | ✅ Maybe |
| `WHATS_NEW.md` | Latest updates | ✅ Maybe |
| `SUMMARY.md` | Technical details | ✅ Maybe |
| `DOCUMENTATION_INDEX.md` | Doc index | ✅ Maybe |
| `QUICK_START.txt` | Quick reference | ✅ Maybe |

---

## 🎯 What to Edit

### For Beginners:
1. **`.env`** - Add your API keys (once)
2. **`src/strategy.js`** - Customize your strategy (lines 40-60)

### For Intermediate:
3. **`src/config.js`** - Change symbols or intervals

### For Advanced:
4. **`src/strategy.js`** - Add custom indicators
5. **`src/broker.js`** - Modify API integration
6. **`src/index.js`** - Change bot behavior

---

## 📊 File Sizes

| Category | Files | Total Lines |
|----------|-------|-------------|
| Source Code | 6 | ~850 |
| Documentation | 11 | ~3000 |
| GitHub Config | 6 | ~300 |
| **Total** | **23** | **~4150** |

---

## 🔄 Data Flow

```
1. index.js (Main Loop)
   ↓
2. portfolio.js (Get Account Info)
   ↓
3. broker.js (Get Market Data)
   ↓
4. strategy.js (Analyze & Decide)
   ↓
5. broker.js (Execute Trade)
   ↓
6. Back to step 1 (every 60 seconds)
```

---

## 🎨 Customization Points

### Easy (No Coding):
- **TP/SL:** `src/strategy.js` lines 40-41
- **MA Periods:** `src/strategy.js` lines 35-36
- **Position Size:** `src/strategy.js` line 63
- **Symbols:** `src/config.js` line 13
- **Check Interval:** `src/config.js` line 14

### Medium (Basic Coding):
- **Enable RSI:** `src/strategy.js` line 52
- **Enable Volume:** `src/strategy.js` line 57
- **Enable EMA:** `src/strategy.js` line 60

### Advanced (Coding Required):
- **New Indicators:** `src/strategy.js` lines 200+
- **Custom Logic:** `src/strategy.js` analyze() function
- **API Changes:** `src/broker.js`
- **Bot Behavior:** `src/index.js`

---

## 🧪 Testing Files

| File | Purpose |
|------|---------|
| `src/test.js` | Main test suite |
| `.github/workflows/ci.yml` | CI/CD pipeline |
| `.github/workflows/codeql.yml` | Security scanning |

---

## 📚 Documentation Organization

### By Audience:

**Beginners:**
- START_HERE.md
- GETTING_STARTED.md
- STRATEGY_EXPLAINED.md
- QUICK_START.txt

**Intermediate:**
- STRATEGY_GUIDE.md
- INDICATORS_GUIDE.md
- FILES_OVERVIEW.md

**Advanced:**
- SUMMARY.md
- FIXES_AND_IMPROVEMENTS.md
- CONTRIBUTING.md

---

## 🔒 Security Files

| File | Purpose |
|------|---------|
| `.env` | API keys (NOT committed) |
| `.env.example` | Template (safe to commit) |
| `.gitignore` | Prevents committing secrets |
| `SECURITY.md` | Security policy |
| `.github/workflows/codeql.yml` | Security scanning |

---

## 🚀 Quick Navigation

### Want to...

**Get started?**
→ Read `docs/START_HERE.md`

**Understand the strategy?**
→ Read `docs/STRATEGY_EXPLAINED.md`

**Change TP/SL?**
→ Edit `src/strategy.js` lines 40-41

**Add indicators?**
→ Read `docs/INDICATORS_GUIDE.md`

**Contribute?**
→ Read `CONTRIBUTING.md`

**Report a bug?**
→ Use `.github/ISSUE_TEMPLATE/bug_report.md`

---

## 💡 Best Practices

### File Organization:
- ✅ Source code in `src/`
- ✅ Documentation in `docs/`
- ✅ GitHub config in `.github/`
- ✅ Root files are minimal

### Naming Conventions:
- ✅ Lowercase with hyphens for folders
- ✅ UPPERCASE for important docs
- ✅ camelCase for JS files
- ✅ Clear, descriptive names

### Documentation:
- ✅ Every feature documented
- ✅ Examples included
- ✅ Easy to navigate
- ✅ Beginner-friendly

---

## 🎉 Summary

This project is organized for:
- ✅ Easy navigation
- ✅ Clear separation of concerns
- ✅ Beginner-friendly structure
- ✅ Professional standards
- ✅ GitHub best practices

**Everything has its place, and every place has its purpose!** 🚀
