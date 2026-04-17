const HomeScreen = require('./home.screen');

class AddNotesScreen {

    // ==== Dashboard Tile ====
    get addNotesTile() { return $('id=com.gwl.trashscan:id/ivAddNotes'); }

    // ==== Add Notes Screen ====
    get addNotesFab()     { return $('id=com.gwl.trashscan:id/fabAddNote'); }
    get notesList()       { return $('id=com.gwl.trashscan:id/notesRecycler'); }
    get backArrow()       { return $('~Navigate up'); }
    get screenTitle()     { return $('android=new UiSelector().textContains("Add Note")'); }

    // ==== Add Note Form ====
    get propertyDropdown()  { return $('id=com.gwl.trashscan:id/propertyDropdown'); }
    get propertySearch()    { return $('id=com.gwl.trashscan:id/propertySearchInput'); }
    get propertyListItem()  { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/playerCB").instance(0)'); }
    get doneBtnDropdown()   { return $('id=com.gwl.trashscan:id/doneBtn'); }
    get cancelBtnDropdown() { return $('id=com.gwl.trashscan:id/cancelBtn'); }

    get propertyAddressField() { return $('id=com.gwl.trashscan:id/propertyAddress'); }
    get unitNumberField()      { return $('id=com.gwl.trashscan:id/unitNumber'); }
    get reasonDropdown()       { return $('id=com.gwl.trashscan:id/reasonDropdown'); }
    get reasonListItem()       { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/playerCB").instance(0)'); }
    get addPhotoBtn()          { return $('id=com.gwl.trashscan:id/addPhotoBtn'); }
    get cameraOption()         { return $('id=com.gwl.trashscan:id/txvCamera'); }
    get galleryOption()        { return $('id=com.gwl.trashscan:id/txvGallery'); }
    get cancelImageOption()    { return $('id=com.gwl.trashscan:id/txvCancel'); }
    get captureBtn()           { return $('id=com.gwl.trashscan:id/captureButton'); }
    get nextBtnCamera()        { return $('id=com.gwl.trashscan:id/nextTextView'); }
    get doneBtnCamera()        { return $('id=com.gwl.trashscan:id/text_done'); }
    get saveDoneBtn()          { return $('id=com.gwl.trashscan:id/btnSaveNote'); }
    get validationMsg()        { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/validationMessage")'); }

    // ==== Open Add Notes ====
    async openAddNotes() {
        await this.addNotesTile.waitForDisplayed({ timeout: 5000 });
        await this.addNotesTile.click();
        console.log('✅ Opened Add Notes');
        await driver.pause(1500);
    }

    // ==== Wait for Add Notes Screen ====
    async waitForAddNotesScreen() {
        await driver.waitUntil(
            async () => {
                const selectors = [
                    'com.gwl.trashscan:id/fabAddNote',
                    'com.gwl.trashscan:id/notesRecycler',
                    'com.gwl.trashscan:id/ivAddNotes'
                ];
                for (const id of selectors) {
                    if (await $(`id=${id}`).isDisplayed().catch(() => false)) return true;
                }
                if (await $('android=new UiSelector().textContains("Add Note")').isDisplayed().catch(() => false)) return true;
                return false;
            },
            { timeout: 15000, timeoutMsg: '❌ Add Notes screen did not load.' }
        );
        console.log('✅ Add Notes screen loaded');
    }

    // ==== Tap "+" to Open Add Note Form ====
    async tapAddNoteFab() {
        try {
            await this.addNotesFab.waitForDisplayed({ timeout: 5000 });
            await this.addNotesFab.click();
            console.log('✅ Add Note FAB tapped');
            await driver.pause(1000);
        } catch {
            console.log('⚠️ Add Note FAB not found');
        }
    }

    // ==== Property Selection ====
    async openPropertyDropdown() {
        await this.propertyDropdown.waitForDisplayed({ timeout: 5000 });
        await this.propertyDropdown.click();
        console.log('🏢 Property dropdown opened');
        await driver.pause(1000);
    }

    async searchProperty(term) {
        try {
            await this.propertySearch.waitForDisplayed({ timeout: 5000 });
            await this.propertySearch.setValue(term);
            console.log(`🔍 Searched property: "${term}"`);
            await driver.pause(1000);
        } catch {
            console.log('⚠️ Property search input not found');
        }
    }

    async selectFirstProperty() {
        try {
            await this.propertyListItem.waitForDisplayed({ timeout: 5000 });
            await this.propertyListItem.click();
            console.log('✅ First property selected');
        } catch {
            console.log('⚠️ Property list item not found');
        }
    }

    async tapDoneDropdown() {
        await this.doneBtnDropdown.waitForDisplayed({ timeout: 5000 });
        await this.doneBtnDropdown.click();
        console.log('✅ Done tapped on dropdown');
        await driver.pause(800);
    }

    async tapCancelDropdown() {
        try {
            await this.cancelBtnDropdown.waitForDisplayed({ timeout: 5000 });
            await this.cancelBtnDropdown.click();
            console.log('✅ Cancel tapped on dropdown');
        } catch {
            await driver.back();
        }
        await driver.pause(800);
    }

    // ==== Enter Unit Number ====
    async enterUnitNumber(unit = '101') {
        try {
            await this.unitNumberField.waitForDisplayed({ timeout: 5000 });
            await this.unitNumberField.setValue(unit);
            console.log(`✅ Unit number entered: ${unit}`);
        } catch {
            console.log('⚠️ Unit number field not found');
        }
    }

    // ==== Select Reason ====
    async selectReason() {
        try {
            await this.reasonDropdown.waitForDisplayed({ timeout: 5000 });
            await this.reasonDropdown.click();
            await this.reasonListItem.waitForDisplayed({ timeout: 5000 });
            await this.reasonListItem.click();
            await this.tapDoneDropdown();
            console.log('✅ Reason selected');
        } catch {
            console.log('⚠️ Reason dropdown not found');
        }
    }

    // ==== Add Photo via Camera ====
    async addPhotoViaCamera() {
        console.log('📷 Adding photo via camera...');
        await this.addPhotoBtn.waitForDisplayed({ timeout: 5000 });
        await this.addPhotoBtn.click();
        await this.cameraOption.waitForDisplayed({ timeout: 5000 });
        await this.cameraOption.click();
        await HomeScreen.allowCameraPermissionIfPresent();
        await this.captureBtn.waitForDisplayed({ timeout: 10000 });
        await this.captureBtn.click();
        await this.nextBtnCamera.waitForDisplayed({ timeout: 10000 });
        await this.nextBtnCamera.click();
        await this.doneBtnCamera.waitForDisplayed({ timeout: 10000 });
        await this.doneBtnCamera.click();
        console.log('✅ Photo added via camera');
    }

    // ==== Add Photo via Gallery ====
    async addPhotoViaGallery() {
        console.log('🖼️ Adding photo via gallery...');
        await this.addPhotoBtn.waitForDisplayed({ timeout: 5000 });
        await this.addPhotoBtn.click();
        await this.galleryOption.waitForDisplayed({ timeout: 5000 });
        await this.galleryOption.click();
        await HomeScreen.allowMediaPermissionIfPresent();
        // Select first image from gallery
        const firstImage = await $('android=new UiSelector().resourceId("com.android.providers.media.documents:id/thumbnail").instance(0)');
        if (await firstImage.isDisplayed().catch(() => false)) {
            await firstImage.click();
        }
        console.log('✅ Photo added via gallery');
        await driver.pause(1000);
    }

    // ==== Cancel Photo Options ====
    async cancelPhotoOptions() {
        try {
            await this.addPhotoBtn.waitForDisplayed({ timeout: 5000 });
            await this.addPhotoBtn.click();
            await this.cancelImageOption.waitForDisplayed({ timeout: 5000 });
            await this.cancelImageOption.click();
            console.log('✅ Photo options cancelled');
        } catch {
            await driver.back();
        }
    }

    // ==== Save Note ====
    async tapSaveDone() {
        try {
            await this.saveDoneBtn.waitForDisplayed({ timeout: 5000 });
            await this.saveDoneBtn.click();
            console.log('✅ Save/Done tapped');
            await driver.pause(2000);
        } catch {
            console.log('⚠️ Save button not found');
        }
    }

    // ==== Check Validation Message ====
    async isValidationMsgVisible() {
        try {
            return await this.validationMsg.isDisplayed();
        } catch {
            return false;
        }
    }

    // ==== Back to Home ====
    async backToHome() {
        try {
            await this.backArrow.waitForDisplayed({ timeout: 8000 });
            await this.backArrow.click();
        } catch {
            await driver.back();
        }
        await HomeScreen.waitForHomeScreen();
    }
}

module.exports = new AddNotesScreen();
