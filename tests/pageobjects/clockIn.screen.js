class ClockScreen {

    get clockInBtn() {
        return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/buttonClockIn")');
    }

    async clockIn() {
        await this.clockInBtn.waitForDisplayed({ timeout: 5000 });
        await driver.pause(1000);
        await this.clockInBtn.click();
        console.log('✅ Clock In done');
    }


}

module.exports = new ClockScreen();
