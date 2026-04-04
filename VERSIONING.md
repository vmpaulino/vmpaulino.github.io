# Versioning Guide

## How It Works

The project uses **Semantic Versioning** with automatic bump detection.

### Version Format: `MAJOR.MINOR.PATCH`
- **MAJOR** (1.x.x): Breaking changes, complete redesigns
- **MINOR** (x.1.x): New content (articles, presentations, repositories)
- **PATCH** (x.x.1): Bug fixes, typos, text corrections

---

## Automatic Version Bumping

When you merge a PR to `main` or `master`, the system:

### 1. Checks PR Labels (Priority)
Add one of these labels to your PR:
- `major` → Bumps to next major version (1.0.0 → 2.0.0)
- `minor` → Bumps to next minor version (1.0.0 → 1.1.0)  
- `patch` → Bumps to next patch version (1.0.0 → 1.0.1)

### 2. Falls Back to Commit Messages
If no label is found, analyzes commit messages:

**Minor Bump (New Features/Content):**
```bash
feat: add new article about microservices
feat(content): add 3 new GitHub repositories
```

**Patch Bump (Fixes):**
```bash
fix: correct typo in article title
fix(data): update experience dates
```

**Major Bump (Breaking Changes):**
```bash
feat!: redesign entire site layout
feat: migrate to new framework

BREAKING CHANGE: complete UI redesign
```

---

## Examples

### Example 1: Add New Article (Minor Bump)
```bash
# In your feature branch
git commit -m "feat: add article about distributed systems"
git push origin feature/new-article

# Create PR → Merge to main
# Result: 1.0.0 → 1.1.0
```

### Example 2: Fix Typo (Patch Bump)
```bash
git commit -m "fix: correct spelling in presentation title"
git push origin feature/typo-fix

# Create PR → Merge to main
# Result: 1.1.0 → 1.1.1
```

### Example 3: Using PR Label
```bash
git commit -m "add new content"
git push origin feature/content-update

# Create PR → Add label "minor" → Merge to main
# Result: 1.1.1 → 1.2.0
```

---

## What Happens Automatically

1. ✅ **Version Bump** - package.json updated
2. ✅ **Git Tag Created** - e.g., `v1.2.0`
3. ✅ **GitHub Release Created** - with changelog
4. ✅ **Version Displayed** - in site footer
5. ✅ **Build & Deploy** - site updated with new version

---

## Manual Version Bump (Local)

If needed, you can bump version locally:

```powershell
npm version patch  # 1.0.0 → 1.0.1
npm version minor  # 1.0.0 → 1.1.0
npm version major  # 1.0.0 → 2.0.0

git push --follow-tags
```

---

## Version Display

The current version is automatically displayed in the site footer:
```
© 2025 Vitor Paulino · v1.0.0
```

---

## Commit Message Conventions

### Structure:
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types:
- `feat:` - New feature/content → **MINOR** bump
- `fix:` - Bug fix/correction → **PATCH** bump
- `feat!:` or `BREAKING CHANGE:` → **MAJOR** bump
- `chore:` - Maintenance (no version bump)
- `docs:` - Documentation (no version bump)
- `ci:` - CI/CD changes (no version bump)

### Examples:
```bash
feat(content): add 2 new articles about .NET performance
fix(data): correct dates in experience section
feat!: migrate from Bootstrap 5 to Bootstrap 6
chore: update dependencies
docs: improve README installation steps
```

---

## PR Labels

Add these labels in GitHub UI before merging:

| Label | Version Change | Use Case |
|-------|---------------|----------|
| `major` | 1.0.0 → 2.0.0 | Breaking changes, redesigns |
| `minor` | 1.0.0 → 1.1.0 | New content, features |
| `patch` | 1.0.0 → 1.0.1 | Bug fixes, typos |

---

## Troubleshooting

### Version didn't bump
- Check GitHub Actions logs: `Actions` tab → `Version Bump and Release`
- Verify commit messages use conventional format
- Check if PR had a label

### Wrong version bump
- Correct version: `git tag -d v1.2.0` (locally) and `git push --delete origin v1.2.0` (remote)
- Manually set: `npm version 1.1.0` and push

### Skip version bump
Use `[skip ci]` in commit message:
```bash
git commit -m "chore: update README [skip ci]"
```

---

## Current Version

Check current version:
```powershell
node -p "require('./package.json').version"
```

Check all tags:
```powershell
git tag -l
```

Check latest release:
https://github.com/vmpaulino/vmpaulino.github.io/releases/latest
