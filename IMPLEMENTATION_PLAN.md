# Implementation Plan: Data-Driven Portfolio with TypeScript

## Overview
Transform the portfolio from manual HTML updates to a data-driven architecture using TypeScript, with automated GitHub Actions deployment.

## Execution Phases

### Phase 1: Project Setup & Configuration
**Goal**: Establish build tooling and project structure

#### Step 1.1: Create package.json
- Initialize npm project
- Add TypeScript as dev dependency
- Add build scripts (build, watch, clean)
- **Test**: Run `npm install` successfully

#### Step 1.2: Create tsconfig.json
- Configure TypeScript compiler options
- Set target to ES2020 for modern browser support
- Configure output directory to `dist/`
- Enable source maps for debugging
- **Test**: Run `npx tsc --noEmit` to verify config

#### Step 1.3: Create .gitignore
- Ignore `node_modules/`
- Ignore TypeScript compilation outputs in `src/`
- Keep `dist/` folder tracked (for deployment)
- **Test**: Check git status shows only relevant files

#### Step 1.4: Create folder structure
```
src/
  ├── main.ts
  ├── models/
  └── renderers/
data/
  ├── articles.json
  ├── presentations.json
  ├── repositories.json
  ├── experience.json
  └── skills.json
.github/
  └── workflows/
      └── build-and-deploy.yml
```
- **Test**: Verify folders exist with `ls` commands

---

### Phase 2: Data Extraction
**Goal**: Move all content from HTML to structured JSON files

#### Step 2.1: Create data/articles.json
- Extract 5 articles from HTML
- Structure: title, description, tags[], date, readTime, url
- **Test**: Validate JSON syntax with `cat data/articles.json | ConvertFrom-Json`

#### Step 2.2: Create data/presentations.json
- Extract 6 presentations from HTML
- Structure: title, description, tags[], url
- **Test**: Validate JSON syntax

#### Step 2.3: Create data/repositories.json
- Extract 6 GitHub repos from HTML
- Structure: title, description, url
- **Test**: Validate JSON syntax

#### Step 2.4: Create data/experience.json
- Extract 8 company experiences from HTML
- Structure: company, logo, title, description, period, tags[]
- **Test**: Validate JSON syntax and count entries

#### Step 2.5: Create data/skills.json
- Extract technical skills, soft skills, business areas
- Structure: technical[], soft[], businessAreas[]
- **Test**: Validate JSON syntax

**Phase 2 Verification**:
- All JSON files parse without errors
- Data counts match HTML content (5 articles, 6 presentations, etc.)
- No data loss from original HTML

---

### Phase 3: TypeScript Models & Interfaces
**Goal**: Define type-safe data structures

#### Step 3.1: Create src/models/article.ts
```typescript
export interface Article {
  title: string;
  description: string;
  tags: string[];
  date: string;
  readTime: string;
  url: string;
}
```
- **Test**: Import in main.ts, verify no compile errors

#### Step 3.2: Create src/models/presentation.ts
- Define Presentation interface
- **Test**: TypeScript compilation succeeds

#### Step 3.3: Create src/models/repository.ts
- Define Repository interface
- **Test**: TypeScript compilation succeeds

#### Step 3.4: Create src/models/experience.ts
- Define Experience interface
- **Test**: TypeScript compilation succeeds

#### Step 3.5: Create src/models/skills.ts
- Define Skills interface
- **Test**: TypeScript compilation succeeds

**Phase 3 Verification**:
- Run `npm run build` - all models compile without errors
- No TypeScript errors in VS Code

---

### Phase 4: Data Loading & Rendering
**Goal**: Implement dynamic content generation

#### Step 4.1: Create src/main.ts - Data Loading
- Implement async functions to fetch JSON files
- Add error handling for fetch failures
- **Test**: Add console.log to verify data loads in browser

#### Step 4.2: Create src/renderers/articles-renderer.ts
- Implement function to generate article cards HTML
- Use Bootstrap classes matching current design
- **Test**: Inspect rendered HTML in DevTools, compare to original

#### Step 4.3: Create src/renderers/presentations-renderer.ts
- Implement presentations rendering
- **Test**: Visual comparison with original layout

#### Step 4.4: Create src/renderers/repositories-renderer.ts
- Implement repositories rendering
- **Test**: Visual comparison with original layout

#### Step 4.5: Create src/renderers/experience-renderer.ts
- Implement carousel items rendering
- Handle Bootstrap carousel structure
- **Test**: Carousel navigation works, all slides render

