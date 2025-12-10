const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(process.cwd(), '.next', 'static');
const SCRIPT_TAG = '<script src="/dashboard-console-capture.js"></script>';

function findHTMLFiles(dir) {
  const files = [];
  
  function traverse(currentPath) {
    if (!fs.existsSync(currentPath)) return;
    
    const items = fs.readdirSync(currentPath);
    
    for (const item of items) {
      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (item.endsWith('.html')) {
        files.push(fullPath);
      }
    }
  }
  
  traverse(dir);
  return files;
}

function injectScript() {
  const htmlFiles = findHTMLFiles(OUT_DIR);
  let injectedCount = 0;
  
  for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf8');
    
    if (!content.includes('dashboard-console-capture.js')) {
      content = content.replace('</head>', `${SCRIPT_TAG}</head>`);
      fs.writeFileSync(file, content, 'utf8');
      injectedCount++;
    }
  }
  
  console.log(`✅ Injected console capture script into ${injectedCount} HTML files`);
}

try {
  injectScript();
} catch (error) {
  console.error('❌ Error injecting console capture script:', error);
  process.exit(1);
}