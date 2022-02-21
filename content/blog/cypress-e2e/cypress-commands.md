---
title: 'Cypress - custom Commands'
date: 2022-01-29 13:00
category: cypress
draft: false
---

![](https://digital.ai/sites/default/files/pictures/styles/maxwidth_1920/public/blog-images//cypress-framework-1.jpg?itok=Iw9boVx6)

### Wprowadzenie

Cypress jako taki zawiera różnego rodzaju komendy odpowiadający za konkretne przeprowadzanie testów mających wpływ na zachowanie się aplikacji, pozwala również na dodanie własnych komend tzw. **custom commands** - które nie są niczym innym niż funkcją które w łatwy sposób można łączyć z obiektami cypressowymi - to pozwala na zamknięcie pewnej powtarzalnej logiki/kodu, który można stosować w wielu miejscach.


+ `overwrite` pozwala na nadpisanie funkcji już w cypressie zawartych =>

      Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
        return originalFn(url, {
          ...options,
          onBeforeLoad(win) {
            win.fetch = null;
          },
        });
      });


Po zainstalowaniu Cypressa w folderze **support** znaleźć można plik **commands.js** - ten musi być podlinkowany w **index.js** aby nasze komendy były importowane za każdym razem kiedy cypress jest odpalany.

---
#### Przykładowe komendy - commands.js

**Wybranie n-tego dziecka**

    Cypress.Commands.add('selectNth', { prevSubject: 'element' }, (subject, nth) => {
      cy.wrap(subject)
        .children('option')
        .eq(nth)
        .then(elem => {
          cy.wrap(subject).select(elem.val())
        })
    })

zastosowanie

    cy.get('#select').selectNth(2)


**Prosty generator tekstu**

    const generateRandomText = () => Math.random().toString(36).substr(2, 10)


    Cypress.Commands.add('fillWithRandomText', { prevSubject: 'element' }, subject =>
      cy.wrap(subject).clear().type(generateRandomText()),
    )

analogicznie zastosowanie

    cy.get('#input').fillWithRandomText()


Do tej komendy **sprawdzającej zawartość tekstu** należy przekazać łańcuch znaków

    Cypress.Commands.add('checkTextContent', { prevSubject: 'element' }, (subject, contains: string) =>
      cy
        .wrap(subject)
        .invoke('text')
        .then(text => {
          expect(text).to.contain(contains)
        }),
    )

    cy.get('#input').checkTextContent('Hello World')


Ta komenda przyjmuje url w postaci łańcucha znaków oraz tablicę zawierającą obiekty, którymi request ma być stubbowany/ dto które mają być podstawione podczas kolejnych zapytań / założenie jest że w danym teście mamy testować reakcję aplikacji, obsługujących wiele zapytań tego samego typu, ale różnych zawartościach odpowiedzi na nie.

    Cypress.Commands.add('multipleIntercepts', (url: string, responses: {}[]) => {
      cy.intercept(url, req => {
        req.reply(responses.shift())
      })
    })


Źródła:

[Create your OWN CYPRESS COMMAND NOW! | Cypress Tutorial For Beginners](https://www.youtube.com/watch?v=66bEpdatEYQ&list=PLYDwWPRvXB8-8LG2hZv25HO6C3w_vezZb&index=12)

[Custom commands - co to i jak ich używać](https://www.testersbay.pl/post/custom-commands-co-to-i-jak-ich-u%C5%BCywa%C4%87)