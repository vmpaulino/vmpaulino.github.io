const fs = require('fs');
const path = require('path');

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy index.html
console.log('Copying index.html...');
fs.copyFileSync(
  path.join(__dirname, '..', 'index.html'),
  path.join(distDir, 'index.html')
);

// Copy styles.css
console.log('Copying styles.css...');
fs.copyFileSync(
  path.join(__dirname, '..', 'styles.css'),
  path.join(distDir, 'styles.css')
);

// Copy data directory
const dataDir = path.join(__dirname, '..', 'data');
const distDataDir = path.join(distDir, 'data');

if (fs.existsSync(dataDir)) {
  console.log('Copying data directory...');
  if (!fs.existsSync(distDataDir)) {
    fs.mkdirSync(distDataDir, { recursive: true });
  }

  const files = fs.readdirSync(dataDir);
  files.forEach(file => {
    if (file.endsWith('.json')) {
      fs.copyFileSync(
        path.join(dataDir, file),
        path.join(distDataDir, file)
      );
      console.log(`  - ${file}`);
    }
  });
}

console.log('✅ Build completed successfully!');
