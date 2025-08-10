const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const pngToIco = require('png-to-ico');

// 确保目录存在
const dirs = [
  'build/icons/mac',
  'build/icons/png',
  'build/icons/win'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// 源文件路径
const sourceLogo = path.join('src', 'render', 'assets', 'logo.png');

// 生成不同尺寸的 PNG 图标
const sizes = [16, 24, 32, 48, 64, 128, 256, 512, 1024];
const pngFiles = [];

// 生成 PNG 文件
async function generatePNGs() {
  for (const size of sizes) {
    const outputPath = path.join('build', 'icons', 'png', `${size}x${size}.png`);
    await sharp(sourceLogo)
      .resize(size, size)
      .toFile(outputPath);
    pngFiles.push(outputPath);
  }
}

// 生成 Windows ICO 文件
async function generateICO() {
  try {
    const icoBuffer = await pngToIco(pngFiles);
    fs.writeFileSync(path.join('build', 'icons', 'win', 'icon.ico'), icoBuffer);
  } catch (err) {
    console.error('Error generating ICO file:', err);
  }
}

// 生成 macOS ICNS 文件
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
    'icon_512x512@2x.png': 1024
  };

  // 生成不同尺寸的图标
  for (const [filename, size] of Object.entries(iconSizes)) {
    await sharp(sourceLogo)
      .resize(size, size)
      .toFile(path.join(iconsetDir, filename));
  }

  // 使用 iconutil 生成 ICNS 文件
  try {
    execSync(`iconutil -c icns "${iconsetDir}" -o "${path.join('build', 'icons', 'mac', 'icon.icns')}"`);
    // 清理临时文件
    fs.rmSync(iconsetDir, { recursive: true, force: true });
  } catch (err) {
    console.error('Error generating ICNS file:', err);
  }
}

// 执行所有转换
async function convertAll() {
  try {
    await generatePNGs();
    await generateICO();
    await generateICNS();
    console.log('所有图标转换完成！');
  } catch (err) {
    console.error('转换过程中出错:', err);
  }
}

convertAll();
