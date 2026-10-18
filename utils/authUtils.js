async function performLogin(page, email, password) {
    await page.goto('/');
    await page.getByRole('link',{ name: 'Sign in'}).click();
    await page.locator('#email').fill(email);
    await page.locator('#password').fill(password);
    await page.getByRole('button',{ name: 'Login' }).click();
    console.log("Login completed via utility function");
}

module.exports = performLogin;