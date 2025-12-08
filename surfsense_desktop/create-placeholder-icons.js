const fs = require('fs');
const path = require('path');

// Create a simple SVG icon as a placeholder
const svgIcon = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#4F46E5" rx="64"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" 
        font-family="Arial, sans-serif" font-size="200" font-weight="bold" fill="white">S</text>
</svg>`;

// Save the SVG file
const assetsDir = path.join(__dirname, 'assets');
const svgPath = path.join(assetsDir, 'icon.svg');

if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

fs.writeFileSync(svgPath, svgIcon);
console.log('Created placeholder icon: assets/icon.svg');
console.log('\nTo create proper icons:');
console.log('1. Replace icon.svg with your own design');
console.log('2. Convert to required formats (see assets/README.md)');
console.log('3. Or use the existing SurfSense logo from the web app');
