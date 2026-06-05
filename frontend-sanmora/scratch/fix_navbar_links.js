const fs = require('fs');
let c = fs.readFileSync('components/Navbar/Navbar.jsx', 'utf8');

if (!c.includes("import Link from 'next/link';")) {
  c = "import Link from 'next/link';\n" + c;
}

// Replace all <a ...> with <Link ...>
c = c.replace(/<a /g, '<Link ');
c = c.replace(/<\/a>/g, '</Link>');

fs.writeFileSync('components/Navbar/Navbar.jsx', c);
console.log("Navbar updated with Link tags");
