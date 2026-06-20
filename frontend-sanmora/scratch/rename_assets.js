const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public', 'images');
const oldDir = path.join(publicDir, 'case study');
const newDir = path.join(publicDir, 'case-studies');

// 1. Rename directory if needed
if (fs.existsSync(oldDir)) {
  console.log(`Renaming folder from: "${oldDir}" to: "${newDir}"`);
  fs.renameSync(oldDir, newDir);
} else {
  console.log(`Folder "${oldDir}" does not exist, checking if "${newDir}" already exists.`);
}

if (!fs.existsSync(newDir)) {
  console.error(`Error: target directory "${newDir}" does not exist.`);
  process.exit(1);
}

// 2. Mapping of old filenames to new URL-safe filenames
const mapping = {
  "Complete Rebrand for an AI Startup.jpeg": "complete-rebrand-for-an-ai-startup.jpeg",
  "Corporate Website Overhaul for a Global Consultancy.jpeg": "corporate-website-overhaul-for-a-global-consultancy.jpeg",
  "Cross-Platform Telehealth Application.jpeg": "cross-platform-telehealth-application.jpeg",
  "Dominating Search for B2B Enterprise Software.jpeg": "dominating-search-for-b2b-enterprise-software.jpeg",
  "Frictionless Onboarding for HR Software.jpeg": "frictionless-onboarding-for-hr-software.jpeg",
  "Gamified Fitness Tracking Application.jpeg": "gamified-fitness-tracking-application.jpeg",
  "High-Intent PPC Campaigns for a Law Firm.jpeg": "high-intent-ppc-campaigns-for-a-law-firm.jpeg",
  "High-Traffic Media Publishing Platform.jpeg": "high-traffic-media-publishing-platform.jpeg",
  "Launching a Sustainable Consumer Brand.jpeg": "launching-a-sustainable-consumer-brand.jpeg",
  "Luxury Real Estate Browsing Experience.jpeg": "luxury-real-estate-browsing-experience.jpeg",
  "Real-time Tracking Dashboard for Global Logistics.jpeg": "real-time-tracking-dashboard-for-global-logistics.jpeg",
  "Revamping UX to Drive E-Commerce Sales.jpeg": "revamping-ux-to-drive-e-commerce-sales.jpeg",
  "Scaling a Fintech Platform for 1M+ Active Users.jpeg": "scaling-a-fintech-platform-for-1m-active-users.jpeg",
  "Typography & Visual Refresh for a Lifestyle Brand.jpeg": "typography-and-visual-refresh-for-a-lifestyle-brand.jpeg",
  "WhatsApp Image 2026-06-18 at 17.37.19.jpeg": "whatsapp-image.jpeg"
};

// 3. Perform file renames
const files = fs.readdirSync(newDir);
console.log(`Files found in directory:`, files);

files.forEach(file => {
  const targetName = mapping[file];
  if (targetName) {
    const oldPath = path.join(newDir, file);
    const newPath = path.join(newDir, targetName);
    if (fs.existsSync(oldPath)) {
      console.log(`Renaming file: "${file}" -> "${targetName}"`);
      fs.renameSync(oldPath, newPath);
    }
  } else {
    console.log(`No renaming rule for: "${file}"`);
  }
});

console.log("Renaming completed successfully!");
