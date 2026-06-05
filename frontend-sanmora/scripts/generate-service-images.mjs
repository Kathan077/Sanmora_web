import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..", "public", "images", "services");

const P = "#7C3AED";
const S = "#2563EB";
const W = "#FFFFFF";

function svg(id, title, inner) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 320" fill="none" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="g-${id}" x1="0" y1="0" x2="440" y2="320" gradientUnits="userSpaceOnUse">
      <stop stop-color="${P}"/>
      <stop offset="1" stop-color="${S}"/>
    </linearGradient>
    <filter id="sh-${id}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#1e1b4b" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="440" height="320" rx="24" fill="url(#g-${id})"/>
  <circle cx="370" cy="45" r="70" fill="${W}" fill-opacity="0.1"/>
  <circle cx="50" cy="275" r="55" fill="${W}" fill-opacity="0.08"/>
  ${inner}
</svg>`;
}

const services = {
  "website-development": `<rect x="48" y="56" width="344" height="208" rx="14" fill="${W}" fill-opacity="0.95" filter="url(#sh-website-development)"/><rect x="48" y="56" width="344" height="28" rx="14" fill="${P}" fill-opacity="0.12"/><circle cx="68" cy="70" r="5" fill="#ff5f56"/><circle cx="84" cy="70" r="5" fill="#ffbd2e"/><circle cx="100" cy="70" r="5" fill="#27c93f"/><rect x="72" y="108" width="120" height="10" rx="4" fill="${P}" fill-opacity="0.25"/><rect x="72" y="130" width="280" height="8" rx="4" fill="#E2E8F0"/><rect x="72" y="148" width="240" height="8" rx="4" fill="#E2E8F0"/><rect x="72" y="180" width="90" height="56" rx="8" fill="${S}" fill-opacity="0.15"/><rect x="174" y="180" width="90" height="56" rx="8" fill="${P}" fill-opacity="0.15"/><rect x="276" y="180" width="90" height="56" rx="8" fill="#E2E8F0"/>`,
  "digital-marketing": `<rect x="60" y="70" width="320" height="180" rx="16" fill="${W}" fill-opacity="0.95" filter="url(#sh-digital-marketing)"/><path d="M80 210 L120 170 L160 190 L200 130 L240 150 L280 110 L320 140 L360 90" stroke="${S}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="120" cy="170" r="6" fill="${P}"/><circle cx="200" cy="130" r="6" fill="${S}"/><circle cx="280" cy="110" r="6" fill="${P}"/>`,
  "logo-designing": `<circle cx="220" cy="155" r="72" fill="${W}" fill-opacity="0.95" filter="url(#sh-logo-designing)"/><path d="M220 95 L248 175 L172 135 L268 135 L192 175 Z" fill="${P}" fill-opacity="0.85"/><circle cx="220" cy="155" r="28" fill="${S}" fill-opacity="0.9"/>`,
  "software-development": `<rect x="70" y="78" width="140" height="164" rx="12" fill="${W}" fill-opacity="0.95" filter="url(#sh-software-development)"/><rect x="230" y="98" width="140" height="64" rx="12" fill="${W}" fill-opacity="0.9"/><rect x="230" y="178" width="140" height="64" rx="12" fill="${W}" fill-opacity="0.9"/><rect x="90" y="100" width="100" height="8" rx="4" fill="${P}" fill-opacity="0.3"/><rect x="90" y="158" width="60" height="60" rx="8" fill="${S}" fill-opacity="0.2"/>`,
  "application-development": `<rect x="155" y="62" width="130" height="220" rx="22" fill="${W}" fill-opacity="0.95" filter="url(#sh-application-development)"/><rect x="170" y="82" width="100" height="160" rx="8" fill="${P}" fill-opacity="0.08"/><rect x="185" y="120" width="70" height="50" rx="8" fill="${S}" fill-opacity="0.2"/><rect x="72" y="120" width="56" height="100" rx="14" fill="${W}" fill-opacity="0.35"/><rect x="312" y="120" width="56" height="100" rx="14" fill="${W}" fill-opacity="0.35"/>`,
};

