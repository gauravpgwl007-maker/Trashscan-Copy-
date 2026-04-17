const HomeScreen = require('./home.screen');

class WorkProgressScreen {

    // ==== Dashboard Tile ====
    get workProgressTile() { return $('id=com.gwl.trashscan:id/ll_work_progress'); }

    // ==== Work Progress List Screen ====
    get searchIcon()     { return $('id=com.gwl.trashscan:id/searchIcon'); }
    get searchInput()    { return $('id=com.gwl.trashscan:id/search_src_text'); }
    get backIcon()       { return $('~Navigate up'); }
    get propertyList()   { return $('id=com.gwl.trashscan:id/recyclerView'); }
    get propertyItems()  { return $$('id=com.gwl.trashscan:id/propertyItem'); }

    // ==== Property List Item ====
    get firstPropertyName()   { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/propertyName").instance(0)'); }
    get firstPropertyExpand() { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/expandArrow").instance(0)'); }
    get firstPropertyDetails(){ return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/propertyDetails").instance(0)'); }
    get checkInBtn()          { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/btnCheckIn").instance(0)'); }
    get checkOutBtn()         { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/btnCheckOut").instance(0)'); }

    // ==== Property Details Screen ====
    get violationDetails()    { return $('android=new UiSelector().textContains("Violation")'); }
    get checkpointsScanned()  { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/checkpointsCount")'); }
    get tasksCompleted()      { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/tasksCount")'); }
    get propertyDetailsTitle(){ return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/propertyDetailTitle")'); }

    // ==== Open Work Progress ====
    async openWorkProgress() {
        await this.workProgressTile.waitForDisplayed({ timeout: 5000 });
        await this.workProgressTile.click();
        console.log('✅ Opened Work Progress');
        await driver.pause(1500);
    }

    // ==== Verify List Loaded ====
    async waitForPropertyList() {
        await driver.waitUntil(
            async () => {
                const selectors = [
                    'com.gwl.trashscan:id/recyclerView',
                    'com.gwl.trashscan:id/propertyList',
                    'com.gwl.trashscan:id/propertyItem',
                    'com.gwl.trashscan:id/searchIcon'
                ];
                for (const id of selectors) {
                    if (await $(`id=${id}`).isDisplayed().catch(() => false)) return true;
                }
                return false;
            },
            { timeout: 15000, timeoutMsg: '❌ Work Progress property list did not load.' }
        );
        console.log('✅ Property list loaded');
    }

    // ==== Search ====
    async tapSearchIcon() {
        try {
            await this.searchIcon.waitForDisplayed({ timeout: 5000 });
            await this.searchIcon.click();
            console.log('🔍 Search icon tapped');
        } catch {
            console.log('⚠️ Search icon not found');
        }
    }

    async searchProperty(term) {
        await this.tapSearchIcon();
        try {
            await this.searchInput.waitForDisplayed({ timeout: 5000 });
            await this.searchInput.setValue(term);
            console.log(`🔍 Searched for: "${term}"`);
            await driver.pause(1000);
        } catch {
            console.log('⚠️ Search input not found');
        }
    }

    async clearSearch() {
        try {
            await this.searchInput.clearValue();
            await driver.back();
        } catch {}
    }

    // ==== Expand / Collapse Property ====
    async expandFirstProperty() {
        try {
            await this.firstPropertyExpand.waitForDisplayed({ timeout: 5000 });
            await this.firstPropertyExpand.click();
            console.log('📂 First property expanded');
            await driver.pause(800);
        } catch {
            // Try tapping the property name itself
            try {
                await this.firstPropertyName.waitForDisplayed({ timeout: 5000 });
                await this.firstPropertyName.click();
                console.log('📂 First property tapped to expand');
            } catch {
                console.log('⚠️ Could not expand first property');
            }
        }
    }

    async collapseFirstProperty() {
        try {
            await this.firstPropertyExpand.waitForDisplayed({ timeout: 5000 });
            await this.firstPropertyExpand.click();
            console.log('📁 First property collapsed');
            await driver.pause(800);
        } catch {
            console.log('⚠️ Could not collapse property');
        }
    }

    // ==== Check In / Check Out ====
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

    async tapCheckOut() {
        try {
            await this.checkOutBtn.waitForDisplayed({ timeout: 5000 });
            await this.checkOutBtn.click();
            console.log('✅ Check-Out tapped');
            await driver.pause(1500);
        } catch {
            console.log('⚠️ Check-Out button not visible');
        }
    }

    // ==== Open Property Details ====
    async openFirstPropertyDetails() {
        await this.expandFirstProperty();
        try {
            const detailsBtn = await $('android=new UiSelector().resourceId("com.gwl.trashscan:id/btnViewDetails").instance(0)');
            if (await detailsBtn.isDisplayed().catch(() => false)) {
                await detailsBtn.click();
            } else {
                await this.firstPropertyName.click();
            }
            console.log('📋 Property details opened');
            await driver.pause(1500);
        } catch {
            console.log('⚠️ Could not open property details');
        }
    }

    // ==== Back Navigation ====
    async goBack() {
        try {
            await HomeScreen.backButton.waitForDisplayed({ timeout: 5000 });
            await HomeScreen.backButton.click();
        } catch {
            await driver.back();
        }
        await driver.pause(800);
    }
}

module.exports = new WorkProgressScreen();
