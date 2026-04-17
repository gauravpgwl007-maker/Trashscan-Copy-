const HomeScreen = require('./home.screen');

class AdminWorkProgressScreen {

    // ==== Dashboard Tile (same ID as porter) ====
    get workProgressTile() { return $('id=com.gwl.trashscan:id/ll_work_progress'); }

    // ==== Service Report / Properties List ====
    get serviceReportTitle()    { return $('android=new UiSelector().textContains("Service Report")'); }
    get propertiesList()        { return $('id=com.gwl.trashscan:id/recyclerView'); }
    get firstPropertyItem()     { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/propertyItem").instance(0)'); }
    get searchIcon()            { return $('id=com.gwl.trashscan:id/searchIcon'); }
    get searchInput()           { return $('id=com.gwl.trashscan:id/search_src_text'); }
    get backIcon()              { return $('~Navigate up'); }

    // ==== Property Details ====
    get propertyDetailsTitle()  { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/propertyDetailTitle")'); }
    get nextArrow()             { return $('id=com.gwl.trashscan:id/btnNext'); }
    get prevArrow()             { return $('id=com.gwl.trashscan:id/btnPrev'); }
    get propertyCounter()       { return $('id=com.gwl.trashscan:id/propertyCounter'); }
    get taskStatusSection()     { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/tasksSection")'); }
    get firstTaskItem()         { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/taskItem").instance(0)'); }

    // ==== Open Work Progress ====
    async openWorkProgress() {
        await this.workProgressTile.waitForDisplayed({ timeout: 5000 });
        await this.workProgressTile.click();
        console.log('✅ Opened Admin Work Progress');
        await driver.pause(1500);
    }

    // ==== Wait for Service Report ====
    async waitForServiceReport() {
        await driver.waitUntil(
            async () => {
                const selectors = [
                    'com.gwl.trashscan:id/recyclerView',
                    'com.gwl.trashscan:id/searchIcon',
                    'com.gwl.trashscan:id/propertyItem'
                ];
                for (const id of selectors) {
                    if (await $(`id=${id}`).isDisplayed().catch(() => false)) return true;
                }
                if (await $('android=new UiSelector().textContains("Service Report")').isDisplayed().catch(() => false)) return true;
                return false;
            },
            { timeout: 15000, timeoutMsg: '❌ Admin Work Progress / Service Report did not load.' }
        );
        console.log('✅ Service Report / Property list loaded');
    }

    // ==== Search Property ====
    async searchProperty(term) {
        try {
            await this.searchIcon.waitForDisplayed({ timeout: 5000 });
            await this.searchIcon.click();
            await this.searchInput.waitForDisplayed({ timeout: 5000 });
            await this.searchInput.setValue(term);
            console.log(`🔍 Admin searched for: "${term}"`);
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

    // ==== Navigate Next / Previous ====
    async tapNextArrow() {
        try {
            await this.nextArrow.waitForDisplayed({ timeout: 5000 });
            await this.nextArrow.click();
            console.log('➡️ Next property');
            await driver.pause(800);
        } catch {
            console.log('⚠️ Next arrow not found');
        }
    }

    async tapPrevArrow() {
        try {
            await this.prevArrow.waitForDisplayed({ timeout: 5000 });
            await this.prevArrow.click();
            console.log('⬅️ Previous property');
            await driver.pause(800);
        } catch {
            console.log('⚠️ Previous arrow not found');
        }
    }

    // ==== Get Property Counter Text ====
    async getPropertyCounterText() {
        try {
            await this.propertyCounter.waitForDisplayed({ timeout: 5000 });
            return await this.propertyCounter.getText();
        } catch {
            return null;
        }
    }

    // ==== Back Navigation ====
    async goBack() {
        try {
            await this.backIcon.waitForDisplayed({ timeout: 5000 });
            await this.backIcon.click();
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

module.exports = new AdminWorkProgressScreen();
