import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 Scanning strategy.js for dependencies...\n');

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

    console.log('📦 External dependencies detected:');
    imports.forEach(pkg => console.log(`   - ${pkg}`));
    console.log('');

    // Read package.json
    const packageJsonPath = join(__dirname, '..', 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    const installed = {
        ...packageJson.dependencies || {},
        ...packageJson.devDependencies || {}
    };

    // Check which are missing
    const missing = [];
    imports.forEach(pkg => {
        const pkgName = pkg.split('/')[0]; // Handle scoped packages like @org/package
        if (!installed[pkgName]) {
            missing.push(pkgName);
        }
    });

    if (missing.length === 0) {
        console.log('✅ All dependencies are already installed!\n');
        process.exit(0);
    }

    console.log('⚠️  Missing dependencies:');
    missing.forEach(pkg => console.log(`   - ${pkg}`));
    console.log('');

    // Ask to install (or auto-install if AUTO_INSTALL=true)
    const autoInstall = process.env.AUTO_INSTALL === 'true' || process.argv.includes('--auto');

    if (!autoInstall) {
        console.log('To install missing dependencies, run:');
        console.log(`   npm install ${missing.join(' ')}\n`);
        console.log('Or run this script with --auto flag to install automatically:');
        console.log('   npm run install-deps -- --auto\n');
        process.exit(1);
    }

    // Auto-install
    console.log('🚀 Auto-installing missing dependencies...\n');

    try {
        const installCmd = `npm install ${missing.join(' ')}`;
        console.log(`Running: ${installCmd}\n`);

        execSync(installCmd, {
            stdio: 'inherit',
            cwd: join(__dirname, '..')
        });

        console.log('\n✅ All dependencies installed successfully!\n');
        process.exit(0);

    } catch (installError) {
        console.error('\n❌ Failed to install dependencies!');
        console.error('   Please install manually:');
        console.error(`   npm install ${missing.join(' ')}\n`);
        process.exit(1);
    }

} catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
}
