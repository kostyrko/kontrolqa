---
title: '🌲 Cypress - Page Objects'
date: 2022-02-16 10:00
category: cypress
draft: false
---

![](https://www.cypress.io/static/cypress-io-logo-social-share-8fb8a1db3cdc0b289fad927694ecb415.png)
### Page objects

**Page object pattern** - główne założenia: wprowadzenie modułowości w testach -> skupienie logiki testu w jednym miejscu a w innym stworzenie samego testu.
👉 pozwala na ograniczenie używania selektorów w testach ( ✌️ pozytywnie wpływa na czytelność kodu) 
🤌 niewielkie zmiany dokonane w testowanej aplikacji powinny mieć wpływ na zmianę Page Objectu, unikając zmian w kodzie testu ( 🤜 testy prostsze w utrzymaniu).

Podsumowując

- wprowadza dodatkową abstrakcję dla interakcji z UI

- zawiera szczegóły struktury UI strony oraz (części) jej funkcjonalności w jednej klasie/obiekcie


Page objecty przechowujemy w dedykowanym folderze (np. pageObjects) znajdującym się po za folderem 'integrations' jak reszta plików z kodem testowym.

#### 1. Page object oparty na klasie

Przyjęte jest, że Page Objecty tworzone są na podstawie klasy / w przypadku Cypressa nie jest to jednak konieczne (o czym mowa poniżej).

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

**Zastosowanie**

```js
/// <reference types="cypress" />
import { viewports } from '../../support/main'
// zaimportowanie klasy obiektu
import { CreditsPage } from '../../support/credits'

viewports.forEach(viewport => {
    describe(`Bonus credits management - (${viewport})`, () => {
        // stworzenie nowej instancji klasy page obiektu
        const creditsPage = new CreditsPgObj()
        beforeEach(() => {
            cy.viewport(viewport)
            cy.visit('').wait('@xyz').wait('@yz').wait('@zx')
        })

        it('Bonus credits offer should be displayed')
        () => {
            CreditsPage.getLimitedTimeOffer().should('be.visible')
            CreditsPage.getCreditsProductBonus().should('be.visible')
            CreditsPage.getCreditsProductBonus().first().should('include.text', '100 Credits')
        },
        )
    })
})
```
---
Kolejny przykład zastosowania Page Objectów znalazł się w artykule
*Gleba Bahmatova* pod tytułem [Stop using Page Objects and Start using App Actions](https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/#just-functions)  
[ o **App Actions** mowa poniżej ]

**Page Object ->  HomePage**

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

Wykorzystanie w teście [warto zwrócić uwagę na to gdzie znalazły się asercje]

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

        signIn
        .getPasswordError()
        .should('exist')
        .contains('Password is required');
    });
});
```
---
#### 2. Page object oparty na obiekcie

W przypadku Cypressa, nie ma potrzeby tworzenia Page Objectów jako klas, a także tworzenia ich instancji ponieważ te nie wymagaj  prototypów innych klas i same nimi być nie muszą - zamiast tego Page Objecty mogą składać się nawet z pojedynczych funkcji lub dla porządku mogą one być zebrane w ramach obiektu.

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
#### 3. Sposób na podział logiki w Page Objecty Model (POM)

 Swego czasu tutaj: [Dobre zasady testowania](https://kostyrko.github.io/zfrontu/testing-good-practices.html) pisałem, że dobry układ testu tj 3xA (Arrange/aranżacja, Act/działanie, Assert/sprawdzanie) - jak to się odnosi do tzw POM? Ja to rozumiem w sposób następujący - PageObject jest odpowiedzialny za interakcję ze stroną (przechowuje akcje, które są powtarzane w tekście) - jednak sama asercja (sprawdzenie poprawności wykonania się akcji) powinna znajdować się wewnątrz testu. Przygotowanie testu odbywać się może w różnych miejscach i na różne sposoby (pomijając przygotowanie środowiska-> cy.visit/cy.intercept czy localStorage, które mogą się znaleźć np. w beforeEach) ale skupiać w sobie będzie zebranie selektorów (w osobnej klasie bądź obiekcie), które następnie będą wykorzystane zarówno w ramach testu jak i w Page Object.

Scenariusz testowy w kontekście testowania aplikacji blogowej może przedstawiać się w sposób następujący: logujemy się, przechodzimy do sekcji z nowymi artykułami, tworzymy treść nowego artykuły, postujemy go - a następnie sprawdzamy czy artykuł został dodany/opublikowany.

**Często spotykane podejście (podejście liniowe)** => 1. Zebranie selektorów w obiekcie (w którym przechowywany jest PageObject), 2. wykorzystanie PageObjectu min. do cy.get() + funkcjonalność 3. wykorzystanie w tekście getterów z PageObjectu do tworzenia asercji.

```js
const SELECTORS = {
    ACCEPT_BUTTON: "#accept-cookies",
    REJECT_BUTTON: "#reject-cookies",
    LOCALSTORAGE_DISABLED_WARNING: "#localstorage-disabled-warning",
};
```

**Alternatywne podejście: rozbicie logiki na 3 klasy/obiekty/części (podejście funkcjonalne)** => 1. przechowuje gettery = cy.get() + selektory 2. akcje/funkcjonalność (wykorzystuje logikę 1.) 3. test (tu wykorzystywana jest logika z 1. 2.)
```js
const getSubmitSearchButton = () => cy.get('[cypress-id]=submit-search');
```
Powyżej przedstawiony jest przypadek pojedynczej funkcji, ale te (jak zauważyłem powyżej mogą być również zebrane w obiektach)

wykorzystując [cypress-selectors](https://anton-kravchenko.github.io/cypress-selectors/) zapis może wyglądać następująco:
```js
@ByType('input') static searchInput: Selector;
```

Przykładowe zastosowanie

```js
it('change language between different languages', () => {
    Object.keys(i18nextLngs).forEach((language) => {
        cy.wrap(footerPage.changeLanguage(language)).then(() =>
            expect(localStorage.getItem('i18nextLng')).to.eq(i18nextLngs[language])
        );
    });
});
```


gdzie footerPage.js (w tym przypadku selektory przetrzymywane są w osobnym pliku oraz obiekcie 'footerSelectors' choć nie w postaci getterów a jedynie selektorów - zatem realizowane jest podejście liniowe):

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
### Page Object model? a może by tak zacząć stosować App Actions?

Artykuł *Gleba Bahmatova* pod tytułem [Stop using Page Objects and Start using App Actions](https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/#just-functions) trafił do sporej ilości osób jednak sama adaptacja wydaje się nie być być powszechna... - 🤔  w jakich przypadkach Page Object się nie sprawdzają lub dobrą praktyką było by ich nie stosowanie? 👉  tam gdzie będą one stosowane do **wywołania stanu aplikacji przez UI** / przygotowanie stanu do testowania - dlaczego? - ponieważ faktycznie oznacza to ponowne przeprowadzanie testu. W takich przypadkach można by zastosować App Actions tzn. wykorzystanie funkcji znajdujących się w aplikacji/ danym komponencie bezpośrednio z w teście a następnie sprawdzanie jej stanu.

Więcej na temat App Actions pojawi się w jednym z kolejnych wpisów na blogu.




----

Źródła:

[Using PageObject pattern with Cypress](https://medium.com/geekculture/using-pageobject-pattern-with-cypress-6d9907850522) => [anton-kravchenko/cypress-page-object-example](https://github.com/anton-kravchenko/cypress-page-object-example) => [cypress-selectors](https://anton-kravchenko.github.io/cypress-selectors/)

[CYPRESS Page Object Model EXAMPLE | POM in CYPRESS](https://www.youtube.com/watch?v=bC9bGHDgpQk&list=PLYDwWPRvXB8-8LG2hZv25HO6C3w_vezZb&index=15)


[Stop using Page Objects and Start using App Actions](https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/)



