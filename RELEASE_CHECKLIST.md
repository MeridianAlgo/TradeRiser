# Release Checklist

Use this checklist before creating a new release.

## Pre-Release

- [ ] All tests passing locally (`npm test`)
- [ ] Dependencies checked (`npm run check-deps`)
- [ ] No uncommitted changes (`git status`)
- [ ] On main branch (`git branch --show-current`)
- [ ] Latest code pulled (`git pull origin main`)
- [ ] Version number decided (patch/minor/major)

## Documentation

- [ ] CHANGELOG.md updated with new version section
- [ ] README.md updated if needed
- [ ] New features documented
- [ ] Breaking changes noted
- [ ] Migration guide added (if needed)

## Code Quality

- [ ] No console.log debugging statements
- [ ] No commented-out code
- [ ] No TODO comments for release-blocking items
- [ ] Code formatted (`npm run format`)
- [ ] Linter passing (`npm run lint`)

## Security

- [ ] No API keys in code
- [ ] .env not committed
- [ ] No sensitive data exposed
- [ ] Dependencies audited (`npm audit`)
- [ ] Security vulnerabilities addressed

## Testing

- [ ] Unit tests passing
- [ ] Integration tests passing (if applicable)
- [ ] Tested on multiple platforms (if possible)
- [ ] Edge cases covered
- [ ] Error handling tested

## Files

- [ ] package.json version updated
- [ ] CHANGELOG.md has section for new version
- [ ] README.md reflects current state
- [ ] LICENSE file present
- [ ] SECURITY.md present
- [ ] CONTRIBUTING.md present
- [ ] .env.example up to date

## Release Process

### Option 1: Automated Script

```bash
# Run release preparation script
./scripts/prepare-release.sh 1.3.2

# Review changes
git show

# Push to GitHub
git push origin main
git push origin v1.3.2
```

### Option 2: Manual Process

1. **Update version:**
   ```bash
   npm version 1.3.2 --no-git-tag-version
   ```

2. **Update CHANGELOG.md:**
   - Add section for new version
   - List all changes
   - Include date

3. **Commit changes:**
   ```bash
   git add package.json CHANGELOG.md
   git commit -m "Release v1.3.2"
   ```

4. **Create tag:**
   ```bash
   git tag -a v1.3.2 -m "Release v1.3.2"
   ```

5. **Push to GitHub:**
   ```bash
   git push origin main
   git push origin v1.3.2
   ```

## Post-Release

- [ ] GitHub Actions pipeline passed
- [ ] GitHub Release created automatically
- [ ] Release notes look correct
- [ ] Download and test release artifact
- [ ] Announce release (if applicable)
- [ ] Update documentation site (if applicable)
- [ ] Close related issues
- [ ] Update project board (if applicable)

## Rollback (if needed)

If something goes wrong:

```bash
# Delete local tag
git tag -d v1.3.2

# Delete remote tag
git push origin :refs/tags/v1.3.2

# Reset commit
git reset --hard HEAD~1

# Force push (use with caution)
git push origin main --force
```

## Version Numbering

Follow Semantic Versioning (semver):

- **MAJOR** (1.0.0 → 2.0.0): Breaking changes
- **MINOR** (1.0.0 → 1.1.0): New features, backwards compatible
- **PATCH** (1.0.0 → 1.0.1): Bug fixes, backwards compatible

### Examples

**Patch Release (1.3.1 → 1.3.2):**
- Bug fixes
- Documentation updates
- Performance improvements
- No new features
- No breaking changes

**Minor Release (1.3.0 → 1.4.0):**
- New features
- New functionality
- Backwards compatible
- No breaking changes

**Major Release (1.3.0 → 2.0.0):**
- Breaking changes
- API changes
- Removed features
- Major refactoring

## CI/CD Pipeline

GitHub Actions will automatically:

1. Run lint checks
2. Run security audit
3. Validate project structure
4. Check dependencies
5. Run tests on multiple platforms
6. Verify build
7. Create GitHub Release
8. Generate release notes from CHANGELOG

**Pipeline must pass before release is published!**

## Common Issues

### Version Mismatch

**Problem:** Tag version doesn't match package.json

**Solution:**
```bash
# Fix package.json
npm version 1.3.2 --no-git-tag-version

# Delete wrong tag
git tag -d v1.3.2
git push origin :refs/tags/v1.3.2

# Create correct tag
git add package.json
git commit --amend
git tag -a v1.3.2 -m "Release v1.3.2"
git push origin main v1.3.2
```

### Missing CHANGELOG Entry

**Problem:** CHANGELOG.md doesn't have section for version

**Solution:**
```bash
# Edit CHANGELOG.md
nano CHANGELOG.md

# Amend commit
git add CHANGELOG.md
git commit --amend

# Update tag
git tag -d v1.3.2
git tag -a v1.3.2 -m "Release v1.3.2"
git push origin main v1.3.2 --force
```

### Failed Tests

**Problem:** Tests fail in CI/CD

**Solution:**
1. Check test output in GitHub Actions
2. Fix the issue locally
3. Commit fix
4. Delete tag and recreate

## Release Notes Template

```markdown
## [1.3.2] - 2025-10-19

### Added
- New feature 1
- New feature 2

### Changed
- Changed behavior 1
- Updated dependency X

### Fixed
- Bug fix 1
- Bug fix 2

### Removed
- Deprecated feature X

### Security
- Security fix 1
```

## Support

- [CI/CD Documentation](docs/CI_CD_PIPELINE.md)
- [Contributing Guide](CONTRIBUTING.md)
- [GitHub Actions](https://github.com/username/TradeRiser/actions)

---

**Remember:** Always test thoroughly before releasing!
