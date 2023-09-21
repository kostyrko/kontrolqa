---
title: '🎭 Playwright + ChatGPT 🤖'
date: 2023-08-20 10:00
category: playwright
tags: ["playwright", "javascript", "chatgpt", "ai"]
draft: false
---


The objective of the exercise presented below was to check ChatGPT (v. 3.5/ 4.0) ability to create automated test using Page Object Model (POM) in a fast and robust way.

Workflow presented below was inspired by a YouTube material
[Using ChatGPT to write Playwright functions (POM) 10x faster at scale (proof of concept)](https://www.youtube.com/watch?v=8WTD26DA690)
The final result can be found here: [GitHub - kostyrko/playwright-pom-chatgpt: sandbox repo for experiments focused on chatgpt usage in](https://github.com/kostyrko/playwright-pom-chatgpt).

Example is based on [www.saucedemo.com/inventory.html](https://www.saucedemo.com/inventory.html) page and the POM and test example from initial prompt is taken out of Playwright documentation [playwright.dev/docs> Page object models](https://playwright.dev/docs/pom)

I base most of my prompts nowadays RODES methodology (Role / Objective / Details/ Example / Sense check)


### Initial Prompt a "set up": 

```
act as a senior quality assurance test automation engineer
create automated test cases which will be written in java script and using playwright testing library
generate a page object model class and automated test cases based on it
test case should cover functionalities present on this page: https://www.saucedemo.com/inventory.html
here is an example of a page object model
const { expect } = require('@playwright/test');

exports.PlaywrightDevPage = class PlaywrightDevPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getStartedLink = page.locator('a', { hasText: 'Get started' });
    this.gettingStartedHeader = page.locator('h1', { hasText: 'Installation' });
    this.pomLink = page.locator('li', {
      hasText: 'Guides',
    }).locator('a', {
      hasText: 'Page Object Model',
    });
    this.tocList = page.locator('article div.markdown ul > li > a');
  }

  async goto() {
    await this.page.goto('https://playwright.dev');
  }

  async getStarted() {
    await this.getStartedLink.first().click();
    await expect(this.gettingStartedHeader).toBeVisible();
  }

  async pageObjectModel() {
    await this.getStarted();
    await this.pomLink.click();
  }
};

and test based on it

const { test, expect } = require('@playwright/test');
const { PlaywrightDevPage } = require('./playwright-dev-page');

test('getting started should contain table of contents', async ({ page }) => {
  const playwrightDev = new PlaywrightDevPage(page);
  await playwrightDev.goto();
  await playwrightDev.getStarted();
  await expect(playwrightDev.tocList).toHaveText([
    `How to install Playwright`,
    `What's Installed`,
    `How to run the example test`,
    `How to open the HTML test report`,
    `Write tests using web first assertions, page fixtures and locators`,
    `Run single test, multiple tests, headed mode`,
    `Generate tests with Codegen`,
    `See a trace of your tests`
  ]);
});

test('should show Page Object Model article', async ({ page }) => {
  const playwrightDev = new PlaywrightDevPage(page);
  await playwrightDev.goto();
  await playwrightDev.pageObjectModel();
  await expect(page.locator('article')).toContainText('Page Object Model is a common pattern');
});
do you understand the prompt that I just gave you or is there any further information you need to help you create test cases?

```

response: 

```
I understand the prompt you provided, and I can help you create automated test cases using JavaScript and the Playwright testing library for the functionalities present on the page https://www.saucedemo.com/inventory.html. We will use the Page Object Model (POM) approach for organizing the test code. Here's a Page Object Model class and automated test cases based on your requirements:

First, let's create a Page Object Model class for the Sauce Labs inventory page:
const { expect } = require('@playwright/test');

