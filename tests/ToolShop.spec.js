const { test, expect } = require('@playwright/test');
const Login = require("../page-object/LoginPage");
const Registration = require("../page-object/CustomerRegistration");
const Purchase = require("../page-object/DashBoard");
const Cart = require("../page-object/Cart");
const BillingAddress = require("../page-object/Billing");
const Payment = require("../page-object/payment.js");
const loginTestdata = require("../test-data/SigninData.json");
const registerTestdata = require("../test-data/RegistrationData.json");
const paymentTestData = require("../test-data/PaymentTestData.json");
const shoppingList = require("../test-data/ProductNamesData.json");
const sortingData = require("../test-data/SortingData.json");

test("Toolshop Testing", async ({ page }) => {
    const registration = new Registration(page);
    const registrationdata = registerTestdata.registerDetails;

    await page.goto('/auth/register');
    await registration.customerRegister(registrationdata);
    await expect(page).toHaveURL(/.*login.*/);  

    const login=new Login(page);
    await login.signIn(loginTestdata.signinDetails);
    console.log("Login completed successfully");
     
    const purchase=new Purchase(page);
    const cart= new Cart(page);
    const billingaddress= new BillingAddress(page);
    const payment= new Payment(page);
    const banktransfer= paymentTestData.BankTransferData;
    const cctransfer= paymentTestData.CCTransferData;
    const cod= paymentTestData.COD;
    const productName= 'Slip Joint Pliers';

    await page.getByRole('link', { name: 'Home' }).click();

    // 1. Purchasing after searching single product using bank transfer
    await purchase.searchProductByName(productName);
    await purchase.selectProductByName(productName);
    await cart.checkOutLogin(loginTestdata.signinDetails);  
    await billingaddress.fillBillingDetails();
    await payment.paymentProcess(banktransfer);
    await payment.confirmOrder(); 
        
    // 2. Sorted Multiple item purchased after Sort by price and sort by category using credit card payment
    await page.getByRole('link',{ name:'Home'}).click();  
    await purchase.displayProducts();  
    await purchase.sortProduct(sortingData);
    await purchase.sortCategory();
    await purchase.addAllVisibleProductsToCart();
    await cart.checkOutLogin(loginTestdata.signinDetails);
    await billingaddress.fillBillingDetails();
    await payment.paymentProcess(cctransfer);
    await payment.confirmOrder();

    // 3. Multiple item purchased using excel file with cash on delivery after changing quantity at cart
    await page.getByRole('link',{ name: 'Home'}).click();  
    await purchase.selectMultipleProducts(shoppingList);
    await purchase.quantityChange();
    await cart.checkOutLogin(loginTestdata.signinDetails);   
    await billingaddress.fillBillingDetails();
    await payment.paymentProcess(cod);
    await payment.confirmOrder();    
});