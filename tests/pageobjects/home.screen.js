class HomeScreen {
    // ==== Selectors (functions, not immediate calls) ====
    clockInBtn() { return $('id=com.gwl.trashscan:id/buttonClockIn'); }
    clockOutBtn() { return $('id=com.gwl.trashscan:id/buttonClockOut'); }

    workProgressTile() { return $('id=com.gwl.trashscan:id/ll_work_progress'); }
    pickupTile() { return $('id=com.gwl.trashscan:id/ivPickUp'); }
    activityLogsTile() { return $('id=com.gwl.trashscan:id/ivRollback'); }
    addNotesTile() { return $('id=com.gwl.trashscan:id/ivAddNotes'); }
    dailyWorkPlanTile() { return $('id=com.gwl.trashscan:id/ivAddSubs'); }
    violationTile() { return $('id=com.gwl.trashscan:id/ivViolation'); }

    // Violation popup options
    manualOption() { return $('id=com.gwl.trashscan:id/buttonManully'); }
    scanViewOption() { return $('id=com.gwl.trashscan:id/buttonScan'); }
    quickSnapOption() { return $('id=com.gwl.trashscan:id/buttonQuickSnap'); }

    // Back buttons
    backButton() { return $('~Navigate up'); }
    manualBackArrow() { return $('id=com.gwl.trashscan:id/backArrow'); }

    /**
     * Wait for Home screen
     */
    async waitForHomeScreen() {
        console.log('🏠 Waiting for Home screen...');
        await driver.waitUntil(
            async () => {
                return (await this.clockInBtn().isDisplayed().catch(() => false)) ||
                       (await this.clockOutBtn().isDisplayed().catch(() => false)) ||
                       (await this.workProgressTile().isDisplayed().catch(() => false)) ||
                       (await this.pickupTile().isDisplayed().catch(() => false)) ||
                       (await this.activityLogsTile().isDisplayed().catch(() => false)) ||
                       (await this.addNotesTile().isDisplayed().catch(() => false)) ||
                       (await this.dailyWorkPlanTile().isDisplayed().catch(() => false)) ||
                       (await this.violationTile().isDisplayed().catch(() => false));
            },
            { timeout: 30000, timeoutMsg: '❌ Home screen did not load with any known element.' }
        );
        console.log('✅ Home screen loaded.');
    }

    // === Actions (use methods instead of getters) ===
   async ClockIn() {
    const clockIn = await this.clockInBtn();
    await clockIn.waitForDisplayed({ timeout: 5000 });
    console.log('📊 ClockIn clicked');
    await clockIn.click();
    }
   async ClockOut() {
    const clockOut = await this.clockOutBtn();
    await clockOut.waitForDisplayed({ timeout: 5000 });
    console.log('📉 ClockOut clicked');
    await clockOut.click();
    }
    async openWorkProgress() {
        await this.workProgressTile().waitForDisplayed({ timeout: 5000 });
        console.log('📊 Opening Work Progress...');
        await this.workProgressTile().click();
    }

    async isWorkProgressVisible() {
        return this.workProgressTile().isDisplayed().catch(() => false);
    }

    async openPickup() {
        await this.pickupTile().waitForDisplayed({ timeout: 5000 });
        console.log('🚛 Opening Pickup...');
        await this.pickupTile().click();
    }

    async isPickupVisible() {
        return this.pickupTile().isDisplayed().catch(() => false);
    }

    async openActivityLogs() {
        await this.activityLogsTile().waitForDisplayed({ timeout: 5000 });
        console.log('📜 Opening Activity Logs...');
        await this.activityLogsTile().click();
    }

    async isActivityLogsVisible() {
        return this.activityLogsTile().isDisplayed().catch(() => false);
    }

    async openAddNotes() {
        await this.addNotesTile().waitForDisplayed({ timeout: 5000 });
        console.log('📝 Opening Add Notes...');
        await this.addNotesTile().click();
    }

    async isAddNotesVisible() {
        return this.addNotesTile().isDisplayed().catch(() => false);
    }

    async openDailyWorkPlan() {
        await this.dailyWorkPlanTile().waitForDisplayed({ timeout: 5000 });
        console.log('📅 Opening Daily Work Plan...');
        await this.dailyWorkPlanTile().click();
    }

    async isDailyWorkPlanVisible() {
        return this.dailyWorkPlanTile().isDisplayed().catch(() => false);
    }

    // ===== Violation Flow =====
    async openViolation() {
        await this.violationTile().waitForDisplayed({ timeout: 5000 });
        console.log('⚠️ Opening Violation...');
        await this.violationTile().click();
    }

    async openViolationManual() {
        await this.openViolation();
        await this.manualOption().waitForDisplayed({ timeout: 5000 });
        console.log('✍️ Selecting Manual option...');
        await this.manualOption().click();
        await this.manualBackArrow().waitForDisplayed({ timeout: 5000 });
        console.log('🔙 Returning from Manual...');
        await this.manualBackArrow().click();
        await this.waitForHomeScreen();
    }

    async openViolationScanView() {
        await this.openViolation();
        await this.scanViewOption().waitForDisplayed({ timeout: 5000 });
        console.log('📷 Selecting Scan View option...');
        await this.scanViewOption().click();
        await this.backButton().waitForDisplayed({ timeout: 5000 });
        console.log('🔙 Returning from Scan View...');
        await this.backButton().click();
        await this.waitForHomeScreen();
    }

    async openViolationQuickSnap() {
        await this.openViolation();
        await this.quickSnapOption().waitForDisplayed({ timeout: 5000 });
        console.log('📸 Selecting Quick Snap option...');
        await this.quickSnapOption().click();
        await this.backButton().waitForDisplayed({ timeout: 5000 });
        console.log('🔙 Returning from Quick Snap...');
        await this.backButton().click();
        await this.waitForHomeScreen();
    }

    // ===== Back Navigation =====
    async backToHome() {
        try {
            await this.backButton().waitForDisplayed({ timeout: 8000 });
            console.log('🔙 Navigating back to Home...');
            await this.backButton().click();
        } catch (err) {
            console.log('⚠️ Back button not found, using Android back key instead...');
            await driver.back();
        }
        await this.waitForHomeScreen();
    }
}

module.exports = new HomeScreen();
