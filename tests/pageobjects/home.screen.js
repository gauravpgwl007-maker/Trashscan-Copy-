class HomeScreen {

    // ==== Back Buttons ====
    get backButton()      { return $('~Navigate up'); }
    get manualBackArrow() { return $('id=com.gwl.trashscan:id/backArrow'); }

    // ==== Clock Buttons ====
    get clockInBtn()  { return $('id=com.gwl.trashscan:id/buttonClockIn'); }
    get clockOutBtn() { return $('id=com.gwl.trashscan:id/buttonClockOut'); }

    // ==== Dashboard Tiles ====
    get workProgressTile()  { return $('id=com.gwl.trashscan:id/ll_work_progress'); }
    get pickupTile()        { return $('id=com.gwl.trashscan:id/ivPickUp'); }
    get activityLogsTile()  { return $('id=com.gwl.trashscan:id/ivRollback'); }
    get addNotesTile()      { return $('id=com.gwl.trashscan:id/ivAddNotes'); }
    get dailyWorkPlanTile() { return $('id=com.gwl.trashscan:id/ivAddSubs'); }
    get violationTile()     { return $('id=com.gwl.trashscan:id/ivViolation'); }

    // ==== Header Icons ====
    get hamburgerMenu()     { return $('id=com.gwl.trashscan:id/title_bar_left_menu'); }
    get notificationIcon()  { return $('id=com.gwl.trashscan:id/notification_icon'); }
    get notificationBadge() { return $('id=com.gwl.trashscan:id/notification_badge'); }

    // ==== Violation Bottom Sheet Options ====
    get violationManualOption()   { return $('id=com.gwl.trashscan:id/buttonManully'); }
    get violationScanOption()     { return $('id=com.gwl.trashscan:id/buttonScan'); }
    get violationQuickSnapOption(){ return $('id=com.gwl.trashscan:id/buttonQuickSnap'); }

    // ==== Clock In/Out Actions ====
    async clockIn() {
        console.log('⏱ Performing Clock In...');
        await this.clockInBtn.waitForDisplayed({ timeout: 5000 });
        await driver.pause(500);
        await this.clockInBtn.click();
        console.log('✅ Clock In done');
    }

    async clockOut() {
        console.log('⏱ Performing Clock Out...');
        await this.clockOutBtn.waitForDisplayed({ timeout: 5000 });
        await this.clockOutBtn.click();
        console.log('✅ Clock Out done');
    }

    // ==== Tile Navigation ====
    async openWorkProgress() {
        await this.workProgressTile.waitForDisplayed({ timeout: 5000 });
        await this.workProgressTile.click();
        console.log('✅ Opened Work Progress');
    }

    async openPickup() {
        await this.pickupTile.waitForDisplayed({ timeout: 5000 });
        await this.pickupTile.click();
        console.log('✅ Opened Pickup');
    }

    async openActivityLogs() {
        await this.activityLogsTile.waitForDisplayed({ timeout: 5000 });
        await this.activityLogsTile.click();
        console.log('✅ Opened Activity Logs');
    }

    async openAddNotes() {
        await this.addNotesTile.waitForDisplayed({ timeout: 5000 });
        await this.addNotesTile.click();
        console.log('✅ Opened Add Notes');
    }

    async openDailyWorkPlan() {
        await this.dailyWorkPlanTile.waitForDisplayed({ timeout: 5000 });
        await this.dailyWorkPlanTile.click();
        console.log('✅ Opened Daily Work Plan');
    }

    async openViolation() {
        await this.violationTile.waitForDisplayed({ timeout: 5000 });
        await this.violationTile.click();
        console.log('✅ Opened Violation menu');
    }

    async openViolationManual() {
        await this.openViolation();
        await this.violationManualOption.waitForDisplayed({ timeout: 5000 });
        await this.violationManualOption.click();
        console.log('✅ Opened Manual Violation');
    }

    async openViolationScanView() {
        await this.openViolation();
        await this.violationScanOption.waitForDisplayed({ timeout: 5000 });
        await this.violationScanOption.click();
        await driver.pause(1500);
        await this.allowCameraPermissionIfPresent();
        await this.backButton.waitForDisplayed({ timeout: 10000 });
        await this.backButton.click();
        await this.waitForHomeScreen();
    }

    async openViolationQuickSnap() {
        await this.openViolation();
        await this.violationQuickSnapOption.waitForDisplayed({ timeout: 5000 });
        await this.violationQuickSnapOption.click();
        await driver.pause(1500);
        await this.allowCameraPermissionIfPresent();
        await this.backButton.waitForDisplayed({ timeout: 10000 });
        await this.backButton.click();
        await this.waitForHomeScreen();
    }

    // ==== Wait for Home Screen ====
    async waitForHomeScreen() {
        console.log('🏠 Waiting for Home screen...');

        await this.allowNotificationPermissionIfPresent();
        await this.allowCameraPermissionIfPresent();
        await this.allowMediaPermissionIfPresent();

        await driver.waitUntil(
            async () => {
                const ids = [
                    'com.gwl.trashscan:id/buttonClockIn',
                    'com.gwl.trashscan:id/buttonClockOut',
                    'com.gwl.trashscan:id/ll_work_progress',
                    'com.gwl.trashscan:id/ivPickUp',
                    'com.gwl.trashscan:id/ivRollback',
                    'com.gwl.trashscan:id/ivAddNotes',
                    'com.gwl.trashscan:id/ivAddSubs',
                    'com.gwl.trashscan:id/ivViolation',
                ];
                for (const id of ids) {
                    if (await $(`id=${id}`).isDisplayed().catch(() => false)) return true;
                }
                return false;
            },
            { timeout: 30000, timeoutMsg: '❌ Home screen did not load properly.' }
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
        console.log('⚠️ No camera permission popup found');
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

    // ==== Screenshot ====
    async takeScreenshot(name) {
        const fileName = `./screenshots/${name}.png`;
        await driver.saveScreenshot(fileName);
        console.log(`📸 Screenshot: ${fileName}`);
    }
}

module.exports = new HomeScreen();
