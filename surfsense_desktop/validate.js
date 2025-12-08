#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating SurfSense Desktop Application Structure...\n');

const checks = [
  {
    name: 'Main process file (main.js)',
    path: './main.js',
    required: true
  },
  {
    name: 'Preload script (preload.js)',
    path: './preload.js',
    required: true
  },
  {
    name: 'Package configuration (package.json)',
    path: './package.json',
    required: true
  },
  {
    name: 'Environment template (.env.example)',
    path: './.env.example',
    required: true
  },
  {
    name: 'Assets directory',
    path: './assets',
    required: true,
    isDirectory: true
  },
  {
    name: 'README documentation',
    path: './README.md',
    required: true
  }
];

let passed = 0;
let failed = 0;

checks.forEach(check => {
  const fullPath = path.join(__dirname, check.path);
  const exists = fs.existsSync(fullPath);
  
  if (exists) {
    if (check.isDirectory) {
      const isDir = fs.statSync(fullPath).isDirectory();
      if (isDir) {
        console.log(`✅ ${check.name}`);
        passed++;
      } else {
        console.log(`❌ ${check.name} (exists but not a directory)`);
        failed++;
      }
    } else {
      console.log(`✅ ${check.name}`);
      passed++;
    }
  } else {
    if (check.required) {
      console.log(`❌ ${check.name} (missing)`);
      failed++;
    } else {
      console.log(`⚠️  ${check.name} (optional, missing)`);
    }
  }
});

console.log('\n📊 Validation Results:');
console.log(`   Passed: ${passed}`);
console.log(`   Failed: ${failed}`);

if (failed === 0) {
  console.log('\n✨ All required files are present!');
  console.log('📝 Next steps:');
  console.log('   1. Create proper icon files (see assets/README.md)');
  console.log('   2. Ensure backend and frontend are running');
  console.log('   3. Run "npm run dev" to test the application');
  console.log('   4. Run "npm run build" to create Windows installer');
  process.exit(0);
} else {
  console.log('\n❌ Some required files are missing.');
  console.log('   Please ensure all files are in place before building.');
  process.exit(1);
}
