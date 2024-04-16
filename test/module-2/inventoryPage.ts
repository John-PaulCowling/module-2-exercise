import { Page, Locator } from "playwright";

export class InventoryPage {
    readonly page: Page;
    readonly inventoryItems: Locator;
    readonly cartLink: Locator;


    constructor(page: Page) {
        this.page = page;
        this.inventoryItems = page.locator('[data-test="inventory-item"]');
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    }

    async getItems():Promise<InventoryItem[]> {
        let itemElements = await this.inventoryItems.all()
        return itemElements.map((item) => new InventoryItem(item))
    }

    async gotToCart()
    {
        await this.cartLink.click()
    }
}

export class InventoryItem
{
    readonly priceElement: Locator;
    readonly nameElement: Locator;
    readonly descriptionElement: Locator;
    readonly cartLinkElement: Locator;

    constructor(itemElement:Locator)
    { 
        this.priceElement = itemElement.locator('[data-test="inventory-item-price"]')
        this.nameElement = itemElement.locator('[data-test="inventory-item-name"]')
        this.descriptionElement = itemElement.locator('[data-test="inventory-item-desc"]')
        this.cartLinkElement = itemElement.getByRole("button", {name:"Add to cart"})
    }

    async getPrice():Promise<string>
    {
        let value =  await this.priceElement.textContent()
        
        if(value == null)
        {
            return ""
        }        
        return value.toString()
    }
    
    async getName():Promise<string>
    {
        let value =  await this.nameElement.textContent()

        if(value == null)
        {
            return ""
        }        
        return value.toString()
    }

    
    async getDescription():Promise<string>
    {
        let value =  await this.descriptionElement.textContent()

        if(value == null)
        {
            return ""
        }        
        return value.toString()
    }

    async addToCart():Promise<void>
    {
        let value =  await this.cartLinkElement.click()
    }

}