const HomeScreen = require('./home.screen');

class DailyWorkPlanScreen {

    // ==== Dashboard Tile ====
    get dailyWorkPlanTile() { return $('id=com.gwl.trashscan:id/ivAddSubs'); }

    // ==== Property List Screen ====
    get checkInBtn()      { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/btnCheckIn").instance(0)'); }
    get mapViewBtn()      { return $('id=com.gwl.trashscan:id/btnMapView'); }
    get searchIcon()      { return $('id=com.gwl.trashscan:id/searchIcon'); }
    get searchInput()     { return $('id=com.gwl.trashscan:id/search_src_text'); }
    get propertyList()    { return $('id=com.gwl.trashscan:id/propertyRecycler'); }
    get firstPropertyItem(){ return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/propertyItem").instance(0)'); }
    get backBtn()         { return $('~Navigate up'); }

    // ==== Missed Checkout Popup ====
    get missedCheckoutPopup() { return $('android=new UiSelector().textContains("Missed Checkout")'); }
    get missedCheckoutOkBtn() { return $('android=new UiSelector().text("OK")'); }

    // ==== Property Details Screen ====
    get propertyDetailsTitle(){ return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/propertyDetailTitle")'); }
    get tasksList()           { return $('id=com.gwl.trashscan:id/tasksRecycler'); }
    get firstTaskCheckbox()   { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/taskCheckbox").instance(0)'); }
    get addServiceNoteBtn()   { return $('id=com.gwl.trashscan:id/btnAddServiceNote'); }
    get serviceNoteInput()    { return $('id=com.gwl.trashscan:id/serviceNoteInput'); }
    get submitServiceNoteBtn(){ return $('id=com.gwl.trashscan:id/btnSubmitNote'); }
    get checkOutPropertyBtn() { return $('id=com.gwl.trashscan:id/btnCheckOutProperty'); }
    get violationHistoryBtn() { return $('android=new UiSelector().textContains("Violation History")'); }
    get submitViolationBtn()  { return $('id=com.gwl.trashscan:id/btnSubmitViolation'); }

    // ==== Open Daily Work Plan ====
    async openDailyWorkPlan() {
        await this.dailyWorkPlanTile.waitForDisplayed({ timeout: 5000 });
        await this.dailyWorkPlanTile.click();
        console.log('✅ Opened Daily Work Plan');
        await driver.pause(1500);
    }

    // ==== Wait for Property List ====
    async waitForPropertyList() {
        await driver.waitUntil(
            async () => {
                const selectors = [
                    'com.gwl.trashscan:id/propertyRecycler',
                    'com.gwl.trashscan:id/propertyItem',
                    'com.gwl.trashscan:id/btnCheckIn',
                    'com.gwl.trashscan:id/searchIcon'
                ];
                for (const id of selectors) {
                    if (await $(`id=${id}`).isDisplayed().catch(() => false)) return true;
                }
                return false;
            },
            { timeout: 15000, timeoutMsg: '❌ Daily Work Plan property list did not load.' }
        );
        console.log('✅ Daily Work Plan property list loaded');
    }

    // ==== Dismiss Missed Checkout Popup ====
    async dismissMissedCheckoutIfPresent() {
        try {
            await this.missedCheckoutPopup.waitForDisplayed({ timeout: 3000 });
            await this.missedCheckoutOkBtn.click();
            console.log('✅ Missed checkout popup dismissed');
            await driver.pause(500);
        } catch {
            // No popup
        }
    }

    // ==== Check In to Property ====
    async tapCheckIn() {
        try {
            await this.checkInBtn.waitForDisplayed({ timeout: 5000 });
            await this.checkInBtn.click();
            console.log('✅ Check-In tapped');
            await driver.pause(1500);
        } catch {
            console.log('⚠️ Check-In button not visible');
        }
    }

    // ==== Search Property ====
    async searchProperty(term) {
        try {
            await this.searchIcon.waitForDisplayed({ timeout: 5000 });
            await this.searchIcon.click();
            await this.searchInput.waitForDisplayed({ timeout: 5000 });
            await this.searchInput.setValue(term);
            console.log(`🔍 Searched for: "${term}"`);
            await driver.pause(1000);
        } catch {
            console.log('⚠️ Search not available');
        }
    }

    async clearSearch() {
        try {
            await this.searchInput.clearValue();
            await driver.back();
        } catch {}
    }

    // ==== Open Map View ====
    async openMapView() {
        try {
            await this.mapViewBtn.waitForDisplayed({ timeout: 5000 });
            await this.mapViewBtn.click();
            console.log('🗺️ Map view opened');
            await driver.pause(2000);
        } catch {
            console.log('⚠️ Map View button not found');
        }
    }

    // ==== Open First Property Details ====
    async openFirstPropertyDetails() {
        try {
            await this.firstPropertyItem.waitForDisplayed({ timeout: 5000 });
            await this.firstPropertyItem.click();
            console.log('📋 First property details opened');
            await driver.pause(1500);
        } catch {
            console.log('⚠️ Property item not found');
        }
    }

    // ==== Complete First Task ====
    async completeFirstTask() {
        try {
            await this.firstTaskCheckbox.waitForDisplayed({ timeout: 5000 });
            await this.firstTaskCheckbox.click();
            console.log('✅ First task checked');
            await driver.pause(500);
        } catch {
            console.log('⚠️ Task checkbox not found');
        }
    }

    // ==== Add Service Note ====
    async addServiceNote(text = 'Test service note') {
        try {
            await this.addServiceNoteBtn.waitForDisplayed({ timeout: 5000 });
            await this.addServiceNoteBtn.click();
            await this.serviceNoteInput.waitForDisplayed({ timeout: 5000 });
            await this.serviceNoteInput.setValue(text);
            await this.submitServiceNoteBtn.waitForDisplayed({ timeout: 5000 });
            await this.submitServiceNoteBtn.click();
            console.log('✅ Service note added');
            await driver.pause(1000);
        } catch {
            console.log('⚠️ Service note form not found');
        }
    }

    // ==== View Violation History ====
    async viewViolationHistory() {
        try {
            await this.violationHistoryBtn.waitForDisplayed({ timeout: 5000 });
            await this.violationHistoryBtn.click();
            console.log('📋 Violation history opened');
            await driver.pause(1000);
        } catch {
            console.log('⚠️ Violation history button not found');
        }
    }

    // ==== Check Out from Property ====
    async checkOutProperty() {
        try {
            await this.checkOutPropertyBtn.waitForDisplayed({ timeout: 5000 });
            await this.checkOutPropertyBtn.click();
            console.log('✅ Checked out from property');
            await driver.pause(1500);
        } catch {
            console.log('⚠️ Check-Out button not found');
        }
    }

    // ==== Back Navigation ====
    async goBack() {
        try {
            await this.backBtn.waitForDisplayed({ timeout: 5000 });
            await this.backBtn.click();
        } catch {
            await driver.back();
        }
        await driver.pause(800);
    }

    async backToHome() {
        try {
            await HomeScreen.backButton.waitForDisplayed({ timeout: 8000 });
            await HomeScreen.backButton.click();
        } catch {
            await driver.back();
        }
        await HomeScreen.waitForHomeScreen();
    }
}

module.exports = new DailyWorkPlanScreen();
