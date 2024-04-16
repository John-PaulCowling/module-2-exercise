import { Page, Locator } from "playwright"

export class LoginPage
{
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly loginButton: Locator
    readonly errorMessageElement: Locator


    username:Locator
    constructor(private page:Page) {
        this.username = page.locator('[data-test')
        this.usernameInput = page.locator('[data-test="username"]')
        this.passwordInput = page.locator('[data-test="password"]')
        this.loginButton = page.locator('[data-test="login-button"]')
        this.errorMessageElement = page.locator('[data-test="error"]')
    }

    async login(username:string, password:string)
    {
        await this.page.goto("https://www.saucedemo.com/")
        await this.page.waitForLoadState("load")
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.loginButton.click()
    }
}