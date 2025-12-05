# Vitor Paulino - Portfolio Website

A data-driven portfolio website built with TypeScript, Bootstrap, and fullpage.js, automatically deployed to GitHub Pages.

## 🚀 Quick Start

### Prerequisites

Install the following tools:

1. **Node.js (v20 or higher)** - JavaScript runtime
   - Download: https://nodejs.org/
   - Verify installation:
     ```powershell
     node --version  # Should show v20.x.x or higher
     npm --version   # Should show 10.x.x or higher
     ```

2. **Git** - Version control
   - Download: https://git-scm.com/
   - Verify installation:
     ```powershell
     git --version  # Should show git version 2.x.x
     ```

3. **VS Code** (Recommended) - Code editor
   - Download: https://code.visualstudio.com/

---

## 📥 Installation

### 1. Clone the repository
```powershell
cd C:\Users\vmlep\repos
git clone https://github.com/vmpaulino/vmpaulino.github.io.git
cd vmpaulino.github.io
```

### 2. Install dependencies
```powershell
npm install
```

This will install:
- TypeScript compiler
- Type definitions for browser APIs
- Build tools

---

## 🛠️ Development

### Build the project
Compile TypeScript and prepare files for deployment:
```powershell
npm run build
```

**What this does**:
1. Compiles TypeScript (`src/**/*.ts`) → JavaScript (`dist/main.js`)
2. Copies `index.html` to `dist/`
3. Copies `styles.css` to `dist/`
4. Copies `data/*.json` to `dist/data/`

### Watch mode (auto-rebuild on changes)
```powershell
npm run watch
```
Leave this running while editing TypeScript files. It will recompile automatically.

### Clean build output
```powershell
npm run clean
```
Removes the `dist/` folder.

---

## 🧪 Testing Locally

### Option 1: Using http-server (Recommended)

1. **Install http-server globally** (one-time setup):
   ```powershell
   npm install -g http-server
   ```

2. **Build and serve**:
   ```powershell
   npm run build
   http-server dist -p 8080
   ```

3. **Open in browser**:
   - Navigate to: http://localhost:8080
   - Press `Ctrl+C` in terminal to stop the server

### Option 2: Using Python's built-in server

If you have Python installed:
```powershell
npm run build
cd dist
python -m http.server 8080
```
Then open http://localhost:8080

### Option 3: Using VS Code Live Server

1. Install "Live Server" extension in VS Code
2. Build the project: `npm run build`
3. Right-click `dist/index.html` → "Open with Live Server"

---

## 🧪 Testing Checklist

After building, verify the following:

### ✅ Visual Tests
- [ ] Hero section displays with profile image
- [ ] All sections scroll smoothly with fullpage.js
- [ ] Navigation dots appear on the right side
- [ ] Articles section shows 5 article cards
- [ ] Presentations section shows 6 presentation cards
- [ ] Repositories section shows 6 GitHub repo cards
- [ ] Professional Experience carousel shows 8 companies
- [ ] Skills tags render correctly (Technical, Soft, Business Areas)
- [ ] Certifications badges load from Credly
- [ ] Footer displays current year

### ✅ Interaction Tests
- [ ] Click carousel prev/next buttons → navigates between companies
- [ ] Click article "Read Article" links → opens LinkedIn posts
- [ ] Click presentation "Slide Deck" links → opens GitHub PDFs
- [ ] Click repository "View Repo" links → opens GitHub repos
- [ ] Click social icons (GitHub, LinkedIn, Twitter) → opens profiles
- [ ] Fullpage.js navigation dots work
- [ ] Mouse wheel scrolling changes sections

### ✅ Technical Tests
- [ ] No errors in browser console (F12 → Console tab)
- [ ] Network tab shows all resources load successfully
- [ ] Bootstrap CSS loads (check styled buttons)
- [ ] Font Awesome icons display (GitHub, LinkedIn icons)
- [ ] fullpage.js navigation shows (side dots visible)

### ✅ Responsive Tests
- [ ] Open DevTools (F12)
- [ ] Toggle device toolbar (Ctrl+Shift+M)
- [ ] Test mobile viewport (375×667)
- [ ] Test tablet viewport (768×1024)
- [ ] Verify layout adapts correctly

---

## 📊 Verify Data Loading

### Check JSON files are loaded
1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Reload page
4. Filter by "Fetch/XHR"
5. Verify requests to:
   - `data/articles.json` (Status: 200)
   - `data/presentations.json` (Status: 200)
   - `data/repositories.json` (Status: 200)
   - `data/experience.json` (Status: 200)
   - `data/skills.json` (Status: 200)

### Verify content rendering
Open **Console** tab and run:
```javascript
// Check articles loaded
document.querySelectorAll('.section .card').length  // Should be 11+ (articles + presentations + repos)

// Check experience carousel
document.querySelectorAll('.carousel-item').length  // Should be 8

// Check skills tags
document.querySelectorAll('.tag').length  // Should be 50+
```

---

## 🔍 Troubleshooting

### Build fails with TypeScript errors
```powershell
# Check for syntax errors
npx tsc --noEmit

# If errors persist, clean and rebuild
npm run clean
npm install
npm run build
```

### Page loads but content is missing
**Issue**: JSON files not loading

**Solution**:
1. Verify files exist in `dist/data/`:
   ```powershell
   ls dist/data/
   ```
