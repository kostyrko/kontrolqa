---
title: 'Cypress - wprowdzenie'
date: 2022-01-09 12:00
category: e2e
draft: false
---

![](https://www.cypress.io/static/cypress-io-logo-social-share-8fb8a1db3cdc0b289fad927694ecb415.png)


## Cypress wprowadzenie

Cypress jest oparty o bibl. Mocha (struktura test) oraz Chai (asercje, funkcje, wywołania).
#### Mocha 🥤 

`describe` - opis testu / grupowanie serii tekstu / przyjmuje 2 argumenty - nazwę testu i funkcję (call back function)

`it` - test / pojedynczy test / przyjmuje 2 argumenty - nazwę testu i funkcję (call back function)

`.only` - wyłącza wszystkie inne testy

#### Cypress reference types - intellisense in VS code

    /// <reference types="cypress" />

### Cypress podstawowe komendy

`cy.visit()` - dostęp do strony/podstrony

`cy.click()` - kliknięcie na element // przyjmuje również argumenty np. `{force: true}` (używać np. jeśli element ma 0x0px albo jest przysłonięty przez inny element, innymi słowy jeśli istnieje w DOM ale nie jest widoczny)

`cy.type()` - wpisanie tekstu do elementu

#### selektory 🏹 

Bazujący na html tagu `<input>`
```js
cy.get("input")
```
Bazujący na atrybucie elementu oraz jego wartości
```js
cy.get("input[name='first_name']")
```
Bazujący na id elementu
```js
cy.get("#first_name")
```
Bazujący na klasie elementu
```js
cy.get(".form-control")
```
Bazujący na wielu klasach
```js
cy.get("[class='navbar navbar-expand-lg navbar-light bg-light']")
```
Bazujący na wielu atrybutach
```js
cy.get("[name='email'][placeholder='Email Address']")
```
Bazujący na xpath
```js
cy.xpath("//input[@name='first_name']")
```
### [Asercje/Założenia (biblioteka Chai)](https://docs.cypress.io/guides/references/assertions#Chai)

Często używane asercje:

Długość
```js
cy.get("input").should("have.length", 1)
```
Klasa
```js
cy.get("input").should("have.class", "form-control")
```
Wartość
```js
cy.get("input").should("have.value", "xyz")
```
Zawartość tekstu
```js
cy.get("input").should("have.text", "xyz")
```
Widoczność
```js
cy.get("input").should("be.visible")
```

Obecność elementu
```js
cy.get("input").should("exist")
```
Stan elementu
```js
cy.get("input")
        .should("be.disabled")
        // let's enable this element from the test
        .invoke('prop', 'disabled', false)

cy.get("input").should("be.checked")   
```

Łączenie asercji
```js
cy.get("input")
        .should("be.disabled")
        .should("be.visible")
```

`expect` - asercja (Chai), która pozwala na sprawdzenie założenia w ramach enkapsulacji funckcji wywołanej przez zastosowanie then() / obsługi promisa.
```js
cy.get("input")
        .should("have.value", "xyz")
        .then(function(input) {
        expect(input.val()).to.equal("xyz")
        })
```

#### Zawiera/Contains

Asercja sprawdzająca czy element zawiera znaki
```js
cy.get("input")
        .should("contain", "xyz")
```

### cy.document()

Zwraca obiekt/dokument obecnie aktywnego okna (window.document object) - pozwalając tym samym na sprawdzenie wszystkich metod z DOM
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
        .should("have.property", "ok")
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

Sprawdza tytuł strony (`<title>`)
```js
cy.title().should("include", "Test Title")
```

### cy.url()


Sprawdza zbiera aktualny URL strony i przechowuje go jako łańcuch znaków/string 
```js
cy.url().should("include", "http://example.com")
```
---
### Strony/projekty do testowania 

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

Źródła

[www.chaijs.com/api/assert](https://www.chaijs.com/api/assert/)



