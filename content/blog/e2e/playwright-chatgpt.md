---
title: '🎭 Playwright + ChatGPT 🤖'
date: 2023-08-20 10:00
category: playwright
tags: ["playwright", "javascript", "chatgpt", "ai"]
draft: false
---

Workflow and prompts were inspired by two YouTube tutorials
[Using ChatGPT to write Playwright functions (POM) 10x faster at scale (proof of concept)](https://www.youtube.com/watch?v=8WTD26DA690)
The final result can be found here: [GitHub - kostyrko/playwright-pom-chatgpt: sandbox repo for experiments focused on chatgpt usage in](https://github.com/kostyrko/playwright-pom-chatgpt)
test automation using playwright and chatgpt


Prompt: generate e2e test example and typescript with playwright using page object model for
https://www.saucedemo.com/inventory.html

response: 

Comment to the response



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