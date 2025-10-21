const DashboardScreen = require('../pageobjects/dashboard.screen');
const LoginScreen = require('../pageobjects/login.screen');
const HomeScreen = require('../pageobjects/home.screen');
const users = require('../fixtures/users.json');

describe('Login flow', () => {
    it('should login and reach Home screen', async () => {
        await DashboardScreen.skipToLogin();
        await LoginScreen.login(users.valid.username, users.valid.password);
        await HomeScreen.waitForHomeScreen();
        console.log('✅ Login successful — Home screen loaded.');
    });
});
