const HomeScreen     = require('../pageobjects/home.screen');
const ClockScreen    = require('../pageobjects/clockIn.screen');
const ClockOutScreen = require('../pageobjects/clockout.screen');

describe('Clock Out', () => {

    before(async () => {
        await HomeScreen.waitForHomeScreen();
    });

    it('should perform Clock Out if button is available', async () => {
        await HomeScreen.waitForHomeScreen();

        if (await ClockOutScreen.clockOutBtn.isDisplayed().catch(() => false)) {
            console.log('🕕 Performing Clock Out...');
            await ClockOutScreen.clockOut();
            await ClockScreen.clockInBtn.waitForDisplayed({ timeout: 5000 });
        } else {
            console.log('⚠️ Clock Out button not found, skipping.');
        }
    });
});
