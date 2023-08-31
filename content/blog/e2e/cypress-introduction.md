---
title: '🌲 Cypress - introduction'
date: 2022-01-09 12:00
category: cypress
tags: ["cypress", "test automation", "e2e", "mocha", "chai"]
draft: false
lang: 'en'
---

## Cypress an introduction

Cypress refers to the Cypress testing library. It is based on the Mocha testing framework (test structure) and Chai (assertions, functions, invocations).


#### Mocha 🥤 

`describe` - test description / grouping of a series of tests / takes 2 arguments - test name and a function (callback function).

`it` - test case / individual test / takes 2 arguments - test name and a function (callback function).

`.only` - excludes all other tests

#### Cypress reference types - intellisense in VS code

    /// <reference types="cypress" />


Reference cypress at the beginning of you testing file for intellisense to catch the sense/purpose of the code

### Cypress podstawowe komendy

`cy.visit()` - dostęp do strony/podstrony

`cy.click()` - kliknięcie na element // przyjmuje również argumenty np. `{force: true}` (używać np. jeśli element ma 0x0px albo jest przysłonięty przez inny element, innymi słowy jeśli istnieje w DOM ale nie jest widoczny)

`cy.visit()` - access a page/subpage.

`cy.click()` - click on an element // also accepts arguments like {force: true} (use it if the element has 0x0px dimensions or is covered by another element, in other words, if it exists in the DOM but is not visible).

`cy.type()` - type text into an element.
#### selektory 🏹 

Based on the HTML tag `<input>`
```js
cy.get("input")
```
Based on the element's attribute and its value
```js
cy.get("input[name='first_name']")
```
Based on the element's ID
```js
cy.get("#first_name")
```
Based on the element's class
```js
cy.get(".form-control")
```
Based on multiple classes
```js
cy.get("[class='navbar navbar-expand-lg navbar-light bg-light']")
```
Based on multiple attributes
```js
cy.get("[name='email'][placeholder='Email Address']")
```
Based on XPath
```js
cy.xpath("//input[@name='first_name']")
```
### [Assertions (Chai library)](https://docs.cypress.io/guides/references/assertions#Chai)

Commonly used assertions:

Length
```js
cy.get("input").should("have.length", 1)
```
Class
```js
cy.get("input").should("have.class", "form-control")
```
Velue
```js
cy.get("input").should("have.value", "xyz")
```
Text content
```js
cy.get("input").should("have.text", "xyz")
```
Visibility
```js
cy.get("input").should("be.visible")
```

Existence of element
```js
cy.get("input").should("exist")
```
State of given element i.e. input
```js
cy.get("input")
        .should("be.disabled")
        // let's enable this element from the test
        .invoke('prop', 'disabled', false)

cy.get("input").should("be.checked")   
```

Assertion chaining
```js
cy.get("input")
        .should("be.disabled")
        .should("be.visible")
```

`expect` - assertion (Chai) that allows checking assumptions within the encapsulation of a function invoked by using then() / promise handling.
```js
cy.get("input")
        .should("have.value", "xyz")
        .then(function(input) {
        expect(input.val()).to.equal("xyz")
        })
```

#### Contains

Assertion checks if a element contains given property
```js
cy.get("input")
        .should("contain", "xyz")
```

### cy.document()

It returns the object/document of the currently active window (window.document object), thereby allowing access to all DOM methods.
```js
cy.document()
        .should("have.property", "charset").and("eq", "UTF-8")
        .should("have.property", "contentType").and("eq", "text/html; charset=UTF-8")
        .should("have.property", "cookie").and("eq", "key=value")
        .should("have.property", "lastModified").and("eq", "Mon, 07 Aug 2012 19:00:00 GMT")
        .should("have.property", "readyState").and("eq", "complete")
        .should("have.property", "title").and("eq", "Test Title")
        .should("have.property", "URL").and("eq", "http://example.com")
        .should("have.property", "webdriver").and("eq", false)
        .should("have.property", "window")
        .should("have.property", "headers")
        .should("have.property", "content")
        .should("have.property", "status")
        .should("have.property", "statusText")
        .should("have.property", "redirected")
        .should("have.property", "inError")
        .should("have.property", "error")
        .should("have.property", "response")
        .should("have.property", "responseText")
        .should("have.property", "responseType")
        .should("have.property", "responseURL")
        .should("have.property", "responseHeaders")
        .should("have.property", "incomplete")
        .should("have.property", "xhr")
        .should("have.property", "redirectedFrom")
```
### cy.title()

Checks page title: (`<title>`)
```js
cy.title().should("include", "Test Title")
```

### cy.url()

It retrieves the current URL of the page and stores it as a string.
 
```js
cy.url().should("include", "http://example.com")
```
---
### Pages/projects one can use for test automation practices 

[cypress-realworld-app](https://github.com/cypress-io/cypress-realworld-app)


[juice-shop](https://github.com/juice-shop/juice-shop)


[http://the-internet.herokuapp.com/](http://the-internet.herokuapp.com/)


[saoucedemo by swaglabs](https://www.saucedemo.com/)

[cypress-applitools-webinar](https://github.com/applitools/cypress-applitools-webinar)

[conduit](https://cirosantilli-realworld-next.herokuapp.com/)

---
### cypress example recipes

[cypress example recipes 🚀 ](https://github.com/cypress-io/cypress-example-recipes#logging-in-recipes)


---

Sources:

[www.chaijs.com/api/assert](https://www.chaijs.com/api/assert/)



