class signinWall{
    constructor(page) {
    this.page=page;
    this.home=page.getByRole('link',{name:'Home'});    
    this.categories=page.getByRole('button',{name:' Categories '});
    this.contact=page.getByRole('link',{name:'Contact'});
    this.signin= page.getByRole('link',{name:'Sign in'});
    this.cart=page.locator("fa-icon[class='ng-fa-icon px-1'] svg path");
    this.language=page.getByRole('button',{name:' EN '});
    this.register= page.getByRole('link',{name:'Register your account'});
    }

async goto(){
    await this.page.goto("https://practicesoftwaretesting.com/"); 
   /* await this.home.isVisible();
    await this.categories.isVisible();
    await this.contact.isVisible();
    await this.cart.isVisible();
    await this.language.isVisible();*/
    await this.signin.click();
    await this.register.click();
    
}
}

module.exports=signinWall;



