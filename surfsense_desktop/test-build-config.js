#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing SurfSense Desktop Build Configuration...\n');

let passed = 0;
let failed = 0;

// Test 1: Check package.json
console.log('Test 1: Validating package.json...');
try {
  const pkg = require('./package.json');
  
  // Check required fields
  if (!pkg.name) throw new Error('Missing name field');
  if (!pkg.version) throw new Error('Missing version field');
  if (!pkg.main) throw new Error('Missing main field');
  if (!pkg.build) throw new Error('Missing build configuration');
  
  // Check main file exists
  if (!fs.existsSync(path.join(__dirname, pkg.main))) {
    throw new Error(`Main file ${pkg.main} not found`);
  }
  
  console.log('  ✅ package.json is valid');
  passed++;
} catch (error) {
  console.log(`  ❌ package.json error: ${error.message}`);
  failed++;
}

// Test 2: Check main process
console.log('\nTest 2: Validating main process...');
try {
  const mainPath = path.join(__dirname, 'main.js');
  const mainContent = fs.readFileSync(mainPath, 'utf8');
  
  // Check for required imports
  const requiredImports = ['electron', 'path'];
  for (const imp of requiredImports) {
    if (!mainContent.includes(`require('${imp}')`)) {
      throw new Error(`Missing required import: ${imp}`);
    }
  }
  
  // Check for required functions
  const requiredFunctions = ['createWindow', 'app.whenReady'];
  for (const func of requiredFunctions) {
    if (!mainContent.includes(func)) {
      throw new Error(`Missing required function: ${func}`);
    }
  }
  
  console.log('  ✅ Main process is valid');
  passed++;
} catch (error) {
  console.log(`  ❌ Main process error: ${error.message}`);
  failed++;
}

// Test 3: Check preload script
console.log('\nTest 3: Validating preload script...');
try {
  const preloadPath = path.join(__dirname, 'preload.js');
  const preloadContent = fs.readFileSync(preloadPath, 'utf8');
  
  // Check for contextBridge
  if (!preloadContent.includes('contextBridge')) {
    throw new Error('Preload script should use contextBridge');
  }
  
  console.log('  ✅ Preload script is valid');
  passed++;
} catch (error) {
  console.log(`  ❌ Preload script error: ${error.message}`);
  failed++;
}

// Test 4: Check assets
console.log('\nTest 4: Validating assets...');
try {
  const assetsDir = path.join(__dirname, 'assets');
  
  if (!fs.existsSync(assetsDir)) {
    throw new Error('Assets directory not found');
  }
  
  const requiredAssets = ['icon.png', 'icon.ico', 'tray-icon.png'];
  for (const asset of requiredAssets) {
    const assetPath = path.join(assetsDir, asset);
    if (!fs.existsSync(assetPath)) {
      throw new Error(`Missing asset: ${asset}`);
    }
  }
  
  console.log('  ✅ All required assets are present');
  passed++;
} catch (error) {
  console.log(`  ❌ Assets error: ${error.message}`);
  failed++;
}

// Test 5: Check build configuration
console.log('\nTest 5: Validating build configuration...');
try {
  const pkg = require('./package.json');
  const build = pkg.build;
  
  if (!build.appId) throw new Error('Missing appId');
  if (!build.win) throw new Error('Missing Windows configuration');
  if (!build.win.target) throw new Error('Missing Windows target');
  
  console.log('  ✅ Build configuration is valid');
  passed++;
} catch (error) {
  console.log(`  ❌ Build configuration error: ${error.message}`);
  failed++;
}

// Test 6: Check electron-builder
console.log('\nTest 6: Checking electron-builder installation...');
try {
  const nodeModules = path.join(__dirname, 'node_modules');
  const electronBuilder = path.join(nodeModules, 'electron-builder');
  const electron = path.join(nodeModules, 'electron');
  
  if (!fs.existsSync(electronBuilder)) {
    throw new Error('electron-builder not installed');
  }
  
  if (!fs.existsSync(electron)) {
    throw new Error('electron not installed');
  }
  
  console.log('  ✅ electron-builder and electron are installed');
  passed++;
} catch (error) {
  console.log(`  ❌ Dependencies error: ${error.message}`);
  failed++;
}

// Summary
console.log('\n' + '='.repeat(50));
console.log('📊 Test Results:');
console.log(`   Passed: ${passed}`);
console.log(`   Failed: ${failed}`);
console.log('='.repeat(50));

if (failed === 0) {
  console.log('\n✨ All tests passed! The application is ready to build.');
  console.log('\n📝 To build the Windows application:');
  console.log('   npm run build        # Create NSIS installer + portable');
  console.log('   npm run build:dir    # Create unpacked build for testing');
  console.log('\n⚠️  Note: Building on non-Windows systems requires Wine or VM.');
  process.exit(0);
} else {
  console.log('\n❌ Some tests failed. Please fix the issues before building.');
  process.exit(1);
}
