const { test: base } = require('@playwright/test');
const Login = require("../page-object/LoginPage");
const loginTestdata = require("../test-data/signindata.json");

exports.test = base.extend({
    loginPage:async ({ page }, use) =>{
        const logindata=loginTestdata.signinDetails;
        const login = new Login(page);
        await page.goto('/');
        await page.getByRole('link', { name: 'Sign in' }).click();
        
        /*await page.locator('#email').fill(logindata.eMail);
        await page.locator('#password').fill(logindata.passWord);
        await page.getByRole('button', { name: 'Login' }).click();*/
        await login.signIn(logindata);
        console.log("Login completed successfully via fixture");
        await use(page);
    },
});

exports.expect = base.expect;