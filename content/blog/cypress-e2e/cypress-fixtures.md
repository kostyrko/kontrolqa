---
title: '🌲 Cypress - fixtures'
date: 2022-02-15 17:00
category: cypress
thumbnail: { thumbnailSrc }
draft: false
---

![cypress](https://www.cypress.io/static/cypress-io-logo-social-share-8fb8a1db3cdc0b289fad927694ecb415.png)

`Fixtures` są plikami przechowującymi dane w ramach środowiska testowego - pozwala na jego modułową budowę. Przechowywanie danych po za plikiem testu a) pozwala na ich reużywalność (dostępność dla wielu testów) b) ma pozytywny wpływ na czytelność testów

Plik należy umieścić w folderze `fixture` a w testach należy odwołać się do niego poprzez zastosowanie komendy cy.fixture('nazwaPliku') lub należy podać ścieżkę do pliku wskazującą na znajdowanie się pliku (w samym folderze fixture mogą znajdować się podfoldery).


**Format** podstawowym formatem przechowywania danych jest format JSON, jednak dopuszczonych jest wiele innych (więcej na ten temat [patrz w dokumentacji](https://docs.cypress.io/api/commands/fixture#JSON)).


Wygląd przykładowego pliku fixture/ JSON:

```js
{
"unread_message_count": 0,
"created_photo_requests_count": 0,
"received_photo_requests_count": 0,
"pending_received_photo_requests_count": 0,
"approved_created_photo_requests_count": 0,
"secret_albums_tab_count": 0,
"pending_profile_views_count": 7,
"favorited_target_ids": [
    6,
    28
],
"messages_dot_ids": []
}
```


### 1. sposób odwołani się do fixture - korzystając z this

```js
/// <reference types="cypress" />

describe("Test Contact Us form", () => {
    before(function() {
        cy.fixture('example').then(function(data) {
            //this.data = data;
            // albo
            globalThis.data = data;
        })
    })
    it("Should be able to submit a form", () => { 
        cy.get('[name="first_name"]').type(data.first_name);
        cy.get('[name="last_name"]').type(data.last_name);
        cy.get('[name="email"]').type(data.email)
        cy.get("button[title='Submit']").click();
    });
})
```


### 2. sposób odwołania się do danych z fixture - używając aliasu

```js
describe("Test Contact Us form", () => {
    before(function() {
        cy.fixture("userDetails").as("user")
    })
    it("Should be able to submit a form", () => {
        cy.get("@user").then((user) => {
            cy.get('#ContactUsFrm_first_name').type(user.first_name);
            cy.get('#ContactUsFrm_email').type(user.email);
        })
        cy.get("button[title='Submit']").click();
    });
})
```

### 3. odwołanie się do fixture w cy.intercept()

```js
cy.intercept('GET', '/users/**', { fixture: 'users' })


Cypress.Commands.add('interceptXYZPage', () => {
    cy.intercept('PUT', '/xyz/track_event', trackEvent)
    cy.intercept('POST', '/profile/record_viewing_history', { fixture: 'xyz/recordViewingHistory' })
    cy.intercept('GET', 'purchases/status', { fixture: 'xyz/purchasesStatus' })
})
```

---
### Czy fixtures są nam niezbędne?

Fixtury przechowują dane statyczne i to często nie jest korzystne ponieważ zawęża znacząco zakres testu - test w ten sposób jest zawsze wspierany tymi samymi danymi. Często korzystniejsze jest podstawianie danych, które z testu na test są zmienne - tym samym dodatkowo poszerzając zakres naszego testu - w tym celu można wykorzystać biblioteki generujące dane np. FakkerJS.


Aby uniknąć tworzenia wielu plików z fixturami można też łączyć ze sobą obiekty lub podmieniać ich części np. wykorzystując bibliotekę [deepmerge](https://www.npmjs.com/package/deepmerge)

----
Źródła

[How to update a fixture file in Cypress](https://stackoverflow.com/questions/65012366/how-to-update-a-fixture-file-in-cypress)

[Don't use fixtures in Cypress and unit tests - use factories](https://dev.to/dgreene1/don-t-use-fixtures-in-cypress-and-unit-tests-use-factories-5cnh)

[ITERATE over JSON OBJECT using CYPRESS IO | Cypress Fixture JSON Array](https://www.youtube.com/watch?v=rEJFrj2mZdc)