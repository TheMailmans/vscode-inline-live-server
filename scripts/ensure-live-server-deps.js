const { existsSync } = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

function ensureLiveServerDependencies() {
  const liveServerRoot = path.join(__dirname, '..', 'lib', 'live-server');
  const nodeModulesPath = path.join(liveServerRoot, 'node_modules');
  const checkFile = path.join(nodeModulesPath, 'connect');

  if (existsSync(nodeModulesPath) && existsSync(checkFile)) {
    console.log('Vendored live-server dependencies already installed.');
    return;
  }

  console.log('Installing vendored live-server dependencies...');

  const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const installArgs = [
    'install',
    '--prefix',
    liveServerRoot,
    '--production',
    '--no-audit',
    '--no-fund'
  ];

  const result = spawnSync(npmCommand, installArgs, {
    stdio: 'inherit',
    env: {
      ...process.env,
      // Avoid triggering nested postinstall scripts inside the vendored package
      npm_config_loglevel: process.env.npm_config_loglevel || 'error'
    }
  });

  if (result.status !== 0) {
    throw new Error('Failed to install vendored live-server dependencies');
  }

  console.log('Vendored live-server dependencies installed successfully.');
}

if (require.main === module) {
  try {
    ensureLiveServerDependencies();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = { ensureLiveServerDependencies };
