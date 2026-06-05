import { Jimp } from "jimp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const logoPath = path.join(__dirname, "../public/logo/sanmora-logo.png");
  const image = await Jimp.read(logoPath);
  
  console.log("Original Width:", image.width, "Height:", image.height);
  
  // Inspect corners
  console.log("Top-left pixel color (RGBA):", image.getPixelColor(0, 0).toString(16));
  console.log("Top-right pixel color (RGBA):", image.getPixelColor(image.width - 1, 0).toString(16));
  console.log("Bottom-left pixel color (RGBA):", image.getPixelColor(0, image.height - 1).toString(16));
  console.log("Bottom-right pixel color (RGBA):", image.getPixelColor(image.width - 1, image.height - 1).toString(16));
  
  // Let's count transparent/white/non-transparent pixels and find the bounding box
  let minX = image.width, maxX = 0, minY = image.height, maxY = 0;
  let nonTransparentCount = 0;
  
  for (let y = 0; y < image.height; y++) {
    for (let x = 0; x < image.width; x++) {
      const color = image.getPixelColor(x, y);
      const a = color & 0xFF; // Get alpha channel if format is RGBA (last 8 bits)
      // Wait, in Jimp 1.x, getPixelColor returns a number. Let's see the hex representation.
      const r = (color >> 24) & 0xFF;
      const g = (color >> 16) & 0xFF;
      const b = (color >> 8) & 0xFF;
      const alpha = color & 0xFF;
      
      // If not fully transparent and not pure white (assuming white is background if not transparent)
      const isBg = (alpha === 0) || (r > 250 && g > 250 && b > 250);
      
      if (!isBg) {
        nonTransparentCount++;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  
  console.log("Non-background bounding box:");
  console.log(`X: ${minX} to ${maxX} (Width: ${maxX - minX})`);
  console.log(`Y: ${minY} to ${maxY} (Height: ${maxY - minY})`);
  console.log("Total non-background pixels:", nonTransparentCount);
}

main();
