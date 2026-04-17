const HomeScreen = require('./home.screen');

class AdminWorkProgressScreen {

    // ==== Dashboard Tile (same as porter — from fragment_home.xml) ====
    get workProgressTile() { return $('id=com.gwl.trashscan:id/ll_work_progress'); }

    // ==== Service Report / Properties List (source-verified: activity_service_report.xml) ====
    get propertiesList()  { return $('id=com.gwl.trashscan:id/recyclerviewList'); }
    get noDataText()      { return $('id=com.gwl.trashscan:id/textViewNoData'); }

    // ==== Property Row Item (source-verified: adapter_item_property_assigned.xml) ====
    // Each row is a CardView with id parent_cv_assigned_list
    get firstPropertyItem()    { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/parent_cv_assigned_list").instance(0)'); }
    get firstPropertyName()    { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/assignedproperty_name").instance(0)'); }
    get firstPropertyAddress() { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/assignedproperty_address").instance(0)'); }

    // ==== Search (toolbar menu item from daily_work_menu.xml, id="search") ====
    // The search icon lives in the ActionBar as a menu item
    get searchIcon()  { return $('id=com.gwl.trashscan:id/search'); }
    // When the SearchView expands, it creates a standard Android search EditText
    get searchInput() { return $('android=new UiSelector().resourceId("android:id/search_src_text")'); }
    get backIcon()    { return $('~Navigate up'); }

    // ==== Property Details (source-verified: activity_property_detail.xml) ====
    get propertyDetailsTitle()  { return $('id=com.gwl.trashscan:id/textViewPropertyName'); }
    get propertyDetailsAddress(){ return $('id=com.gwl.trashscan:id/textViewPropertyAddress'); }
    get prevArrow()             { return $('id=com.gwl.trashscan:id/imgLeft'); }
    get nextArrow()             { return $('id=com.gwl.trashscan:id/imgRight'); }
    get propertyCounter()       { return $('id=com.gwl.trashscan:id/txtCount'); }
    get checkoutStatusBtn()     { return $('id=com.gwl.trashscan:id/txvBtnCheckoutStatus'); }
    get assignPorterBtn()       { return $('id=com.gwl.trashscan:id/txvBtnAssignPorter'); }
    get porterRecycler()        { return $('id=com.gwl.trashscan:id/recyclerview_porter'); }
    get buildingRecycler()      { return $('id=com.gwl.trashscan:id/recyclerview_building'); }
    get taskDetailsRecycler()   { return $('id=com.gwl.trashscan:id/rvTaskDetails'); }
    get taskStatusSection()     { return $('id=com.gwl.trashscan:id/llTaskDetails'); }
    // First task item inside rvTaskDetails
    get firstTaskItem() { return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/rvTaskDetails").childSelector(new UiSelector().instance(0))'); }

    // ==== Service report title (text-based fallback) ====
    get serviceReportTitle() { return $('android=new UiSelector().textContains("Service Report")'); }

    // ================================================================
    // ==== Open Work Progress ====
    // ================================================================
    async openWorkProgress() {
        await this.workProgressTile.waitForDisplayed({ timeout: 10000 });
        await this.workProgressTile.click();
        console.log('✅ Opened Admin Work Progress');
        await driver.pause(1500);
    }

    // ================================================================
    // ==== Wait for Service Report / Property List ====
    // ================================================================
    async waitForServiceReport() {
        await driver.waitUntil(
            async () => {
                // Primary: the recycler for the property list
                if (await $('id=com.gwl.trashscan:id/recyclerviewList').isDisplayed().catch(() => false)) return true;
                // Secondary: a property row card
                if (await $('android=new UiSelector().resourceId("com.gwl.trashscan:id/parent_cv_assigned_list").instance(0)').isDisplayed().catch(() => false)) return true;
                // Fallback: the "no data" text visible when list is empty
                if (await $('id=com.gwl.trashscan:id/textViewNoData').isDisplayed().catch(() => false)) return true;
                // Fallback: search icon in toolbar (always present when screen loaded)
                if (await $('id=com.gwl.trashscan:id/search').isDisplayed().catch(() => false)) return true;
                return false;
            },
            { timeout: 20000, timeoutMsg: '❌ Admin Work Progress / Service Report did not load.' }
        );
        console.log('✅ Service Report / Property list loaded');
    }

    // ================================================================
    // ==== Search Property ====
    // ================================================================
    async searchProperty(term) {
        try {
            // Tap the search icon in the toolbar (menu item id="search")
            await this.searchIcon.waitForDisplayed({ timeout: 5000 });
            await this.searchIcon.click();
            await driver.pause(500);
            // Type into the expanded SearchView EditText
            await this.searchInput.waitForDisplayed({ timeout: 5000 });
            await this.searchInput.setValue(term);
            console.log(`🔍 Admin searched for: "${term}"`);
            await driver.pause(1000);
        } catch {
            console.log('⚠️ Search not available on this screen');
        }
    }

    async clearSearch() {
        try {
            await this.searchInput.clearValue();
        } catch {}
        try {
            // Close the search view by pressing back
            await driver.back();
        } catch {}
        await driver.pause(500);
    }

    // ================================================================
    // ==== Open First Property Details ====
    // ================================================================
    async openFirstPropertyDetails() {
        try {
            await this.firstPropertyItem.waitForDisplayed({ timeout: 10000 });
            await this.firstPropertyItem.click();
            console.log('📋 First property details opened');
            await driver.pause(1500);
        } catch {
            console.log('⚠️ Property item not found');
        }
    }

    // ================================================================
    // ==== Navigate Next / Previous in Property Details ====
    // ================================================================
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

    // ================================================================
    // ==== Get Property Counter Text ====
    // ================================================================
    async getPropertyCounterText() {
        try {
            await this.propertyCounter.waitForDisplayed({ timeout: 5000 });
            return await this.propertyCounter.getText();
        } catch {
            return null;
        }
    }

    // ================================================================
    // ==== Back Navigation ====
    // ================================================================
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
        // Keep pressing back until on home screen
        for (let i = 0; i < 3; i++) {
            try {
                const onHome = await $('id=com.gwl.trashscan:id/ll_work_progress').isDisplayed().catch(() => false);
                if (onHome) break;
                await driver.back();
                await driver.pause(800);
            } catch {}
        }
        await HomeScreen.waitForHomeScreen();
    }
}

module.exports = new AdminWorkProgressScreen();
