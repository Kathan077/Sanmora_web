import { Jimp } from "jimp";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  try {
    const logoPath = path.join(__dirname, "../public/logo/Footer_logo.png");
    const iconOutputPath = path.join(__dirname, "../app/icon.png");
    const faviconOutputPath = path.join(__dirname, "../app/favicon.ico");

    console.log("Reading logo from:", logoPath);
    const image = await Jimp.read(logoPath);
    
    // Create a transparent square canvas matching the largest dimension (width)
    const size = Math.max(image.width, image.height);
    console.log(`Original dimensions: ${image.width}x${image.height}. Creating square canvas of ${size}x${size}...`);
    
    const squaredImage = new Jimp({
      width: size,
      height: size,
      color: 0x00000000 // Fully transparent background
    });

    // Center the wide logo vertically in the square canvas
    const offsetX = Math.floor((size - image.width) / 2);
    const offsetY = Math.floor((size - image.height) / 2);
    
    squaredImage.composite(image, offsetX, offsetY);
    
    console.log("Resizing squared logo to 48x48...");
    squaredImage.resize({ w: 48, h: 48 });
    
    console.log("Writing to:", iconOutputPath);
    await squaredImage.write(iconOutputPath);

    console.log("Copying to:", faviconOutputPath);
    await fs.copyFile(iconOutputPath, faviconOutputPath);
    
    console.log("Favicon successfully generated at app/icon.png and app/favicon.ico!");
  } catch (error) {
    console.error("Error generating favicon:", error);
  }
}

main();

