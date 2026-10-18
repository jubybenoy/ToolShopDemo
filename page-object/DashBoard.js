const { expect } = require('@playwright/test');
const { debug } = require('node:console');

class Purchase{
    constructor(page){
        this.page=page;
        this.homepagelink=page.getByRole('link', { name: 'Home' });
        this.searchfield=page.locator("#search-query");
        this.searchbtn=page.getByRole('button',{'name':'Search '});
        this.product=page.locator('.card-title');
        this.addtocartbtn=page.locator("#btn-add-to-cart")
        this.pricesection=page.locator(".price-section");
        this.sortproducts=page.locator(".form-select");
        this.sortcategory=page.getByRole('checkbox',{'name':' Drill '});
        this.productname=page.locator('.card-title');        
        this.quantity1=page.locator("input[type='number']").first();
        this.quantity2=page.locator("input[type='number']").nth(2);
    }    
    async displayProducts(){
        await this.product.first().waitFor();
        const names=await this.product.allTextContents();
        console.log("displaying product",names);   
        }

    async searchProductByName(productName){
        await this.searchfield.fill(productName);
        await this.searchbtn.click();
    }

    async selectProductByName(productName){
        const productItem = this.page.locator('.card').filter({ hasText: productName });
        await productItem.click();
        console.log(`Product "${productName}" selected`);
       /* await this.product.click();
        console.log(`Product "${productName}" selected`);*/
        await expect (this.pricesection).toBeVisible();
        await this.addtocartbtn.click();
        console.log("Bank Trasfer---------single item named", productName,"is in cart after using search option");
        //this.page.close(); 
    }
    async sortProduct(priceDesc){
        await this.sortproducts.click();
        await this.sortproducts.selectOption(priceDesc.priceHighToLow);   
    }
    async sortCategory(){
        await this.sortcategory.check();
    }
    async addAllVisibleProductsToCart(){
        const productCards = this.page.locator('.card');
        const totalProducts = await productCards.count();
        
        for(let i=0;i<totalProducts;i++){
            const card = this.page.locator('.card').nth(i);
            await card.click();
            await expect(this.pricesection).toBeVisible();
            await this.addtocartbtn.click();            
        }
        console.log("Cc Transfer-------------multiple item selected after sorting is in  cart ")
        
    }
    async selectMultipleProducts(multipleProductsArray){
    for(const productName of multipleProductsArray){
        //console.log('Multiple products added to cart {$multipleProducts} to cart');
        await this.homepagelink.click();
        await this.page.getByText(productName, {exact:true}).click();
        await this.addtocartbtn.click();  
    }
    console.log("\n Cash on delivery......Multiple Products in cart from json file" ,multipleProductsArray);
}

    async quantityChange(){
        await this.page.getByRole('link', { name: 'cart' }).click();
        await this.quantity1.click();
        await this.quantity1.fill("4");
        await this.quantity2.click();
        await this.quantity2.fill("5");
    }
}
module.exports=Purchase;