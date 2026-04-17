const HomeScreen = require('./home.screen');

class ViolationScreen {

    // ==== Violation Entry ====
    get violationTile()   { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/ivViolation")'); }
    get manualOption()    { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/buttonManully")'); }
    get scanViewOption()  { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/buttonScan")'); }
    get quickSnapOption() { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/buttonQuickSnap")'); }

    // ==== Manual Violation Form ====
    get propertyField()          { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/txt_property")'); }
    get propertyCheckbox()       { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/playerCB").instance(0)'); }
    get buildingField()          { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/txt_building")'); }
    get buildingCheckbox()       { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/playerCB").instance(0)'); }
    get unitTagField()           { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/txt_unit")'); }
    get unitTagCheckbox()        { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/playerCB").instance(0)'); }
    get ruleField()              { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/txt_reason")'); }
    get ruleCheckbox()           { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/checkbox").instance(4)'); }
    get violationActionField()   { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/txt_action")'); }
    get violationActionCheckbox(){ return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/playerCB").instance(11)'); }
    get doneBtn()                { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/doneBtn")'); }
    get specialNoteField()       { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/special_note_et")'); }
    get submitBtn()              { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/btnSubmit")'); }

    // ==== Add Image ====
    get addImageBtn()   { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/textview_title")'); }
    get takePhotoBtn()  { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/txvCamera")'); }
    get captureBtn()    { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/captureButton")'); }
    get nextBtn()       { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/nextTextView")'); }
    get imageDoneBtn()  { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/text_done")'); }

    // ==== Violation History ====
    get violationHistoryBtn() { return $('android=new UiSelector().textContains("Violation History")'); }
    get historyList()         { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/historyRecycler")'); }

    // ==== Validation / Error ====
    get validationToast()  { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/toast_msg")'); }
    get errorMessage()     { return $('android=new UiSelector().textContains("required")'); }

    // ==== QR Scanner (Scan View) ====
    get scannerQrView()  { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/scannerView")'); }
    get scanResult()     { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/scanResultText")'); }

    // ==== Private Helper ====
    async _selectFromDropdown(field, checkbox, label) {
        console.log(`🔘 Selecting ${label}...`);
        await field.waitForDisplayed({ timeout: 5000 });
        await field.click();
        await checkbox.waitForDisplayed({ timeout: 5000 });
        await checkbox.click();
        await this.doneBtn.waitForDisplayed({ timeout: 5000 });
        await this.doneBtn.click();
        console.log(`✅ ${label} selected`);
    }

    // ==== Violation Menu Entry ====
    async openViolation() {
        await this.violationTile.waitForDisplayed({ timeout: 5000 });
        await this.violationTile.click();
    }

    async openViolationManual() {
        await this.openViolation();
        await this.manualOption.waitForDisplayed({ timeout: 5000 });
        await this.manualOption.click();
        console.log('📋 Manual violation form opened');
        await driver.pause(1000);
    }

    // ==== Manual Violation Steps ====
    async selectProperty() {
        await this._selectFromDropdown(this.propertyField, this.propertyCheckbox, 'Property');
    }

    async selectBuilding() {
        await this._selectFromDropdown(this.buildingField, this.buildingCheckbox, 'Building');
    }

    async selectUnitTag() {
        await this._selectFromDropdown(this.unitTagField, this.unitTagCheckbox, 'Unit Tag');
    }

    async selectRule() {
        await this._selectFromDropdown(this.ruleField, this.ruleCheckbox, 'Rule');
    }

    async selectViolationAction() {
        await this._selectFromDropdown(this.violationActionField, this.violationActionCheckbox, 'Violation Action');
    }

    async enterSpecialNote(text = 'Test') {
        console.log('📝 Entering special note...');
        await this.specialNoteField.waitForDisplayed({ timeout: 5000 });
        await this.specialNoteField.click();
        await this.specialNoteField.setValue(text);
        console.log(`✅ Special note entered: "${text}"`);
    }

    async addImageViaCamera() {
        console.log('📷 Adding image via camera...');
        await this.addImageBtn.waitForDisplayed({ timeout: 5000 });
        await this.addImageBtn.click();
        await this.takePhotoBtn.waitForDisplayed({ timeout: 5000 });
        await this.takePhotoBtn.click();
        await HomeScreen.allowCameraPermissionIfPresent();
        await this.captureBtn.waitForDisplayed({ timeout: 10000 });
        await this.captureBtn.click();
        await this.nextBtn.waitForDisplayed({ timeout: 10000 });
        await this.nextBtn.click();
        await this.imageDoneBtn.waitForDisplayed({ timeout: 10000 });
        await this.imageDoneBtn.click();
        console.log('✅ Image captured and confirmed');
    }

    // ==== Submit Without Fields (validation test) ====
    async tapSubmitWithoutFields() {
        try {
            await this.submitBtn.waitForDisplayed({ timeout: 5000 });
            await this.submitBtn.click();
            console.log('⚠️ Submit tapped without filling fields');
            await driver.pause(1000);
        } catch {
            console.log('⚠️ Submit button not found - form not opened');
        }
    }

    // ==== View Violation History ====
    async openViolationHistory() {
        try {
            await this.violationHistoryBtn.waitForDisplayed({ timeout: 5000 });
            await this.violationHistoryBtn.click();
            console.log('📋 Violation history opened');
            await driver.pause(1000);
        } catch {
            console.log('⚠️ Violation history button not found');
        }
    }

    // ==== Scan View ====
    async openViolationScanView() {
        await this.openViolation();
        await this.scanViewOption.waitForDisplayed({ timeout: 5000 });
        await this.scanViewOption.click();
        await driver.pause(2000);
        await HomeScreen.allowCameraPermissionIfPresent();
        await HomeScreen.allowMediaPermissionIfPresent();
        await HomeScreen.backButton.waitForDisplayed({ timeout: 10000 });
        await HomeScreen.backButton.click();
        await HomeScreen.waitForHomeScreen();
    }

    // ==== Quick Snap ====
    async openViolationQuickSnap() {
        await this.openViolation();
        await this.quickSnapOption.waitForDisplayed({ timeout: 5000 });
        await this.quickSnapOption.click();
        await driver.pause(2000);
        await HomeScreen.allowCameraPermissionIfPresent();
        await HomeScreen.allowMediaPermissionIfPresent();
        await HomeScreen.backButton.waitForDisplayed({ timeout: 10000 });
        await HomeScreen.backButton.click();
        await HomeScreen.waitForHomeScreen();
    }

    // ==== Quick Snap Full Submit ====
    async openViolationQuickSnapAndCapture() {
        await this.openViolation();
        await this.quickSnapOption.waitForDisplayed({ timeout: 5000 });
        await this.quickSnapOption.click();
        await driver.pause(2000);
        await HomeScreen.allowCameraPermissionIfPresent();
        // Attempt to capture image
        try {
            await this.captureBtn.waitForDisplayed({ timeout: 10000 });
            await this.captureBtn.click();
            await this.nextBtn.waitForDisplayed({ timeout: 10000 });
            await this.nextBtn.click();
            console.log('✅ Quick snap image captured');
            await driver.pause(2000);
        } catch {
            await HomeScreen.backButton.click();
        }
        await HomeScreen.waitForHomeScreen();
    }

    // ==== Check if 3 Violation Options Visible ====
    async areAllViolationOptionsVisible() {
        await this.openViolation();
        const manualVisible   = await this.manualOption.isDisplayed().catch(() => false);
        const scanVisible     = await this.scanViewOption.isDisplayed().catch(() => false);
        const quickSnapVisible= await this.quickSnapOption.isDisplayed().catch(() => false);
        console.log(`Manual: ${manualVisible}, Scan: ${scanVisible}, QuickSnap: ${quickSnapVisible}`);
        return manualVisible && scanVisible && quickSnapVisible;
    }

    // ==== Check Auto-Fill After QR Scan ====
    async checkAutoFillFields() {
        const propertyFilled = await this.propertyField.getText().catch(() => '');
        const buildingFilled = await this.buildingField.getText().catch(() => '');
        const unitFilled     = await this.unitTagField.getText().catch(() => '');
        return { property: propertyFilled, building: buildingFilled, unit: unitFilled };
    }
}

module.exports = new ViolationScreen();
