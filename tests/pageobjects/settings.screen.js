const HomeScreen = require('./home.screen');

class SettingsScreen {

    // ==== Hamburger Menu (defined in MenuScreen too, duplicated here for convenience) ====
    get menuButton()          { return $('id=com.gwl.trashscan:id/title_bar_left_menu'); }
    get menuHome()            { return $('android=new UiSelector().text("Home")'); }
    get menuProfile()         { return $('android=new UiSelector().text("Profile")'); }
    get menuActivate()        { return $('android=new UiSelector().text("Activate")'); }
    get menuPendingViolation(){ return $('android=new UiSelector().text("Pending Violation")'); }
    get menuLaunchTutorials() { return $('android=new UiSelector().text("Launch Tutorials")'); }
    get menuReportIssue()     { return $('android=new UiSelector().text("Report Issue")'); }
    get menuUpdateLocation()  { return $('android=new UiSelector().text("Update Location")'); }
    get menuChangeLanguage()  { return $('android=new UiSelector().text("Change Language")'); }
    get menuForceCheckout()   { return $('android=new UiSelector().text("Force Checkout")'); }
    get menuLogout()          { return $('android=new UiSelector().text("Logout")'); }
    get menuMessageBroadcast(){ return $('android=new UiSelector().text("Message Broadcast")'); }

    // ==== Profile Screen ====
    get profileNameField()    { return $('id=com.gwl.trashscan:id/profileName'); }
    get profileEmailField()   { return $('id=com.gwl.trashscan:id/profileEmail'); }
    get profilePhoneField()   { return $('id=com.gwl.trashscan:id/profilePhone'); }
    get profileSaveBtn()      { return $('id=com.gwl.trashscan:id/btnSaveProfile'); }
    get profilePicture()      { return $('id=com.gwl.trashscan:id/profileImage'); }
    get changePasswordBtn()   { return $('id=com.gwl.trashscan:id/btnChangePassword'); }
    get currentPasswordField(){ return $('id=com.gwl.trashscan:id/currentPassword'); }
    get newPasswordField()    { return $('id=com.gwl.trashscan:id/newPassword'); }
    get confirmPasswordField(){ return $('id=com.gwl.trashscan:id/confirmPassword'); }
    get updatePasswordBtn()   { return $('id=com.gwl.trashscan:id/btnUpdatePassword'); }
    get employeeId()          { return $('id=com.gwl.trashscan:id/employeeId'); }
    get employeeDept()        { return $('id=com.gwl.trashscan:id/employeeDept'); }

    // ==== Activate (Scanner) Screen ====
    get activateScannerView() { return $('id=com.gwl.trashscan:id/scannerView'); }
    get activateFlashBtn()    { return $('id=com.gwl.trashscan:id/flashToggle'); }
    get activateActivityLogs(){ return $('id=com.gwl.trashscan:id/activityLogsBtn'); }

