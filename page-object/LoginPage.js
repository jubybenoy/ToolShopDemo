class Login{
    constructor(page){
        this.page=page;
        this.email=page.locator("#email");
        this.password=page.locator("#password");
        this.loginbtn=page.locator(".btnSubmit");       
    }
    async signIn(logindata){
        await this.email.fill(logindata.eMail);
        await this.password.fill(logindata.passWord);
        await this.loginbtn.click();
        console.log("login completed");
    }    
}
module.exports=Login;
