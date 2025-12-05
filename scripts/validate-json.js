const fs = require('fs');
const path = require('path');

console.log('🔍 Validating JSON files...\n');

const dataDir = path.join(__dirname, '..', 'data');
const jsonFiles = [
  'articles.json',
  'presentations.json',
  'repositories.json',
  'experience.json',
  'skills.json'
];

let hasErrors = false;

jsonFiles.forEach(file => {
  const filePath = path.join(dataDir, file);
  
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error(`❌ ${file}: File not found`);
      hasErrors = true;
      return;
    }

    // Read and parse JSON
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);

    // Validate based on file type
    let count = 0;
    let isValid = true;

    switch (file) {
      case 'articles.json':
        count = Array.isArray(data) ? data.length : 0;
        isValid = Array.isArray(data) && data.every(item => 
          item.title && item.description && item.tags && item.date && item.readTime && item.url
        );
        break;

      case 'presentations.json':
        count = Array.isArray(data) ? data.length : 0;
        isValid = Array.isArray(data) && data.every(item => 
          item.title && item.description && item.tags && item.url
        );
        break;

      case 'repositories.json':
        count = Array.isArray(data) ? data.length : 0;
        isValid = Array.isArray(data) && data.every(item => 
          item.title && item.description && item.url
        );
        break;

      case 'experience.json':
        count = Array.isArray(data) ? data.length : 0;
        isValid = Array.isArray(data) && data.every(item => 
          item.company && item.logo && item.title && item.description && item.period && item.tags
        );
        break;

      case 'skills.json':
        count = `${data.technical?.length || 0} technical, ${data.soft?.length || 0} soft, ${data.businessAreas?.length || 0} business`;
        isValid = data.technical && data.soft && data.businessAreas;
        break;
    }

    if (isValid) {
      console.log(`✅ ${file}: Valid (${count} ${file === 'skills.json' ? 'skills' : 'entries'})`);
    } else {
      console.error(`❌ ${file}: Invalid structure or missing required fields`);
      hasErrors = true;
    }

  } catch (error) {
    console.error(`❌ ${file}: ${error.message}`);
    hasErrors = true;
  }
});

if (hasErrors) {
  console.error('\n❌ JSON validation failed!');
  process.exit(1);
} else {
  console.log('\n✅ All JSON files are valid!');
  process.exit(0);
}
