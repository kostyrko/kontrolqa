---
title: 'Cypress - wprowdzenie cz. 2'
date: 2022-01-16 12:00
category: cypress
draft: false
---

## Cypress i tworzenie ciągów

Cypress oparty jest o tworzenie ciągów (łączeniu ze sobą funkcji w celu stworzenia testu). Cypress sam zajmuje się Promisami.

```js
cy.get('textarea.post-body')
.type('{enter}')

cy.get('textarea.post-body')
.contains('xyz')
.click()

cy.get('textarea.post-body')
.find('.productname')
.eq(1)
.click()
```

`cy.find()` - szuka dziecka w wybranego elementu na podstawie selektora


Przykładowe funkcje, które pozwalają na interakcję z testowaną stroną - 

`.blur() `- Blur na wcześniej sfokusowanym elemencie DOM.

`.focus()` - Focus na wybranych elemencie DOM.

`.clear()` -  Czyści input lub textarea.

`.check()` - Zaznacza checkbox(es) or radio(s).

`.uncheck()` - Odznacza checkbox(es).

`.select()` - Select an `<option>` within a `<select>`.

`.dblclick()` - podwójny-click na wybrany element DOM.

.`rightclick()` - prawy-klik na wybrany element DOM.

---
### Cypress i jego Asynchroniczność

Cypressowe komendy są asynchroniczne  (JS jest jednowątkowy, a Cypress jest na Node.js) - jakikolwiek krok jest możliwy do egzekucji to zostanie wykonany/ może wykonywać więcej niż jeden wątek na raz - cypressowe funkcje nie są wykonywane w trakcie wywołania a są kolejkowane w celu ich wykonania. Można mieć wpływ na kolejność wykonywania się testów poprzez użycie `then`.


### Cypress promise i then

Cypressowe komendy działają na zasadzie promisa/ są promisami.

then jest używany w przypadku pozytywnego wyniku promisa (resolve), catch w przypadku negatywnego (reject).

```js
let promise = new Promise((resolve, reject) => {
        let a = 1 + 1
        if(a == 2) {
        resolve('Promise Fulfilled')
        } else {
        reject('Promise not fulfilled')
        }
})

promise.then((message) => {
        console.log(message + ', promise has passed!')
}).catch((message) => {
        console.log(message + ', promise has failed')
})
```

`Cy.then()` - pozwala na pracę z obiektem dostarczonym poprzez poprzedzającą funkcję np. cy.get()

```js
cy.get('xyz').then(($xyz) => {}) // 1) dostarcza xyz 2) wykonuje na xyz funkcję
```

### Stosowanie zmiennych

W kontekście stosowania zmiennych należy mieć na uwadze asynchroniczność oraz promisy (dlatego aby wykorzystać obiekt, który cypress zwraca należy wykorzystać komendę then lub zasadę łańcuchowania/łączenia ciągów komend).

```js
//To podejście nie zadziała, ponieważ cy.get() zwraca Promise
const header = cy.get("div .header");
cy.log(header.text())

//To podejście zadziała, ponieważ cy.get() jest odpowiednio obsłużony poprzez zastosowanie cy.then()
cy.get("div .header")
        .then($header => {
        const headerText = $header.text()
        expect(headerText).to.equal("xyz")
        })
```

 faktycznie w przypadku cypressa aliasy zastępują zmienne - patrz przykłady zastosowania `alias` i `iframe `          

---
### Iteracje .each()

`.each(callBackFn) `- iteruje po wszystkich elementach znajdujących się w tablicy wykonując na nich przypisaną funkcję / podobnie jak JS forEeach().

---
### Wrap() 🎁
 
`.wrap()` - zwraca obiekt, który pozwala na wykonanie cypressowej komendy -> opakowuje wybraną zmienną, po którą jest zapisane odniesienie do elementu DOM tak aby zastosować cypressową komendy -> pozwala na rozróżnienie cy.click() od js.click()

---
### invoke

invoke() - pozwala na wywołanie właściwości danego elementu DOM.

```js
cy.get('button').invoke('text').then((text) => {
        expect(text).to.equal('xyz')
})
```
---
### Alias

`.as()` - jest swego rodzaju cypressową zmienną - pozwala na odwołanie się do przechowywanej wartości w innej części kodu.
Odwołanie się do aliasy zależne jest od kontekstu i wymaga wskazania poprzez `this` lub `@`

```js
cy.get('button').inovke('text').as('buttonText')

this.buttonText

cy.get('@buttonText')
```

---
## Przeglądarka 
### Wiele tabów w przeglądarce

