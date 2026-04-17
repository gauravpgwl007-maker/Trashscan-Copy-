const HomeScreen     = require('../pageobjects/home.screen');
const ClockScreen    = require('../pageobjects/clockIn.screen');
const ClockOutScreen = require('../pageobjects/clockout.screen');

describe('Clock In', () => {

    before(async () => {
        await HomeScreen.waitForHomeScreen();
    });

    it('should perform Clock In if button is available', async () => {
        await HomeScreen.waitForHomeScreen();

        if (await ClockScreen.clockInBtn.isDisplayed().catch(() => false)) {
            console.log('🕓 Clock In button found, performing action...');
            await ClockScreen.clockIn();
            await ClockOutScreen.clockOutBtn.waitForDisplayed({ timeout: 5000 });
        } else {
            console.log('⚠️ Clock In button not found, skipping.');
        }
    });
});
