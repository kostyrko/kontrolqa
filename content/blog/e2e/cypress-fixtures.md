---
title: '🌲 Cypress - fixtures'
date: 2022-02-15 17:00
category: cypress
thumbnail: { thumbnailSrc }
draft: false
lang: 'en'
tags: ["cypress", "test automation", "e2e", "mocha", "chai"]
---

![cypress](https://www.cypress.io/static/cypress-io-logo-social-share-8fb8a1db3cdc0b289fad927694ecb415.png)

Fixtures are files used to store data within a testing environment. They allow for modular construction of test data. Storing data separately from test files has several benefits: a) it enables data reusability (accessible to multiple tests), and b) it improves the readability of tests.

Fixture files should be placed in the `fixtures` folder. In tests, you can reference a fixture file using the `cy.fixture('fileName')` command or by specifying the file path relative to the fixtures folder. Subfolders can also be used within the fixtures folder for organizing fixtures.

The primary format for storing fixture data is JSON, but Cypress also supports other formats (refer to the [documentation](https://docs.cypress.io/api/commands/fixture#JSON) for more details).


The example fixture file in JSON format:

```json
{
  "unread_message_count": 0,
  "created_photo_requests_count": 0,
  "received_photo_requests_count": 0,
  "pending_received_photo_requests_count": 0,
  "approved_created_photo_requests_count": 0,
  "secret_albums_tab_count": 0,
  "pending_profile_views_count": 7,
  "favorited_target_ids": [6, 28],
  "messages_dot_ids": []
}
```

### 1. Accessing fixture data using `this` keyword:

```js
/// <reference types="cypress" />

describe("Test Contact Us form", () => {
  before(function() {
    cy.fixture('example').then(function(data) {
      //this.data = data;
      // or
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

### 2. Accessing fixture data using alias:

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

### 3. Referencing fixture in `cy.intercept()`:

```js
cy.intercept('GET', '/users/**', { fixture: 'users' })

Cypress.Commands.add('interceptXYZPage', () => {
  cy.intercept('PUT', '/xyz/track_event', trackEvent)
  cy.intercept('POST', '/profile/record_viewing_history', { fixture: 'xyz/recordViewingHistory' })
  cy.intercept('GET', 'purchases/status', { fixture: 'xyz/purchasesStatus' })
})
```

---
### Are fixtures necessary?

Fixtures store static data, and often it is not beneficial because it significantly limits the scope of the test. The test is always supported by the same data. It is often more advantageous to use dynamic data in tests, where the data can vary from test to test, thereby expanding the scope of our tests. In this case, libraries like FakerJS can be used to generate data.

To avoid creating multiple fixture files, you can also combine objects or substitute parts of them using a library like [deepmerge](https://www.npmjs.com/package/deepmerge).

----
Źródła

[How to update a fixture file in Cypress](https://stackoverflow.com/questions/65012366/how-to-update-a-fixture-file-in-cypress)

[Don't use fixtures in Cypress and unit tests - use factories](https://dev.to/dgreene1/don-t-use-fixtures-in-cypress-and-unit-tests-use-factories-5cnh)

[ITERATE over JSON OBJECT using CYPRESS IO | Cypress Fixture JSON Array](https://www.youtube.com/watch?v=rEJFrj2mZdc)