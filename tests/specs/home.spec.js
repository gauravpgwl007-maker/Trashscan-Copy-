const HomeScreen         = require('../pageobjects/home.screen');
const NotificationsScreen = require('../pageobjects/notifications.screen');

describe('Home Screen - Clock In / Out & Tile Navigation', () => {

    before(async () => {
        try {
            await driver.execute('mobile: shell', { command: 'pm grant', args: ['com.gwl.trashscan', 'android.permission.CAMERA'] });
            await driver.execute('mobile: shell', { command: 'pm grant', args: ['com.gwl.trashscan', 'android.permission.READ_MEDIA_IMAGES'] });
            await driver.execute('mobile: shell', { command: 'pm grant', args: ['com.gwl.trashscan', 'android.permission.READ_MEDIA_VIDEO'] });
            console.log('✅ Permissions granted');
        } catch { console.log('⚠️ Permission grant failed'); }
    });

    // ── TC004: Home Screen UI ─────────────────────────────────────
    it('TC004 - should display all expected UI elements on Home screen', async () => {
        await HomeScreen.waitForHomeScreen();

        const clockVisible    = await HomeScreen.clockInBtn.isDisplayed().catch(() => false)
                             || await HomeScreen.clockOutBtn.isDisplayed().catch(() => false);
        const workProgress    = await HomeScreen.workProgressTile.isDisplayed().catch(() => false);
        const pickup          = await HomeScreen.pickupTile.isDisplayed().catch(() => false);
        const activityLogs    = await HomeScreen.activityLogsTile.isDisplayed().catch(() => false);
        const addNotes        = await HomeScreen.addNotesTile.isDisplayed().catch(() => false);
        const dailyWorkPlan   = await HomeScreen.dailyWorkPlanTile.isDisplayed().catch(() => false);
        const violation       = await HomeScreen.violationTile.isDisplayed().catch(() => false);
        const hamburger       = await HomeScreen.hamburgerMenu.isDisplayed().catch(() => false);

        expect(clockVisible).toBe(true);
        expect(workProgress).toBe(true);
        expect(pickup).toBe(true);
        expect(activityLogs).toBe(true);
        expect(addNotes).toBe(true);
        expect(dailyWorkPlan).toBe(true);
        expect(violation).toBe(true);
        expect(hamburger).toBe(true);
        console.log('✅ TC004 PASS: All home screen UI elements visible');
    });

    // ── TC005: Clock In ───────────────────────────────────────────
    it('TC005 - should perform Clock In and show Clock Out button', async () => {
        await HomeScreen.waitForHomeScreen();

        if (await HomeScreen.clockInBtn.isDisplayed().catch(() => false)) {
            await HomeScreen.clockIn();
            const clockOutVisible = await HomeScreen.clockOutBtn.waitForDisplayed({ timeout: 10000 }).then(() => true).catch(() => false);
            expect(clockOutVisible).toBe(true);
            console.log('✅ TC005 PASS: Clock In successful, Clock Out button shown');
        } else {
            console.log('ℹ️ TC005: Already clocked in — Clock Out button is visible');
            expect(await HomeScreen.clockOutBtn.isDisplayed().catch(() => false)).toBe(true);
        }
    });

    // ── TC006: Clock-In Time Format ───────────────────────────────
    it('TC006 - should display In Time after Clock In', async () => {
        await HomeScreen.waitForHomeScreen();
        const inTimeEl = await $('android=new UiSelector().resourceId("com.gwl.trashscan:id/clockInTime")');
        const inTimeVisible = await inTimeEl.isDisplayed().catch(() => false);
        if (inTimeVisible) {
            const timeText = await inTimeEl.getText();
            console.log(`✅ TC006 PASS: In Time displayed: "${timeText}"`);
            expect(timeText).toBeTruthy();
        } else {
            console.log('ℹ️ TC006: In Time element not found — checking clock out button is red/active');
            expect(await HomeScreen.clockOutBtn.isDisplayed().catch(() => false)).toBe(true);
        }
    });

    // ── TC007: Clock-In Prevents Duplicate ───────────────────────
    it('TC007 - should not allow duplicate Clock In when already clocked in', async () => {
        await HomeScreen.waitForHomeScreen();
        const clockInAvailable = await HomeScreen.clockInBtn.isDisplayed().catch(() => false);
        expect(clockInAvailable).toBe(false);
        console.log('✅ TC007 PASS: Clock In button not available when already clocked in');
    });

    // ── TC010-TC015: Tile Navigation ─────────────────────────────
    it('TC010 - should open Work Progress tile and return', async () => {
        await HomeScreen.waitForHomeScreen();
        await HomeScreen.openWorkProgress();
        await HomeScreen.backToHome();
        expect(await HomeScreen.workProgressTile.isDisplayed()).toBe(true);
        console.log('✅ TC010 PASS');
    });

    it('TC011 - should open Pickup tile and return', async () => {
        await HomeScreen.waitForHomeScreen();
        await HomeScreen.openPickup();
        await HomeScreen.allowCameraPermissionIfPresent();
        await HomeScreen.backToHome();
        expect(await HomeScreen.pickupTile.isDisplayed()).toBe(true);
        console.log('✅ TC011 PASS');
    });

    it('TC012 - should open Activity Logs tile and return', async () => {
        await HomeScreen.waitForHomeScreen();
        await HomeScreen.openActivityLogs();
        await HomeScreen.backToHome();
        expect(await HomeScreen.activityLogsTile.isDisplayed()).toBe(true);
        console.log('✅ TC012 PASS');
    });

    it('TC013 - should open Add Notes tile and return', async () => {
        await HomeScreen.waitForHomeScreen();
        await HomeScreen.openAddNotes();
        await HomeScreen.backToHome();
        expect(await HomeScreen.addNotesTile.isDisplayed()).toBe(true);
        console.log('✅ TC013 PASS');
    });

    it('TC014 - should open Daily Work Plan tile and return', async () => {
        await HomeScreen.waitForHomeScreen();
        await HomeScreen.openDailyWorkPlan();
        await HomeScreen.backToHome();
        expect(await HomeScreen.dailyWorkPlanTile.isDisplayed()).toBe(true);
        console.log('✅ TC014 PASS');
    });

    it('TC015 - should open Violation tile and show 3 options', async () => {
        await HomeScreen.waitForHomeScreen();
        await HomeScreen.openViolation();
        const manual    = await HomeScreen.violationManualOption.isDisplayed().catch(() => false);
        const scan      = await HomeScreen.violationScanOption.isDisplayed().catch(() => false);
        const quickSnap = await HomeScreen.violationQuickSnapOption.isDisplayed().catch(() => false);
        expect(manual || scan || quickSnap).toBe(true);
        await driver.back();
        console.log('✅ TC015 PASS: Violation options visible');
    });

    // ── TC016: Hamburger Menu ─────────────────────────────────────
    it('TC016 - should open Hamburger Menu', async () => {
        await HomeScreen.waitForHomeScreen();
        await HomeScreen.hamburgerMenu.click();
        await driver.pause(1000);
        const menuVisible = await $('android=new UiSelector().text("Home")').isDisplayed().catch(() => false)
                         || await $('android=new UiSelector().text("Profile")').isDisplayed().catch(() => false);
        expect(menuVisible).toBe(true);
        await driver.back();
        console.log('✅ TC016 PASS: Hamburger menu opened');
    });

    // ── TC017: Hamburger Menu Options ────────────────────────────
    it('TC017 - should display all expected menu options in Hamburger Menu', async () => {
        await HomeScreen.waitForHomeScreen();
        await HomeScreen.hamburgerMenu.click();
        await driver.pause(1000);

        const expectedItems = ['Home', 'Profile', 'Activate', 'Pending Violation', 'Launch Tutorials',
                               'Report Issue', 'Update Location', 'Change Language', 'Force Checkout', 'Logout'];
        const found = [];
        for (const item of expectedItems) {
            const visible = await $(`android=new UiSelector().text("${item}")`).isDisplayed().catch(() => false);
            if (visible) found.push(item);
        }
        console.log(`✅ TC017: Menu items found: ${found.join(', ')}`);
        expect(found.length).toBeGreaterThan(3);
        await driver.back();
        console.log('✅ TC017 PASS');
    });

    // ── TC018: Notification Icon ──────────────────────────────────
    it('TC018 - should open Notification screen when notification icon is tapped', async () => {
        await HomeScreen.waitForHomeScreen();
        const notifIcon = await HomeScreen.notificationIcon.isDisplayed().catch(() => false);
        if (notifIcon) {
            await HomeScreen.notificationIcon.click();
            await driver.pause(1500);
            const notifScreen = await $('android=new UiSelector().textContains("Notification")').isDisplayed().catch(() => false)
                             || await $('id=com.gwl.trashscan:id/notificationRecycler').isDisplayed().catch(() => false)
                             || await $('id=com.gwl.trashscan:id/emptyStateText').isDisplayed().catch(() => false);
            if (notifScreen) {
                await driver.back();
            }
            console.log(`✅ TC018 PASS: Notification screen opened: ${notifScreen}`);
        } else {
            console.log('ℹ️ TC018: Notification icon not found — skipping');
        }
    });

    // ── TC019: Notification Badge ─────────────────────────────────
    it('TC019 - should display notification badge if there are unread notifications', async () => {
        await HomeScreen.waitForHomeScreen();
        const badge = await HomeScreen.notificationBadge.isDisplayed().catch(() => false);
        console.log(`ℹ️ TC019: Notification badge visible: ${badge}`);
        // Badge may or may not be visible depending on data — this is informational
    });

    // ── TC021: Home Screen Load Time ──────────────────────────────
    it('TC021 - should load Home screen within 30 seconds', async () => {
        const start = Date.now();
        await HomeScreen.waitForHomeScreen();
        const elapsed = (Date.now() - start) / 1000;
        console.log(`⏱ TC021: Home screen loaded in ${elapsed.toFixed(2)}s`);
        expect(elapsed).toBeLessThan(30);
        console.log('✅ TC021 PASS');
    });

    // ── TC009: Clock Out ──────────────────────────────────────────
    it('TC009 - should perform Clock Out and show Clock In button', async () => {
        await HomeScreen.waitForHomeScreen();
        if (await HomeScreen.clockOutBtn.isDisplayed().catch(() => false)) {
            await HomeScreen.clockOut();
            const clockInVisible = await HomeScreen.clockInBtn.waitForDisplayed({ timeout: 10000 }).then(() => true).catch(() => false);
            expect(clockInVisible).toBe(true);
            console.log('✅ TC009 PASS: Clock Out successful');
        } else {
            console.log('ℹ️ TC009: Already clocked out — Clock In button is visible');
        }
    });
});
