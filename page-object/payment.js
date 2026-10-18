const {test,expect} = require("@playwright/test");
class Payment{
    constructor(page){
        this.page=page;
        this.paymentmethod=page.locator("#payment-method");
        this.banktransfer=page.getByRole('option',{'name':'Bank Transfer'});
        this.bankname=page.locator("#bank_name");
        this.accountname=page.locator("#account_name");
        this.accountno=page.locator("#account_number")
        this.cashondelivery=page.getByRole('option',{'name':'Cash on Delivery'});
        this.creditcard=page.getByRole('option',{'name':'Credit Card'});
        this.creditcardno=page.locator("#credit_card_number");
        this.expirydate=page.locator("#expiration_date");
        this.cvv=page.locator("#cvv");
        this.cardholdername=page.locator("#card_holder_name");
        this.buynowpaylater=page.getByRole('option',{'name':'buy-now-pay-later'});
        this.giftcard=page.getByRole('option',{'name':'Gift Card'});
        this.checkpayment=page.getByRole('button',{'name' : 'Check payment '});
        this.confirmbtn = page.locator('[data-test="finish"]');
        this.orderconfirmationmsg = page.getByText('Payment was successful');
        
        //this.orderconfirmationmsg = page.getByRole('heading', { name: 'Payment was successful' }).isVisible();
    }

    async paymentProcess(paymentDetails){
        console.log(`Processing payment via: ${paymentDetails.method}`);

    if (paymentDetails.method === "Bank Transfer") {
            await this.paymentmethod.selectOption("Bank Transfer");
            await this.bankname.fill(paymentDetails.bankName);
            await this.accountname.fill(paymentDetails.accountName);
            await this.accountno.fill(paymentDetails.accountNo);
        }      

    else if(paymentDetails.method==="Credit Card"){
            await this.paymentmethod.selectOption("Credit Card");
            await this.creditcardno.fill(paymentDetails.creditCardNo);
            await this.expirydate.fill(paymentDetails.expiryDate);
            await this.cvv.fill(paymentDetails.CVVno);
            await this.cardholdername.fill(paymentDetails.cardHolderName);
        }

    else if(paymentDetails.method==="Cash on Delivery"){
        await this.paymentmethod.selectOption("Cash on Delivery");
       }
    }
   async confirmOrder() {

    await this.checkpayment.click();
    await this.page.waitForTimeout(600);    
    await expect(this.confirmbtn).toBeEnabled();
    await this.confirmbtn.click();
        
    await this.confirmbtn.evaluate((node) => node.click());
    console.log("Confirm button clicked successfully using JavaScript evaluation");
        
    await expect(this.orderconfirmationmsg).toBeVisible({ timeout: 10000 });
    console.log("Order confirmation banner verified successfully!");
    
   }

}

module.exports=Payment;