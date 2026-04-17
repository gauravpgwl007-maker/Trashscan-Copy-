const HomeScreen = require('./home.screen');

class NotificationsScreen {

    // ==== Dashboard Notification Icon ====
    get notificationIcon()  { return $('id=com.gwl.trashscan:id/notification_icon'); }
    get notificationBadge() { return $('id=com.gwl.trashscan:id/notification_badge'); }

    // ==== Notification List Screen ====
    get notificationListTitle(){ return $('android=new UiSelector().textContains("Notification")'); }
    get notificationList()     { return $('id=com.gwl.trashscan:id/notificationRecycler'); }
    get firstNotificationItem(){ return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/notificationItem").instance(0)'); }
    get firstNotifTitle()      { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/notifTitle").instance(0)'); }
    get firstNotifTimestamp()  { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/notifTimestamp").instance(0)'); }
    get firstNotifUnreadDot()  { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/unreadDot").instance(0)'); }
    get emptyStateMsg()        { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/emptyStateText")'); }
    get backBtn()              { return $('~Navigate up'); }

    // ==== Notification Detail ====
    get notifDetailTitle()   { return $('id=com.gwl.trashscan:id/notifDetailTitle'); }
    get notifDetailBody()    { return $('id=com.gwl.trashscan:id/notifDetailBody'); }
    get notifDetailTime()    { return $('id=com.gwl.trashscan:id/notifDetailTime'); }

    // ==== Open Notification Screen ====
    async openNotifications() {
        try {
            await this.notificationIcon.waitForDisplayed({ timeout: 5000 });
            await this.notificationIcon.click();
            console.log('🔔 Notification screen opened');
            await driver.pause(1500);
        } catch {
            console.log('⚠️ Notification icon not found');
        }
    }

    // ==== Wait for Notification List ====
    async waitForNotificationList() {
        await driver.waitUntil(
            async () => {
                const selectors = [
                    'com.gwl.trashscan:id/notificationRecycler',
                    'com.gwl.trashscan:id/notificationItem',
                    'com.gwl.trashscan:id/emptyStateText'
                ];
                for (const id of selectors) {
                    if (await $(`id=${id}`).isDisplayed().catch(() => false)) return true;
                }
                if (await $('android=new UiSelector().textContains("Notification")').isDisplayed().catch(() => false)) return true;
                return false;
            },
            { timeout: 15000, timeoutMsg: '❌ Notification list screen did not load.' }
        );
        console.log('✅ Notification list loaded');
    }

    // ==== Tap First Notification ====
    async tapFirstNotification() {
        try {
            await this.firstNotificationItem.waitForDisplayed({ timeout: 5000 });
            await this.firstNotificationItem.click();
            console.log('🔔 First notification tapped');
            await driver.pause(1000);
        } catch {
            console.log('⚠️ No notifications to tap');
        }
    }

    // ==== Check if Empty State Shown ====
    async isEmptyStateVisible() {
        try {
            return await this.emptyStateMsg.isDisplayed();
        } catch {
            return false;
        }
    }

    // ==== Check if List Has Items ====
    async hasNotifications() {
        try {
            return await this.firstNotificationItem.isDisplayed();
        } catch {
            return false;
        }
    }

    // ==== Get Notification Count ====
    async getNotificationBadgeText() {
        try {
            await this.notificationBadge.waitForDisplayed({ timeout: 3000 });
            return await this.notificationBadge.getText();
        } catch {
            return null;
        }
    }

    // ==== Get First Notification Timestamp ====
    async getFirstNotifTimestamp() {
        try {
            await this.firstNotifTimestamp.waitForDisplayed({ timeout: 5000 });
            return await this.firstNotifTimestamp.getText();
        } catch {
            return null;
        }
    }

    // ==== Scroll Down ====
    async scrollDown() {
        const { width, height } = await driver.getWindowSize();
        await driver.action('pointer')
            .move({ x: width / 2, y: Math.floor(height * 0.7) })
            .down()
            .move({ x: width / 2, y: Math.floor(height * 0.3) })
            .up()
            .perform();
        await driver.pause(500);
    }

    // ==== Back to Home ====
    async backToHome() {
        try {
            await this.backBtn.waitForDisplayed({ timeout: 8000 });
            await this.backBtn.click();
        } catch {
            await driver.back();
        }
        await HomeScreen.waitForHomeScreen();
    }

    // ==== Back from Detail to List ====
    async backFromDetail() {
        try {
            await this.backBtn.waitForDisplayed({ timeout: 5000 });
            await this.backBtn.click();
        } catch {
            await driver.back();
        }
        await driver.pause(800);
    }
}

module.exports = new NotificationsScreen();
