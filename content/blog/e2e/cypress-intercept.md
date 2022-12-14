---
title: 'Cypress: cy.intercept() - przechwytywanie zapytań HTTP'
date: 2022-02-02 10:00
category: e2e
draft: false
---

![](https://i.ytimg.com/vi/gGDI3ee81d8/maxresdefault.jpg)

### Wprowadzenie stubbing vs mocking

Oba pojęcia odnoszą się do podstawiania danych w celu przeprowadzenia testów - **mockowanie** odnosi się jednak do podstawiania danych w celu **testowania funkcjonalności**, podczas gdy **stubowanie** w celu **zmiany stanu** komponentu/strony/aplikacji.


**Mocks** vs **Stubs** = Testowanie funkcjonalne vs testowanie stanu => oznacza to że może w teście być wiele stubbów ale tylko jeden mock (w ramach zasady: testowania jednej funkcjonalności na test).


!!! -> więcej na ten temat patrz: [SO - What's the difference between a mock & stub?](https://stackoverflow.com/questions/3459287/whats-the-difference-between-a-mock-stub)

### 1. cy.intercept()


`cy.intercept() `- pozwala na przechwycenie zapytania typu HTTP przez test cypressowy - taka komenda może przydać się w przypadku gdy 1) chcemy aby dane zapytanie doszło do skutku zanim zaczniemy wykonywać kolejną komendę lub 2) gdy zależy nam na przechwyceniu requestu HTTP i podstawienia danych do niego, w celu testowania zachowania się aplikacji front-endowej.


    beforeEach(() => {
        cy.viewport(viewport)
        cy.intercept('GET', '/xxx/xxx_data?page=1', { fixture: 'xxx/xxx_data.json' })
    })
        
---
### 2. cy.intercept() + cy.wait()
 
Nasłuchiwanie zapytania typu GET na `*/comments/*`

    cy.intercept('GET', '**/comments/*').as('getComment')

Sprawdzanie statusu

    cy.wait('@getComment').its('response.statusCode').should('be.oneOf', [200, 304])
    
Logowanie obiektu (DTO) w konsoli 

    cy.get('@post').then(console.log)

---
### 3. cy.intercept() + cy.wait() + cy.command()

Cypress custom command zawierający interceptowane zapytania + wykorzystanie fixture do mockowania stanu + aliasowanie do nich

    Cypress.Commands.add('waitForApp2Start', dto => {
      cy.intercept('GET', '/xyz', { fixture: 'xdata' }).as('xdata')
      cy.intercept('GET', '/search_data?*', { fixture: 'searchData' }).as('searchData')
    })

Wywołanie funkcji interceptów/przed faktycznym cy.visit() - inicjacja zmiany stanu aplikacji + w następnym kroku czekanie na wykonanie się zapytań

    cy.waitForApp2Start()
    cy.visit('').wait('@xdata').wait('@searchData')

---
### Przechwytywanie wielu zapytań / mockowanie wielu zapytań

`cy.clock() `- pozwala na "zamrożenie" zegara oraz wszystkich funkcji związanych z mierzeniem czasu jak setInterval czy setTimeout

`cy.tick()` - pozawala na manualne sterowanie czasem

    it('fetches from the server (spies)', () => {
      cy.clock()
      cy.intercept('GET', '/favorite-fruits').as('fruits')
      cy.visit('/fruits.html')
      // pierwsze zapytanie
      cy.wait('@fruits').its('response.statusCode').should('equal', 200)

      // po 30 sekundach pytanie jest ponawiane 
      cy.tick(30000)
      cy.wait('@fruits').its('response.statusCode').should('equal', 200)
      [...]


Mockowanie zapytania HTTP

      it('returns different fruits every 30 seconds', () => {
        cy.clock()
        let k = 0

        // za każdym razem kiedy pojawia się zapytanie inna odpowiedź jest podstawiana
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
 
Za każdym razem kiedy intercept jest wywoływany używa pierwszego elementu z tablicy odpowiedzi i usuwa go.
Po pierwszych dwóch razach, responses.shift() zawsze zwraca **undefined** i wtedy odpowiedź jest w postaci tablicy zawierającej kiwi.


    it('returns different fruits every 30 seconds (array shift)', () => {
      cy.clock()

      // return difference responses on each call
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
    
### Zmiana części obiektu odpowiedzi

Cypress pozwala również na zmianę jedynie części obiektu zwracanego przez API. W poniższym przykładzie wartość właściwości listBankAccount obiektu body.data zostaje zastąpiona pustą tablicą / 
źródło przykładu: [Intercepting Network Requests > Modifying Response Data](https://learn.cypress.io/advanced-cypress-concepts/intercepting-network-requests)

        cy.intercept("POST", "/bankaccounts", (req) => {
          const { body } = req
          req.continue((res) => {
            res.body.data.listBankAccount = []
          })
        })
        
W tym celu danych odpowiedzi należy zastosować metodę [.continue()](https://docs.cypress.io/api/commands/intercept#Controlling-the-outbound-request-with-req-continue) (uwaga: ta metoda bez podania argumentów pozwala na modyfikację wychodzących zapytań)




----
### Testowanie API przy pomocy Cypressa

Generalnie Cypress nie powstał w celu testowania API - do tego zostały stworzone inne biblioteki oraz narzędzia (patrz linki w sekcji: Powiązane artykuły) nie oznacza to jednak, że nie może być z powodzeniem do tego wykorzystywany. Powstała nawet do tego osobna wtyczka [cy-api](https://github.com/bahmutov/cy-api).

Tutaj znajdziesz linki do materiałów na YT(ang), które przedstawiają w jaki sposób można testować API w Cypressie (i jest to naturalne rozwinięcie materiału opisanego powyżej)

[Cypress - API Testing | Part 14](https://www.youtube.com/watch?v=TocjjF_pARo)

[Cy-api/Cypress API testing Tricks](https://www.youtube.com/watch?v=OICPSvIWAQg)

[CYPRESS API TESTING Introduction - CYPRESS REQUEST](https://www.youtube.com/watch?v=bcO2E6XFJCY&list=PLYDwWPRvXB8-8LG2hZv25HO6C3w_vezZb&index=15)


----

Źródła:

[intercept - cypress.io](https://docs.cypress.io/api/commands/intercept)

[example.cypress.io/commands/waiting](https://example.cypress.io/commands/waiting)

[Asserting Network Calls from Cypress Tests](https://www.cypress.io/blog/2019/12/23/asserting-network-calls-from-cypress-tests/)

[Testing periodic network requests with cy.intercept and cy.clock combination](https://www.cypress.io/blog/2021/02/23/cy-intercept-and-cy-clock/)

[Cypress cy.intercept Problems/A few common cy.intercept gotchas and how to avoid them - glebbahmutov.com/](https://glebbahmutov.com/blog/cypress-intercept-problems/)

[Improve Your End to End Tests with Cypress Intercept](https://javascript.plainenglish.io/improve-your-end-to-end-tests-with-cypress-intercept-2c68156d9495)



