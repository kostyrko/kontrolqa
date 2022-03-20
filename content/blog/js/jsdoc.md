---
title: '📃 JSDoc'
date: 2022-03-20 10:00
category: js
draft: false
tags: ["java script", "js", "jsdocs", "documentation"]
---

# JSDoc czyli sposób na dokumentację kodu JavaScript - wprowadzenie

Wykorzystanie API JSDoc pozwala na dokumentację kodu JS w ramach zaproponowanego w 1999 roku schematu - ten został powszechnie przyjęty oraz do dziś jest z powodzeniem stosowany. Stosowanie się do zaproponowanego schematu pozytywnie wpływa na jej czytelność. 

W przypadku stosowania IDE typu VSC lub WebStorm oraz innych podobnych stosowanie JSDoc powoduje, że po najechaniu na nazwę klasy, metody, zmiennej lub funkcji wyświetla się podpowiedź zawierająca opis zawarty w pliku JSDoc - co jest znaczącym ułatwieniem dla użytkownika.



Główny schemat miejsca zapisu informacji na temat składa się z gwiazdek oraz ukośnika wstecznego otwierającego oraz zamykającego sekcję dokumentacji.

```js
/**
 * Krótki opis funkcji, zmiennej lub klasy itp.
 */
```


---
### Paramtery

JS może pomóc w dokumentacji zwykłej zmiennej ze wskazaniem na jej typ np. string, number, boolean, array, object, function, etc.

```js
/**
 * 
 * documentation name
 * @type {string}
 */
const documentationName = "JSDoc";

```
---
Tablica zwierające liczby
```js
/**
 * numbers array
 * @type {Array<number>}
 */

const numbers = [1, 2, 3];
```
---
Przykładowa dokumentacja obiektu

```js
/**
 * Droid object
 * @type {{id: number, name: string, class: string}}
 * lub w sposób bardziej rozbudowany...
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

Przykładowa dokumentacja funkcji

JSDoc pozwala na dokumentację parametrów wg schematu `@param {type} name - opis`.

```js
/**
 * Opis
 * @param {typ parametru} nazwa parametru - opis
 * @returns {typ zwracanych danych} - opis
 *
 */
```

Przykładowa dokumentacja funkcji

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
Sposób na dokumentację klasy
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

Instalacji biblioteki [`jsdoc`](https://www.npmjs.com/package/jsdoc) w sposób globalny lub lokalny oraz jej setup pozwala również na automatyczne generowanie dokumentacji w postaci HTML.

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

Po wywołaniu komendy `npm run doc` wygenerowana dokumentacja zostanie zapisana w katalogu `documentation`.

---
### Źródła

[jsdoc.app](https://jsdoc.app/)

[YT - Documenting Your JavaScript | JSDoc Crash Course](https://www.youtube.com/watch?v=YK-GurROGIg)

[github.com/bradtraversy/jsdoc-examples](https://github.com/bradtraversy/jsdoc-examples)

[YT - JSCast - ep1 - Documenting your javascript code like a pro, setting up JSdoc](https://www.youtube.com/watch?v=Yl6WARA3IhQ)

[Phina Kersly - Documenting JavaScript Code With JSDocs](https://www.section.io/engineering-education/jsdoc-documentation/)