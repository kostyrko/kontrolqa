---
title: '🌲 Cypress - test studio'
date: 2022-02-09 13:00
category: e2e
thumbnail: { thumbnailSrc }
tags: ["cypress", "test studio", "experimental"]
draft: false
---


## Introduction

**Cypress Test Studio** is a tool (in Beta version at the time of writing this article) that allows creating tests in Cypress (in Open mode) without writing code. Since this feature is still in Beta, it is limited to a few functions (check, select, click, type, uncheck) and a limited number of assertions.

So, what can Cypress Test Studio be useful for and who can benefit from it?

* For beginners starting their journey with Cypress or end-to-end testing
* For quickly creating one-time tests before the MVP stage
* For practicing and getting familiar with the syntax of JavaScript/Cypress for those who haven't had previous experience with Cypress and have no knowledge of JS

However, at this stage of development, **Cypress Test Studio** may NOT be suitable for:

* Creating long-term or reusable tests

---

## Usage

Install Cypress:

```shell
npm install cypress
```

Configure the ability to use **Cypress Test Studio** in the `cypress.json` file:

```json
{
  "experimentalStudio": true
}
```

Create a file in the `integration` folder, e.g., `/cypress/integration/sample_spec.js`, and fill it with basic code. Then find your test in the Cypress Test Runner and run it:

```js
describe('example to-do app', () => {
  it('should add a todo', () => {
    cy.visit('https://www.saucedemo.com/')
  })
})
```

When you run the test initially, in the top right corner of the left test dock in the Cypress Test Runner, you will find a magic wand icon (tooltip: Add Commands to Test). Clicking on it will take you to the **studio** mode.

Now, when you click in the browser in the right pane, you will notice that new commands appear under the "Studio Commands" header in the left dock where the tests are listed. This allows you to add additional commands to your test.

Right-clicking on a specific field should expand a menu that allows you to add a basic assertion.

After completing the test content, click **Save commands** (button).

The test will run, and in the code of your test file, you will see new commands marked as **Generated with Cypress Studio**. These commands can serve as a starting point for further test improvements.



Sources

[cypress.io/cypress-studio](https://docs.cypress.io/guides/core-concepts/cypress-studio#Overview)

[Introducing Cypress Studio - E2E web application testing](https://www.youtube.com/watch?v=ado-aAAFe2o&ab_channel=BasaratCodes)

[Recording a Cypress Test with Cypress Studio](https://dev.to/leading-edje/record-a-cypress-test-with-cypress-studio-4npk)