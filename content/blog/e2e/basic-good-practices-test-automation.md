---
title: '🤖 Test automation good practices - basics'
date: 2021-06-25 10:00
category: e2e
draft: false
lang: 'en'
tags: ["test-automation", "good-practices"]
---

![](https://static-cms.hotjar.com/documents/conducting-usability-test_yon4BQT.svg)

Recently (2021-06-25), a remote conference called Front-End Test Fest 2021 was held, conducted by Applitools and Cypress. One of the presentations focused on good practices for writing tests (link in the sources), and today's post is an excerpt from that presentation.

### Main principle: Tests should be simple - "flat test design"

Writing tests should not be done in the same way as writing code. Simplicity should take precedence, even at the cost of code duplication. This means that tests, if possible, should not rely on additional abstractions and should have a flat structure (without nesting).

### The purpose of the test should be understandable - "get test instantly"

The description of the test should clearly present its intentions. To achieve this, three conditions should be met in the description:

1) What is being tested (e.g., the property of an element)

2) Under what conditions it is being tested (e.g., the usage of the property)

3) What the expected outcome is

### Test structure - AAA principle (Arrange, Act, Assert)

-> Arrange = setting up the scenario (variables, mocking, etc.)

-> Act = performing actions that lead to the final result

-> Assert = checking the execution of the scenario

### Test Independence

Each test should have its own isolated environment and should not depend on the outcome of a preceding test. This means that tests should not be interdependent or linked in any way, and the data environment should be the same for each test.

### Realistic Data

One element of test readability is the use of realistic data (rather than placeholders like "Foo" and "Bar"). This allows for a better understanding of the connection to the tested product.

### Selectors

Selectors that are prone to change should not be used. Instead, it is best to rely on properties that are visible or relevant to the user (e.g., using `cy.contains()`) or assign test attributes like data-cy to the tested object.

### Waiting...

Instead of arbitrarily waiting for a test task to complete (which will often depend on an HTTP request), it is better to wait for a positive response from that request.

```js
cy.wait('@request')
    .its('response.statusCode')
    .should('equal', 200);
```


---
Source:

[Front-End Test Fest 2021: Recordings - It's a (Testing) Trap! - Common Testing Pitfalls and How to Solve Them](https://www.youtube.com/watch?v=uvJwWQLaVqU&list=PL8GlT7H3xOcIXrl0nXmyDBYztCKcVqQQg&index=6&ab_channel=Cypress.io)