---
title: '馃 PactumJS - wprowadzenie'
date: 2022-02-19 18:02:00
category: api
thumbnail: { thumbnailSrc }
tags: ["pactumJS", "js", "api testing"]
draft: false
---

### Wprowadzenie

Jednym z popularniejszych narz臋dzie to testowania API jest Postman 馃殌 馃摦 i z pewno艣ci膮 jest dobrym wyborem kiedy szukamy rozwi膮zania posiadaj膮cego w艂asne GUI - alternatyw膮 dla takiego rozwi膮zania s膮 narz臋dzia, kt贸re pozwalaj膮 na pisanie test贸w przy pomocy Pythona ([Requests](https://docs.python-requests.org/en/latest/)) czy JS ([PactumJS](https://pactumjs.com/) / [SuperTest](https://github.com/visionmedia/supertest) / [Frisby.js](https://docs.frisbyjs.com/) / [Chakram](http://dareid.github.io/chakram/)) - na tym tle najlepiej zdaje si臋 wypada膰 **PactumJS** (patrz por贸wnanie -> [API Testing Tools in JavaScript](https://dev.to/asaianudeep/api-testing-tools-in-javascript-22d8)) i to w艂a艣nie tej bibliotece po艣wi臋ci艂em swoj膮 uwag臋.

Darmowe strony przydatne do testowania API: 
* [httpbin.org](http://httpbin.org/)
* [jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com/)
* [reqres.in](https://reqres.in/)


### Przygotowanie 艣rodowiska

**Za艂o偶enie wst臋pne**: `node.js` 馃搨  jest zainstalowany na lokalnej maszynie.

Instalacja PactumJS

    npm i pactum

Instalacja wybranego test runnera **mocha** albo **cucumber**

    npm i mocha
    # lub
    npm i @cucumber/cucumber

Stworzenie 1 testu

```js
const { spec } = require("pactum");

it("should yield HTTP status code 200", async () => {
    await
    spec()
    .get("http://jsonplaceholder.typicode.com/users/1")
    .expectStatus(200);
})
```

Wywo艂anie testu w terminalu

    npx mocha pactumJSTest.js

Jako test runner mo偶e r贸wnie偶 pos艂u偶y膰 Jest

Instalacja Jest

    npm i jest

[basdijkstra/api-testing-js-pactum (Bas Dijkstra)](https://github.com/basdijkstra/api-testing-js-pactum)
Przygotowanie testu opartego na POST - stworzenie nowego postu (藕r贸d艂o przyk艂adu: )

```JS
// userdata.test.js
const pactum = require('pactum');


describe('Posting a new post item', () => {

    test('should yield HTTP status code 201', async () => {

        let new_post = {
            "title": "My awesome new post title",
            "body": "My awesome new post body",
            "userId": 1
        }

        await pactum.spec()
            .post('http://jsonplaceholder.typicode.com/posts')
            .withJson(new_post)
            .expectStatus(201)
    });
});
```
Wywo艂anie testu

    npx jest


---
### Metody do tworzenia zapyta艅

`pactum.spec()` - podstawowa metoda do wywo艂ywania test贸w przy pomocy pactumJS

Podstawowe metody do tworzenia zapyta艅 get/post/put/delete/patch wykorzystujemy poprzez 艂膮czenie z g艂贸wn膮 metod膮 `pactum.spec()`

```js
await pactum.spec().get('http://domain.com/user');
await pactum.spec().post('http://domain.com/user');
await pactum.spec().put('http://domain.com/user');
await pactum.spec().patch('http://domain.com/user');
await pactum.spec().delete('http://domain.com/user');
```
----
#### Dodatkowe parametry

W celu przes艂ania dodatkowych parametr贸w do zapytania, mo偶emy korzysta膰 z przeznaczonych do tego metod (osobno lub poprzez 艂膮cznie/艂a艅cuchowanie)


|  |  | 
|---|---|
| `withMethod` | zapytanie z metod膮 | 
| `withPath` | zapytanie ze 艣cie偶k膮 | 
| `withPathParams` | [zapytanie z parametrem](https://pactumjs.github.io/#/request-making?id=path-params) |
| `withQueryParams` | zapytanie z parametrami zapytania |
| `withHeaders` | zapytanie z headerem |
| `withCookies` | zapytanie z ciasteczkami |
| `withBody` | zapytanie z body (zawarto艣ci膮) |
| `withJson` | zapytanie z wykorzystaniem Jsona |
| `withAuth` | zapytanie z uwierzytelnianiem |

Pe艂na lista: [pactumjs.github.io/#/request-making?id=spec](https://pactumjs.github.io/#/request-making?id=spec)



---
**Path params** (藕r贸d艂o przyk艂adu: [pactumjs.github.io](https://pactumjs.github.io/#/request-making?id=path-params))

```js

await pactum.spec()
  .get('/api/project/{project}/repo/{repo}')  // dynamic url
  .withPathParams('project', 'project-name')  // key-value pair
  .withPathParams({
    'repo': 'repo-name'                       // object
  })
  .expectStatus(200);

//  The above would result in a url like - /api/project/project-name/repo/repo-name
```

**Authentication** (藕r贸d艂o przyk艂adu: [pactumjs.github.io](https://pactumjs.github.io/#/request-making?id=username-amp-password))

```js

await pactum.spec()
  .get('some-url')
  .withAuth('my-username', 'super-secret-password')
  .expectStatus(200);

```



---
### Walidacja zapyta艅

| | | |
|---|---|---|
| `expect` | _ | podstawowa asercja |
|`expectStatus`|	status	|sprawdza status HTTP|
|`expectHeader`|	header|	sprawdza header HTTP / klucz + warto艣膰|
|`expectHeaderContains`|	headerContains|	sprawdza header HTTP / klucz + cz臋艣ciowy klucz|
|`expectBody`|	body	|sprawdza dok艂adn膮 zawarto艣膰 body|
|`expectBodyContains`|	|bodyContains	|sprawdza czy body zawiera warto艣膰|
|`expectJson`|	json	|sprawdza dok艂adn膮 zawarto艣膰 obiektu json|
|`expectError`|	error	|sprawdza b艂臋dy sieci/odpowiedzi|

Pe艂na lista: [pactumjs.github.io/#/response-validation](https://pactumjs.github.io/#/response-validation)

**Status & Headers & Response Time** 藕r贸d艂o: [pactumjs.github.io](https://pactumjs.github.io/#/response-validation?id=status-amp-headers-amp-response-time)
```js
await pactum.spec()
  .get('https://jsonplaceholder.typicode.com/posts/1')
  .expectStatus(200)
  .expectHeader('content-type', 'application/json; charset=utf-8')
  .expectHeader('connection', /\w+/)
  .expectHeaderContains('content-type', 'application/json')
  .expectResponseTime(100);
```

**expectBody** 藕r贸d艂o: [pactumjs.github.io](https://pactumjs.github.io/#/response-validation?id=expectbody)
```js
await pactum.spec()
  .get('api/health')
  .expectStatus(200)
  .expectBody('OK');
```


---
殴r贸d艂a: 

[GH - pactumjs/pactum](https://github.com/pactumjs/pactum)

[pactumjs.github.io/pactum-slides/1](https://pactumjs.github.io/pactum-slides/1)

[pactumjs/pactum-examples](https://github.com/pactumjs/pactum-examples)

[https://pactumjs.github.io/#/](https://pactumjs.github.io/#/)

[Writing API tests in JavaScript with Pactum by Bas Dijkstra](https://www.ontestautomation.com/writing-api-tests-in-javascript-with-pactum/)

[basdijkstra/api-testing-js-pactum (Bas Dijkstra)](https://github.com/basdijkstra/api-testing-js-pactum)

[API Integration Testing Made Easy](https://dev.to/asaianudeep/api-integration-testing-made-easy-1lcp)

[REST API test automation with PactumJS](https://www.zeljkovic.sh/rest-api-test-automation-with-pactumjs/)

[JavaScript: REST API Automation with PactumJS 鈥? Basics](https://asaianudeep.medium.com/javascript-rest-api-automation-with-pactumjs-basics-7247adf5ecf9)

[API Testing Tools in JavaScript](https://dev.to/asaianudeep/api-testing-tools-in-javascript-22d8)