    // ==== Pending Violation Screen ====
    get pendingViolationList()  { return $('id=com.gwl.trashscan:id/pendingViolationRecycler'); }
    get firstPendingItem()      { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/pendingViolationItem").instance(0)'); }
    get pendingViolationImage() { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/violationImage").instance(0)'); }
    get pendingPropertyField()  { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/txt_property")'); }
    get pendingBuildingField()  { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/txt_building")'); }
    get pendingBinTagField()    { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/txt_unit")'); }
    get pendingRuleField()      { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/txt_reason")'); }
    get pendingActionField()    { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/txt_action")'); }
    get pendingSubmitBtn()      { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/btnSubmit")'); }
    get pendingDoneBtn()        { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/doneBtn")'); }
    get pendingCheckbox()       { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/playerCB").instance(0)'); }
    get pendingEmptyState()     { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/emptyStateText")'); }

    // ==== Tutorial (Play Intro) Screen ====
    get tutorialContainer()  { return $('id=com.gwl.trashscan:id/tutorialContainer'); }
    get tutorialSlide()      { return $('id=com.gwl.trashscan:id/tutorialSlide'); }
    get tutorialNextBtn()    { return $('id=com.gwl.trashscan:id/btnTutorialNext'); }
    get tutorialPrevBtn()    { return $('id=com.gwl.trashscan:id/btnTutorialPrev'); }

    // ==== Report Issue Screen ====
    get reportIssueTitle()     { return $('android=new UiSelector().textContains("Report Issue")'); }
    get issueCategoryDropdown(){ return $('id=com.gwl.trashscan:id/issueCategoryDropdown'); }
    get issueCategoryItem()    { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/playerCB").instance(0)'); }
    get issueDescriptionField(){ return $('id=com.gwl.trashscan:id/issueDescription'); }
    get issueAddImageBtn()     { return $('id=com.gwl.trashscan:id/btnAddImage'); }
    get issueAddVideoBtn()     { return $('id=com.gwl.trashscan:id/btnAddVideo'); }
    get issueCameraOption()    { return $('id=com.gwl.trashscan:id/txvCamera'); }
    get issueGalleryOption()   { return $('id=com.gwl.trashscan:id/txvGallery'); }
    get issueCancelOption()    { return $('id=com.gwl.trashscan:id/txvCancel'); }
    get issueSubmitBtn()       { return $('id=com.gwl.trashscan:id/btnSubmitIssue'); }
    get issueSuccessPopup()    { return $('android=new UiSelector().textContains("success")'); }
    get issueSuccessOkBtn()    { return $('android=new UiSelector().text("OK")'); }
    get issueDoneCategoryBtn() { return $('id=com.gwl.trashscan:id/doneBtn'); }

    // ==== Update Location Screen ====
    get mapView()              { return $('id=com.gwl.trashscan:id/mapView'); }
    get updateLocationBtn()    { return $('id=com.gwl.trashscan:id/btnUpdateLocation'); }
    get locationSuccessMsg()   { return $('android=new UiSelector().textContains("updated")'); }

    // ==== Change Language Screen ====
    get languagePopup()        { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/languageDialog")'); }
    get languageYesBtn()       { return $('android=new UiSelector().text("Yes")'); }
    get languageNoBtn()        { return $('android=new UiSelector().text("No")'); }

    // ==== Force Checkout Screen ====
    get forceCheckoutTitle()   { return $('android=new UiSelector().textContains("Force Checkout")'); }
    get forcePropertyDropdown(){ return $('id=com.gwl.trashscan:id/forcePropertyDropdown'); }
    get forcePropertySearch()  { return $('id=com.gwl.trashscan:id/propertySearchInput'); }
    get forcePropertyCheckbox(){ return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/playerCB").instance(0)'); }
    get forceDoneBtn()         { return $('id=com.gwl.trashscan:id/doneBtn'); }
    get forceReasonField()     { return $('id=com.gwl.trashscan:id/forceCheckoutReason'); }
    get forceSubmitBtn()       { return $('id=com.gwl.trashscan:id/btnForceCheckout'); }
    get forceBackBtn()         { return $('~Navigate up'); }

    // ==== Logout ====
    get logoutConfirmYes() { return $('android=new UiSelector().text("Yes")'); }
    get logoutConfirmNo()  { return $('android=new UiSelector().text("No")'); }

    // ================================================================
    // ==== Menu Navigation Helpers ====
    // ================================================================
    async openDrawer() {
        try {
            await this.menuButton.waitForDisplayed({ timeout: 5000 });
            await this.menuButton.click();
            console.log('📂 Drawer opened');
            await driver.pause(800);
        } catch {
            const { width, height } = await driver.getWindowSize();
            await driver.action('pointer')
                .move({ x: 0, y: height / 2 })
                .down()
                .move({ x: Math.floor(width * 0.4), y: height / 2 })
                .up()
                .perform();
            await driver.pause(800);
        }
    }

    async returnToHomeViaMenu() {
        await this.openDrawer();
        await this.menuHome.waitForDisplayed({ timeout: 5000 });
        await this.menuHome.click();
        await HomeScreen.waitForHomeScreen();
    }

    // ================================================================
    // ==== Profile Actions ====
    // ================================================================
    async openProfile() {
        await this.openDrawer();
        await this.menuProfile.waitForDisplayed({ timeout: 5000 });
        await this.menuProfile.click();
        console.log('👤 Profile screen opened');
        await driver.pause(1500);
    }

    async isProfileFieldsVisible() {
        const name  = await this.profileNameField.isDisplayed().catch(() => false);
        const email = await this.profileEmailField.isDisplayed().catch(() => false);
        return name || email;
    }

    async editProfileField(field, value) {
        await field.waitForDisplayed({ timeout: 5000 });
        await field.clearValue();
        await field.setValue(value);
        console.log(`✏️ Field updated`);
    }

    async tapSaveProfile() {
        try {
            await this.profileSaveBtn.waitForDisplayed({ timeout: 5000 });
            await this.profileSaveBtn.click();
            console.log('💾 Profile saved');
            await driver.pause(1500);
        } catch {
            console.log('⚠️ Save button not found');
        }
    }

    // ================================================================
    // ==== Activate Scanner Actions ====
    // ================================================================
    async openActivate() {
        await this.openDrawer();
        await this.menuActivate.waitForDisplayed({ timeout: 5000 });
        await this.menuActivate.click();
        console.log('🔑 Activate scanner opened');
        await driver.pause(1500);
        await HomeScreen.allowCameraPermissionIfPresent();
    }

    async toggleActivateFlash() {
        try {
            await this.activateFlashBtn.waitForDisplayed({ timeout: 5000 });
            await this.activateFlashBtn.click();
            console.log('💡 Flash toggled in Activate scanner');
            await driver.pause(500);
        } catch {
            console.log('⚠️ Flash button not found in Activate');
        }
    }

    async openActivityLogsFromActivate() {
        try {
            await this.activateActivityLogs.waitForDisplayed({ timeout: 5000 });
            await this.activateActivityLogs.click();
            console.log('📋 Activity logs opened from Activate');
            await driver.pause(1000);
        } catch {
            console.log('⚠️ Activity logs button not found in Activate');
        }
    }

    // ================================================================
    // ==== Pending Violation Actions ====
    // ================================================================
    async openPendingViolation() {
        await this.openDrawer();
        await this.menuPendingViolation.waitForDisplayed({ timeout: 5000 });
        await this.menuPendingViolation.click();
        console.log('⚠️ Pending Violation screen opened');
        await driver.pause(1500);
    }

    async openFirstPendingViolation() {
        try {
            await this.firstPendingItem.waitForDisplayed({ timeout: 5000 });
            await this.firstPendingItem.click();
            console.log('📋 First pending violation opened');
            await driver.pause(1000);
        } catch {
            console.log('⚠️ No pending violations found');
        }
    }

    async fillPendingViolationForm() {
        const fields = [
            { field: this.pendingPropertyField, label: 'Property' },
            { field: this.pendingBuildingField,  label: 'Building' },
            { field: this.pendingBinTagField,    label: 'Bin Tag' },
            { field: this.pendingRuleField,      label: 'Rule' },
            { field: this.pendingActionField,    label: 'Action' },
        ];
        for (const { field, label } of fields) {
            try {
                await field.waitForDisplayed({ timeout: 5000 });
                await field.click();
                await this.pendingCheckbox.waitForDisplayed({ timeout: 5000 });
                await this.pendingCheckbox.click();
                await this.pendingDoneBtn.waitForDisplayed({ timeout: 5000 });
                await this.pendingDoneBtn.click();
                console.log(`✅ ${label} selected`);
            } catch {
                console.log(`⚠️ Could not select ${label}`);
            }
        }
    }

    async submitPendingViolation() {
        try {
            await this.pendingSubmitBtn.waitForDisplayed({ timeout: 5000 });
            await this.pendingSubmitBtn.click();
            console.log('✅ Pending violation submitted');
            await driver.pause(2000);
        } catch {
            console.log('⚠️ Submit button not found');
        }
    }

    // ================================================================
    // ==== Tutorial Actions ====
    // ================================================================
    async openTutorials() {
        await this.openDrawer();
        await this.menuLaunchTutorials.waitForDisplayed({ timeout: 5000 });
        await this.menuLaunchTutorials.click();
        console.log('📚 Tutorials opened');
        await driver.pause(1500);
    }

    async swipeLeftOnTutorial() {
        const { width, height } = await driver.getWindowSize();
        await driver.action('pointer')
            .move({ x: Math.floor(width * 0.8), y: height / 2 })
            .down()
            .move({ x: Math.floor(width * 0.2), y: height / 2 })
            .up()
            .perform();
        console.log('👈 Swiped left on tutorial');
        await driver.pause(500);
    }

    async swipeRightOnTutorial() {
        const { width, height } = await driver.getWindowSize();
        await driver.action('pointer')
            .move({ x: Math.floor(width * 0.2), y: height / 2 })
            .down()
            .move({ x: Math.floor(width * 0.8), y: height / 2 })
            .up()
            .perform();
        console.log('👉 Swiped right on tutorial');
        await driver.pause(500);
    }

    // ================================================================
    // ==== Report Issue Actions ====
    // ================================================================
    async openReportIssue() {
        await this.openDrawer();
        await this.menuReportIssue.waitForDisplayed({ timeout: 5000 });
        await this.menuReportIssue.click();
        console.log('🚨 Report Issue opened');
        await driver.pause(1500);
    }

    async selectIssueCategory() {
        try {
            await this.issueCategoryDropdown.waitForDisplayed({ timeout: 5000 });
            await this.issueCategoryDropdown.click();
            await this.issueCategoryItem.waitForDisplayed({ timeout: 5000 });
            await this.issueCategoryItem.click();
            await this.issueDoneCategoryBtn.waitForDisplayed({ timeout: 5000 });
            await this.issueDoneCategoryBtn.click();
            console.log('✅ Issue category selected');
        } catch {
            console.log('⚠️ Category dropdown not found');
        }
    }

    async enterIssueDescription(text = 'Automation test issue report') {
        try {
            await this.issueDescriptionField.waitForDisplayed({ timeout: 5000 });
            await this.issueDescriptionField.setValue(text);
            console.log(`✅ Issue description entered`);
        } catch {
            console.log('⚠️ Description field not found');
        }
    }

    async tapAddImage() {
        try {
            await this.issueAddImageBtn.waitForDisplayed({ timeout: 5000 });
            await this.issueAddImageBtn.click();
            await driver.pause(800);
        } catch {
            console.log('⚠️ Add Image button not found');
        }
    }

    async tapAddVideo() {
        try {
            await this.issueAddVideoBtn.waitForDisplayed({ timeout: 5000 });
            await this.issueAddVideoBtn.click();
            await driver.pause(800);
        } catch {
            console.log('⚠️ Add Video button not found');
        }
    }

    async cancelMediaOption() {
        try {
            await this.issueCancelOption.waitForDisplayed({ timeout: 5000 });
            await this.issueCancelOption.click();
        } catch {
            await driver.back();
        }
    }

    async submitIssueReport() {
        try {
            await this.issueSubmitBtn.waitForDisplayed({ timeout: 5000 });
            await this.issueSubmitBtn.click();
            console.log('✅ Issue report submitted');
            await driver.pause(2000);
        } catch {
            console.log('⚠️ Submit button not found');
        }
    }

    async dismissSuccessPopup() {
        try {
            await this.issueSuccessOkBtn.waitForDisplayed({ timeout: 5000 });
            await this.issueSuccessOkBtn.click();
            console.log('✅ Success popup dismissed');
        } catch {}
    }

    // ================================================================
    // ==== Update Location Actions ====
    // ================================================================
    async openUpdateLocation() {
        await this.openDrawer();
        await this.menuUpdateLocation.waitForDisplayed({ timeout: 5000 });
        await this.menuUpdateLocation.click();
        console.log('📍 Update Location opened');
        await driver.pause(1500);
    }

    async tapUpdateLocationBtn() {
        try {
            await this.updateLocationBtn.waitForDisplayed({ timeout: 5000 });
            await this.updateLocationBtn.click();
            console.log('📍 Update Location tapped');
            await driver.pause(3000);
        } catch {
            console.log('⚠️ Update Location button not found');
        }
    }

    // ================================================================
    // ==== Change Language Actions ====
    // ================================================================
    async openChangeLanguage() {
        await this.openDrawer();
        await this.menuChangeLanguage.waitForDisplayed({ timeout: 5000 });
        await this.menuChangeLanguage.click();
        console.log('🌐 Change Language opened');
        await driver.pause(1500);
    }

    async confirmLanguageChange() {
        try {
            await this.languageYesBtn.waitForDisplayed({ timeout: 5000 });
            await this.languageYesBtn.click();
            console.log('✅ Language change confirmed');
            await driver.pause(3000);
        } catch {
            console.log('⚠️ Yes button not found');
        }
    }

    async cancelLanguageChange() {
        try {
            await this.languageNoBtn.waitForDisplayed({ timeout: 5000 });
            await this.languageNoBtn.click();
            console.log('✅ Language change cancelled');
            await driver.pause(800);
        } catch {
            await driver.back();
        }
    }

    // ================================================================
    // ==== Force Checkout Actions ====
    // ================================================================
    async openForceCheckout() {
        await this.openDrawer();
        await this.menuForceCheckout.waitForDisplayed({ timeout: 5000 });
        await this.menuForceCheckout.click();
        console.log('🔄 Force Checkout opened');
        await driver.pause(1500);
    }

    async openForcePropertyDropdown() {
        try {
            await this.forcePropertyDropdown.waitForDisplayed({ timeout: 5000 });
            await this.forcePropertyDropdown.click();
            console.log('🏢 Force Checkout property dropdown opened');
            await driver.pause(800);
        } catch {
            console.log('⚠️ Force Checkout property dropdown not found');
        }
    }

    async searchAndSelectForceProperty(term = '') {
        try {
            if (term) {
                await this.forcePropertySearch.waitForDisplayed({ timeout: 3000 });
                await this.forcePropertySearch.setValue(term);
                await driver.pause(1000);
            }
            await this.forcePropertyCheckbox.waitForDisplayed({ timeout: 5000 });
            await this.forcePropertyCheckbox.click();
            await this.forceDoneBtn.waitForDisplayed({ timeout: 5000 });
            await this.forceDoneBtn.click();
            console.log('✅ Force Checkout property selected');
        } catch {
            console.log('⚠️ Could not select force checkout property');
        }
    }

    async enterForceReason(text = 'Automation test reason') {
        try {
            await this.forceReasonField.waitForDisplayed({ timeout: 5000 });
            await this.forceReasonField.setValue(text);
            console.log(`✅ Force reason entered`);
        } catch {
            console.log('⚠️ Force reason field not found');
        }
    }

    async submitForceCheckout() {
        try {
            await this.forceSubmitBtn.waitForDisplayed({ timeout: 5000 });
            await this.forceSubmitBtn.click();
            console.log('✅ Force Checkout submitted');
            await driver.pause(2000);
        } catch {
            console.log('⚠️ Submit button not found');
        }
    }

    async goBackFromForceCheckout() {
        try {
            await this.forceBackBtn.waitForDisplayed({ timeout: 5000 });
            await this.forceBackBtn.click();
        } catch {
            await driver.back();
        }
        await HomeScreen.waitForHomeScreen();
    }

    // ================================================================
    // ==== Logout ====
    // ================================================================
    async tapLogout() {
        await this.openDrawer();
        await this.menuLogout.waitForDisplayed({ timeout: 5000 });
        await this.menuLogout.click();
        console.log('🚪 Logout tapped');
        await driver.pause(1000);
    }

    async confirmLogout() {
        try {
            await this.logoutConfirmYes.waitForDisplayed({ timeout: 5000 });
            await this.logoutConfirmYes.click();
            console.log('✅ Logout confirmed');
            await driver.pause(3000);
        } catch {
            console.log('⚠️ Logout confirmation not found — may have logged out already');
        }
    }

    async cancelLogout() {
        try {
            await this.logoutConfirmNo.waitForDisplayed({ timeout: 5000 });
            await this.logoutConfirmNo.click();
            console.log('✅ Logout cancelled');
        } catch {}
    }
}

module.exports = new SettingsScreen();
