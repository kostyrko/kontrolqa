---
title: '馃搩 JSDoc'
date: 2022-03-20 10:00
category: js
draft: false
tags: ["java script", "js", "jsdocs", "documentation"]
---

# JSDoc czyli spos贸b na dokumentacj臋 kodu JavaScript - wprowadzenie

Wykorzystanie API JSDoc pozwala na dokumentacj臋 kodu JS w ramach zaproponowanego w 1999 roku schematu - ten zosta艂 powszechnie przyj臋ty oraz do dzi艣 jest z powodzeniem stosowany. Stosowanie si臋 do zaproponowanego schematu pozytywnie wp艂ywa na jej czytelno艣膰. 

W przypadku stosowania IDE typu VSC lub WebStorm oraz innych podobnych stosowanie JSDoc powoduje, 偶e po najechaniu na nazw臋 klasy, metody, zmiennej lub funkcji wy艣wietla si臋 podpowied藕 zawieraj膮ca opis zawarty w pliku JSDoc - co jest znacz膮cym u艂atwieniem dla u偶ytkownika.



G艂贸wny schemat miejsca zapisu informacji na temat sk艂ada si臋 z gwiazdek oraz uko艣nika wstecznego otwieraj膮cego oraz zamykaj膮cego sekcj臋 dokumentacji.

```js
/**
 * Kr贸tki opis funkcji, zmiennej lub klasy itp.
 */
```


---
### Paramtery

JS mo偶e pom贸c w dokumentacji zwyk艂ej zmiennej ze wskazaniem na jej typ np. string, number, boolean, array, object, function, etc.

```js
/**
 * 
 * documentation name
 * @type {string}
 */
const documentationName = "JSDoc";

```
---
Tablica zwieraj膮ce liczby
```js
/**
 * numbers array
 * @type {Array<number>}
 */

const numbers = [1, 2, 3];
```
---
Przyk艂adowa dokumentacja obiektu

```js
/**
 * Droid object
 * @type {{id: number, name: string, class: string}}
 * lub w spos贸b bardziej rozbudowany...
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

Przyk艂adowa dokumentacja funkcji

JSDoc pozwala na dokumentacj臋 parametr贸w wg schematu `@param {type} name - opis`.

```js
/**
 * Opis
 * @param {typ parametru} nazwa parametru - opis
 * @returns {typ zwracanych danych} - opis
 *
 */
```

Przyk艂adowa dokumentacja funkcji

```js
/**
 * function calculating sum of two numbers
 * @param {number} num1 - First number
 * @param {number} num2 - Second number
 * @returns {number} - The sum of two numbers
 */
function sum(num1, num2) {
	return num1 + num2;
}
```


---
Spos贸b na dokumentacj臋 klasy
```js
/**
 * Class to create a user object
 */
class Droid {
	/**
	 * @param {Object} droidInfo  Information about a drodi
	 */
	constructor(userInfo) {
		/**
		 * @property {string} name - droid name
		 */
		this.name = droidInfo.name;

		/**
		 * @property {string} password - User's password
		 */
		this.class = droidInfo.class;
	}

	/**
	 * @property {Function} sayHello - Droid's greeting
	 * @returns void
	 */
	sayHello() {
		console.log(`Hello my name is ${this.name}`);
	}

```

---
### Dokumentacja w postaci HTML oraz JSON

Instalacji biblioteki [`jsdoc`](https://www.npmjs.com/package/jsdoc) w spos贸b globalny lub lokalny oraz jej setup pozwala r贸wnie偶 na automatyczne generowanie dokumentacji w postaci HTML.

```shell
npm install --save-dev jsdoc
```

Konfiguracja JSDoc `jsodc.json` pozwala na wygenerowanie dokumentacji w postaci HTML w katalogu `docs` oraz wygenerowanie dokumentacji w postaci JSON w katalogu `docs/json`.

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

Do package.json dodaj

```js
"doc": "jsdoc -c jsdoc.json"
```

Po wywo艂aniu komendy `npm run doc` wygenerowana dokumentacja zostanie zapisana w katalogu `documentation`.

---
### 殴r贸d艂a

[jsdoc.app](https://jsdoc.app/)

[YT - Documenting Your JavaScript | JSDoc Crash Course](https://www.youtube.com/watch?v=YK-GurROGIg)

[github.com/bradtraversy/jsdoc-examples](https://github.com/bradtraversy/jsdoc-examples)

[YT - JSCast - ep1 - Documenting your javascript code like a pro, setting up JSdoc](https://www.youtube.com/watch?v=Yl6WARA3IhQ)

[Phina Kersly - Documenting JavaScript Code With JSDocs](https://www.section.io/engineering-education/jsdoc-documentation/)