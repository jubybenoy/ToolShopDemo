const Login = require("./LoginPage");
const performLogin = require('../utils/authUtils');
class Cart{
    constructor(page){
        this.page=page;
       // this.home=page.getByRole('link', { name: 'cart' }).click();
        this.checkoutbtn=page.getByRole('button',{'name':'Proceed to checkout'});
        this.proceedtocheckoutbtn=page.getByRole('button',{'name':' Proceed to checkout '});
        this.youremail=page.locator("#email");
        this.yourpassword=page.locator("#password");
        this.loginbtn=page.getByRole('button',{'name':'Login'});    
    }
    async checkOutLogin(loginData){
        const cartLink =this.page.getByRole('link',{ name:'cart'});
        await cartLink.waitFor({state:'visible',timeout: 10000});
        await cartLink.click();
        await this.checkoutbtn.click();

    if(await this.proceedtocheckoutbtn.isVisible()){
        await this.proceedtocheckoutbtn.click();
    return;
    }
    else{
    console.log("Logged out for some reason. Entering login details ");    
        await performLogin(this.page,loginData.eMail,loginData.passWord);
        await cartLink.click();
        await this.checkoutbtn.click();
        await this.proceedtocheckoutbtn.click();   

    }
    }     
    }
module.exports=Cart;