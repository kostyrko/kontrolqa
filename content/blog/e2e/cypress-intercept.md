---
title: '🌲 Cypress: cy.intercept() - catching HTTP requests 🕸️'
date: 2022-02-02 10:00
category: cypress
draft: false
---

![](https://i.ytimg.com/vi/gGDI3ee81d8/maxresdefault.jpg)

### Introduction to Stubbing vs Mocking

Both concepts refer to substituting data for testing purposes. However, **mocking** is specifically used for testing functionality, while **stubbing** is used for changing the state of a component/page/application.

**Mocks** vs **Stubs** = Functional Testing vs State Testing. This means that in a test, there can be multiple stubs but only one mock (as per the principle of testing one functionality per test).

For more information on this topic, refer to: [SO - What's the difference between a mock & stub?](https://stackoverflow.com/questions/3459287/whats-the-difference-between-a-mock-stub)

### 1. `cy.intercept()`

`cy.intercept()` allows you to intercept an HTTP request in Cypress tests. This command can be useful when you want to ensure that a certain request has completed before executing the next command or when you want to intercept an HTTP request and provide data for testing the behavior of the front-end application.

Example:

```js
    beforeEach(() => {
        cy.viewport(viewport)
        cy.intercept('GET', '/xxx/xxx_data?page=1', { fixture: 'xxx/xxx_data.json' })
    })
```

---
### 2. `cy.intercept()` + `cy.wait()`

Listening for a GET request to `*/comments/*`
```js
    cy.intercept('GET', '**/comments/*').as('getComment')
```
Checking the status
```js
    cy.wait('@getComment').its('response.statusCode').should('be.oneOf', [200, 304])
```
Logging the object (DTO) to the console
```js
    cy.get('@post').then(console.log)
```
---

### 3. `cy.intercept()` + `cy.wait()` + `cy.command()`

A Cypress custom command containing intercepted requests + using fixtures to mock state + aliasing them.
```js
    Cypress.Commands.add('waitForApp2Start', dto => {
      cy.intercept('GET', '/xyz', { fixture: 'xdata' }).as('xdata')
      cy.intercept('GET', '/search_data?*', { fixture: 'searchData' }).as('searchData')
    })
```
Calling the intercepts before the actual `cy.visit()` - initiating the application state change + waiting for the requests to be completed in the next step.

```js

    cy.waitForApp2Start()
    cy.visit('').wait('@xdata').wait('@searchData')
```

---
### Przechwytywanie wielu zapytań / mockowanie wielu zapytań

`cy.clock()` - allows for "freezing" the clock and all time-related functions such as `setInterval` or `setTimeout`.

`cy.tick()` - allows for manual control of time.

```js
    it('fetches from the server (spies)', () => {
      cy.clock()
      cy.intercept('GET', '/favorite-fruits').as('fruits')
      cy.visit('/fruits.html')
      // first request
      cy.wait('@fruits').its('response.statusCode').should('equal', 200)

      // after 30 seconds, the request is made again
      cy.tick(30000)
      cy.wait('@fruits').its('response.statusCode').should('equal', 200)
      [...]
```

Mocking HTTP Request

```js

    it('returns different fruits every 30 seconds', () => {
      cy.clock()
      let k = 0

      // each time the request is made, a different response is returned
      cy.intercept('/favorite-fruits', (req) => {
        k += 1
        switch (k) {
          case 1:
            return req.reply(['apples 🍎'])
          case 2:
            return req.reply(['grapes 🍇'])
          default:
            return req.reply(['kiwi 🥝'])
        }
      })

      cy.visit('/fruits.html')
      cy.contains('apples 🍎')
      cy.tick(30000)
      cy.contains('grapes 🍇')
      cy.tick(30000)
      cy.contains('kiwi 🥝')
    })
```
Every time the intercept is called, it uses the first element from the response array and removes it.
After the first two times, `responses.shift()` always returns `undefined`, and then the response is in the form of an array containing kiwi.
```js
    it('returns different fruits every 30 seconds (array shift)', () => {
      cy.clock()

      // return different responses on each call
      const responses = [
        ['apples 🍎'], ['grapes 🍇'],
      ]

      cy.intercept('/favorite-fruits', (req) => {
        req.reply(responses.shift() || ['kiwi 🥝'])
      })

      cy.visit('/fruits.html')
      cy.contains('apples 🍎')
      cy.tick(30000)
      cy.contains('grapes 🍇')
      cy.tick(30000)
      cy.contains('kiwi 🥝')
    })
```
### Partial modification

Cypress also allows you to modify only a portion of the response object returned by the API. In the example below, the value of the `listBankAccount` property in the `body.data` object is replaced with an empty array.

```js
cy.intercept("POST", "/bankaccounts", (req) => {
  const { body } = req
  req.continue((res) => {
    res.body.data.listBankAccount = []
  })
})
```

To achieve this, you need to use the `.continue()` method on the response object passed to the intercept callback. This method allows you to modify the outbound request. Please note that when using `.continue()` without providing any arguments, it allows you to modify the outgoing requests.

You can find more information about this in the Cypress documentation under [Controlling the outbound request with req.continue()](https://docs.cypress.io/api/commands/intercept#Controlling-the-outbound-request-with-req-continue).
(Note: This method, without providing arguments, allows for modifying outgoing requests.)




----
### Cypress and API testing

Cypress is not primarily designed for API testing, as there are other libraries and tools specifically built for that purpose (see the links in the Related Articles section). However, Cypress can still be used successfully for API testing. There are dedicated plugins for API testing: [cy-api](https://github.com/bahmutov/cy-api) and [cypress-plugin-api](https://github.com/filiphric/cypress-plugin-api) - both are efficient to work with but the latter one has more options and has better UX.

Here are some links to YouTube videos that demonstrate how to test APIs using Cypress (these videos provide a natural extension to the material described above):

- [Cypress - API Testing | Part 14](https://www.youtube.com/watch?v=TocjjF_pARo)
- [Cy-api/Cypress API testing Tricks](https://www.youtube.com/watch?v=OICPSvIWAQg)
- [CYPRESS API TESTING Introduction - CYPRESS REQUEST](https://www.youtube.com/watch?v=bcO2E6XFJCY&list=PLYDwWPRvXB8-8LG2hZv25HO6C3w_vezZb&index=15)

These resources should provide you with valuable insights into testing APIs with Cypress.


----

Sources:

[intercept - cypress.io](https://docs.cypress.io/api/commands/intercept)

[example.cypress.io/commands/waiting](https://example.cypress.io/commands/waiting)

[Asserting Network Calls from Cypress Tests](https://www.cypress.io/blog/2019/12/23/asserting-network-calls-from-cypress-tests/)

[Testing periodic network requests with cy.intercept and cy.clock combination](https://www.cypress.io/blog/2021/02/23/cy-intercept-and-cy-clock/)

[Cypress cy.intercept Problems/A few common cy.intercept gotchas and how to avoid them - glebbahmutov.com/](https://glebbahmutov.com/blog/cypress-intercept-problems/)

[Improve Your End to End Tests with Cypress Intercept](https://javascript.plainenglish.io/improve-your-end-to-end-tests-with-cypress-intercept-2c68156d9495)



