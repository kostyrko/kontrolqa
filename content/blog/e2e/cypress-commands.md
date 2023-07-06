---
title: 'Cypress - custom Commands'
date: 2022-01-29 13:00
category: e2e
draft: false
lang: 'en'
tags: ["cypress", "test automation", "e2e", "mocha", "chai"]
---

![](https://digital.ai/sites/default/files/pictures/styles/maxwidth_1920/public/blog-images//cypress-framework-1.jpg?itok=Iw9boVx6)

### Introduction

Cypress provides various commands for conducting specific tests that impact the behavior of an application. It also allows adding custom commands, which are nothing more than functions that can be easily combined with Cypress objects. This enables encapsulating reusable logic or code that can be used in multiple places.

The `overwrite` function allows overriding existing Cypress commands. For example:

```js
Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  return originalFn(url, {
    ...options,
    onBeforeLoad(win) {
      win.fetch = null;
    },
  });
});
```

After installing Cypress, you can find the `commands.js` file in the `support` folder. This file needs to be linked in the `index.js` file to import our custom commands every time Cypress is run.


---
#### Sample Commands - commands.js

**Selecting the Nth Child**

```js
Cypress.Commands.add('selectNth', { prevSubject: 'element' }, (subject, nth) => {
  cy.wrap(subject)
    .children('option')
    .eq(nth)
    .then(elem => {
      cy.wrap(subject).select(elem.val())
    })
})
```

Usage:

```js
cy.get('#select').selectNth(2)
```

**Simple Text Generator**

```js
const generateRandomText = () => Math.random().toString(36).substr(2, 10)

Cypress.Commands.add('fillWithRandomText', { prevSubject: 'element' }, subject =>
  cy.wrap(subject).clear().type(generateRandomText()),
)
```

Similarly, for usage:

```js
cy.get('#input').fillWithRandomText()
```

For this command **checking text content**, a string needs to be passed.

```js
Cypress.Commands.add('checkTextContent', { prevSubject: 'element' }, (subject, contains: string) =>
  cy
    .wrap(subject)
    .invoke('text')
    .then(text => {
      expect(text).to.contain(contains)
    }),
)

cy.get('#input').checkTextContent('Hello World')
```

This command takes a URL as a string and an array containing objects that will be used to stub requests or provide responses for subsequent requests. The assumption is that in a given test, we want to test the application's response to multiple requests of the same type but with different response contents.

```js
Cypress.Commands.add('multipleIntercepts', (url: string, responses: {}[]) => {
  cy.intercept(url, req => {
    req.reply(responses.shift())
  })
})
```

Sources:

[Create your OWN CYPRESS COMMAND NOW! | Cypress Tutorial For Beginners](https://www.youtube.com/watch?v=66bEpdatEYQ&list=PLYDwWPRvXB8-8LG2hZv25HO6C3w_vezZb&index=12)

[Custom commands - co to i jak ich używać](https://www.testersbay.pl/post/custom-commands-co-to-i-jak-ich-u%C5%BCywa%C4%87)