exports.SauceDemoInventoryPage = class SauceDemoInventoryPage {
  constructor(page) {
    this.page = page;
    this.inventoryItemNames = page.locator('.inventory_item_label .inventory_item_name');
    this.addToCartButtons = page.locator('.inventory_item button');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

  async getInventoryItemNames() {
    return await this.inventoryItemNames.innerTexts();
  }

  async addToCart(itemName) {
    const index = (await this.getInventoryItemNames()).indexOf(itemName);
    if (index !== -1) {
      const addToCartButtons = await this.addToCartButtons;
      await addToCartButtons[index].click();
    } else {
      throw new Error(`Item "${itemName}" not found in inventory.`);
    }
  }

  async goToShoppingCart() {
    await this.shoppingCartLink.click();
  }
};

Now, let's create test cases based on this Page Object Model class:

const { test, expect } = require('@playwright/test');
const { SauceDemoInventoryPage } = require('./sauce-demo-inventory-page');

test('Add items to the shopping cart and verify their presence', async ({ page }) => {
  const inventoryPage = new SauceDemoInventoryPage(page);
  await inventoryPage.goto();

  // Add two items to the cart
  await inventoryPage.addToCart('Sauce Labs Backpack');
  await inventoryPage.addToCart('Sauce Labs Bolt T-Shirt');

  // Go to the shopping cart
  await inventoryPage.goToShoppingCart();

  // Verify that the added items are in the shopping cart
  const cartItemNames = await page.locator('.cart_item .inventory_item_name').innerTexts();
  expect(cartItemNames).toContain('Sauce Labs Backpack');
  expect(cartItemNames).toContain('Sauce Labs Bolt T-Shirt');
});

test('Add an item to the shopping cart and proceed to checkout', async ({ page }) => {
  const inventoryPage = new SauceDemoInventoryPage(page);
  await inventoryPage.goto();

  // Add an item to the cart
  await inventoryPage.addToCart('Sauce Labs Fleece Jacket');

  // Go to the shopping cart
  await inventoryPage.goToShoppingCart();

  // Proceed to checkout
  const checkoutButton = page.locator('.cart_footer .checkout_button');
  await checkoutButton.click();

  // Verify that we are on the checkout page
  const checkoutTitle = page.locator('.subheader').innerText();
  expect(checkoutTitle).toBe('Checkout: Your Information');
});

These test cases cover the functionalities present on the Sauce Labs inventory page, including adding items to the shopping cart and proceeding to checkout. You can expand and modify them as needed for your specific testing requirements.
```

Comment to the response

Initial prompt was a set up, as I expected that the page under test was not know to the LLM and its access is protected with login credentials - known to every one but still... LLM doesn't have the chance to check the website any way. Other limitation that we should keep in mind is the date when a model was finished being fed with information - Playwright is evolving and changing but the cut of date of information feeding to ChatGPT was a point on a timeline - meaning that everything changed afterwards is beyond its understanding- we can overcome this obstacle by giving the information while prompting etc. but there is also a limitation to the information we can provide (take cost in to account / computation). Even though the first result was quite impressive i.e. check locators (although they wont work on the live example they are pretty close to actual data).



Using Playwright [Test Generator](https://playwright.dev/docs/codegen) in a quick way we can gather a bit more information/data that we can feed to ChatGPT. By doing so we provide the LLM with actual information on locators as well as we give more context on the functionalities and we can access places (credentials guarded) to which LMM has not access.

### Test Generator enchanted prompt

```
Please create a new class for inventoryPage, create the relevant functions for the code below, use javascript, create playwright tests based on created class using page object model

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  await page.getByText('$9.99').click();
  await page.locator('div:nth-child(4) > .inventory_item_description').click();
  await page.getByText('Name (A to Z)Name (A to Z)Name (Z to A)Price (low to high)Price (high to low)').click();
  await page.locator('[data-test="product_sort_container"]').selectOption('za');
  await page.locator('[data-test="product_sort_container"]').selectOption('lohi');
  await page.locator('[data-test="product_sort_container"]').selectOption('hilo');
‍  await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
  await page.locator('a').filter({ hasText: '1' }).click();
  await page.locator('[data-test="remove-sauce-labs-fleece-jacket"]').click();
  await page.locator('#shopping_cart_container a').click();

Please remember to use step & custom expect messages like this function. 
async clickBookName(name: string){

        await test.step(`I can click the book using the name: ${name}`, async () => {

        await expect(this.page.locator(`text=${name} >> nth=0`),`Can not find the Book Name ${name}- did the locator change?`).toBeVisible()

        await this.page.locator(`text=${name} >> nth=0`).click();

})}
```

Two approaches to test automation using AI

UI test automation

API test automation

[ChatGPT 101 for QA Engineers](https://medium.com/adessoturkey/chatgpt-101-for-qa-engineers-a6945e5629fa)

[API testing with Playwright](https://shiv-jirwankar.medium.com/api-testing-with-playwright-2570021ed9b2)

[Playwright code generation using ChatGPT](https://shiv-jirwankar.medium.com/playwright-code-generation-using-chatgpt-7e7231c663d2)

[How ChatGPT Write Code for Automation tool Cypress](https://kailash-pathak.medium.com/how-chatgpt-generate-code-for-automation-tool-cypress-79859f499a1e)

[Turbocharge Playwright with ChatGPT for Productivity](https://ceroshjacob.medium.com/turbocharge-playwright-with-chatgpt-for-productivity-54f9b7ddec15)