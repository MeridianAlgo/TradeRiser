import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 Checking strategy dependencies...\n');

try {
  // Read strategy.js
  const strategyPath = join(__dirname, '..', 'src', 'strategy.js');
  
  if (!existsSync(strategyPath)) {
    console.error('❌ strategy.js not found!');
    process.exit(1);
  }
  
  const strategyContent = readFileSync(strategyPath, 'utf-8');
  
  // Extract all imports (both ES6 and require)
  const es6ImportRegex = /import\s+.*\s+from\s+['"]([^'"]+)['"]/g;
  const requireRegex = /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
  
  const imports = new Set();
  let match;
  
  // Find ES6 imports
  while ((match = es6ImportRegex.exec(strategyContent)) !== null) {
    const importPath = match[1];
    // Only check external packages (not relative imports or node: protocol)
    if (!importPath.startsWith('.') && !importPath.startsWith('/') && !importPath.startsWith('node:')) {
      imports.add(importPath);
    }
  }
  
  // Find require() imports
  while ((match = requireRegex.exec(strategyContent)) !== null) {
    const importPath = match[1];
    if (!importPath.startsWith('.') && !importPath.startsWith('/') && !importPath.startsWith('node:')) {
      imports.add(importPath);
    }
  }
  
  if (imports.size === 0) {
    console.log('✅ No external dependencies found in strategy.js');
    console.log('   You are using only built-in indicators.\n');
    process.exit(0);
  }
  
  console.log('📦 External dependencies found:');
  imports.forEach(pkg => console.log(`   - ${pkg}`));
  console.log('');
  
  // Check if installed
  const packageJsonPath = join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  const installed = {
    ...packageJson.dependencies || {},
    ...packageJson.devDependencies || {}
  };
  
  const missing = [];
  imports.forEach(pkg => {
    const pkgName = pkg.split('/')[0]; // Handle scoped packages like @org/package
    if (!installed[pkgName]) {
      missing.push(pkgName);
    }
  });
  
  if (missing.length === 0) {
    console.log('✅ All dependencies are installed!\n');
    process.exit(0);
  }
  
  console.log('⚠️  Missing dependencies:');
  missing.forEach(pkg => console.log(`   - ${pkg}`));
  console.log('');
  console.log('💡 To install missing dependencies, run:');
  console.log(`   npm install ${missing.join(' ')}\n`);
  console.log('Or use the auto-installer:');
  console.log('   npm run install-deps -- --auto\n');
  
  process.exit(1);
  
} catch (error) {
  console.error('❌ Error checking dependencies:', error.message);
  process.exit(1);
}
