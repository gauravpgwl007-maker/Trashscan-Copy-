const HomeScreen = require('./home.screen');

class MessageBroadcastScreen {

    // ==== Menu Entry ====
    get menuButton()          { return $('id=com.gwl.trashscan:id/title_bar_left_menu'); }
    get menuMessageBroadcast(){ return $('android=new UiSelector().text("Message Broadcast")'); }

    // ==== Message Broadcast Screen ====
    get broadcastTitle()       { return $('android=new UiSelector().textContains("Message Broadcast")'); }
    get userListDropdown()     { return $('id=com.gwl.trashscan:id/userListDropdown'); }
    get userSearchInput()      { return $('id=com.gwl.trashscan:id/userSearchInput'); }
    get selectAllOption()      { return $('android=new UiSelector().text("Select All")'); }
    get firstUserCheckbox()    { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/userCheckbox").instance(0)'); }
    get secondUserCheckbox()   { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/userCheckbox").instance(1)'); }
    get userDoneBtn()          { return $('id=com.gwl.trashscan:id/doneBtn'); }
    get selectedUsersCount()   { return $('id=com.gwl.trashscan:id/selectedUsersCount'); }

    get messageTitleField()    { return $('id=com.gwl.trashscan:id/messageTitle'); }
    get messageDescField()     { return $('id=com.gwl.trashscan:id/messageDescription'); }
    get sendBtn()              { return $('id=com.gwl.trashscan:id/btnSendBroadcast'); }

    // ==== Validation / Feedback ====
    get validationError()      { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/validationError")'); }
    get successMsg()           { return $('android=new UiSelector().textContains("success")'); }
    get errorNetworkMsg()      { return $('android=new UiSelector().textContains("internet")'); }
    get confirmationPopup()    { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/confirmDialog")'); }
    get confirmYesBtn()        { return $('android=new UiSelector().text("Yes")'); }
    get confirmCancelBtn()     { return $('android=new UiSelector().text("Cancel")'); }

    // ==== Open Message Broadcast from Drawer ====
    async openFromDrawer() {
        try {
            await this.menuButton.waitForDisplayed({ timeout: 5000 });
            await this.menuButton.click();
            await driver.pause(800);
            await this.menuMessageBroadcast.waitForDisplayed({ timeout: 5000 });
            await this.menuMessageBroadcast.click();
            console.log('📢 Message Broadcast opened');
            await driver.pause(1500);
        } catch {
            console.log('⚠️ Message Broadcast not in menu — may not be admin user');
        }
    }

    // ==== Wait for Broadcast Screen ====
    async waitForBroadcastScreen() {
        await driver.waitUntil(
            async () => {
                const selectors = [
                    'com.gwl.trashscan:id/messageTitle',
                    'com.gwl.trashscan:id/messageDescription',
                    'com.gwl.trashscan:id/btnSendBroadcast',
                    'com.gwl.trashscan:id/userListDropdown'
                ];
                for (const id of selectors) {
                    if (await $(`id=${id}`).isDisplayed().catch(() => false)) return true;
                }
                if (await $('android=new UiSelector().textContains("Message Broadcast")').isDisplayed().catch(() => false)) return true;
                return false;
            },
            { timeout: 15000, timeoutMsg: '❌ Message Broadcast screen did not load.' }
        );
        console.log('✅ Message Broadcast screen loaded');
    }

    // ==== Open User List ====
    async openUserListDropdown() {
        try {
            await this.userListDropdown.waitForDisplayed({ timeout: 5000 });
            await this.userListDropdown.click();
            console.log('👥 User list dropdown opened');
            await driver.pause(1000);
        } catch {
            console.log('⚠️ User list dropdown not found');
        }
    }

    // ==== Search User ====
    async searchUser(name) {
        try {
            await this.userSearchInput.waitForDisplayed({ timeout: 5000 });
            await this.userSearchInput.setValue(name);
            console.log(`🔍 Searched user: "${name}"`);
            await driver.pause(1000);
        } catch {
            console.log('⚠️ User search input not found');
        }
    }

    // ==== Select First User ====
    async selectFirstUser() {
        try {
            await this.firstUserCheckbox.waitForDisplayed({ timeout: 5000 });
            await this.firstUserCheckbox.click();
            console.log('✅ First user selected');
        } catch {
            console.log('⚠️ First user checkbox not found');
        }
    }

    // ==== Select Multiple Users ====
    async selectMultipleUsers(count = 2) {
        for (let i = 0; i < count; i++) {
            try {
                const checkbox = await $(`android=new UiSelector().resourceId("com.gwl.trashscan:id/userCheckbox").instance(${i})`);
                if (await checkbox.isDisplayed().catch(() => false)) {
                    await checkbox.click();
                    console.log(`✅ User ${i + 1} selected`);
                }
            } catch {
                console.log(`⚠️ User ${i + 1} checkbox not found`);
            }
        }
    }

    // ==== Deselect First User ====
    async deselectFirstUser() {
        try {
            await this.firstUserCheckbox.waitForDisplayed({ timeout: 5000 });
            const isChecked = await this.firstUserCheckbox.isSelected().catch(() => false);
            if (isChecked) {
                await this.firstUserCheckbox.click();
                console.log('✅ First user deselected');
            }
        } catch {
            console.log('⚠️ Could not deselect user');
        }
    }

    // ==== Tap Done on User Selection ====
    async tapUserDone() {
        try {
            await this.userDoneBtn.waitForDisplayed({ timeout: 5000 });
            await this.userDoneBtn.click();
            console.log('✅ User selection Done tapped');
            await driver.pause(800);
        } catch {
            console.log('⚠️ Done button not found');
        }
    }

    // ==== Enter Message Title ====
    async enterTitle(title) {
        try {
            await this.messageTitleField.waitForDisplayed({ timeout: 5000 });
            await this.messageTitleField.setValue(title);
            console.log(`✅ Title entered: "${title}"`);
        } catch {
            console.log('⚠️ Title field not found');
        }
    }

    // ==== Enter Message Description ====
    async enterDescription(desc) {
        try {
            await this.messageDescField.waitForDisplayed({ timeout: 5000 });
            await this.messageDescField.setValue(desc);
            console.log(`✅ Description entered`);
        } catch {
            console.log('⚠️ Description field not found');
        }
    }

    // ==== Tap Send ====
    async tapSend() {
        try {
            await this.sendBtn.waitForDisplayed({ timeout: 5000 });
            await this.sendBtn.click();
            console.log('📤 Send tapped');
            await driver.pause(2000);
        } catch {
            console.log('⚠️ Send button not found');
        }
    }

    // ==== Confirm Send (if popup) ====
    async confirmSend() {
        try {
            await this.confirmYesBtn.waitForDisplayed({ timeout: 5000 });
            await this.confirmYesBtn.click();
            console.log('✅ Send confirmed');
            await driver.pause(2000);
        } catch {}
    }

    // ==== Check Validation Displayed ====
    async isValidationVisible() {
        try {
            return await this.validationError.isDisplayed();
        } catch {
            return false;
        }
    }

    // ==== Check Success Message ====
    async isSuccessMessageVisible() {
        try {
            return await this.successMsg.isDisplayed();
        } catch {
            return false;
        }
    }

    // ==== Back to Home ====
    async backToHome() {
        try {
            const back = await $('~Navigate up');
            await back.waitForDisplayed({ timeout: 5000 });
            await back.click();
        } catch {
            await driver.back();
        }
        await HomeScreen.waitForHomeScreen();
    }
}

module.exports = new MessageBroadcastScreen();
