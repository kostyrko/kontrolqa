---
title: 'Cypress - przechodzenie pomiędzy elementami drzewa DOM'
date: 2022-01-30 12:00
category: e2e
draft: false
---

![](https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/DOM-model.svg/1200px-DOM-model.svg.png)
## Cypress i trawersowanie pomiędzy elementami drzewa DOM

`children()` - wydobywa dzieci wybranego elementu drzewa DOM / pozwala na przekazanie selektora w celu wybrania konkretnego dziecka np.

    cy.get('#parent').children().should('have.length', 3)

    cy.get('#parent').children('.active').should('have.class', 'child')

`closest()` - wydobywa najbliższego rodzica elementu DOM // również pozwala na przekazanie selektora, który wówczas staje się warunkiem np.
    
        // pierwszy element rodzica, który posiada klasę 'parent'
        cy.get('#child').closest('.parent').should('have.class', 'parent')
        

`eq()` - equal to // pozwala na wydobycie elementu na podstawie przekazanego indeksu

        cy.get('#parent').children().eq(1).should('have.text', 'child 2')

`filter()` - znajduje element na podstawie przekazanego selektora/ filtruje spośród wielu na

        // * - wild card (wszystkie elementy spełniające warunek)
        cy.get('.btn-group-toggle > *').filter('.active').should('contain', 'Button-1')

`find()` - pozawala na znalezienie element/ów na podstawie przekazanego selektora, poprzez łączenie pozwala na wielopoziomowe poszukiwania

        cy.get('#parent').find('.children').find('.childrenOfChildren').should('have.length', 3)

`first()` - wydobywa pierwszy element z listy

`last()` - wydobywa ostatni element z listy

`nextAll()` - wydobywa całe kolejne rodzeństwo elementu (odnacza to że rodzeństawa poprzedzającego nie bierze pod uwagę) 

    // lista posiada 5 elementów - ale wybraliśmy 2. - zatem przekaże jedynie 3 rodzeństwa
    cy.get('.drinks-list').contains('Tea').nextAll().should('have.length', '3')

`nextUnitl()` - złap wszystkie elementy po przekazanym selektorze, aż do przekazanego elementu na podstawie selektora

        cy.get('#coffee').nextUntil('#milk').should('have.length', '2')

`next()` - przekazuje kolejny element będący rodzeństwem danego elementu

`not()` - przeciwieństwo filter() - na podstawie przekazanego warunku wybiera wszystkie elementy po za tymi, które spełniają wybrany warunek

    cy.get('.btn-group-toggle > *').not('.active').should('have.length', '2')

`parent()` - przekazuje bezpośredniego rodzica elementu DOM

`parents()` - przekazuje wszystkich rodziców danego elementu DON

`prev()` - przekazuje poprzedni element będący rodzeństwem danego elementu

`prevAll()` - przekazuje wszystkie poprzedzające elementy będące rodzeństwem danego elementu

`siblings()` - przekazuje całe rodzeństwo wybranego elementu drzewa DOM