Cypress nie obsługuje wielu tabów w przeglądarce - obejściem tej zasady jest wyświetlenie wszystkich możliwych informacji w pojedynczym oknie przeglądarki - w przypadku linków może oznaczać to usunięcie atrybutu odpowiedzialnego za wyświetlenie treści w nowym oknie.

        cy.get('#xyz').invoke('removeAttr', 'target').click({force:true})

### Akcje przeglądarki 

Cypressowe akcje pozwalają na sterowanie przeglądarką: do przodu, do tyłu, przeładuj

```js
cy.go('back')
cy.reload()
cy.reload(true) //przeładuj nie korzystając z cache

cy.go('forward')
cy.url().should('include', 'xyz')
```

### Alerty - cy.on() 🚨

Cypress automatycznie zwraca alerty jako `true` - stąd aby stworzyć asercję lub zwrócić inny wynik alertu należy 'wyłapać' pojawienie się okna alertu oraz zwrócić `false`

```js
cy.on('window:alert', (str) => {
        expect(str).to.equal('I am an alert box!')
})

cy.on('window:alert', (str) => {
        return false;
})
```

### iframe 🖼

Cypress nie obsługuje `iframe` stad testowanie wymaga wydobycia informacji

```js
cy.get('#iframe').invoke('removeAttr', 'target').click({force:true})

cy.get('#frame').then($iframe => {
        const body = $iframe.contents().find('body')
        cy.wrap(body).as('iframe')
})

cy.get('@iframe').find('#button').click()

cy.get('@iframe').find('#qwer').as('qwer')

cy.get('@qwerl').should(($expectedText) => {
        const text = $expectedText.text()
        expect(text).to.include('XYZ');
})

cy.get('@qwer').contains('Close').click()
```


### Obsługa checkboxów - cy.check() ☑

```js
        cy.get('#radio-buttons').find("[type='radio']").first().check()

        cy.get('#radio-buttons').find("[type='radio']").eq(1).check()
        
        cy.get('#radio-buttons').find("[type='radio']").eq(2).uncheck()
        
        cy.get("[value='a']").should('be.checked')
        
        cy.get("[value='b']").should('not.be.checked')
        
        cy.get("[value='c']").should('be.disabled')
```

### cy.trigger() ⌨ 

wywołanie wydarzenia na elementach drzewa DOM - np. w celu wywołania zdarzeń jak np. kliknięcia, wpisywania tekstu, wyboru opcji, itp. Wymaga wcześniejszego wywołania elementu (podpięcia pod element niosący element DOM)

```js
        cy.get('#radio-buttons').find("[type='radio']").first().trigger('click')
        $el.trigger('click')
        $el.trigger('keydown')
        $el.trigger('keypress')
        $el.trigger('keyup')
        $el.trigger('focus')
        $el.trigger('blur')
        $el.trigger('change')
```

---
#### akcje myszy 🐁 

Kliknięcie myszy na środek elementu ({which: 1})
```js
        cy.get('#draggable').trigger('mousedown', {which: 1});
```
Kliknięcie mysz w określonym miejscu elementu przez podanie współrzędnych
```js
        cy.get('#draggable').trigger('mousemove', {clientX: 100, clientY: 100});
```
Przenieś mysz (1) a następnie upuść (2) na element
```js
        cy.get('#droppable').trigger('mousemove').trigger('mouseup', {force:true})
```
```js
        cy.get('#droppable').dblclick()
```

Sprawdzenie czy kliknięty element posiada konkretny css
```js
        cy.get('#click-box').trigger('mousedown', {which: 1}).then(($element) => {
            expect($element).to.have.css('background-color', 'rgb(0, 255, 0)')
        })
```
---
### cypress real events

Podstawowe eventy cypressa są symulowane - wszystkie eventy pochodzą z JS, ich zachowanie może się trochę różnić od prawdziwych zachowań, a część zachowań nie może być w ogóle symulowana np. wpisywanie informacji do alertów lub kopiowanie - wtyczka [cypress-real-events](https://github.com/dmtrKovalenko/cypress-real-events) ma za zadanie odpowiedzieć na te problemy.

Więcej na temat zastosowanie tej wtyczki przeczytasz tutaj [Cypress Real Events Plugin](https://glebbahmutov.com/blog/cypress-real-events/)


---
Źródła:

[Cypress Real Events - github.io](https://github.com/dmtrKovalenko/cypress-real-events)

[Cypress Real Events Plugin](https://glebbahmutov.com/blog/cypress-real-events/)

[cypress.io](https://docs.cypress.io)
