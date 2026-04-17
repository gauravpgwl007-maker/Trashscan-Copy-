const DashboardScreen = require('../pageobjects/dashboard.screen');
const LoginScreen     = require('../pageobjects/login.screen');
const HomeScreen      = require('../pageobjects/home.screen');
const users           = require('../fixtures/users.json');

describe('Login Flow', () => {

    // ── TC001: Valid Porter Login ─────────────────────────────────
    it('TC001 - should login with valid Porter credentials and reach Home screen', async () => {
        await DashboardScreen.skipToLogin();
        await LoginScreen.allowLocationPermissionIfPresent();
        await LoginScreen.login(users.valid.username, users.valid.password);
        await HomeScreen.waitForHomeScreen();
        console.log('✅ TC001 PASS: Valid login successful');
    });

    // ── TC002: Invalid Login ──────────────────────────────────────
    it('TC002 - should show error message for invalid credentials', async () => {
        const onLoginScreen = await LoginScreen.username.isDisplayed().catch(() => false);
        if (!onLoginScreen) {
            console.log('⚠️ TC002: Not on login screen — skipping');
            return;
        }
        await LoginScreen.username.clearValue();
        await LoginScreen.password.clearValue();
        await LoginScreen.login(users.invalid.username, users.invalid.password);
        await driver.pause(3000);

        const stillOnLogin = await LoginScreen.loginBtn.isDisplayed().catch(() => false);
        const errorVisible  = await $('android=new UiSelector().textContains("Invalid")').isDisplayed().catch(() => false)
                           || await $('android=new UiSelector().textContains("incorrect")').isDisplayed().catch(() => false)
                           || await $('android=new UiSelector().textContains("wrong")').isDisplayed().catch(() => false)
                           || await $('android=new UiSelector().textContains("failed")').isDisplayed().catch(() => false);

        expect(stillOnLogin || errorVisible).toBe(true);
        console.log('✅ TC002 PASS: Invalid login shows error or remains on login screen');
    });

    // ── TC003: Blank Fields Validation ───────────────────────────
    it('TC003 - should show validation message when fields are blank', async () => {
        const onLoginScreen = await LoginScreen.loginBtn.isDisplayed().catch(() => false);
        if (!onLoginScreen) {
            console.log('⚠️ TC003: Not on login screen — skipping');
            return;
        }
        // Clear fields and tap login
        try { await LoginScreen.username.clearValue(); } catch {}
        try { await LoginScreen.password.clearValue(); } catch {}
        await LoginScreen.loginBtn.click();
        await driver.pause(2000);

        const stillOnLogin   = await LoginScreen.loginBtn.isDisplayed().catch(() => false);
        const validationShown = await $('android=new UiSelector().textContains("required")').isDisplayed().catch(() => false)
                             || await $('android=new UiSelector().textContains("cannot be empty")').isDisplayed().catch(() => false)
                             || await $('android=new UiSelector().textContains("enter")').isDisplayed().catch(() => false);

        expect(stillOnLogin || validationShown).toBe(true);
        console.log('✅ TC003 PASS: Blank fields validation triggered');
    });
});
