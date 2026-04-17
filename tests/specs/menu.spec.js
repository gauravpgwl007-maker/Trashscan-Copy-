const MenuScreen = require('../pageobjects/menu.screen');
const HomeScreen = require('../pageobjects/home.screen');

describe('Drawer Menu Functionality', () => {

    // This suite runs after home.spec.js (after Clock Out)
    // Ensure the app is on the Home screen before starting

    it('should open Home from drawer menu', async () => {
        await HomeScreen.waitForHomeScreen();
        await MenuScreen.goToHome();
        expect(await HomeScreen.workProgressTile.isDisplayed()).toBe(true);
    });

    it('should open Profile from drawer menu', async () => {
        await HomeScreen.waitForHomeScreen();
        await MenuScreen.goToProfile();
        // returnViaMenu() handles navigation back — no backToHome() needed
        expect(await HomeScreen.workProgressTile.isDisplayed()).toBe(true);
    });

    it('should open Activate from drawer menu', async () => {
        await HomeScreen.waitForHomeScreen();
        await MenuScreen.goToActivate();
        await HomeScreen.backToHome();
        expect(await HomeScreen.workProgressTile.isDisplayed()).toBe(true);
    });

    it('should open Pending Violation from drawer menu', async () => {
        await HomeScreen.waitForHomeScreen();
        await MenuScreen.goToPendingViolation();
        // returnViaMenu() handles navigation back — no backToHome() needed
        expect(await HomeScreen.workProgressTile.isDisplayed()).toBe(true);
    });

    it('should open Launch Tutorials from drawer menu', async () => {
        await HomeScreen.waitForHomeScreen();
        await MenuScreen.goToLaunchTutorials();
        // returnViaMenu() handles navigation back — no backToHome() needed
        expect(await HomeScreen.workProgressTile.isDisplayed()).toBe(true);
    });

    it('should open Report Issue from drawer menu', async () => {
        await HomeScreen.waitForHomeScreen();
        await MenuScreen.goToReportIssue();
        await HomeScreen.backToHome();
        expect(await HomeScreen.workProgressTile.isDisplayed()).toBe(true);
    });

    it('should open Update Location from drawer menu', async () => {
        await HomeScreen.waitForHomeScreen();
        await MenuScreen.goToUpdateLocation();
        await HomeScreen.backToHome();
        expect(await HomeScreen.workProgressTile.isDisplayed()).toBe(true);
    });

    it('should open Change Language from drawer menu', async () => {
        await HomeScreen.waitForHomeScreen();
        await MenuScreen.goToChangeLanguage();
        // returnViaMenu() handles navigation back — no backToHome() needed
        expect(await HomeScreen.workProgressTile.isDisplayed()).toBe(true);
    });

    it('should open Force Checkout from drawer menu', async () => {
        await HomeScreen.waitForHomeScreen();
        await MenuScreen.goToForceCheckout();
        // returnViaMenu() handles navigation back — no backToHome() needed
        expect(await HomeScreen.workProgressTile.isDisplayed()).toBe(true);
    });



});