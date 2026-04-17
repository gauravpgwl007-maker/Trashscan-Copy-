class HomeScreen {

    // ==== Back Buttons ====
    get backButton()      { return $('~Navigate up'); }
    get manualBackArrow() { return $('id=com.gwl.trashscan:id/backArrow'); }

    // ==== Clock Buttons (visibility="gone" in XML; shown by ViewModel) ====
    get clockInBtn()  { return $('id=com.gwl.trashscan:id/buttonClockIn'); }
    get clockOutBtn() { return $('id=com.gwl.trashscan:id/buttonClockOut'); }

    // ==== Dashboard Tiles (always visible on home screen) ====
    get workProgressTile()  { return $('id=com.gwl.trashscan:id/ll_work_progress'); }
    get pickupTile()        { return $('id=com.gwl.trashscan:id/ivPickUp'); }
    get activityLogsTile()  { return $('id=com.gwl.trashscan:id/ivRollback'); }
    get addNotesTile()      { return $('id=com.gwl.trashscan:id/ivAddNotes'); }
    get dailyWorkPlanTile() { return $('id=com.gwl.trashscan:id/ivAddSubs'); }
    get violationTile()     { return $('id=com.gwl.trashscan:id/ivViolation'); }

    // ==== Header Icons (always visible) ====
    get hamburgerMenu()     { return $('id=com.gwl.trashscan:id/title_bar_left_menu'); }
    get notificationIcon()  { return $('id=com.gwl.trashscan:id/title_bar_right_menu'); }

    // ==== Clock In/Out Actions ====
    async clockIn() {
        console.log('⏱ Performing Clock In...');
        await this.clockInBtn.waitForDisplayed({ timeout: 15000 });
        await driver.pause(500);
        await this.clockInBtn.click();
        console.log('✅ Clock In clicked — waiting for Clock Out button...');
        // Wait up to 60s for the API to return and show the clockOut button
        await this.clockOutBtn.waitForDisplayed({ timeout: 60000,
            timeoutMsg: '❌ Clock Out button did not appear after Clock In (API may be slow)' });
        console.log('✅ Clock In confirmed — Clock Out button visible');
    }

    async clockOut() {
        console.log('⏱ Performing Clock Out...');
        await this.clockOutBtn.waitForDisplayed({ timeout: 15000 });
        await this.clockOutBtn.click();
        console.log('✅ Clock Out clicked — waiting for Clock In button...');
        await this.clockInBtn.waitForDisplayed({ timeout: 60000,
            timeoutMsg: '❌ Clock In button did not appear after Clock Out (API may be slow)' });
        console.log('✅ Clock Out confirmed — Clock In button visible');
    }

    // ==== Tile Navigation ====
    async openWorkProgress() {
        await this.workProgressTile.waitForDisplayed({ timeout: 10000 });
        await this.workProgressTile.click();
        console.log('✅ Opened Work Progress');
    }

    async openPickup() {
        await this.pickupTile.waitForDisplayed({ timeout: 10000 });
        await this.pickupTile.click();
        console.log('✅ Opened Pickup');
    }

    async openActivityLogs() {
        await this.activityLogsTile.waitForDisplayed({ timeout: 10000 });
        await this.activityLogsTile.click();
        console.log('✅ Opened Activity Logs');
    }

    async openAddNotes() {
        await this.addNotesTile.waitForDisplayed({ timeout: 10000 });
        await this.addNotesTile.click();
        console.log('✅ Opened Add Notes');
    }

    async openDailyWorkPlan() {
        await this.dailyWorkPlanTile.waitForDisplayed({ timeout: 10000 });
        await this.dailyWorkPlanTile.click();
        console.log('✅ Opened Daily Work Plan');
    }

    async openViolation() {
        await this.violationTile.waitForDisplayed({ timeout: 10000 });
        await this.violationTile.click();
        console.log('✅ Opened Violation menu');
    }

    // ==== Wait for Home Screen ====
    // Uses tiles which are ALWAYS visible on the home fragment (no visibility="gone" in XML)
    async waitForHomeScreen() {
        console.log('🏠 Waiting for Home screen...');

        await this.allowNotificationPermissionIfPresent();
        await this.allowCameraPermissionIfPresent();
        await this.allowMediaPermissionIfPresent();

        await driver.waitUntil(
            async () => {
                // title_bar_left_menu (hamburger) is always on home screen
                if (await $('id=com.gwl.trashscan:id/title_bar_left_menu').isDisplayed().catch(() => false)) return true;
                // Tiles — always visible on home screen
                const tileIds = [
                    'com.gwl.trashscan:id/ll_work_progress',
                    'com.gwl.trashscan:id/ivPickUp',
                    'com.gwl.trashscan:id/ivRollback',
                    'com.gwl.trashscan:id/ivAddNotes',
                    'com.gwl.trashscan:id/ivAddSubs',
                    'com.gwl.trashscan:id/ivViolation',
                ];
                for (const id of tileIds) {
                    if (await $(`id=${id}`).isDisplayed().catch(() => false)) return true;
                }
                // Clock buttons — only one is visible at a time (after ViewModel responds)
                if (await $('id=com.gwl.trashscan:id/buttonClockIn').isDisplayed().catch(() => false)) return true;
                if (await $('id=com.gwl.trashscan:id/buttonClockOut').isDisplayed().catch(() => false)) return true;
                return false;
            },
            { timeout: 45000, timeoutMsg: '❌ Home screen did not load within 45s.' }
        );

        console.log('✅ Home screen loaded.');
    }

    // ==== Back Navigation ====
    async backToHome() {
        try {
            await this.backButton.waitForDisplayed({ timeout: 8000 });
            await this.backButton.click();
        } catch {
            await driver.back();
        }
        await this.waitForHomeScreen();
    }

    // ==== Permission Helpers ====
    async clickIfExists(selector) {
        const elements = await $$(selector);
        if (elements.length > 0) {
            try {
                if (await elements[0].isDisplayed()) {
                    await elements[0].click();
                    return true;
                }
            } catch (e) {}
        }
        return false;
    }

    async allowNotificationPermissionIfPresent() {
        try {
            const selectors = [
                'android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_allow_button")',
                'android=new UiSelector().text("Allow")'
            ];
            for (const selector of selectors) {
                const clicked = await this.clickIfExists(selector);
                if (clicked) { console.log('🔔 Notification permission allowed'); return; }
            }
        } catch {}
    }

    async allowCameraPermissionIfPresent() {
        const selectors = [
            'android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_allow_foreground_only_button")',
            'android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_allow_one_time_button")',
            'android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_allow_button")',
            'android=new UiSelector().textContains("While using")',
            'android=new UiSelector().textContains("Allow")'
        ];
        for (let i = 0; i < 5; i++) {
            for (const selector of selectors) {
                const clicked = await this.clickIfExists(selector);
                if (clicked) { console.log('📸 Camera permission handled'); return true; }
            }
            await driver.pause(1000);
        }
        return false;
    }

    async allowMediaPermissionIfPresent() {
        const selectors = [
            'android=new UiSelector().text("Allow all")',
            'android=new UiSelector().text("Allow limited access")',
            'android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_allow_button")'
        ];
        for (let i = 0; i < 5; i++) {
            for (const selector of selectors) {
                const clicked = await this.clickIfExists(selector);
                if (clicked) { console.log('🖼️ Media permission allowed'); return true; }
            }
            await driver.pause(1000);
        }
        return false;
    }

    async takeScreenshot(name) {
        const fileName = `./screenshots/${name}.png`;
        await driver.saveScreenshot(fileName);
        console.log(`📸 Screenshot: ${fileName}`);
    }
}

module.exports = new HomeScreen();
