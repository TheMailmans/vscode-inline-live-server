const fs = require('fs');
const path = require('path');

function runPrePublishChecks() {
  console.log('Running pre-publish checks...');

  const checks = [
    checkPackageJson,
    checkMainEntryPoint,
    checkDependencies,
    checkLiveServerBundle,
    checkBuildOutput,
    checkExtensionStructure
  ];

  let allPassed = true;

  checks.forEach(check => {
    try {
      const result = check();
      if (!result) {
        allPassed = false;
      }
    } catch (error) {
      console.error(`Check failed: ${error.message}`);
      allPassed = false;
    }
  });

  if (!allPassed) {
    console.error('Pre-publish checks failed!');
    process.exit(1);
  }

  console.log('All pre-publish checks passed!');
}

function checkLiveServerBundle() {
  console.log('Verifying vendored live-server bundle...');

  const liveServerRoot = path.join(__dirname, '..', 'lib', 'live-server');
  const liveServerNodeModules = path.join(liveServerRoot, 'node_modules');

  if (!fs.existsSync(liveServerRoot)) {
    throw new Error('lib/live-server directory is missing');
  }

  if (!fs.existsSync(liveServerNodeModules)) {
    throw new Error(
      'lib/live-server/node_modules is missing. Run "npm run prepare:live-server" to install vendored dependencies.'
    );
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const liveServerModule = require(liveServerRoot);
    if (typeof liveServerModule.start !== 'function') {
      throw new Error('Vendored live-server module does not expose a start function');
    }
  } catch (error) {
    throw new Error(`Unable to load vendored live-server module: ${error.message}`);
  }

  return true;
}

function checkPackageJson() {
  console.log('Checking package.json...');

  if (!fs.existsSync('package.json')) {
    throw new Error('package.json not found');
  }

  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

  if (!packageJson.name) {
    throw new Error('package.json missing name field');
  }

  if (!packageJson.version) {
    throw new Error('package.json missing version field');
  }

  if (!packageJson.main) {
    throw new Error('package.json missing main field');
  }

  return true;
}

function checkMainEntryPoint() {
  console.log('Checking main entry point...');

  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const mainPath = packageJson.main;

  if (!mainPath) {
    throw new Error('No main entry point specified in package.json');
  }

  if (!fs.existsSync(mainPath)) {
    throw new Error(`Main entry point not found: ${mainPath}`);
  }

  return true;
}

function checkDependencies() {
  console.log('Checking dependencies...');

  if (!fs.existsSync('package-lock.json')) {
    console.warn('Warning: package-lock.json not found');
  }

  return true;
}

function checkBuildOutput() {
  console.log('Checking build output...');

  if (!fs.existsSync('dist/extension-enhanced.js')) {
    throw new Error('Build output not found: dist/extension-enhanced.js');
  }

  return true;
}

function checkExtensionStructure() {
  console.log('Checking extension structure...');

  const requiredFiles = [
    'package.json',
    'README.md',
    'dist/extension-enhanced.js'
  ];

  requiredFiles.forEach(file => {
    if (!fs.existsSync(file)) {
      throw new Error(`Required file missing: ${file}`);
    }
  });

  return true;
}

// Run checks if this script is executed directly
if (require.main === module) {
  runPrePublishChecks();
}

module.exports = { runPrePublishChecks };
