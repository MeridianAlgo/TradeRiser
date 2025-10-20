# CI/CD Pipeline Documentation

Complete guide to TradeRiser's Continuous Integration and Continuous Deployment pipeline.

## Quick Links
- [Main README](../README.md)
- [Contributing](../CONTRIBUTING.md)
- [Security](../SECURITY.md)
- [Navigation](NAVIGATION.md)

---

## Overview

TradeRiser uses GitHub Actions for automated testing, security scanning, and release management.

**Pipeline Stages:**
1. Code Quality Check
2. Security Audit
3. Project Structure Validation
4. Dependency Check
5. Multi-Platform Testing
6. Build Verification
7. Release Preparation
8. Status Report

---

## Pipeline Jobs

### 1. Code Quality Check (`lint`)

**Purpose:** Ensure code follows standards and best practices

**Steps:**
- Checkout code
- Setup Node.js 20.x
- Install dependencies
- Check code formatting
- Run linter

**Runs on:** Ubuntu Latest

**When:** Every push and pull request

**Failure Impact:** Warning only (continue-on-error)

---

### 2. Security Audit (`security`)

**Purpose:** Detect security vulnerabilities and exposed secrets

**Steps:**
- Checkout code
- Setup Node.js 20.x
- Install dependencies
- Run npm audit (moderate level)
- Check for exposed API keys
- Check for committed .env files
- Check for private keys

**Runs on:** Ubuntu Latest

**When:** Every push and pull request

**Failure Impact:** Blocks pipeline if secrets found

**What it checks:**
```bash
# Real API keys (not examples)
ALPACA_API_KEY=PK[A-Z0-9]{20,}

# Committed .env file
.env in git

# Private keys
BEGIN.*PRIVATE KEY
```

---

### 3. Project Structure Validation (`structure`)

**Purpose:** Ensure all required files and directories exist

**Steps:**
- Verify required files
- Verify source structure
- Verify documentation
- Verify scripts

**Runs on:** Ubuntu Latest

**When:** Every push and pull request

**Required Files:**
```
Root:
- package.json
- README.md
- LICENSE
- SECURITY.md
- CONTRIBUTING.md
- CHANGELOG.md
- .gitignore
- .env.example

Source (src/):
- index.js
- broker.js
- strategy.js
- portfolio.js
- config.js
- test.js

Documentation (docs/):
- GETTING_STARTED.md
- NAVIGATION.md

Scripts (scripts/):
- check-dependencies.js
- install-strategy-deps.js
```

---

### 4. Dependency Check (`dependencies`)

**Purpose:** Verify dependencies are up-to-date and valid

**Steps:**
- Checkout code
- Setup Node.js 20.x
- Install dependencies
- Check for outdated packages
- Run dependency checker script

**Runs on:** Ubuntu Latest

**When:** Every push and pull request

**What it checks:**
- All dependencies install correctly
- No missing dependencies
- Outdated packages (warning only)
- Strategy dependencies

---

### 5. Multi-Platform Testing (`test`)

**Purpose:** Test bot on multiple operating systems and Node versions

**Steps:**
- Checkout code
- Setup Node.js (18.x or 20.x)
- Install dependencies
- Create test .env file
- Run tests

**Runs on:** 
- Ubuntu Latest
- Windows Latest
- macOS Latest

**Node Versions:**
- 18.x
- 20.x

**Total Combinations:** 6 (3 OS × 2 Node versions)

**When:** After lint, security, structure, and dependencies pass

**Test Matrix:**
```
OS              Node 18.x    Node 20.x
Ubuntu Latest   ✓            ✓
Windows Latest  ✓            ✓
macOS Latest    ✓            ✓
```

---

### 6. Build Verification (`build`)

**Purpose:** Verify package can be built and deployed

**Steps:**
- Checkout code
- Setup Node.js 20.x
- Install dependencies
- Verify package.json
- Check for build artifacts

**Runs on:** Ubuntu Latest

**When:** After tests pass

