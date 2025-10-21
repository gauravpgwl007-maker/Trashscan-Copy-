class DashboardScreen {
    // Selector for the Skip button on the dashboard/tutorial screen
    get skipButton() {
        return $('id=com.gwl.trashscan:id/intro_btn_skip');
    }

    /**
     * Attempts to click the Skip button if it exists, otherwise continues gracefully.
     */
    async skipToLogin() {
        try {
            console.log('🔍 Checking if Skip button is visible...');
            const isPresent = await this.skipButton.waitForExist({ timeout: 5000, interval: 500 });

            if (isPresent && await this.skipButton.isDisplayed()) {
                console.log('⏩ Skip button found — clicking it.');
                await this.skipButton.click();
                // Add small pause to allow screen transition
                await driver.pause(2000);
            } else {
                console.log('⚠️ Skip button not visible — continuing without skipping.');
            }
        } catch (err) {
            console.log('⚠️ Skip button not found (possibly already on Login screen).');
        }
    }
}

module.exports = new DashboardScreen();