const categories = {
  "website-development": {
    "static-website": `<rect x="55" y="65" width="330" height="190" rx="12" fill="${W}" fill-opacity="0.95" filter="url(#sh-ws-static)"/><rect x="75" y="95" width="140" height="12" rx="4" fill="${P}" fill-opacity="0.4"/><rect x="75" y="118" width="290" height="8" rx="4" fill="#E2E8F0"/><rect x="75" y="168" width="130" height="70" rx="8" fill="${S}" fill-opacity="0.18"/><rect x="220" y="168" width="130" height="70" rx="8" fill="${P}" fill-opacity="0.12"/>`,
    "dynamic-website": `<rect x="60" y="70" width="320" height="175" rx="14" fill="${W}" fill-opacity="0.95" filter="url(#sh-ws-dynamic)"/><path d="M120 200 Q220 80 320 200" stroke="${S}" stroke-width="3" fill="none"/><circle cx="120" cy="200" r="8" fill="${P}"/><circle cx="320" cy="200" r="8" fill="${S}"/>`,
    "e-commerce": `<rect x="65" y="75" width="310" height="165" rx="14" fill="${W}" fill-opacity="0.95" filter="url(#sh-ws-ecom)"/><rect x="90" y="100" width="70" height="70" rx="8" fill="${P}" fill-opacity="0.15"/><rect x="175" y="100" width="70" height="70" rx="8" fill="${S}" fill-opacity="0.15"/><rect x="120" y="195" width="200" height="28" rx="14" fill="${S}" fill-opacity="0.85"/>`,
    "cms-development": `<rect x="58" y="68" width="324" height="185" rx="14" fill="${W}" fill-opacity="0.95" filter="url(#sh-ws-cms)"/><rect x="78" y="88" width="100" height="145" rx="8" fill="${P}" fill-opacity="0.1"/><rect x="195" y="100" width="165" height="120" rx="8" fill="${S}" fill-opacity="0.12"/>`,
  },
  "digital-marketing": {
    "seo-optimization": `<circle cx="220" cy="150" r="70" fill="${W}" fill-opacity="0.95" filter="url(#sh-dm-seo)"/><circle cx="220" cy="150" r="45" stroke="${S}" stroke-width="6" fill="none"/><path d="M255 185 L290 220" stroke="${P}" stroke-width="8" stroke-linecap="round"/>`,
    "ppc-campaigns": `<rect x="70" y="80" width="300" height="150" rx="14" fill="${W}" fill-opacity="0.95" filter="url(#sh-dm-ppc)"/><rect x="95" y="105" width="55" height="90" rx="6" fill="${P}" fill-opacity="0.5"/><rect x="165" y="125" width="55" height="70" rx="6" fill="${S}" fill-opacity="0.55"/><rect x="235" y="95" width="55" height="100" rx="6" fill="${P}" fill-opacity="0.35"/>`,
    "social-media": `<rect x="150" y="70" width="140" height="200" rx="20" fill="${W}" fill-opacity="0.95" filter="url(#sh-dm-social)"/><circle cx="190" cy="115" r="18" fill="${P}" fill-opacity="0.3"/><circle cx="250" cy="115" r="18" fill="${S}" fill-opacity="0.3"/>`,
    "content-strategy": `<rect x="75" y="75" width="290" height="170" rx="14" fill="${W}" fill-opacity="0.95" filter="url(#sh-dm-content)"/><rect x="95" y="95" width="180" height="14" rx="4" fill="${P}" fill-opacity="0.35"/><rect x="95" y="120" width="250" height="8" rx="4" fill="#E2E8F0"/><rect x="95" y="180" width="100" height="45" rx="8" fill="${S}" fill-opacity="0.2"/>`,
  },
  "logo-designing": {
    "brand-identity": `<rect x="80" y="85" width="120" height="120" rx="16" fill="${W}" fill-opacity="0.95" filter="url(#sh-lg-brand)"/><circle cx="260" cy="145" r="50" fill="${W}" fill-opacity="0.9"/><circle cx="260" cy="145" r="22" fill="${S}"/>`,
    "vector-graphics": `<path d="M120 200 L200 100 L240 170 L300 100 L340 200 Z" fill="${W}" fill-opacity="0.25" stroke="${W}" stroke-width="2"/><circle cx="120" cy="200" r="8" fill="${P}"/><circle cx="200" cy="100" r="8" fill="${S}"/>`,
    "corporate-guidelines": `<rect x="90" y="70" width="260" height="190" rx="12" fill="${W}" fill-opacity="0.95" filter="url(#sh-lg-guide)"/><rect x="110" y="90" width="80" height="50" rx="6" fill="${P}" fill-opacity="0.2"/><rect x="110" y="210" width="60" height="24" rx="6" fill="${P}"/><rect x="180" y="210" width="60" height="24" rx="6" fill="${S}"/>`,
    "typography": `<text x="70" y="200" fill="${W}" font-size="72" font-weight="800" font-family="Georgia,serif">Aa</text><rect x="240" y="95" width="130" height="130" rx="12" fill="${W}" fill-opacity="0.92" filter="url(#sh-lg-type)"/>`,
  },
  "software-development": {
    "custom-saas": `<rect x="65" y="75" width="310" height="165" rx="14" fill="${W}" fill-opacity="0.95" filter="url(#sh-sw-saas)"/><rect x="95" y="95" width="90" height="28" rx="8" fill="${S}" fill-opacity="0.25"/><path d="M120 200 h80 v25 h-80z M220 190 h80 v35 h-80z" fill="${P}" fill-opacity="0.2"/>`,
    "api-development": `<circle cx="120" cy="160" r="35" fill="${W}" fill-opacity="0.95" filter="url(#sh-sw-api)"/><circle cx="220" cy="160" r="35" fill="${W}" fill-opacity="0.95"/><circle cx="320" cy="160" r="35" fill="${W}" fill-opacity="0.95"/><path d="M155 160 H185 M255 160 H285" stroke="${W}" stroke-width="4" stroke-linecap="round"/>`,
    "database-architecture": `<ellipse cx="220" cy="110" rx="90" ry="28" fill="${W}" fill-opacity="0.95" filter="url(#sh-sw-db)"/><rect x="130" y="110" width="180" height="70" fill="${W}" fill-opacity="0.9"/><ellipse cx="220" cy="180" rx="90" ry="28" fill="${W}" fill-opacity="0.85"/>`,
    "cloud-infrastructure": `<path d="M120 200 Q120 140 170 140 Q180 100 220 100 Q270 100 280 140 Q330 140 330 200 Z" fill="${W}" fill-opacity="0.95" filter="url(#sh-sw-cloud)"/><circle cx="190" cy="178" r="6" fill="${S}"/><circle cx="220" cy="178" r="6" fill="${S}"/><circle cx="250" cy="178" r="6" fill="${S}"/>`,
  },
  "application-development": {
    "ios-development": `<rect x="165" y="55" width="110" height="210" rx="24" fill="${W}" fill-opacity="0.95" filter="url(#sh-app-ios)"/><rect x="180" y="85" width="80" height="140" rx="6" fill="${P}" fill-opacity="0.1"/>`,
    "android-development": `<rect x="155" y="60" width="130" height="205" rx="18" fill="${W}" fill-opacity="0.95" filter="url(#sh-app-android)"/><path d="M175 75 L195 55 M255 75 L235 55" stroke="${W}" stroke-width="4" stroke-linecap="round"/>`,
    "react-native": `<ellipse cx="220" cy="160" rx="35" ry="90" fill="${W}" fill-opacity="0.95" filter="url(#sh-app-rn)"/><ellipse cx="220" cy="160" rx="90" ry="35" stroke="${S}" stroke-width="3" fill="none"/><circle cx="220" cy="160" r="12" fill="${S}"/>`,
    "flutter": `<path d="M120 220 L200 80 L240 140 L320 80 L280 220 Z" fill="${W}" fill-opacity="0.95" filter="url(#sh-app-flutter)"/><path d="M200 80 L240 140 L200 180 L160 140 Z" fill="${P}" fill-opacity="0.5"/>`,
  },
};

fs.mkdirSync(rootDir, { recursive: true });

for (const [slug, inner] of Object.entries(services)) {
  const file = path.join(rootDir, `${slug}.svg`);
  fs.writeFileSync(file, svg(slug, slug, inner));
  console.log("wrote", file);
}

for (const [svc, cats] of Object.entries(categories)) {
  const dir = path.join(rootDir, svc);
  fs.mkdirSync(dir, { recursive: true });
  for (const [cat, inner] of Object.entries(cats)) {
    const id = `${svc}-${cat}`;
    const fixedInner = inner.replace(/url\(#sh-[^)]+\)/g, `url(#sh-${id})`);
    const file = path.join(dir, `${cat}.svg`);
    fs.writeFileSync(file, svg(id, cat, fixedInner));
    console.log("wrote", file);
  }
}

console.log("done");