**What it checks:**
- package.json is valid JSON
- Package name and version are correct
- No unnecessary build directories

---

### 7. Release Preparation (`release`)

**Purpose:** Automatically create GitHub releases for version tags

**Steps:**
- Checkout code
- Setup Node.js 20.x
- Install dependencies
- Extract version from tag
- Verify version matches package.json
- Create release notes from CHANGELOG
- Create GitHub Release

**Runs on:** Ubuntu Latest

**When:** Only when pushing tags (v*)

**Trigger:**
```bash
git tag v1.3.1
git push origin v1.3.1
```

**Requirements:**
- Tag must start with 'v'
- Tag version must match package.json version
- CHANGELOG.md must have section for version

**Example:**
```bash
# Tag format
v1.3.1

# package.json
"version": "1.3.1"

# CHANGELOG.md
## [1.3.1] - 2025-10-19
```

---

### 8. Status Report (`status`)

**Purpose:** Provide overall pipeline status

**Steps:**
- Check all job statuses
- Report results
- Fail if any critical job failed

**Runs on:** Ubuntu Latest

**When:** Always (after all jobs complete)

**Output:**
```
CI/CD Pipeline Status Report
============================
Lint: success
Security: success
Structure: success
Dependencies: success
Tests: success
Build: success

Pipeline PASSED
```

---

## Workflow Triggers

### Push to Branches

```yaml
on:
  push:
    branches: [ main, develop ]
```

**Triggers:** All jobs except release

**Use case:** Continuous integration on main development branches

---

### Pull Requests

```yaml
on:
  pull_request:
    branches: [ main, develop ]
```

**Triggers:** All jobs except release

**Use case:** Validate changes before merging

---

### Version Tags

```yaml
on:
  push:
    tags:
      - 'v*'
```

**Triggers:** All jobs including release

**Use case:** Automated releases

---

## Secrets Configuration

### Required Secrets

Configure in GitHub repository settings:

**ALPACA_API_KEY** (Optional)
- Used for integration tests
- Not required for basic CI/CD
- Set to test key or leave empty

**ALPACA_API_SECRET** (Optional)
- Used for integration tests
- Not required for basic CI/CD
- Set to test secret or leave empty

**GITHUB_TOKEN** (Automatic)
- Automatically provided by GitHub Actions
- Used for creating releases
- No configuration needed

### Setting Secrets

1. Go to repository Settings
2. Click "Secrets and variables" → "Actions"
3. Click "New repository secret"
4. Add name and value
5. Click "Add secret"

---

## Local Testing

### Run Tests Locally

```bash
# Install dependencies
npm ci

# Run tests
npm test

# Check dependencies
npm run check-deps

# Run linter
npm run lint

# Check formatting
npm run format
```

### Simulate CI Environment

```bash
# Create test .env
echo "ALPACA_API_KEY=test_key" > .env
echo "ALPACA_API_SECRET=test_secret" >> .env
echo "ALPACA_PAPER=true" >> .env
echo "TRADING_SYMBOL=BTC/USD" >> .env

# Run tests
npm test

# Clean up
rm .env
```

---

## Release Process

### Automated Release

1. **Update version in package.json:**
   ```bash
   npm version patch  # 1.3.0 → 1.3.1
   # or
   npm version minor  # 1.3.0 → 1.4.0
   # or
   npm version major  # 1.3.0 → 2.0.0
   ```

2. **Update CHANGELOG.md:**
   ```markdown
   ## [1.3.1] - 2025-10-19
   
   ### Changed
   - Description of changes
   ```

3. **Commit changes:**
   ```bash
   git add package.json CHANGELOG.md
   git commit -m "Release v1.3.1"
   ```

4. **Create and push tag:**
   ```bash
   git tag v1.3.1
   git push origin main
   git push origin v1.3.1
   ```

5. **GitHub Actions automatically:**
   - Runs all tests
   - Verifies version
   - Creates release notes
   - Publishes GitHub Release

---

## Troubleshooting

### Pipeline Fails on Lint

**Problem:** Code formatting issues

