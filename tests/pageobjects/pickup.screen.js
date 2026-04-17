const HomeScreen = require('./home.screen');

class PickupScreen {

    // ==== Dashboard Tile ====
    get pickupTile() { return $('id=com.gwl.trashscan:id/ivPickUp'); }

    // ==== Scanner Screen ====
    get flashToggleBtn()    { return $('id=com.gwl.trashscan:id/flashToggle'); }
    get cameraSwitchBtn()   { return $('id=com.gwl.trashscan:id/cameraSwitch'); }
    get scannerViewfinder() { return $('id=com.gwl.trashscan:id/scannerView'); }
    get activityLogsBtn()   { return $('id=com.gwl.trashscan:id/activityLogsBtn'); }
    get recentLogsContainer(){ return $('id=com.gwl.trashscan:id/recentActivityContainer'); }

    // ==== Scanner Activity Log Items ====
    get firstLogItem()   { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/logItem").instance(0)'); }
    get viewAllLogsBtn() { return $('android=new UiSelector().textContains("View All")'); }

    // ==== Open Pickup (Scanner) ====
    async openPickup() {
        await this.pickupTile.waitForDisplayed({ timeout: 5000 });
        await this.pickupTile.click();
        console.log('✅ Opened Pickup scanner');
        await driver.pause(1500);
        await HomeScreen.allowCameraPermissionIfPresent();
    }

    // ==== Wait for Scanner Screen ====
    async waitForScannerScreen() {
        await driver.waitUntil(
            async () => {
                const selectors = [
                    'com.gwl.trashscan:id/flashToggle',
                    'com.gwl.trashscan:id/cameraSwitch',
                    'com.gwl.trashscan:id/scannerView',
                    'com.gwl.trashscan:id/activityLogsBtn'
                ];
                for (const id of selectors) {
                    if (await $(`id=${id}`).isDisplayed().catch(() => false)) return true;
                }
                return false;
            },
            { timeout: 15000, timeoutMsg: '❌ Scanner screen did not load' }
        );
        console.log('✅ Scanner screen loaded');
    }

    // ==== Flash Toggle ====
    async toggleFlash() {
        try {
            await this.flashToggleBtn.waitForDisplayed({ timeout: 5000 });
            await this.flashToggleBtn.click();
            console.log('💡 Flash toggled');
            await driver.pause(500);
        } catch {
            console.log('⚠️ Flash toggle not found');
        }
    }

    // ==== Camera Switch ====
    async switchCamera() {
        try {
            await this.cameraSwitchBtn.waitForDisplayed({ timeout: 5000 });
            await this.cameraSwitchBtn.click();
            console.log('🔄 Camera switched');
            await driver.pause(1000);
        } catch {
            console.log('⚠️ Camera switch button not found');
        }
    }

    // ==== View Recent Activity Logs from Scanner ====
    async viewRecentLogsFromScanner() {
        try {
            await this.recentLogsContainer.waitForDisplayed({ timeout: 5000 });
            console.log('✅ Recent activity logs visible on scanner screen');
        } catch {
            console.log('⚠️ Recent logs container not visible');
        }
    }

    // ==== Navigate to Full Activity Logs from Scanner ====
    async goToFullActivityLogs() {
        try {
            await this.viewAllLogsBtn.waitForDisplayed({ timeout: 5000 });
            await this.viewAllLogsBtn.click();
            console.log('✅ Navigated to full Activity Logs from scanner');
            await driver.pause(1000);
        } catch {
            try {
                await this.activityLogsBtn.waitForDisplayed({ timeout: 5000 });
                await this.activityLogsBtn.click();
                console.log('✅ Navigated to Activity Logs via button');
                await driver.pause(1000);
            } catch {
                console.log('⚠️ Could not navigate to Activity Logs from scanner');
            }
        }
    }

    // ==== Navigate Back to Scanner from Activity Logs ====
    async returnToScannerFromLogs() {
        try {
            await HomeScreen.backButton.waitForDisplayed({ timeout: 5000 });
            await HomeScreen.backButton.click();
            console.log('✅ Returned to scanner from Activity Logs');
            await driver.pause(800);
        } catch {
            await driver.back();
        }
    }

    // ==== Swipe Right to Open Drawer Menu ====
    async swipeToOpenDrawer() {
        const { width, height } = await driver.getWindowSize();
        await driver.action('pointer')
            .move({ x: 0, y: height / 2 })
            .down()
            .move({ x: Math.floor(width * 0.5), y: height / 2 })
            .up()
            .perform();
        console.log('👈 Swiped to open drawer menu');
        await driver.pause(1000);
    }

    // ==== Back to Home from Scanner ====
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

module.exports = new PickupScreen();
