class Registration{
    constructor(page){
        this.page=page;
        this.firstname=page.locator("#first_name");
        this.lastname=page.locator("#last_name")
        this.dob=page.locator("#dob");
        this.countryname = page.locator("#country");
        this.postalcode=page.locator("#postal_code")
        this.housenumber=page.locator("#house_number");
        this.streetname=page.locator("#street");
        this.cityname=page.locator("#city");
        this.statename=page.locator("#state");
        this.phonenumber=page.locator("#phone");
        this.email=page.locator("#email");
        this.password=page.locator("#password");
        this.registerbtn=page.getByRole('button',{name:'Register'});    
    }
    generateRandomEmail(){
        const randomString = Math.random().toString(36).substring(2, 10);
        return `testuser_${randomString}@example.com`;
    }

    async customerRegister(registerdata){
        await this.firstname.fill(registerdata.firstName);
        await this.lastname.fill(registerdata.lastName);
        await this.dob.fill(registerdata.DOBirth);
        await this.page.click('#country'); 
        await this.countryname.selectOption({ label: registerdata.countryName });
        await this.postalcode.fill(registerdata.postalCode);
        await this.housenumber.fill(registerdata.houseNumber);
        await this.streetname.fill('');
        await this.streetname.fill(registerdata.streetName);
        await this.cityname.fill(registerdata.cityName);
        await this.statename.fill(registerdata.stateName);
        await this.phonenumber.fill(registerdata.phoneNumber);
        const dynamicEmail = this.generateRandomEmail();
        await this.email.fill(dynamicEmail);
        await this.password.fill(registerdata.passWord);
        await this.registerbtn.click();   
        console.log("Registration completed");       
      }
      /*await this.streetname.press('Control+A');
await this.streetname.press('Backspace');*/
      

}
module.exports=Registration;


