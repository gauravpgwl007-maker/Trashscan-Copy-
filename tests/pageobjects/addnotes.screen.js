const HomeScreen = require('./home.screen');

class AddNotesScreen {

    // ==== Dashboard Tile ====
    get addNotesTile() { return $('id=com.gwl.trashscan:id/ivAddNotes'); }

    // ==== Notes List Screen (source-verified from activity_add_note.xml) ====
    get notesList()  { return $('id=com.gwl.trashscan:id/recyclerview_addNotes'); }
    get noDataText() { return $('id=com.gwl.trashscan:id/textViewNoData'); }
    get backArrow()  { return $('~Navigate up'); }
    get screenTitle(){ return $('android=new UiSelector().textContains("Note")'); }

    // ==== Add Note Form (source-verified from dialog_add_note.xml) ====
    // Property selector (TextView that opens custom_list_dialog)
    get propertyDropdown()  { return $('id=com.gwl.trashscan:id/txt_property'); }
    // Address fields
    get addressLine1()      { return $('id=com.gwl.trashscan:id/editText_address1'); }
    get addressLine2()      { return $('id=com.gwl.trashscan:id/editText_address_2'); }
    get unitNumberField()   { return $('id=com.gwl.trashscan:id/editText_address_unit'); }
    // Reason — AppCompatSpinner (NOT a custom dialog, select via click)
    get reasonSpinner()     { return $('id=com.gwl.trashscan:id/spinner_reason'); }
    // Note description
    get noteDescField()     { return $('id=com.gwl.trashscan:id/editText_note_description'); }
    // Add Photo — TextView styled as button (text="ADD PHOTO")
    get addPhotoBtn()       { return $('id=com.gwl.trashscan:id/textview_title'); }
    get noteImageView()     { return $('id=com.gwl.trashscan:id/imageview_notes'); }
    // Form action buttons (TextViews styled as buttons)
    get cancelBtn()         { return $('id=com.gwl.trashscan:id/text_cancel'); }
    get saveDoneBtn()       { return $('id=com.gwl.trashscan:id/text_done'); }

