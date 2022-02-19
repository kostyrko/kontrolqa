---
title: PactumJS - wprowadzenie
date: 2022-02-19 18:02:00
category: pactumjs
thumbnail: { thumbnailSrc }
draft: false
---

### Wprowadzenie

### Przygotowanie środowiska

**Założenie wstępne**: node 📂  jest zainstalowany na lokalnej maszynie.

Instalacja PactumJS

    npm i pactum

Instalacja wybranego test runnera **mocha** lub **cucumber**

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

---
### Metody do tworzenia zapytań

### Metody asercji


### Mockowanie serwera

    ```js
    const { mock } = require('pactum');

    mock.addInteraction({
    request: {
        method: 'GET',
        path: '/api/hello'
    },
    response: {
        status: 200,
        body: 'Hello, 👋'
    }
    });

    mock.start(3000);
    ```

---
Źródła: 

[Writing API tests in JavaScript with Pactum](https://www.ontestautomation.com/writing-api-tests-in-javascript-with-pactum/)

[GH - pactumjs/pactum](https://github.com/pactumjs/pactum)

[pactumjs.github.io/pactum-slides/1](https://pactumjs.github.io/pactum-slides/1)

[pactumjs/pactum-examples](https://github.com/pactumjs/pactum-examples)

[https://pactumjs.github.io/#/](https://pactumjs.github.io/#/)