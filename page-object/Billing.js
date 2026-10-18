const xlsx = require('xlsx');
const { expect } = require('@playwright/test');
class BillingAddress {
    constructor(page) {
        this.page = page;
        this.country=page.locator("#country");
        this.postalcode=page.locator("#postal_code");
        this.houseno=page.locator("#house_number");
        this.street=page.locator("#street");
        this.city=page.locator("#city");
        this.state=page.locator("#state");
        this.checkoutbtn=page.getByRole('button',{'name':'Proceed to checkout '});
    }
async getExcelData() {
    const workbook = xlsx.readFile('C:/Users/jubyb/OneDrive/Documents/ToolshopBilling.xlsx');
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);
    return data[0];     
}

async fillBillingDetails(){
    const billingData = await this.getExcelData();
    console.log("Getting Billing address from excel:", billingData);
    await expect(this.country).toContainText(billingData.Country);
    await this.country.selectOption(billingData.Country);
    await this.postalcode.fill(billingData.Postalcode.toString());
    await this.houseno.fill(billingData.HouseNo.toString());
    await this.street.fill(" ");
    await this.street.fill(billingData.Street);
    await this.city.fill(billingData.City);
    await this.state.fill(billingData.State);
    await this.checkoutbtn.click();
}    
}
module.exports=BillingAddress;