    // ==== Custom List Dialog (from custom_list_dialog.xml) ====
    get dialogSearch()     { return $('id=com.gwl.trashscan:id/searchEditText'); }
    get dialogRecycler()   { return $('id=com.gwl.trashscan:id/recyclerViewLocation'); }
    get dialogDoneBtn()    { return $('id=com.gwl.trashscan:id/doneBtn'); }
    get dialogCancelBtn()  { return $('id=com.gwl.trashscan:id/cancelBtn'); }
    get dialogFirstItem()  { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/playerCB").instance(0)'); }

    // ==== Camera / Gallery Options (system bottom sheet) ====
    get cameraOption()     { return $('android=new UiSelector().text("Camera")'); }
    get galleryOption()    { return $('android=new UiSelector().text("Gallery")'); }

    // ================================================================
    // ==== Open Add Notes ====
    // ================================================================
    async openAddNotes() {
        await this.addNotesTile.waitForDisplayed({ timeout: 10000 });
        await this.addNotesTile.click();
        console.log('✅ Opened Add Notes');
        await driver.pause(1500);
    }

    // ================================================================
    // ==== Wait for Add Notes Screen ====
    // ================================================================
    async waitForAddNotesScreen() {
        await driver.waitUntil(
            async () => {
                if (await $('id=com.gwl.trashscan:id/recyclerview_addNotes').isDisplayed().catch(() => false)) return true;
                if (await $('id=com.gwl.trashscan:id/textViewNoData').isDisplayed().catch(() => false)) return true;
                if (await $('android=new UiSelector().textContains("Note")').isDisplayed().catch(() => false)) return true;
                return false;
            },
            { timeout: 15000, timeoutMsg: '❌ Add Notes screen did not load.' }
        );
        console.log('✅ Add Notes screen loaded');
    }

    // ================================================================
    // ==== Property Selection ====
    // ================================================================
    async openPropertyDropdown() {
        await this.propertyDropdown.waitForDisplayed({ timeout: 5000 });
        await this.propertyDropdown.click();
        console.log('🏢 Property dropdown opened');
        await driver.pause(1000);
    }

    async searchProperty(term) {
        try {
            await this.dialogSearch.waitForDisplayed({ timeout: 5000 });
            await this.dialogSearch.setValue(term);
            console.log(`🔍 Searched property: "${term}"`);
            await driver.pause(1000);
        } catch {
            console.log('⚠️ Property search input not found');
        }
    }

    async selectFirstProperty() {
        try {
            await this.dialogFirstItem.waitForDisplayed({ timeout: 5000 });
            await this.dialogFirstItem.click();
            console.log('✅ First property selected');
        } catch {
            console.log('⚠️ Property list item not found');
        }
    }

    async tapDialogDone() {
        await this.dialogDoneBtn.waitForDisplayed({ timeout: 5000 });
        await this.dialogDoneBtn.click();
        console.log('✅ Done tapped on dialog');
        await driver.pause(800);
    }

    async tapDialogCancel() {
        try {
            await this.dialogCancelBtn.waitForDisplayed({ timeout: 5000 });
            await this.dialogCancelBtn.click();
        } catch {
            await driver.back();
        }
        await driver.pause(800);
    }

    // ================================================================
    // ==== Enter Unit Number ====
    // ================================================================
    async enterUnitNumber(unit = '101') {
        try {
            await this.unitNumberField.waitForDisplayed({ timeout: 5000 });
            await this.unitNumberField.setValue(unit);
            console.log(`✅ Unit number entered: ${unit}`);
        } catch {
            console.log('⚠️ Unit number field not found');
        }
    }

    // ================================================================
    // ==== Select Reason (AppCompatSpinner) ====
    // ================================================================
    async selectReason() {
        try {
            await this.reasonSpinner.waitForDisplayed({ timeout: 5000 });
            await this.reasonSpinner.click();
            await driver.pause(1000);
            // After clicking the spinner, select the first item from the popup
            const firstSpinnerItem = await $('android=new UiSelector().className("android.widget.CheckedTextView").instance(0)');
            if (await firstSpinnerItem.isDisplayed().catch(() => false)) {
                await firstSpinnerItem.click();
                console.log('✅ Reason selected from spinner');
            } else {
                console.log('⚠️ Spinner items not visible');
            }
        } catch {
            console.log('⚠️ Reason spinner not found');
        }
    }

    // ================================================================
    // ==== Enter Note Description ====
    // ================================================================
    async enterNoteDescription(text = 'Automation test note description') {
        try {
            await this.noteDescField.waitForDisplayed({ timeout: 5000 });
            await this.noteDescField.setValue(text);
            console.log('✅ Note description entered');
        } catch {
            console.log('⚠️ Note description field not found');
        }
    }

    // ================================================================
    // ==== Add Photo ====
    // ================================================================
    async tapAddPhoto() {
        try {
            await this.addPhotoBtn.waitForDisplayed({ timeout: 5000 });
            await this.addPhotoBtn.click();
            console.log('📷 Add Photo tapped');
            await driver.pause(800);
        } catch {
            console.log('⚠️ Add Photo button not found');
        }
    }

    async selectCamera() {
        try {
            await this.cameraOption.waitForDisplayed({ timeout: 5000 });
            await this.cameraOption.click();
            await HomeScreen.allowCameraPermissionIfPresent();
            console.log('📷 Camera option selected');
        } catch {
            console.log('⚠️ Camera option not found');
        }
    }

    async selectGallery() {
        try {
            await this.galleryOption.waitForDisplayed({ timeout: 5000 });
            await this.galleryOption.click();
            await HomeScreen.allowMediaPermissionIfPresent();
            console.log('🖼️ Gallery option selected');
        } catch {
            console.log('⚠️ Gallery option not found');
        }
    }

    // ================================================================
    // ==== Save / Cancel Note ====
    // ================================================================
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

    async tapCancel() {
        try {
            await this.cancelBtn.waitForDisplayed({ timeout: 5000 });
            await this.cancelBtn.click();
            console.log('✅ Cancel tapped');
            await driver.pause(800);
        } catch {
            await driver.back();
        }
    }

    // ================================================================
    // ==== Back to Home ====
    // ================================================================
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
