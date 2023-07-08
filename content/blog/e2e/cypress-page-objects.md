---
title: '🌲 Cypress - Page Object Model a short introduction'
date: 2022-02-16 10:00
category: e2e
draft: false
tags: ["cypress", "test automation", "e2e", "pom"]

---

![](https://www.cypress.io/static/cypress-io-logo-social-share-8fb8a1db3cdc0b289fad927694ecb415.png)

## Page Objects

The **Page Object pattern** aims to introduce modularity in tests by separating the test logic into one place (the test file) and the actual page interaction logic into another place (the page object).

The benefits of using the Page Object pattern include:

👉 Reducing the usage of selectors in tests, which improves code readability.
🤌 Making small changes to the tested application only affect the Page Object, avoiding changes in the test code.
🤜 Simplifying test maintenance.

In summary, the Page Object pattern:

- Introduces an additional level of abstraction for interacting with the UI.
- Contains the details of the page structure and its (partial) functionality within a single class/object.

Page objects are typically stored in a dedicated folder (e.g., `pageObjects`) located outside the `integrations` folder, alongside other test code files.

### 1. Class-based Page Object

It is common to create Page Objects based on classes. However, in Cypress, it is not necessary to use classes for Page Objects (as mentioned below).

```js
export class CreditsPgObj {
    getCreditsCheckbox() {
        cy.get('[data-cy="creditBox"]')
    }

    static getCreditsInfo() {
        cy.get('[data-cy="creditsInfo"]')
    }

    [...]
}

export class ThanksCreditsPg {
    getProviderName() {
        return cy.get('[data-cy="providerName"]')
    }

    static getTransactionId() {
        return cy.get('[data-cy="transactionId"]')
    }
}
```

**Usage**

```js
/// <reference types="cypress" />
import { viewports } from '../../support/main'
// Import the page object class
import { CreditsPage } from '../../support/credits'

viewports.forEach(viewport => {
    describe(`Bonus credits management - (${viewport})`, () => {
        // Create a new instance of the page object class
        const creditsPage = new CreditsPgObj()
        beforeEach(() => {
            cy.viewport(viewport)
            cy.visit('').wait('@xyz').wait('@yz').wait('@zx')
        })

        it('Bonus credits offer should be displayed', () => {
            CreditsPage.getLimitedTimeOffer().should('be.visible')
            CreditsPage.getCreditsProductBonus().should('be.visible')
            CreditsPage.getCreditsProductBonus().first().should('include.text', '100 Credits')
        })
    })
})
```
---
Another example of using Page Objects can be found in Gleb Bahmutov's article titled [Stop using Page Objects and Start using App Actions](https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/#just-functions).

**Page Object -> HomePage**

```js
import Header from './Headers';
import SignInPage from './SignIn';

class HomePage {
    constructor() {
        this.header = new Header();
    }

    visit() {
        cy.visit('/');
    }

    getUserAvatar() {
        return cy.get(`[data-testid=UserAvatar]`);
    }

    goToSignIn() {
        const link = this.header.getSignInLink();
        link.click();

        const signIn = new SignInPage();
        return signIn;
    }
}

export default HomePage;
```

Usage in a test (notice where the assertions are located)

```js
import HomePage from '../elements/pages/HomePage';

describe('Sign In', () => {
    it('should show an error message on empty input', () => {
        const home = new HomePage();
        home.visit();

        const signIn = home.goToSignIn();

        signIn.submit();

        signIn.getEmailError()
            .should('exist')
            .contains('Email is required');

        signIn.getPasswordError()
            .should('exist')
            .contains('Password is required');
    });
});
```
---
### 2. Object-based Page Object

In Cypress, there is no need to create Page Objects as classes or instantiate them since they don't require prototypes of other classes and don't have to be classes themselves. Instead, Page Objects can be composed of individual functions or collected within an object for organization purposes.

```js
export const menuPage = {
    menuOpen: () => {
        cy.get(menuSelectors.openMenuBtn).click();
    },
    menuClose: () => {
        cy.get(menuSelectors.closMenuBtn).click().should('not.be.visible');
    },
    logOut: () => {
            cy.get(menuSelectors.menuItems.logout).click();
            cy.url().should('include', '/login');
        },
};
```
---
#### 3. Approach to Logic Separation in Page Object Model (POM)

In the past, I wrote about good testing practices in [Good Testing Principles](https://kostyrko.github.io/zfrontu/testing-good-practices.html), where I mentioned the 3A principle (Arrange, Act, Assert) and how it relates to the POM (Page Object Model). Here's how I understand it:

The Page Object is responsible for interacting with the page and stores reusable actions. However, the assertion (verification of action execution) should be placed inside the test itself. Test preparation can be done in different places and in different ways (excluding environment setup, such as `cy.visit` or `cy.intercept`, or `localStorage`, which can be set up in `beforeEach`). The focus should be on collecting selectors (in a separate class or object) that will be used both within the test and in the Page Object.

A test scenario for testing a blog application may look like this: login, navigate to the section with new articles, create a new article content, submit it, and then verify if the article was added/published.

A commonly used approach (linear approach) includes:

1. Collecting selectors in an object (stored in the same file as the Page Object).
2. Using the Page Object for `cy.get()` and other functionalities.
3. Using getters from the Page Object in the test to create assertions.

```js
const SELECTORS = {
    ACCEPT_BUTTON: "#accept-cookies",
    REJECT_BUTTON: "#reject-cookies",
    LOCALSTORAGE_DISABLED_WARNING: "#localstorage-disabled-warning",
};
```

Translate given text: **Alternative Approach: Splitting Logic into 3 Classes/Objects/Components (Functional Approach)** => 1. Store getters = `cy.get()` + selectors. 2. Actions/Functionality (utilizes logic from 1.). 3. Test (uses logic from 1. and 2.).

```js
const getSubmitSearchButton = () => cy.get('[cypress-id]=submit-search');
```

Above is an example of a single function, but they can also be collected in objects/components (as mentioned earlier).

Using [cypress-selectors](https://anton-kravchenko.github.io/cypress-selectors/), the code can look like this:

```js
@ByType('input') static searchInput: Selector;
```

Sample Usage

```js
it('change language between different languages', () => {
    Object.keys(i18nextLngs).forEach((language) => {
        cy.wrap(footerPage.changeLanguage(language)).then(() =>
            expect(localStorage.getItem('i18nextLng')).to.eq(i18nextLngs[language])
        );
    });
});
```

where `footerPage.js` (in this case, selectors are stored in a separate file and object 'footerSelectors' as selectors, not getters, so it follows the linear approach):

```js
import { footerSelectors } from '../support/selectors/footerSelectors';

const i18nextLngs = {
    en: 'en',
    pl: 'pl',
};

export const footerPage = {
    changeLanguage: (language) => {
        cy.get(footerSelectors.languageBtn).click({ waitForAnimations: false });
        cy.get(footerSelectors.languageOption)
            .contains(language[0].toUpperCase() + language.substring(1))
            .click({ waitForAnimations: false });
    },
};
```
---

### Page Object model? How about using App Actions instead?

The article by *Gleb Bahmutov* titled [Stop using Page Objects and Start using App Actions](https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/#just-functions) has reached a significant number of people, but the actual adoption doesn't seem to be widespread... - 🤔 In which cases do Page Objects not work or it would be considered best practice not to use them? 👉 They are not suitable when used for **triggering application state changes through the UI** / preparing the state for testing - why? - because it essentially means retesting the same thing. In such cases, App Actions can be used, which means using functions within the application/component directly in the test and then checking its state.


----

Sources:

[Using PageObject pattern with Cypress](https://medium.com/geekculture/using-pageobject-pattern-with-cypress-6d9907850522) => [anton-kravchenko/cypress-page-object-example](https://github.com/anton-kravchenko/cypress-page-object-example) => [cypress-selectors](https://anton-kravchenko.github.io/cypress-selectors/)

[CYPRESS Page Object Model EXAMPLE | POM in CYPRESS](https://www.youtube.com/watch?v=bC9bGHDgpQk&list=PLYDwWPRvXB8-8LG2hZv25HO6C3w_vezZb&index=15)


[Stop using Page Objects and Start using App Actions](https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/)



