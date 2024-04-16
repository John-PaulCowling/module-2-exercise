import { Page, Locator } from "playwright";

export class CartPage {
    readonly page: Page;
    readonly items: Locator;


    constructor(page: Page) {
        this.page = page;
        this.items = page.locator('[data-test="inventory-item"]');
    }

    async getItems():Promise<OrderedItem[]> {
        let itemElements = await this.items.all()
        return itemElements.map((item) => new OrderedItem(item))
    }
}

export class OrderedItem{

    readonly priceElement: Locator;
    readonly nameElement: Locator;
    readonly quantityElement: Locator;
    readonly descriptionElement: Locator;

    constructor(itemElement:Locator)
    { 
        this.priceElement = itemElement.locator('[data-test="inventory-item-price"]')
        this.nameElement = itemElement.locator('[data-test="inventory-item-name"]')
        this.descriptionElement = itemElement.locator('[data-test="inventory-item-desc"]')
        this.quantityElement = itemElement.locator('[data-test="item-quantity"]')
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

    async getQuantity():Promise<string>
    {
        let value =  await this.quantityElement.textContent()

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

}