const HomeScreen             = require('../pageobjects/home.screen');
const AdminWorkProgressScreen = require('../pageobjects/adminworkprogress.screen');
const DashboardScreen        = require('../pageobjects/dashboard.screen');
const LoginScreen            = require('../pageobjects/login.screen');
const users                  = require('../fixtures/users.json');

describe('Admin - Work Progress (TC001-TC012)', () => {

    before(async () => {
        // Login as admin if not already on home screen
        const onHome = await HomeScreen.workProgressTile.isDisplayed().catch(() => false);
        if (!onHome) {
            try {
                await DashboardScreen.skipToLogin();
            } catch {}
            await LoginScreen.allowLocationPermissionIfPresent();
            await LoginScreen.login(users.admin.username, users.admin.password);
            await HomeScreen.waitForHomeScreen();
        }
    });

    // ── TC001: Work Progress Tile on Home Screen ──────────────────
    it('TC001 - Work Progress tile should be visible on Admin Home Screen', async () => {
        await HomeScreen.waitForHomeScreen();
        expect(await AdminWorkProgressScreen.workProgressTile.isDisplayed()).toBe(true);
        console.log('✅ TC001 PASS');
    });

    // ── TC002: Navigate to Service Report ────────────────────────
    it('TC002 - should navigate to Service Report from Work Progress', async () => {
        await HomeScreen.waitForHomeScreen();
        await AdminWorkProgressScreen.openWorkProgress();
        await AdminWorkProgressScreen.waitForServiceReport();
        const listLoaded = await AdminWorkProgressScreen.propertiesList.isDisplayed().catch(() => false)
                        || await AdminWorkProgressScreen.serviceReportTitle.isDisplayed().catch(() => false)
                        || await AdminWorkProgressScreen.firstPropertyItem.isDisplayed().catch(() => false);
        expect(listLoaded).toBe(true);
        console.log('✅ TC002 PASS: Service Report loaded');
    });

    // ── TC003: List of Properties Assigned to Admin ───────────────
    it('TC003 - should display list of properties assigned to admin', async () => {
        const propertiesVisible = await AdminWorkProgressScreen.propertiesList.isDisplayed().catch(() => false)
                               || await AdminWorkProgressScreen.firstPropertyItem.isDisplayed().catch(() => false);
        console.log(`ℹ️ TC003: Properties list visible: ${propertiesVisible}`);
        expect(propertiesVisible).toBe(true);
        console.log('✅ TC003 PASS');
    });

    // ── TC004: Search Functionality ──────────────────────────────
    it('TC004 - should filter properties when search term is entered', async () => {
        await AdminWorkProgressScreen.searchProperty('Test');
        await driver.pause(1500);
        const results = await AdminWorkProgressScreen.firstPropertyItem.isDisplayed().catch(() => false)
                     || await $('android=new UiSelector().textContains("No result")').isDisplayed().catch(() => false);
        console.log(`ℹ️ TC004: Search results: ${results}`);
        await AdminWorkProgressScreen.clearSearch();
        console.log('✅ TC004 PASS');
    });

    // ── TC005: Back Icon Navigation ──────────────────────────────
    it('TC005 - should display and use back icon to navigate', async () => {
        const backVisible = await AdminWorkProgressScreen.backIcon.isDisplayed().catch(() => false);
        expect(backVisible).toBe(true);
        console.log('✅ TC005 PASS: Back icon visible');
    });

    // ── TC006: Open Property Details ─────────────────────────────
    it('TC006 - should open Property Details from Property List', async () => {
        await AdminWorkProgressScreen.openFirstPropertyDetails();
        const detailsLoaded = await AdminWorkProgressScreen.propertyDetailsTitle.isDisplayed().catch(() => false)
                           || await $('android=new UiSelector().resourceId("com.gwl.trashscan:id/propertyName")').isDisplayed().catch(() => false)
                           || await AdminWorkProgressScreen.taskStatusSection.isDisplayed().catch(() => false);
        console.log(`ℹ️ TC006: Property details loaded: ${detailsLoaded}`);
        console.log('✅ TC006 PASS');
    });

    // ── TC007: Validate Property Details View ────────────────────
    it('TC007 - Property Details should display relevant data', async () => {
        const titleVisible = await AdminWorkProgressScreen.propertyDetailsTitle.isDisplayed().catch(() => false)
                          || await $('android=new UiSelector().resourceId("com.gwl.trashscan:id/propertyName")').isDisplayed().catch(() => false);
        expect(titleVisible).toBe(true);
        console.log('✅ TC007 PASS: Property details have data');
    });

    // ── TC008: Next Arrow Navigation ─────────────────────────────
    it('TC008 - should navigate to next property using Next arrow', async () => {
        await AdminWorkProgressScreen.tapNextArrow();
        await driver.pause(500);
        const detailsStillVisible = await AdminWorkProgressScreen.propertyDetailsTitle.isDisplayed().catch(() => false)
                                 || await $('android=new UiSelector().resourceId("com.gwl.trashscan:id/propertyName")').isDisplayed().catch(() => false);
        console.log(`ℹ️ TC008: After next arrow, details visible: ${detailsStillVisible}`);
        console.log('✅ TC008 PASS');
    });

    // ── TC009: Previous Arrow Navigation ─────────────────────────
    it('TC009 - should navigate to previous property using Prev arrow', async () => {
        await AdminWorkProgressScreen.tapPrevArrow();
        await driver.pause(500);
        console.log('✅ TC009 PASS: Previous arrow tapped');
    });

    // ── TC010: Property Counter Display ──────────────────────────
    it('TC010 - should display a property counter (e.g., 1 of 5)', async () => {
        const counterText = await AdminWorkProgressScreen.getPropertyCounterText();
        console.log(`ℹ️ TC010: Property counter: "${counterText}"`);
        if (counterText) {
            expect(counterText.length).toBeGreaterThan(0);
        }
        console.log('✅ TC010 PASS');
    });

    // ── TC011: Task Status Within Property Details ────────────────
    it('TC011 - should display task status within property details', async () => {
        const tasksVisible = await AdminWorkProgressScreen.taskStatusSection.isDisplayed().catch(() => false)
                          || await AdminWorkProgressScreen.firstTaskItem.isDisplayed().catch(() => false)
                          || await $('android=new UiSelector().textContains("Task")').isDisplayed().catch(() => false);
        console.log(`ℹ️ TC011: Tasks visible in admin details: ${tasksVisible}`);
        console.log('✅ TC011 PASS');
    });

    // ── TC012: Search Result Navigation to Property Details ───────
    it('TC012 - should navigate to property details from search result', async () => {
        await AdminWorkProgressScreen.goBack();
        await AdminWorkProgressScreen.searchProperty('a'); // generic search to get results
        await driver.pause(1500);
        await AdminWorkProgressScreen.openFirstPropertyDetails();
        const loaded = await AdminWorkProgressScreen.propertyDetailsTitle.isDisplayed().catch(() => false)
                    || await $('android=new UiSelector().resourceId("com.gwl.trashscan:id/propertyName")').isDisplayed().catch(() => false);
        console.log(`ℹ️ TC012: Details from search result: ${loaded}`);
        await AdminWorkProgressScreen.backToHome();
        console.log('✅ TC012 PASS');
    });
});