#### Step 4.6: Create src/renderers/skills-renderer.ts
- Implement tag rendering for skills sections
- **Test**: All tags display correctly

#### Step 4.7: Wire up renderers in main.ts
- Call renderers on DOMContentLoaded
- Re-initialize fullpage.js after content loads
- **Test**: Full page scrolling works after dynamic content loads

**Phase 4 Verification**:
- Run local dev server
- All sections render correctly
- Carousel, fullpage.js, Bootstrap components work
- No console errors
- Visual parity with original HTML

---

### Phase 5: Build System
**Goal**: Automate compilation and file preparation

#### Step 5.1: Create build script in package.json
```json
"scripts": {
  "build": "tsc && node scripts/copy-assets.js",
  "watch": "tsc --watch",
  "clean": "rimraf dist"
}
```
- **Test**: Run `npm run build`, verify dist/ contains all files

#### Step 5.2: Create scripts/copy-assets.js
- Copy index.html to dist/
- Copy styles.css to dist/
- Copy data/ folder to dist/
- **Test**: Verify all files copied correctly

#### Step 5.3: Update index.html script references
- Change `<script src="main.js">` to reference compiled JS
- **Test**: Open dist/index.html in browser, everything works

**Phase 5 Verification**:
- `npm run build` completes successfully
- dist/ folder contains: index.html, styles.css, main.js, data/*.json
- Opening dist/index.html works without local server (file:// protocol)
- Or works with local server: `npx http-server dist -p 8080`

---

### Phase 6: GitHub Actions Workflow
**Goal**: Automate build and deployment on push

#### Step 6.1: Create .github/workflows/build-and-deploy.yml
- Trigger on push to main branch
- Setup Node.js 20
- Install dependencies with `npm ci`
- Run build with `npm run build`
- **Test**: Push to feature branch, check Actions tab (workflow runs but doesn't deploy)

#### Step 6.2: Add deployment step
- Use peaceiris/actions-gh-pages@v3
- Deploy dist/ folder to gh-pages branch
- **Test**: Push to main branch, verify gh-pages branch created

#### Step 6.3: Configure GitHub Pages
- Settings → Pages → Source: Deploy from branch
- Branch: gh-pages, Folder: / (root)
- **Test**: Visit https://vmpaulino.github.io, site loads correctly

**Phase 6 Verification**:
- GitHub Actions workflow passes on every push
- Deployment to gh-pages happens automatically
- Live site reflects latest changes within 1-2 minutes

---

### Phase 7: Documentation & Testing
**Goal**: Complete README with clear instructions

#### Step 7.1: Create README.md
- Prerequisites (Node.js, Git)
- Local development setup
- Build commands
- Testing procedures
- Deployment workflow
- **Test**: Follow README from scratch in new terminal

#### Step 7.2: Add troubleshooting section
- Common issues and solutions
- How to verify build output
- How to test GitHub Actions locally (act tool)

**Phase 7 Verification**:
- New developer can follow README and run project
- All commands work as documented

---

## Testing Strategy

### After Each Step
1. Run specific test mentioned in step
2. Verify no regressions in previous steps
3. Check git status for unexpected changes

### After Each Phase
1. Run full build: `npm run build`
2. Open dist/index.html in browser
3. Test all interactive elements
4. Verify no console errors
5. Commit changes with descriptive message

### Before Merging to Main
1. Clean install: `rm -rf node_modules; npm install`
2. Full build from scratch: `npm run clean && npm run build`
3. Visual regression test against live site
4. Test on mobile viewport
5. Verify all links work
6. Test fullpage.js scrolling
7. Test Bootstrap carousel

---

## Rollback Plan

If issues occur:
1. **Local issues**: `git checkout main` to return to working state
2. **Build issues**: Check GitHub Actions logs, fix locally, push fix
3. **Deployment issues**: Revert gh-pages branch: `git revert <commit>`
4. **Critical production issue**: Temporarily point GitHub Pages back to main branch

---

## Success Criteria

- ✅ All content renders identically to original HTML
- ✅ Build completes without errors or warnings
- ✅ TypeScript compilation succeeds with strict mode
- ✅ No runtime errors in browser console
- ✅ fullpage.js and Bootstrap work correctly
- ✅ GitHub Actions workflow passes
- ✅ Live site deploys automatically on push to main
- ✅ New content can be added by editing JSON files only
- ✅ README enables new contributor to run project in < 5 minutes
