#!/bin/bash

# TradeRiser Release Preparation Script
# Usage: ./scripts/prepare-release.sh <version>
# Example: ./scripts/prepare-release.sh 1.3.1

set -e

VERSION=$1

if [ -z "$VERSION" ]; then
  echo "Error: Version number required"
  echo "Usage: ./scripts/prepare-release.sh <version>"
  echo "Example: ./scripts/prepare-release.sh 1.3.1"
  exit 1
fi

echo "========================================="
echo "TradeRiser Release Preparation"
echo "Version: $VERSION"
echo "========================================="
echo ""

# Check if we're on main branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo "Warning: Not on main branch (current: $CURRENT_BRANCH)"
  read -p "Continue anyway? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

# Check for uncommitted changes
if [[ -n $(git status -s) ]]; then
  echo "Error: You have uncommitted changes"
  git status -s
  exit 1
fi

echo "1. Updating package.json version..."
npm version $VERSION --no-git-tag-version
echo "   Done"
echo ""

echo "2. Checking CHANGELOG.md..."
if ! grep -q "\[$VERSION\]" CHANGELOG.md; then
  echo "   Warning: CHANGELOG.md doesn't have section for v$VERSION"
  echo "   Please add release notes to CHANGELOG.md"
  read -p "   Open CHANGELOG.md now? (y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    ${EDITOR:-nano} CHANGELOG.md
  fi
else
  echo "   CHANGELOG.md has section for v$VERSION"
fi
echo ""

echo "3. Running tests..."
npm test
echo "   Tests passed"
echo ""

echo "4. Checking dependencies..."
npm run check-deps
echo "   Dependencies OK"
echo ""

echo "5. Verifying project structure..."
test -f README.md || { echo "Missing README.md"; exit 1; }
test -f LICENSE || { echo "Missing LICENSE"; exit 1; }
test -f SECURITY.md || { echo "Missing SECURITY.md"; exit 1; }
test -f CONTRIBUTING.md || { echo "Missing CONTRIBUTING.md"; exit 1; }
test -f CHANGELOG.md || { echo "Missing CHANGELOG.md"; exit 1; }
test -f .gitignore || { echo "Missing .gitignore"; exit 1; }
test -f .env.example || { echo "Missing .env.example"; exit 1; }
echo "   Structure OK"
echo ""

echo "6. Creating commit..."
git add package.json CHANGELOG.md
git commit -m "Release v$VERSION"
echo "   Commit created"
echo ""

echo "7. Creating tag..."
git tag -a "v$VERSION" -m "Release v$VERSION"
echo "   Tag created"
echo ""

echo "========================================="
echo "Release v$VERSION prepared successfully!"
echo "========================================="
echo ""
echo "Next steps:"
echo "1. Review the changes:"
echo "   git show"
echo ""
echo "2. Push to GitHub:"
echo "   git push origin main"
echo "   git push origin v$VERSION"
echo ""
echo "3. GitHub Actions will automatically:"
echo "   - Run all tests"
echo "   - Create GitHub Release"
echo "   - Publish release notes"
echo ""
echo "To undo (if needed):"
echo "   git reset --hard HEAD~1"
echo "   git tag -d v$VERSION"
echo ""
