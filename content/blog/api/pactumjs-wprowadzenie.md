---
title: '🤝 PactumJS - introduction'
date: 2022-02-19 18:02:00
category: api
thumbnail: { thumbnailSrc }
tags: ["pactumJS", "js", "api testing"]
draft: false
lang: 'en'
---

### Introduction

One of the most popular tools for API testing is Postman 🚀 📮, and it is certainly a good choice when looking for a solution with its own GUI. An alternative to such a solution is tools that allow writing tests using Python ([Requests](https://docs.python-requests.org/en/latest/)) or JavaScript ([PactumJS](https://pactumjs.com/) / [SuperTest](https://github.com/visionmedia/supertest) / [Frisby.js](https://docs.frisbyjs.com/) / [Chakram](http://dareid.github.io/chakram/)). Among them, **PactumJS** seems to be the most promising (see comparison -> [API Testing Tools in JavaScript](https://dev.to/asaianudeep/api-testing-tools-in-javascript-22d8)), and it is this library that I have focused my attention on.

Useful free websites for API testing:
- [httpbin.org](http://httpbin.org/)
- [jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com/)
- [reqres.in](https://reqres.in/)

### Environment Setup

**Prerequisite**: `node.js` 📂 is installed on the local machine.

Installing PactumJS

```bash
npm install pactum
```

Installing the chosen test runner, either **Mocha** or **Cucumber**

```bash
npm install mocha
# or
npm install @cucumber/cucumber
```

Creating a Test

```javascript
const { spec } = require("pactum");

it("should yield HTTP status code 200", async () => {
    await spec()
        .get("http://jsonplaceholder.typicode.com/users/1")
        .expectStatus(200);
});
```



### Running the Test in the Terminal

```bash
npx mocha pactumJSTest.js
```

Jest can also be used as the test runner.

Installing Jest:

```bash
npm install jest
```

[basdijkstra/api-testing-js-pactum (Bas Dijkstra)](https://github.com/basdijkstra/api-testing-js-pactum)

Preparing a POST-based test - Creating a new post (example source: )

```javascript
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

Running the test:

```bash
npx jest
```

### Request Creation Methods

`pactum.spec()` - The basic method for making requests using PactumJS.

The basic methods for creating requests (GET/POST/PUT/DELETE/PATCH) are used by combining them with the main `pactum.spec()` method.

```javascript
await pactum.spec().get('http://domain.com/user');
await pactum.spec().post('http://domain.com/user');
await pactum.spec().put('http://domain.com/user');
await pactum.spec().patch('http://domain.com/user');
await pactum.spec().delete('http://domain.com/user');
```

#### Additional Parameters

To pass additional parameters to the request, you can use the dedicated methods separately or chain them together.

| Method | Description |
|--------|-------------|
| `withMethod` | Sets the request method |
| `withPath` | Sets the request path |
| `withPathParams` | Sets the path parameters |
| `withQueryParams` | Sets the query parameters |
| `withHeaders` | Sets the request headers |
| `withCookies` | Sets the request cookies |
| `withBody` | Sets the request body |
| `withJson` | Sets the request body as JSON |
| `withAuth` | Sets the request authentication |

Full list: [pactumjs.github.io/#/request-making?id=spec](https://pactumjs.github.io/#/request-making?id=spec)

---

**Path Params** (example source: [pactumjs.github.io](https://pactumjs.github.io/#/request-making?id=path-params))

```javascript
await pactum.spec()
  .get('/api/project/{project}/repo/{repo}')  // dynamic url
  .withPathParams('project', 'project-name')  // key-value pair
  .withPathParams({
    'repo': 'repo-name'                       // object
  })
  .expectStatus(200);

// The above would result in a URL like - /api/project/project-name/repo/repo-name
```

**Authentication** (example source: [pactumjs.github.io](https://pactumjs.github.io/#/request-making?id=username-amp-password))

```javascript
await pactum.spec()
  .get('some-url')
  .withAuth('my-username', 'super-secret-password')
  .expectStatus(200);
```

---
### Request Validation

| Command | Alias | Description |
|---------|-------|-------------|
| `expect` | - | basic assertion |
| `expectStatus` | status | checks the HTTP status |
| `expectHeader` | header | checks the HTTP header / key + value |
| `expectHeaderContains` | headerContains | checks the HTTP header / key + partial value |
| `expectBody` | body | checks the exact body content |
| `expectBodyContains` | - | bodyContains | checks if the body contains a value |
| `expectJson` | json | checks the exact JSON object content |
| `expectError` | error | checks for network errors/response errors |

Full list: [pactumjs.github.io/#/response-validation](https://pactumjs.github.io/#/response-validation)

**Status & Headers & Response Time** Source: [pactumjs.github.io](https://pactumjs.github.io/#/response-validation?id=status-amp-headers-amp-response-time)
```js
await pactum.spec()
  .get('https://jsonplaceholder.typicode.com/posts/1')
  .expectStatus(200)
  .expectHeader('content-type', 'application/json; charset=utf-8')
  .expectHeader('connection', /\w+/)
  .expectHeaderContains('content-type', 'application/json')
  .expectResponseTime(100);
```

**expectBody** Source: [pactumjs.github.io](https://pactumjs.github.io/#/response-validation?id=expectbody)
```js
await pactum.spec()
  .get('api/health')
  .expectStatus(200)
  .expectBody('OK');
```

---
Sources: 

[GH - pactumjs/pactum](https://github.com/pactumjs/pactum)

[pactumjs.github.io/pactum-slides/1](https://pactumjs.github.io/pactum-slides/1)

[pactumjs/pactum-examples](https://github.com/pactumjs/pactum-examples)

[https://pactumjs.github.io/#/](https://pactumjs.github.io/#/)

[Writing API tests in JavaScript with Pactum by Bas Dijkstra](https://www.ontestautomation.com/writing-api-tests-in-javascript-with-pactum/)

[basdijkstra/api-testing-js-pactum (Bas Dijkstra)](https://github.com/basdijkstra/api-testing-js-pactum)

[API Integration Testing Made Easy](https://dev.to/asaianudeep/api-integration-testing-made-easy-1lcp)

[REST API test automation with PactumJS](https://www.zeljkovic.sh/rest-api-test-automation-with-pactumjs/)

[JavaScript: REST API Automation with PactumJS — Basics](https://asaianudeep.medium.com/javascript-rest-api-automation-with-pactumjs-basics-7247adf5ecf9)

[API Testing Tools in JavaScript](https://dev.to/asaianudeep/api-testing-tools-in-javascript-22d8)
