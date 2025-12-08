const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateIcons() {
  const assetsDir = path.join(__dirname, 'assets');
  
  // Create a simple SVG buffer
  const svgBuffer = Buffer.from(`
    <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#4F46E5;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#7C3AED;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="64" fill="url(#grad)"/>
      <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" 
            font-family="Arial, sans-serif" font-size="280" font-weight="bold" fill="white">S</text>
    </svg>
  `);

  try {
    console.log('🎨 Generating placeholder icons...\n');

    // Generate icon.png (512x512)
    await sharp(svgBuffer)
      .resize(512, 512)
      .png()
      .toFile(path.join(assetsDir, 'icon.png'));
    console.log('✅ Created icon.png (512x512)');

    // Generate tray-icon.png (64x64)
    await sharp(svgBuffer)
      .resize(64, 64)
      .png()
      .toFile(path.join(assetsDir, 'tray-icon.png'));
    console.log('✅ Created tray-icon.png (64x64)');

    // Generate multiple sizes for ICO
    const sizes = [16, 32, 48, 64, 128, 256];
    const pngFiles = [];
    
    for (const size of sizes) {
      const filename = path.join(assetsDir, `icon-${size}.png`);
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(filename);
      pngFiles.push(filename);
      console.log(`✅ Created icon-${size}.png (${size}x${size})`);
    }

    console.log('\n📝 Note: Proper .ico file generation requires additional tools.');
    console.log('   To create a proper multi-size icon.ico for production:');
    console.log('   1. Use online tool: https://convertico.com/');
    console.log('   2. Or use ImageMagick: convert icon-*.png icon.ico');
    console.log('   3. Or use png-to-ico package: npm install -g png-to-ico && png-to-ico assets/icon-256.png > assets/icon.ico');
    console.log('\n   ⚠️  For now, copying the 256x256 PNG as a fallback...');
    console.log('   This is NOT a proper ICO format and may not display correctly in all contexts.');
    console.log('   Use this for development only. Create a proper .ico for production.');
    
    // Copy 256x256 as icon.ico (not a real .ico but will work for development)
    fs.copyFileSync(path.join(assetsDir, 'icon-256.png'), path.join(assetsDir, 'icon.ico'));
    console.log('✅ Created icon.ico (development fallback only)');

    console.log('\n✨ All placeholder icons generated successfully!');
    console.log('📌 Remember to replace these with proper SurfSense branded icons before production release.');

  } catch (error) {
    console.error('❌ Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons();
