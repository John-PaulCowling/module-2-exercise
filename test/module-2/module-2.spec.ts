import {LoginPage} from "./loginPage.ts"
import {test, expect } from '@playwright/test';
import { InventoryItem, InventoryPage } from "./inventoryPage.ts";
import { CartPage, OrderedItem} from "./cartPage.ts";

test("Login with invalid username", async ({page}) => 
{
    let loginPage:LoginPage = new LoginPage(page)
    await loginPage.login("fake user","secret_sauce")
    await expect(loginPage.errorMessageElement).toContainText('Epic sadface: Username and password do not match any user in this service'); 

})
test("Login with invalid password", async ({page}) => 
{
    let loginPage:LoginPage = new LoginPage(page)
    await loginPage.login("standard_user","sfsadffsadfasd")
    await expect(loginPage.errorMessageElement).toContainText('Epic sadface: Username and password do not match any user in this service'); 

})

test.describe("Simple Order Test",() => {
    test.beforeEach(async ({page}) =>
        {
            let loginPage:LoginPage = new LoginPage(page)
            await loginPage.login("standard_user","secret_sauce")
        }
    )
    test("example test 1", async ({page}) =>
        {
            const productName = "Sauce Labs Backpack"

            let inventoryPage = new InventoryPage(page)
            let items:InventoryItem[] = await inventoryPage.getItems()
            for(var item of items)
            {
                let name = await item.getName() 
                if(name == productName)
                {
                    item.addToCart()
                }
            }

            await inventoryPage.gotToCart()

            let cartPage = new CartPage(page)
            let cartItems:OrderedItem[] = await cartPage.getItems()

            await expect(cartItems.length).toBe(1)
            await expect.soft(await cartItems[0].getName()).toBe(productName)
        }
    )
})
