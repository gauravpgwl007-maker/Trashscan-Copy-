class ClockOutScreen {

    get clockOutBtn() {
        return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/buttonClockOut")');
    }

    async clockOut() {
        await this.clockOutBtn.waitForDisplayed({ timeout: 5000 });
        await this.clockOutBtn.click();
        console.log('📉 Clock Out done');
    }
}

module.exports = new ClockOutScreen();