2. Check browser console for fetch errors
3. Ensure you're testing with a local server (not `file://` protocol)

### fullpage.js not working
**Issue**: Sections don't scroll

**Solution**:
1. Check console for JavaScript errors
2. Verify fullpage.js CDN loaded (Network tab)
3. Ensure `new fullpage('#fullpage', {...})` is called after content renders

### Bootstrap components not styled
**Issue**: Buttons, cards look plain

**Solution**:
1. Check Bootstrap CSS loaded (Network tab)
2. Verify `<link>` tag in `index.html`:
   ```html
   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
   ```

### "npm command not found"
**Issue**: Node.js not installed or not in PATH

**Solution**:
1. Install Node.js from https://nodejs.org/
2. Restart terminal/VS Code
3. Verify: `node --version`

---

## 🔄 Updating Content

### Add a new article
1. Open `data/articles.json`
2. Add new object to array:
   ```json
   {
     "title": "Your Article Title",
     "description": "Brief description...",
     "tags": ["tag1", "tag2"],
     "date": "January 15, 2025",
     "readTime": "10 min read",
     "url": "https://linkedin.com/pulse/your-article"
   }
   ```
3. Build: `npm run build`
4. Test locally
5. Commit and push to deploy

### Add a new repository
1. Open `data/repositories.json`
2. Add new object with `title`, `description`, `url`
3. Build, test, commit, push

### Update professional experience
1. Open `data/experience.json`
2. Modify existing entries or add new ones
3. Build, test, commit, push

---

## 🚀 Deployment

### Automatic Deployment (GitHub Actions)

**On every push to `main` branch**:
1. GitHub Actions runs automatically
2. Installs dependencies
3. Builds project
4. Deploys `dist/` folder to `gh-pages` branch
5. GitHub Pages serves the site

**No manual steps needed!**

### View deployment status
1. Go to: https://github.com/vmpaulino/vmpaulino.github.io/actions
2. Check latest workflow run
3. If green ✅ → deployment succeeded
4. If red ❌ → click to view logs

### Manual deployment (if needed)
```powershell
# Build locally
npm run build

# Commit built files
git add dist/
git commit -m "build: update built files"
git push origin main
```

---

## 📁 Project Structure

```
vmpaulino.github.io/
├── .github/
│   └── workflows/
│       └── build-and-deploy.yml   # GitHub Actions workflow
├── src/                            # TypeScript source code
│   ├── main.ts                     # Entry point
│   ├── models/                     # TypeScript interfaces
│   │   ├── article.ts
│   │   ├── presentation.ts
│   │   ├── repository.ts
│   │   ├── experience.ts
│   │   └── skills.ts
│   └── renderers/                  # HTML generation functions
│       ├── articles-renderer.ts
│       ├── presentations-renderer.ts
│       ├── repositories-renderer.ts
│       ├── experience-renderer.ts
│       └── skills-renderer.ts
├── data/                           # Content as JSON
│   ├── articles.json
│   ├── presentations.json
│   ├── repositories.json
│   ├── experience.json
│   └── skills.json
├── dist/                           # Build output (generated)
│   ├── index.html
│   ├── styles.css
│   ├── main.js
│   └── data/
├── index.html                      # HTML template
├── styles.css                      # Custom styles
├── package.json                    # Node.js dependencies
├── tsconfig.json                   # TypeScript config
├── .gitignore                      # Git ignore rules
└── README.md                       # This file
```

---

## 🧰 Useful Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run build` | Build project for production |
| `npm run watch` | Auto-rebuild on file changes |
| `npm run clean` | Remove build output |
| `http-server dist -p 8080` | Serve locally on port 8080 |
| `git status` | Check Git working tree |
| `git add .` | Stage all changes |
| `git commit -m "msg"` | Commit with message |
| `git push` | Push to GitHub (triggers deployment) |

---

## 🐛 Common Issues

### Issue: TypeScript not found
```
'tsc' is not recognized as an internal or external command
```
**Fix**: Install dependencies
```powershell
npm install
```

### Issue: Permission denied when installing globally
```
Error: EACCES: permission denied
```
**Fix** (Windows): Run PowerShell as Administrator

### Issue: Port 8080 already in use
```
Error: listen EADDRINUSE: address already in use :::8080
```
**Fix**: Use different port
```powershell
http-server dist -p 3000
```

### Issue: Changes not reflecting on live site
**Fix**: Wait 1-2 minutes for GitHub Pages to update, then hard refresh (Ctrl+Shift+R)

---

## 📚 Additional Resources

- **TypeScript Docs**: https://www.typescriptlang.org/docs/
- **Bootstrap Docs**: https://getbootstrap.com/docs/5.3/
- **fullpage.js Docs**: https://github.com/alvarotrigo/fullPage.js
- **GitHub Pages Docs**: https://docs.github.com/pages
- **GitHub Actions Docs**: https://docs.github.com/actions

---

## 📞 Support

If you encounter issues:
1. Check this README's troubleshooting section
2. Check `IMPLEMENTATION_PLAN.md` for detailed steps
3. Review GitHub Actions logs: https://github.com/vmpaulino/vmpaulino.github.io/actions
4. Open an issue: https://github.com/vmpaulino/vmpaulino.github.io/issues

---

## 📝 License

Personal portfolio website © 2025 Vitor Paulino
