class LoginScreen {
    get username() { return $('id=com.gwl.trashscan:id/usrName'); }
    get password() { return $('id=com.gwl.trashscan:id/password'); }
    get loginBtn() { return $('id=com.gwl.trashscan:id/button_login'); }

    /**
     * Performs login with provided credentials.
     */
    async login(user, pass) {
        console.log('🔐 Waiting for username field...');
        await this.username.waitForDisplayed({ timeout: 10000 });

        console.log(`🧑 Entering username: ${user}`);
        await this.username.setValue(user);

        console.log('🔒 Entering password...');
        await this.password.setValue(pass);

        console.log('🚀 Clicking Login button...');
        await this.loginBtn.click();

        // Wait for potential transition after login
        await driver.pause(3000);
    }
}

module.exports = new LoginScreen();
