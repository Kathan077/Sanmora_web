const fs = require('fs');
const path = require('path');

// Let's inspect the files in the directory
const dir = 'C:\\Users\\Dell\\.gemini\\antigravity-ide\\brain\\a776a10a-d36a-437e-bb90-7bb96a722dab';
const files = fs.readdirSync(dir);

console.log("All files in brain dir:");
files.forEach(f => {
  const stat = fs.statSync(path.join(dir, f));
  console.log(`${f} - ${stat.size} bytes - ${stat.mtime}`);
});
