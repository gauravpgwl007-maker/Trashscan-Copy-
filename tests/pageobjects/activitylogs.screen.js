const HomeScreen = require('./home.screen');

class ActivityLogsScreen {

    // ==== Dashboard Tile ====
    get activityLogsTile() { return $('id=com.gwl.trashscan:id/ivRollback'); }

    // ==== Activity Logs Screen ====
    get logsList()             { return $('id=com.gwl.trashscan:id/recyclerView'); }
    get firstLogItem()         { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/logItem").instance(0)'); }
    get firstLogTimestamp()    { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/logTimestamp").instance(0)'); }
    get firstLogType()         { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/logType").instance(0)'); }
    get revertClockOutBtn()    { return $('android=new UiSelector().textContains("Revert Clock Out")'); }
    get revertClockOutBtnFirst(){ return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/btnRevertClockOut").instance(0)'); }
    get emptyStateMsg()        { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/emptyStateText")'); }
    get activityLogsTitle()    { return $('android=new UiSelector().textContains("Activity Log")'); }

    // ==== Open Activity Logs from Dashboard ====
    async openActivityLogs() {
        await this.activityLogsTile.waitForDisplayed({ timeout: 5000 });
        await this.activityLogsTile.click();
        console.log('✅ Opened Activity Logs');
        await driver.pause(1500);
    }

    // ==== Wait for Activity Logs Screen ====
    async waitForActivityLogsScreen() {
        await driver.waitUntil(
            async () => {
                const selectors = [
                    'com.gwl.trashscan:id/recyclerView',
                    'com.gwl.trashscan:id/logItem',
                    'com.gwl.trashscan:id/activityLogsTitle',
                    'com.gwl.trashscan:id/emptyStateText'
                ];
                for (const id of selectors) {
                    if (await $(`id=${id}`).isDisplayed().catch(() => false)) return true;
                }
                // Also try text-based check
                if (await $('android=new UiSelector().textContains("Activity Log")').isDisplayed().catch(() => false)) return true;
                return false;
            },
            { timeout: 15000, timeoutMsg: '❌ Activity Logs screen did not load.' }
        );
        console.log('✅ Activity Logs screen loaded');
    }

    // ==== Scroll Down in Logs ====
    async scrollDown() {
        const { width, height } = await driver.getWindowSize();
        await driver.action('pointer')
            .move({ x: width / 2, y: Math.floor(height * 0.7) })
            .down()
            .move({ x: width / 2, y: Math.floor(height * 0.3) })
            .up()
            .perform();
        console.log('📜 Scrolled down in activity logs');
        await driver.pause(500);
    }

    // ==== Check for Revert Clock Out ====
    async isRevertClockOutVisible() {
        try {
            return await this.revertClockOutBtn.isDisplayed();
        } catch {
            try {
                return await this.revertClockOutBtnFirst.isDisplayed();
            } catch {
                return false;
            }
        }
    }

    // ==== Perform Revert Clock Out ====
    async performRevertClockOut() {
        try {
            await this.revertClockOutBtn.waitForDisplayed({ timeout: 5000 });
            await this.revertClockOutBtn.click();
            console.log('✅ Revert Clock Out tapped');
            await driver.pause(2000);
            // Handle any confirmation dialog
            const confirmBtn = await $('android=new UiSelector().text("Yes")');
            if (await confirmBtn.isDisplayed().catch(() => false)) {
                await confirmBtn.click();
                console.log('✅ Revert confirmed');
            }
        } catch {
            console.log('⚠️ Revert Clock Out button not found');
        }
    }

    // ==== Verify Timestamp Format ====
    async getFirstLogTimestampText() {
        try {
            await this.firstLogTimestamp.waitForDisplayed({ timeout: 5000 });
            return await this.firstLogTimestamp.getText();
        } catch {
            console.log('⚠️ Timestamp not found');
            return null;
        }
    }

    // ==== Back to Home ====
    async backToHome() {
        try {
            await HomeScreen.backButton.waitForDisplayed({ timeout: 8000 });
            await HomeScreen.backButton.click();
        } catch {
            await driver.back();
        }
        await HomeScreen.waitForHomeScreen();
    }
}

module.exports = new ActivityLogsScreen();
