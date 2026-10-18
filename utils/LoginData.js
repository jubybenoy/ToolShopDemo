export async function login(logindata){
    await page.goto("https://www.saucedemo.com/");
    await page.fill("#eMail",username);
    await page.fill("#passWord",password);
    await page.click("#login-button");
}