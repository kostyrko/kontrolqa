---
title: 'Cypress - introduction part 2'
date: 2022-01-16 12:00
category: e2e
draft: false
lang: 'en'
tags: ["cypress", "test automation", "e2e", "mocha", "chai"]
---

## Cypress chaining

Cypress is based on the concept of chaining functions together to create a test. Cypress handles Promises automatically.

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

`cy.find()` - It searches for a child element within the selected element based on a selector.


Here are some example functions that allow interaction with the tested webpage.

Translation:
`.blur()` - Blur on the previously focused DOM element.

`.focus()` - Focus on the selected DOM element.

`.clear()` - Clears an input or textarea.

`.check()` - Checks checkbox(es) or radio(s).

`.uncheck()` - Unchecks checkbox(es).

`.select()` - Selects an `<option>` within a `<select>`.

`.dblclick()` - Double-click on the selected DOM element.

`.rightclick()` - Right-click on the selected DOM element.

---
### Cypress i jego Asynchroniczność

### Cypress and its Asynchronicity

Cypress commands are asynchronous. Any step that is possible to execute will be executed. Cypress can run multiple threads simultaneously. Cypress functions are not executed immediately upon invocation; instead, they are queued for execution. The execution order of tests can be controlled by using `then` to chain events.


### Cypress Promise and then

Cypress commands work based on promises. They can be treated as promises.

`then` is used in case of a successful promise resolution (resolve), while `catch` is used in case of failure (reject).

```js
let promise = new Promise((resolve, reject) => {
    let a = 1 + 1;
    if (a == 2) {
        resolve('Promise Fulfilled');
    } else {
        reject('Promise not fulfilled');
    }
});

promise.then((message) => {
    console.log(message + ', promise has passed!');
}).catch((message) => {
    console.log(message + ', promise has failed');
});
```

`cy.then()` - allows working with the object provided by the preceding function, e.g., `cy.get()`.

```js
cy.get('xyz').then(($xyz) => {
        // 1) receives xyz
    // 2) performs operations on xyz
});
```

### Variable Usage

When using variables, it's important to consider asynchronicity and promises. Therefore, to work with the object returned by Cypress, you need to use the `then` command or chain commands together.

```js
// This approach won't work because cy.get() returns a Promise
const header = cy.get("div .header");
cy.log(header.text());

// This approach will work because cy.get() is properly handled using cy.then()
cy.get("div .header").then($header => {
    const headerText = $header.text();
    expect(headerText).to.equal("xyz");
});
```

Indeed, in Cypress, aliases can be used instead of variables. See examples of using `alias` and `iframe`.

---
### Iterations with .each()

`.each(callbackFn)` - iterates over all elements in an array, executing the assigned function on each element, similar to JavaScript's `forEach()`.

---
### wrap() 🎁

`.wrap()` - returns an object that allows executing Cypress commands. It wraps the selected variable, providing a reference to the DOM element, enabling the use of Cypress commands. It distinguishes between `cy.click()` and `js.click()`.

---
### invoke()

`invoke()` - allows invoking the properties of a specific DOM element.

```js
cy.get('button').invoke('text').then((text) => {
    expect(text).to.equal('xyz');
});
```

---
### Alias

`.as()` - invokes Cypress variable. It allows referencing the stored value in another part of the code. Referencing an alias depends on the context and requires using `this` or `@`.

```js
cy.get('button').invoke('text').as('buttonText');

this.buttonText;

cy.get('@buttonText');
```

---
## Browser
### Multiple Tabs in the Browser

Cypress does not support multiple tabs in the browser. To work around this limitation, all possible information should be displayed in a single browser window. In the case of links, this may involve removing the attribute responsible for opening content in a new window.

```js
cy.get('#xyz').invoke('removeAttr', 'target').click({force:true});
```

### Browser Actions

Cypress actions allow for browser control: go forward, go back, reload.

```js
cy.go('back');
cy.reload();
cy.reload(true); // reload without using cache

cy.go('forward');
cy.url().should('include', 'xyz');
```

### Alerts - cy.on() 🚨

Cypress automatically handles alerts and returns them as `true`. To create an assertion or return a different alert result, you need to catch the appearance of the alert window and return `false`.

```js
cy.on('window:alert', (str) => {
    expect(str).to.equal('I am an alert box!');
});

cy.on('window:alert', (str) => {
    return false;
});
```

### iframes 🖼

Cypress does not support iframes, so testing requires extracting information.

```js
cy.get('#iframe').invoke('removeAttr', 'target').click({force:true});

cy.get('#frame').then($iframe => {
    const body = $iframe.contents().find('body');
    cy.wrap(body).as('iframe');
});

cy.get('@iframe').find('#button').click();

cy.get('@iframe').find('#qwer').as('qwer');

cy.get('@qwerl').should(($expectedText) => {
    const text = $expectedText.text();
    expect(text).to.include('XYZ');
});

cy.get('@qwer').contains('Close').click();
```

### Checkbox Handling - cy.check() ☑

```js
cy.get('#radio-buttons').find("[type='radio']").first().check();

cy.get('#radio-buttons').find("[type='radio']").eq(1).check();

cy.get('#radio-buttons').find("[type='radio']").eq(2).uncheck();

cy.get("[value='a']").should('be.checked');

cy.get("[value='b']").should('not.be.checked');

cy.get("[value='c']").should('be.disabled');
```

### cy.trigger() ⌨ 

Triggering events on DOM elements, for example, to simulate clicks, text input, option selection, etc. Requires selecting an element beforehand (attaching to the element carrying the DOM element).

```js
cy.get('#radio-buttons').find("[type='radio']").first().trigger('click');
$el.trigger('click');
$el.trigger('keydown');
$el.trigger('keypress');
$el.trigger('keyup');
$el.trigger('focus');
$el.trigger('blur');
$el.trigger('change');
```

---
#### Mouse Actions 🐁

Mouse click in the center of an element ({which: 1})
```js
cy.get('#draggable').trigger('mousedown', {which: 1});
```
Mouse click at a specific position within an element by providing coordinates
```js
cy.get('#draggable').trigger('mousemove', {clientX: 100, clientY: 100});
```
Drag the mouse (1) and then release it (2) on an element
```js
cy.get('#droppable').trigger('mousemove').trigger('mouseup', {force:true});
```
```js
cy.get('#droppable').dblclick();
```

Check if the clicked element has a specific CSS property
```js
cy.get('#click-box').trigger('mousedown', {which: 1}).then
```

---
### Cypress Real Events

Basic Cypress events are simulated using JavaScript. Their behavior may slightly differ from real-world interactions, and some behaviors cannot be simulated at all, such as inputting information into alerts or copying text. The [cypress-real-events](https://github.com/dmtrKovalenko/cypress-real-events) plugin aims to address these limitations.

You can read more about the usage of this plugin in [Cypress Real Events Plugin](https://glebbahmutov.com/blog/cypress-real-events/).

---
Źródła:

[Cypress Real Events - github.io](https://github.com/dmtrKovalenko/cypress-real-events)

[Cypress Real Events Plugin](https://glebbahmutov.com/blog/cypress-real-events/)

[cypress.io](https://docs.cypress.io)
