const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/seoPagesData.js');
let content = fs.readFileSync(filePath, 'utf8');
content = content.replace(/Sanmora Studio/g, 'Sanmora Technologies');
fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated seoPagesData.js');
