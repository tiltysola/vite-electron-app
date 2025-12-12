/* eslint-disable no-console */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import pngToIco from 'png-to-ico';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

// Get current file directory (ESM compatibility)
fileURLToPath(import.meta.url);

// Ensure directories exist
const dirs = ['build/icons/mac', 'build/icons/png', 'build/icons/win'];

dirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Source file path
const sourceLogo = path.join('src', 'render', 'assets', 'logo.png');

// Generate different size PNG icons
const sizes = [16, 24, 32, 48, 64, 128, 256, 512, 1024];
const pngFiles = [];

// Generate PNG files
async function generatePNGs() {
  for (const size of sizes) {
    const outputPath = path.join('build', 'icons', 'png', `${size}x${size}.png`);
    // eslint-disable-next-line no-await-in-loop
    await sharp(sourceLogo).resize(size, size).toFile(outputPath);
    pngFiles.push(outputPath);
  }
}

// Generate Windows ICO files
async function generateICO() {
  try {
    // Only use smaller icon sizes to avoid file size issues
    const smallPngFiles = pngFiles.filter((file) => {
      const size = parseInt(path.basename(file, '.png').split('x')[0], 10);
      return size <= 256; // Only use icons up to 256x256
    });

    const icoBuffer = await pngToIco(smallPngFiles);
    fs.writeFileSync(path.join('build', 'icons', 'win', 'icon.ico'), icoBuffer);
    console.log(
      'ICO files generated successfully, using the following sizes:',
      smallPngFiles.map((f) => path.basename(f)),
    );
  } catch (err) {
    console.error('Error generating ICO file:', err);
  }
}

// Generate macOS ICNS files
async function generateICNS() {
  const iconsetDir = path.join('build', 'icons', 'mac', 'icon.iconset');
  if (!fs.existsSync(iconsetDir)) {
    fs.mkdirSync(iconsetDir, { recursive: true });
  }

  const iconSizes = {
    'icon_16x16.png': 16,
    'icon_16x16@2x.png': 32,
    'icon_32x32.png': 32,
    'icon_32x32@2x.png': 64,
    'icon_128x128.png': 128,
    'icon_128x128@2x.png': 256,
    'icon_256x256.png': 256,
    'icon_256x256@2x.png': 512,
    'icon_512x512.png': 512,
    'icon_512x512@2x.png': 1024,
  };

  // Generate different size icons
  for (const [filename, size] of Object.entries(iconSizes)) {
    // eslint-disable-next-line no-await-in-loop
    await sharp(sourceLogo).resize(size, size).toFile(path.join(iconsetDir, filename));
  }

  // Use iconutil to generate ICNS files
  try {
    execSync(
      `iconutil -c icns "${iconsetDir}" -o "${path.join('build', 'icons', 'mac', 'icon.icns')}"`,
    );
    // Clean up temporary files
    fs.rmSync(iconsetDir, { recursive: true, force: true });
  } catch (err) {
    console.error('Error generating ICNS file:', err);
  }
}

// Execute all conversions
async function convertAll() {
  try {
    await generatePNGs();
    await generateICO();
    await generateICNS();
    console.log('All icons converted successfully!');
  } catch (err) {
    console.error('Error during conversion:', err);
  }
}

convertAll();
