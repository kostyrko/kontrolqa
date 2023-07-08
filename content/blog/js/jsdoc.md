---
title: '📃 JSDoc'
date: 2022-03-20 10:00
category: js
draft: false
tags: ["java script", "js", "jsdocs", "documentation"]
---

# JSDoc: A Way to Document JavaScript Code - Introduction

Using the JSDoc API allows for documenting JS code according to the proposed schema introduced in 1999. This schema has been widely accepted and is still successfully used today. Adhering to the proposed schema positively affects the readability of the documentation.

When using IDEs like VSC or WebStorm, and similar ones, using JSDoc provides users with helpful tooltips containing the description from the JSDoc file when hovering over a class, method, variable, or function name.

The main pattern for adding information about code documentation consists of asterisks and a backslash that open and close the documentation section.

```js
/**
 * Short description of the function, variable, or class, etc.
 */
```

---
### Parameters

JSDoc can assist in documenting a regular variable by indicating its type, such as string, number, boolean, array, object, function, etc.

```js
/**
 * Documentation name
 * @type {string}
 */
const documentationName = "JSDoc";
```

---
Array containing numbers
```js
/**
 * Numbers array
 * @type {Array<number>}
 */
const numbers = [1, 2, 3];
```

---
Sample object documentation

```js
/**
 * Droid object
 * @type {{id: number, name: string, class: string}}
 * or in a more detailed way...
 * @property {number} id - Droid id
 * @property {string} name - Droid name
 * @property {string} class - Droid class
 */
const droid = {
	id: 1,
	name: "C3PO",
	class: "Protocol",
};
```

Sample function documentation

JSDoc allows documenting parameters using the `@param {type} name - description` schema.

```js
/**
 * Description
 * @param {parameter type} parameter name - description
 * @returns {return data type} - description
 *
 */
```

Sample function documentation

```js
/**
 * Function calculating the sum of two numbers
 * @param {number} num1 - First number
 * @param {number} num2 - Second number
 * @returns {number} - The sum of two numbers
 */
function sum(num1, num2) {
	return num1 + num2;
}
```

---
Documenting a class

```js
/**
 * Class to create a user object
 */
class Droid {
	/**
	 * @param {Object} droidInfo - Information about a droid
	 */
	constructor(droidInfo) {
		/**
		 * @property {string} name - Droid name
		 */
		this.name = droidInfo.name;

		/**
		 * @property {string} class - Droid class
		 */
		this.class = droidInfo.class;
	}

	/**
	 * @property {Function} sayHello - Droid's greeting
	 * @returns {void}
	 */
	sayHello() {
		console.log(`Hello, my name is ${this.name}`);
	}
}
```
---
### Documentation in HTML and JSON Format

Installing the `jsdoc` library globally or locally and setting it up allows for automatic generation of documentation in HTML format.

```shell
npm install --save-dev jsdoc
```

Configuring JSDoc in `jsdoc.json` enables the generation of HTML documentation in the `docs` directory and JSON documentation in the `docs/json` directory.

```js
{
	"source": {
		"include": ["source"],
		"includePattern": ".js$",
		"excludePattern": "(node_modules/|docs)"
	},
	"plugins": ["plugins/markdown"],
	"templates": {
		"cleverLinks": true,
		"monospaceLinks": true
	},
	"opts": {
		"recurse": true,
		"destination": "./documentation/"
	}
}
```

Add the following to your package.json file:

```js
"doc": "jsdoc -c jsdoc.json"
```

After running the command `npm run doc`, the generated documentation will be saved in the `documentation` directory.

---
### Sources

[jsdoc.app](https://jsdoc.app/)

[YT - Documenting Your JavaScript | JSDoc Crash Course](https://www.youtube.com/watch?v=YK-GurROGIg)

[github.com/bradtraversy/jsdoc-examples](https://github.com/bradtraversy/jsdoc-examples)

[YT - JSCast - ep1 - Documenting your javascript code like a pro, setting up JSdoc](https://www.youtube.com/watch?v=Yl6WARA3IhQ)

[Phina Kersly - Documenting JavaScript Code With JSDocs](https://www.section.io/engineering-education/jsdoc-documentation/)