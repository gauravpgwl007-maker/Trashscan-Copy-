// test/specs/homescreen.spec.js

const HomeScreen = require('../pageobjects/home.screen');

describe('Home Screen Functionality', () => {

    it('should handle Clock In if available', async () => {
        await HomeScreen.waitForHomeScreen();
        if (await HomeScreen.clockInBtn.isDisplayed().catch(() => false)) {
            console.log('🕓 Clock In button found, performing action...');
            await HomeScreen.clockIn();
            expect(await HomeScreen.clockOutBtn.isDisplayed()).toBe(true);
        } else {
            console.log('⚠️ Clock In button not found, skipping test.');
        }
    });

    it('should handle Clock Out if available', async () => {
        await HomeScreen.waitForHomeScreen();
        if (await HomeScreen.clockOutBtn.isDisplayed().catch(() => false)) {
            console.log('🕕 Clock Out button found, performing action...');
            await HomeScreen.clockOut();
            expect(await HomeScreen.clockInBtn.isDisplayed()).toBe(true);
        } else {
            console.log('⚠️ Clock Out button not found, skipping test.');
        }
    });

    it('should open Work Progress and return to Home', async () => {
        await HomeScreen.waitForHomeScreen();
        await HomeScreen.openWorkProgress();
        await driver.waitUntil(
            async () => !(await HomeScreen.isWorkProgressVisible()),
            { timeout: 5000, timeoutMsg: '❌ Work Progress page did not load properly' }
        );
        await HomeScreen.backToHome();
        expect(await HomeScreen.isWorkProgressVisible()).toBe(true);
    });

    it('should open Pickup and return to Home', async () => {
        await HomeScreen.waitForHomeScreen();
        await HomeScreen.openPickup();
        await driver.waitUntil(
            async () => !(await HomeScreen.isPickupVisible()),
            { timeout: 5000, timeoutMsg: '❌ Pickup page did not load properly' }
        );
        await HomeScreen.backToHome();
        expect(await HomeScreen.isPickupVisible()).toBe(true);
    });

    it('should open Activity Logs and return to Home', async () => {
        await HomeScreen.waitForHomeScreen();
        await HomeScreen.openActivityLogs();
        await driver.waitUntil(
            async () => !(await HomeScreen.isActivityLogsVisible()),
            { timeout: 5000, timeoutMsg: '❌ Activity Logs page did not load properly' }
        );
        await HomeScreen.backToHome();
        expect(await HomeScreen.isActivityLogsVisible()).toBe(true);
    });

    it('should open Add Notes and return to Home', async () => {
        await HomeScreen.waitForHomeScreen();
        await HomeScreen.openAddNotes();
        await driver.waitUntil(
            async () => !(await HomeScreen.isAddNotesVisible()),
            { timeout: 5000, timeoutMsg: '❌ Add Notes page did not load properly' }
        );
        await HomeScreen.backToHome();
        expect(await HomeScreen.isAddNotesVisible()).toBe(true);
    });

    it('should open Daily Work Plan and return to Home', async () => {
        await HomeScreen.waitForHomeScreen();
        await HomeScreen.openDailyWorkPlan();
        await driver.waitUntil(
            async () => !(await HomeScreen.isDailyWorkPlanVisible()),
            { timeout: 5000, timeoutMsg: '❌ Daily Work Plan page did not load properly' }
        );
        await HomeScreen.backToHome();
        expect(await HomeScreen.isDailyWorkPlanVisible()).toBe(true);
    });

   it('should open Violation -> Manual and return to Home', async () => {
    await HomeScreen.openViolationManual();
    expect(await HomeScreen.violationTile().isDisplayed()).toBe(true);
});

it('should open Violation -> Scan View and return to Home', async () => {
    await HomeScreen.openViolationScanView();
    expect(await HomeScreen.violationTile().isDisplayed()).toBe(true);
});

it('should open Violation -> Quick Snap and return to Home', async () => {
    await HomeScreen.openViolationQuickSnap();
    expect(await HomeScreen.violationTile().isDisplayed()).toBe(true);
});


});
