---
title: '🤝 PactumJS - wprowadzenie'
date: 2022-02-19 18:02:00
category: pactumjs
thumbnail: { thumbnailSrc }
draft: false
---

### Wprowadzenie

Jednym z popularniejszych narzędzie to testowania API jest Postman 🚀 📮 i z pewnością jest dobrym wyborem kiedy szukamy rozwiązania posiadającego własne GUI - alternatywą dla takiego rozwiązania są narzędzia, które pozwalają na pisanie testów przy pomocy Pythona ([Requests](https://docs.python-requests.org/en/latest/)) czy JS ([PactumJS](https://pactumjs.com/) czy [SuperTest](https://github.com/visionmedia/supertest)) - poniżej przedstawiony zostanie wstęp do **PactumJS**.

Darmowe strony przydatne do testowania API: 
* [httpbin.org](http://httpbin.org/)
* [jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com/)
* [reqres.in](https://reqres.in/)


### Przygotowanie środowiska

**Założenie wstępne**: node 📂  jest zainstalowany na lokalnej maszynie.

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

Wywołanie testu w terminalu

    npx mocha pactumJSTest.js

Jako test runner może również posłużyć Jest

Instalacja Jest

    npm i jest

[basdijkstra/api-testing-js-pactum (Bas Dijkstra)](https://github.com/basdijkstra/api-testing-js-pactum)
Przygotowanie testu opartego na POST - stworzenie nowego postu (źródło przykładu: )

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
Wywołanie testu

    npx jest


---
### Metody do tworzenia zapytań

`pactum.spec()` - podstawowa metoda do wywoływania testów przy pomocy pactumJS

Podstawowe metody do tworzenia zapytań get/post/put/delete/patch wykorzystujemy poprzez łączenie z główną metodą `pactum.spec()`

```js
await pactum.spec().get('http://domain.com/user');
await pactum.spec().post('http://domain.com/user');
await pactum.spec().put('http://domain.com/user');
await pactum.spec().patch('http://domain.com/user');
await pactum.spec().delete('http://domain.com/user');
```
----
#### Dodatkowe parametry

W celu przesłania dodatkowych parametrów do zapytania, możemy korzystać z przeznaczonych do tego metod (osobno lub poprzez łącznie/łańcuchowanie)


|  |  | 
|---|---|
| `withMethod` | zapytanie z metodą | 
| `withPath` | zapytanie ze ścieżką | 
| `withPathParams` | [zapytanie z parametrem](https://pactumjs.github.io/#/request-making?id=path-params) |
| `withQueryParams` | zapytanie z parametrami zapytania |
| `withHeaders` | zapytanie z headerem |
| `withCookies` | zapytanie z ciasteczkami |
| `withBody` | zapytanie z body (zawartością) |
| `withJson` | zapytanie z wykorzystaniem Jsona |
| `withAuth` | zapytanie z uwierzytelnianiem |

Pełna lista: [pactumjs.github.io/#/request-making?id=spec](https://pactumjs.github.io/#/request-making?id=spec)



---
**Path params** (źródło przykładu: [pactumjs.github.io](https://pactumjs.github.io/#/request-making?id=path-params))

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

**Authentication** (źródło przykładu: [pactumjs.github.io](https://pactumjs.github.io/#/request-making?id=username-amp-password))

```js

await pactum.spec()
  .get('some-url')
  .withAuth('my-username', 'super-secret-password')
  .expectStatus(200);

```



---
### Walidacja zapytań

| | | |
|---|---|---|
| `expect` | _ | podstawowa asercja |
|`expectStatus`|	status	|sprawdza status HTTP|
|`expectHeader`|	header|	sprawdza header HTTP / klucz + wartość|
|`expectHeaderContains`|	headerContains|	sprawdza header HTTP / klucz + częściowy klucz|
|`expectBody`|	body	|sprawdza dokładną zawartość body|
|`expectBodyContains`|	|bodyContains	|sprawdza czy body zawiera wartość|
|`expectJson`|	json	|sprawdza dokładną zawartość obiektu json|
|`expectError`|	error	|sprawdza błędy sieci/odpowiedzi|

Pełna lista: [pactumjs.github.io/#/response-validation](https://pactumjs.github.io/#/response-validation)

**Status & Headers & Response Time** źródło: [pactumjs.github.io](https://pactumjs.github.io/#/response-validation?id=status-amp-headers-amp-response-time)
```js
await pactum.spec()
  .get('https://jsonplaceholder.typicode.com/posts/1')
  .expectStatus(200)
  .expectHeader('content-type', 'application/json; charset=utf-8')
  .expectHeader('connection', /\w+/)
  .expectHeaderContains('content-type', 'application/json')
  .expectResponseTime(100);
```

**expectBody** źródło: [pactumjs.github.io](https://pactumjs.github.io/#/response-validation?id=expectbody)
```js
await pactum.spec()
  .get('api/health')
  .expectStatus(200)
  .expectBody('OK');
```


---
Źródła: 

[GH - pactumjs/pactum](https://github.com/pactumjs/pactum)

[pactumjs.github.io/pactum-slides/1](https://pactumjs.github.io/pactum-slides/1)

[pactumjs/pactum-examples](https://github.com/pactumjs/pactum-examples)

[https://pactumjs.github.io/#/](https://pactumjs.github.io/#/)

[Writing API tests in JavaScript with Pactum by Bas Dijkstra](https://www.ontestautomation.com/writing-api-tests-in-javascript-with-pactum/)

[basdijkstra/api-testing-js-pactum (Bas Dijkstra)](https://github.com/basdijkstra/api-testing-js-pactum)

[API Integration Testing Made Easy](https://dev.to/asaianudeep/api-integration-testing-made-easy-1lcp)

[REST API test automation with PactumJS](https://www.zeljkovic.sh/rest-api-test-automation-with-pactumjs/)

[JavaScript: REST API Automation with PactumJS — Basics](https://asaianudeep.medium.com/javascript-rest-api-automation-with-pactumjs-basics-7247adf5ecf9)

Wybrane zagadnienia z sekcji Q&A - github:

[Save request and response json details in variables](https://github.com/pactumjs/pactum/discussions/81)

[Auth0 authentication](https://github.com/pactumjs/pactum/issues/79)