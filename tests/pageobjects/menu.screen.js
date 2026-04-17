class MenuScreen {

    // ==== Drawer Open Button ====
    get menuButton() {
        return $('id=com.gwl.trashscan:id/title_bar_left_menu');
    }

    // ==== Drawer Menu Item Selectors ====
    get menuHome() {
        return $('android=new UiSelector().text("Home")');
    }

    get menuProfile() {
        return $('android=new UiSelector().text("Profile")');
    }

    get menuActivate() {
        return $('android=new UiSelector().text("Activate")');
    }

    get menuPendingViolation() {
        return $('android=new UiSelector().text("Pending Violation")');
    }

    get menuLaunchTutorials() {
        return $('android=new UiSelector().text("Launch Tutorials")');
    }

    get menuReportIssue() {
        return $('android=new UiSelector().text("Report Issue")');
    }

    get menuUpdateLocation() {
        return $('android=new UiSelector().text("Update Location")');
    }

    get menuChangeLanguage() {
        return $('android=new UiSelector().text("Change Language")');
    }

    get menuForceCheckout() {
        return $('android=new UiSelector().text("Force Checkout")');
    }

    get menuLogout() {
        return $('android=new UiSelector().text("Logout")');
    }

    // ==== Open Drawer ====
    async openDrawer() {
        try {
            await this.menuButton.waitForDisplayed({ timeout: 5000 });
            await this.menuButton.click();
            console.log('📂 Drawer menu opened');
            await driver.pause(1000);
        } catch (err) {
            console.log('⚠️ Could not open drawer via button, trying swipe...');
            const { width, height } = await driver.getWindowSize();
            await driver.action('pointer')
                .move({ x: 0, y: height / 2 })
                .down()
                .move({ x: width * 0.4, y: height / 2 })
                .up()
                .perform();
            await driver.pause(1000);
        }
    }

    // ==== Return to Home via Menu (for screens without a back button) ====
    async returnViaMenu() {
        console.log('🔁 No back button — returning to Home via drawer menu...');
        await driver.pause(1000);
        await this.openDrawer();
        await this.menuHome.waitForDisplayed({ timeout: 5000 });
        await this.menuHome.click();
        console.log('🏠 Returned to Home via drawer menu');
        await driver.pause(1000);
    }

    // ==== Menu Actions ====
    async goToHome() {
        await this.openDrawer();
        await this.menuHome.waitForDisplayed({ timeout: 5000 });
        await this.menuHome.click();
        console.log('🏠 Navigated to Home');
    }

    async goToProfile() {
        await this.openDrawer();
        await this.menuProfile.waitForDisplayed({ timeout: 5000 });
        await this.menuProfile.click();
        console.log('👤 Navigated to Profile');
        await this.returnViaMenu();
    }

    async goToActivate() {
        await this.openDrawer();
        await this.menuActivate.waitForDisplayed({ timeout: 5000 });
        await this.menuActivate.click();
        console.log('✅ Navigated to Activate');
    }

    async goToPendingViolation() {
        await this.openDrawer();
        await this.menuPendingViolation.waitForDisplayed({ timeout: 5000 });
        await this.menuPendingViolation.click();
        console.log('⚠️ Navigated to Pending Violation');
        await this.returnViaMenu();
    }

    async goToLaunchTutorials() {
        await this.openDrawer();
        await this.menuLaunchTutorials.waitForDisplayed({ timeout: 5000 });
        await this.menuLaunchTutorials.click();
        console.log('📚 Navigated to Launch Tutorials');
        await this.returnViaMenu();
    }

    async goToReportIssue() {
        await this.openDrawer();
        await this.menuReportIssue.waitForDisplayed({ timeout: 5000 });
        await this.menuReportIssue.click();
        console.log('🚨 Navigated to Report Issue');
    }

    async goToUpdateLocation() {
        await this.openDrawer();
        await this.menuUpdateLocation.waitForDisplayed({ timeout: 5000 });
        await this.menuUpdateLocation.click();
        console.log('📍 Navigated to Update Location');
    }

    async goToChangeLanguage() {
        await this.openDrawer();
        await this.menuChangeLanguage.waitForDisplayed({ timeout: 5000 });
        await this.menuChangeLanguage.click();
        console.log('🌐 Navigated to Change Language');
        await this.returnViaMenu();
    }

    async goToForceCheckout() {
        await this.openDrawer();
        await this.menuForceCheckout.waitForDisplayed({ timeout: 5000 });
        await this.menuForceCheckout.click();
        console.log('🔄 Navigated to Force Checkout');
        await this.returnViaMenu();
    }


}

module.exports = new MenuScreen();