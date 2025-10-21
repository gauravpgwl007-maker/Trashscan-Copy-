const Logout = require('../pageobjects/logout');

describe('Logout flow', () => {
    it('should logout from the app', async () => {
        // Perform logout
        await Logout.logout(true);

        // Optional: verify that login screen appears
        // const loginField = await $('id=com.gwl.trashscan:id/username');
        // await loginField.waitForDisplayed({ timeout: 10000 });
    });
});
