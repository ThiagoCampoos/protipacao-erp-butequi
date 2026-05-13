const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components');
const files = fs.readdirSync(dir).filter(f => f.startsWith('Admin') && f.endsWith('.tsx') && f !== 'AdminSidebar.tsx');

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove the badly placed import
  content = content.replace('import AdminSidebar from "./AdminSidebar";\n', '');
  
  // Add it at the very top
  content = 'import AdminSidebar from "./AdminSidebar";\n' + content;
  
  fs.writeFileSync(filePath, content);
  console.log(`Fixed ${file}`);
});