**Solution:**
```bash
npm run format
git add .
git commit -m "Fix formatting"
git push
```

---

### Pipeline Fails on Security

**Problem:** Exposed secrets or vulnerabilities

**Solutions:**

**Exposed API Key:**
```bash
# Remove from code
# Add to .gitignore
echo ".env" >> .gitignore
git add .gitignore
git commit -m "Add .env to gitignore"
```

**Vulnerabilities:**
```bash
npm audit fix
git add package-lock.json
git commit -m "Fix security vulnerabilities"
```

---

### Pipeline Fails on Structure

**Problem:** Missing required files

**Solution:**
```bash
# Check which file is missing
# Create the file
touch SECURITY.md
git add SECURITY.md
git commit -m "Add SECURITY.md"
```

---

### Pipeline Fails on Tests

**Problem:** Tests failing on specific platform

**Solution:**
1. Check test output for specific error
2. Test locally on that platform if possible
3. Fix the issue
4. Push changes

---

### Release Fails - Version Mismatch

**Problem:** Tag version doesn't match package.json

**Solution:**
```bash
# Delete wrong tag
git tag -d v1.3.1
git push origin :refs/tags/v1.3.1

# Fix package.json version
npm version 1.3.1 --no-git-tag-version

# Commit and create correct tag
git add package.json
git commit -m "Fix version"
git tag v1.3.1
git push origin main v1.3.1
```

---

## Best Practices

### Before Pushing

1. Run tests locally: `npm test`
2. Check dependencies: `npm run check-deps`
3. Verify no secrets in code
4. Update CHANGELOG.md
5. Commit with clear message

### For Pull Requests

1. Create feature branch
2. Make changes
3. Run tests locally
4. Push to branch
5. Create PR
6. Wait for CI/CD to pass
7. Request review
8. Merge after approval

### For Releases

1. Update version: `npm version <type>`
2. Update CHANGELOG.md
3. Commit changes
4. Create tag: `git tag v<version>`
5. Push: `git push origin main --tags`
6. Verify release created automatically

---

## Monitoring

### Check Pipeline Status

**GitHub UI:**
1. Go to repository
2. Click "Actions" tab
3. View workflow runs

**Badge in README:**
```markdown
[![CI](https://github.com/username/TradeRiser/workflows/CI/badge.svg)](https://github.com/username/TradeRiser/actions)
```

### Email Notifications

GitHub sends emails for:
- Failed workflows
- Successful releases
- Security alerts

Configure in GitHub settings → Notifications

---

## Performance

### Pipeline Duration

**Typical times:**
- Lint: ~30 seconds
- Security: ~45 seconds
- Structure: ~15 seconds
- Dependencies: ~1 minute
- Tests (per matrix): ~2 minutes
- Build: ~45 seconds
- Release: ~1 minute

**Total:** ~5-7 minutes for full pipeline

### Optimization Tips

1. Use `npm ci` instead of `npm install` (faster)
2. Enable caching for Node modules
3. Run independent jobs in parallel
4. Use `continue-on-error` for non-critical checks

---

## Security

### What's Protected

- API keys not in code
- .env not committed
- Private keys not exposed
- Dependencies scanned for vulnerabilities
- Secrets stored securely in GitHub

### What's Not Protected

- Public repository code
- Documentation
- Configuration examples
- Test files

### Recommendations

1. Never commit real API keys
2. Use .env for secrets
3. Add .env to .gitignore
4. Use GitHub Secrets for CI/CD
5. Rotate keys regularly

---

## Related Documentation

- [Contributing Guide](../CONTRIBUTING.md)
- [Security Policy](../SECURITY.md)
- [Deployment Guide](DEPLOYMENT.md)
- [Troubleshooting](TROUBLESHOOTING.md)

---

## Summary

TradeRiser's CI/CD pipeline ensures:
- Code quality
- Security
- Cross-platform compatibility
- Automated releases
- Continuous integration

**All automated, all the time!**

---

[Back to Navigation](NAVIGATION.md) | [Main README](../README.md)
