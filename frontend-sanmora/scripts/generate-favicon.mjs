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
    
    console.log("Resizing image to 32x32...");
    image.resize({ w: 32, h: 32 });
    
    console.log("Writing favicon to:", outputPath);
    await image.write(outputPath);
    console.log("Favicon successfully generated at app/icon.png!");
  } catch (error) {
    console.error("Error generating favicon:", error);
  }
}

main();
