// wdio.conf.js - cleaned and ready-to-drop
const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
// optional: if you prefer using the node API instead of npx you can install allure-commandline
// const allureCli = require('allure-commandline');

exports.config = {
  //
  // ====================
  // Runner / Server
  // ====================
  runner: 'local',
  hostname: '127.0.0.1',
  port: 4723,
  path: '/',

  //
  // ====================
  // Specify Test Files
  // ====================
  specs: [
    './tests/specs/launch.spec.js',
    './tests/specs/login.spec.js',
    './tests/specs/home.spec.js',
    './tests/specs/logout.spec.js'
  ],
  exclude: [],

  //
  // ============
  // Capabilities
  // ============
  maxInstances: 1,
  capabilities: [
    {
      platformName: 'Android',
      'appium:deviceName': 'emulator-5554',
      'appium:udid': 'emulator-5554',
      'appium:platformVersion': '14',
      'appium:automationName': 'UiAutomator2',
      'appium:appPackage': 'com.gwl.trashscan',
      'appium:appActivity': 'com.gwl.trashscan.ui.splash.SplashActivity',
      'appium:noReset': true,
      'appium:autoGrantPermissions': true
    }
  ],

  //
  // ===================
  // Test Configurations
  // ===================
  logLevel: 'info',
  bail: 0,
  baseUrl: '',
  waitforTimeout: 30000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: 'mocha',

  mochaOpts: {
    ui: 'bdd',
    timeout: 180000
  },

  //
  // =========
  // Reporters
  // =========
  reporters: [
    ['allure', {
      outputDir: 'allure-results',
      disableWebdriverStepsReporting: false,
      disableWebdriverScreenshotsReporting: false
    }]
  ],

  //
  // =====
  // Hooks
  // =====
  beforeSuite: function (suite) {
    console.log(`🚀 Starting suite: ${suite.title}`);
  },

  afterSuite: function (suite) {
    console.log(`✅ Finished suite: ${suite.title}`);
  },

  /**
   * onComplete: generate Allure report synchronously so errors are visible in WDIO logs,
   * then try to open the report (unless CI). If opening fails, fallback to OS opener.
   */
  onPrepare: function (config, capabilities) {
    console.log('🧹 onPrepare: cleaning old Allure folders (allure-results, allure-report) ...');
    const resultsDir = path.join(process.cwd(), 'allure-results');
    const reportDir = path.join(process.cwd(), 'allure-report');

    try {
      if (fs.existsSync(resultsDir)) {
        fs.rmSync(resultsDir, { recursive: true, force: true });
        console.log(`🧹 Deleted old folder: ${resultsDir}`);
      }
      if (fs.existsSync(reportDir)) {
        fs.rmSync(reportDir, { recursive: true, force: true });
        console.log(`🧹 Deleted old folder: ${reportDir}`);
      }
    } catch (err) {
      console.warn('⚠️ onPrepare cleanup error (non-fatal):', err);
    }
  },

  /**
   * Runs after the test run finished. Generate the report from generated results.
   */
  onComplete: function (exitCode, config, capabilities, results) {
    console.log('📊 onComplete: Generating Allure report from test results...');

    const resultsDir = path.join(process.cwd(), 'allure-results');
    const reportDir = path.join(process.cwd(), 'allure-report');

    // Make sure tests produced results
    if (!fs.existsSync(resultsDir)) {
      console.error(`❌ onComplete: ${resultsDir} does not exist. Tests did not produce allure-results.`);
      console.log('➡️ Verify the Allure reporter is configured and tests are running with the reporter.');
      return;
    }
    const files = fs.readdirSync(resultsDir);
    if (!files || files.length === 0) {
      console.error(`❌ onComplete: no files found in ${resultsDir}. Tests did not produce Any Allure files.`);
      console.log('➡️ Check that your tests actually emit allure data and that reporter outputDir matches.');
      return;
    }
    console.log(`ℹ️ onComplete: found ${files.length} files in ${resultsDir} — proceeding to generate.`);

    // generate (sync so logs appear in WDIO console)
    try {
      console.log('🔁 Running: npx allure generate allure-results -o allure-report --clean');
      const genOut = execSync('npx allure generate allure-results -o allure-report --clean', { stdio: 'pipe', maxBuffer: 50 * 1024 * 1024 });
      console.log('📄 Allure generate stdout:\n', genOut.toString());
    } catch (genErr) {
      console.error('❌ Allure generation failed:', genErr.message || genErr);
      if (genErr.stdout) console.log('stdout:', genErr.stdout.toString());
      if (genErr.stderr) console.error('stderr:', genErr.stderr.toString());
      return;
    }

    // Skip open on CI
    if (process.env.CI) {
      console.log('ℹ️ CI environment detected — skipping auto-open. Report is at:', reportDir);
      return;
    }

    // open report (detached)
    try {
      console.log('🔗 Spawning: npx allure open', reportDir);
      const opener = spawn('npx', ['allure', 'open', reportDir], { detached: true, stdio: 'ignore', shell: true });
      opener.unref();
      console.log('✅ Spawned Allure open (detached).');
    } catch (e) {
      console.warn('⚠️ Failed to spawn npx allure open, falling back to OS opener:', e);
      const indexPath = path.join(reportDir, 'index.html');
      if (fs.existsSync(indexPath)) {
        try {
          if (process.platform === 'win32') execSync(`start "" "${indexPath}"`, { shell: true });
          else if (process.platform === 'darwin') execSync(`open "${indexPath}"`, { shell: true });
          else execSync(`xdg-open "${indexPath}"`, { shell: true });
          console.log('✅ Opened index.html with OS default browser.');
        } catch (err) {
          console.error('❌ Fallback open failed:', err);
        }
      } else {
        console.error('❌ index.html not found in reportDir, cannot open.');
      }
    }
  },
};