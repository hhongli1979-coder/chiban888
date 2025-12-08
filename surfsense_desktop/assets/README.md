# Assets Directory

This directory contains the icons and visual assets for the SurfSense desktop application.

## Required Files

For the Windows desktop application to build properly, you need the following icon files:

### 1. icon.ico
- **Purpose**: Main application icon for Windows
- **Requirements**: 
  - Must be in .ico format
  - Recommended sizes: 16x16, 32x32, 48x48, 64x64, 128x128, 256x256
  - Used for: Application window, taskbar, installer

### 2. icon.png
- **Purpose**: Application window icon (non-Windows fallback)
- **Requirements**:
  - PNG format
  - Recommended size: 512x512 or larger
  - Transparent background

### 3. tray-icon.png
- **Purpose**: System tray icon
- **Requirements**:
  - PNG format
  - Recommended size: 32x32 or 64x64 (will be scaled to 16x16)
  - Should be simple and recognizable at small sizes
  - Transparent background

## Creating Icons

### From Existing Logo

If you have a SurfSense logo, you can convert it to the required formats:

1. **Using ImageMagick** (Linux/Mac):
```bash
# Create PNG icons
convert logo.svg -resize 512x512 icon.png
convert logo.svg -resize 64x64 tray-icon.png

# Create ICO with multiple sizes
convert logo.png -define icon:auto-resize=256,128,64,48,32,16 icon.ico
```

2. **Using Online Tools**:
   - [ConvertICO](https://convertico.com/) - Convert images to ICO
   - [ICO Convert](https://icoconvert.com/) - Create multi-size ICO files
   - [CloudConvert](https://cloudconvert.com/) - Format conversion

### Design Guidelines

- **Simple and Clear**: The icon should be recognizable at small sizes
- **Consistent Branding**: Use SurfSense brand colors and design
- **High Contrast**: Ensure good visibility on both light and dark backgrounds
- **No Text**: Icons should be symbolic, without small text

## Placeholder Icons

For development purposes, you can use placeholder icons. The application will work without icons, but Windows may display default application icons.

## Using Custom Icons

1. Place your icon files in this directory:
   - `assets/icon.ico`
   - `assets/icon.png`
   - `assets/tray-icon.png`

2. Rebuild the application:
```bash
npm run build
```

The icons will be embedded in the final Windows application.

## Troubleshooting

### Icons not appearing in built app
- Verify icon files exist in the `assets/` directory
- Check file names match exactly: `icon.ico`, `icon.png`, `tray-icon.png`
- Ensure ICO file contains multiple sizes
- Rebuild the application after adding icons

### Low quality icons
- Use higher resolution source images
- Ensure ICO file includes all recommended sizes
- Use vector formats (SVG) for source when possible
