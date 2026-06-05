import { Jimp } from "jimp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  try {
    const logoPath = path.join(__dirname, "../public/logo/sanmora-logo.png");
    const outputPath = path.join(__dirname, "../app/icon.png");

    console.log("Reading logo from:", logoPath);
    const image = await Jimp.read(logoPath);
    
    // Find custom bounding box based on alpha channel
    let minX = image.width;
    let maxX = 0;
    let minY = image.height;
    let maxY = 0;
    let found = false;

    for (let y = 0; y < image.height; y++) {
      for (let x = 0; x < image.width; x++) {
        const color = image.getPixelColor(x, y);
        const alpha = color & 0xFF; // Last 8 bits of RGBA
        
        if (alpha > 10) { // If pixel is not transparent
          found = true;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (!found) {
      console.log("No non-transparent pixels found. Resizing original...");
      image.resize({ w: 128, h: 128 });
    } else {
      const cropWidth = (maxX - minX) + 1;
      const cropHeight = (maxY - minY) + 1;
      console.log(`Cropping logo content: X=${minX}, Y=${minY}, Width=${cropWidth}, Height=${cropHeight}`);
      
      // Crop to the bounding box
      image.crop({ x: minX, y: minY, w: cropWidth, h: cropHeight });

      // Pad to a square to prevent distortion
      const size = Math.max(cropWidth, cropHeight);
      const squaredImage = new Jimp({
        width: size,
        height: size,
        color: 0x00000000 // Fully transparent background
      });

      // Center the cropped image on the square canvas
      const offsetX = Math.floor((size - cropWidth) / 2);
      const offsetY = Math.floor((size - cropHeight) / 2);
      
      squaredImage.composite(image, offsetX, offsetY);
      
      console.log("Resizing squared logo to 128x128...");
      squaredImage.resize({ w: 128, h: 128 });
      
      console.log("Writing to:", outputPath);
      await squaredImage.write(outputPath);
    }
    
    console.log("Favicon successfully generated at app/icon.png!");
  } catch (error) {
    console.error("Error generating favicon:", error);
  }
}

main();
