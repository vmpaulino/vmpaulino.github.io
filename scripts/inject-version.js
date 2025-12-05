const fs = require('fs');
const path = require('path');

// Read package.json version
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
const version = packageJson.version;

console.log(`Injecting version ${version} into index.html...`);

// Read index.html from dist
const indexPath = path.join(__dirname, '..', 'dist', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// Replace footer with version
html = html.replace(
  /(<footer>\s*&copy; <script>document\.write\(new Date\(\)\.getFullYear\(\)\)<\/script> Vitor Paulino)/,
  `$1 &middot; v${version}`
);

// Write back
fs.writeFileSync(indexPath, html, 'utf8');
console.log('✅ Version injected successfully!');
