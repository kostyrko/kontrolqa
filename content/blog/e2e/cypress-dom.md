---
title: '🌲 Cypress - traversing the DOM tree 🌳'
date: 2022-01-30 12:00
category: cypress
draft: false
lang: 'en'
tags: ["cypress", "test automation", "e2e", "dom"]
---

![](https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/DOM-model.svg/1200px-DOM-model.svg.png)
## Cypress and traversing between DOM elements

`children()` - retrieves the children of a selected DOM element / allows passing a selector to select a specific child, for example:
```js

    cy.get('#parent').children().should('have.length', 3)

    cy.get('#parent').children('.active').should('have.class', 'child')
```
`closest()` - retrieves the closest parent of a DOM element / also allows passing a selector as a condition, for example:
```js   
        // first parent element that has the class 'parent'
        cy.get('#child').closest('.parent').should('have.class', 'parent')
```    

`eq()` - equal to / retrieves an element based on the passed index, for example:
```js 
        cy.get('#parent').children().eq(1).should('have.text', 'child 2')
```
`filter()` - finds an element based on the passed selector / filters among multiple elements, for example:
```js 
        // * - wild card (all elements that meet the condition)
        cy.get('.btn-group-toggle > *').filter('.active').should('contain', 'Button-1')
```
`find()` - finds element(s) based on the passed selector, allows for multi-level searching by chaining, for example:
```js 
        cy.get('#parent').find('.children').find('.childrenOfChildren').should('have.length', 3)
```
`first()` - retrieves the first element from a list

`last()` - retrieves the last element from a list

`nextAll()` - retrieves all subsequent siblings of an element (ignores preceding siblings) 
```js 
    // the list has 5 elements - but we selected the 2nd one, so it will only return 3 siblings
    cy.get('.drinks-list').contains('Tea').nextAll().should('have.length', '3')
```
`nextUntil()` - retrieves all elements after the passed selector until the specified element based on the selector
```js 
        cy.get('#coffee').nextUntil('#milk').should('have.length', '2')
```
`next()` - retrieves the next sibling element

`not()` - the opposite of `filter()`, selects all elements except those that meet the specified condition
```js 
    cy.get('.btn-group-toggle > *').not('.active').should('have.length', '2')
```
`parent()` - retrieves the direct parent of a DOM element

`parents()` - retrieves all parents of a DOM element

`prev()` - retrieves the previous sibling element

`prevAll()` - retrieves all preceding sibling elements

`siblings()` - retrieves all siblings of a selected DOM element
