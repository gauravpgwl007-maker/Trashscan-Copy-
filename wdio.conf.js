 const allure = require('allure-commandline');
 const { spawn } = require('child_process');
exports.config = {
    runner: 'local',
    hostname: '127.0.0.1',
    port: 4723,
    path: '/',
    specs: ['./tests/specs/**/*.spec.js'],
    maxInstances: 1,
    logLevel: 'info',
    framework: 'mocha',

    capabilities: [
        {
            platformName: 'Android',
            'appium:deviceName': 'emulator-5554',   // Replace with adb devices
            'appium:udid': 'emulator-5554', // Replace with adb devices
            'appium:platformVersion': '14',          // Adjust
            'appium:automationName': 'UiAutomator2',
            'appium:appPackage': 'com.gwl.trashscan',
            'appium:appActivity': 'com.gwl.trashscan.ui.splash.SplashActivity',
            'appium:noReset': true,
            'appium:autoGrantPermissions': true
        }
    ],




    // ====================
    // Runner Configuration
    // ====================
    runner: 'local',
    specs: [
        './tests/specs/dashboard.spec.js',
        './tests/specs/login.spec.js',
        './tests/specs/home.spec.js',
        './tests/specs/logout.spec.js'
    ],

    exclude: [],

    // Run specs sequentially (important for app flow)
    maxInstances: 1,

    // ==================
    // Capabilities
    // ==================
   

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
        timeout: 180000, // 3 minutes per test
    },

    // ===================
    // Reporters
    // ===================
    reporters: [
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],

    // ===================
    // Hooks
    // ===================

    beforeSuite: function (suite) {
        console.log(`🚀 Starting suite: ${suite.title}`);
    },

    afterSuite: function (suite) {
        console.log(`✅ Finished suite: ${suite.title}`);
    },

    onComplete: function(exitCode, config, capabilities, results) {
        console.log('📊 Generating Allure Report...');

        const generation = allure(['generate', 'allure-results', '--clean']);
        generation.on('exit', function(exitCode) {
            console.log('📄 Allure report generation completed with code:', exitCode);

            if (exitCode === 0) {
                console.log('✅ Opening Allure report...');
                spawn('npx', ['allure', 'open', 'allure-report'], { stdio: 'inherit' });
            } else {
                console.log('❌ Failed to generate Allure report. Check allure-results folder.');
            }
        });
    }
};
