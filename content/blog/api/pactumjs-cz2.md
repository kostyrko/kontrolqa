---
title: '🤝 PactumJS - 2. podejście do testowania API przy pomocy JS'
date: 2022-03-20 18:02:00
category: api
thumbnail: { thumbnailSrc }
tags: ['pactumJS', 'js', 'api testing']
draft: true
lang: 'en'
---

## Introduction

The aim of this text is to further explore the capabilities of API testing using PactumJS, this time based on specific examples.

Today's post was created following the principle described by me elsewhere (see: 'Good Testing Practices') -> AAA (Arrange, Act, Assert) Organize/Act/Assert.

In the first part, I will suggest finding a suitable API for testing, using the resources available on [rapidAPI](https://rapidapi.com/). Through this platform, we can search for (and purchase access if needed) APIs that interest us and can be used to create our own website, portal, app, etc. The advantage of this platform is that it brings together many different APIs in one place and presents their documentation in a clear and unified way.

Many of the proposed API accesses are freemium, meaning they have limitations on the number of requests that can be made for free. For the purpose of my exercises, I will use the API of [imgur.com/](https://imgur.com/), which, in the free option, allows for 100k requests per month and supports GET/PUT/POST/DELETE requests. However, to even use the free option, you need to provide credit card information. Therefore, I ultimately decided to utilize the information available on the [apidocs.imgur.com](https://apidocs.imgur.com/) website, which is the official source and provides well-documented API information (there is even a Postman collection prepared).

## 1. Authorization

After creating an account on imgur, you need to register an application by visiting the [api.imgur.com/oauth2/addclient](https://api.imgur.com/oauth2/addclient) page and filling out the form (for starters, I chose the "OAuth 2 authorization without a callback URL" option). Make sure to save the Client ID and Client Secret (I store such information securely, for example in a .env file using Bitwarden as part of my application).
You can access the options for your "registered application" at this link: [imgur.com/account/settings/apps](https://imgur.com/account/settings/apps)

[apidocs.imgur.com/#authorization-and-oauth](https://apidocs.imgur.com/#authorization-and-oauth)

### Access Token and Postman

Imgur uses OAuth2 authorization. Unfortunately, there is currently no built-in support for handling this type of authorization in pactumJS. In the future, using a separate library for this purpose may be helpful, such as [simple-oauth2](https://www.npmjs.com/package/simple-oauth2) 🧐 🤔 - this is something to consider and investigate. / I quickly found an example test using simple-oauth2 on [github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/simple-oauth2/simple-oauth2-tests.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/simple-oauth2/simple-oauth2-tests.ts).

```
     +----------+
     | Resource |
     |   Owner  |
     |          |
     +----------+
          ^
          |
         (B)
     +----|-----+          Client Identifier      +---------------+
     |         -+----(A)-- & Redirection URI ---->|               |
     |  User-   |                                 | Authorization |
     |  Agent  -+----(B)-- User authenticates --->|     Server    |
     |          |                                 |               |
     |         -+----(C)-- Authorization Code ---<|               |
     +-|----|---+                                 +---------------+
       |    |                                         ^      v
      (A)  (C)                                        |      |
       |    |                                         |      |
       ^    v                                         |      |
     +---------+                                      |      |
     |         |>---(D)-- Authorization Code ---------'      |
     |  Client |          & Redirection URI                  |
     |         |                                             |
     |         |<---(E)----- Access Token -------------------'
     +---------+       (w/ Optional Refresh Token)

   Note: The lines illustrating steps (A), (B), and (C) are broken into
   two parts as they pass through the user-agent.

                     Figure 3: Authorization Code Flow

```

(source: [The OAuth 2.0 Authorization Framework](https://datatracker.ietf.org/doc/html/rfc6749))

When it comes to OAuth authorization, the matter seems to be simpler, and examples of its usage can be found online, such as [www.zeljkovic.sh - REST API test automation with PactumJS](https://www.zeljkovic.sh/rest-api-test-automation-with-pactumjs/). Perhaps the Flickr service provides appropriate APIs for testing this process [https://www.flickr.com/services/api/auth.oauth.html](https://www.flickr.com/services/api/auth.oauth.html#request_token).

In the current case, we will use Postman and follow the steps described on [apidocs.imgur.com/#authorization-and-oauth](https://apidocs.imgur.com/#authorization-and-oauth) to obtain a token, and then use that token to create tests. (Using this API through the RapidAPI service might solve this problem.)

---

AAA (Arrange, Act, Assert) - Organize, Act, Assert - once again, this time in the context of creating API tests 😉

Organize - send a request, prepare headers, body, etc., to achieve a specific state (Act), and then use assertions to verify if the received data represents the expected state (Assert).

`inspect()` is used with `get` to display data in the console.

---

Source:

[Save request and response json details in variables](https://github.com/pactumjs/pactum/discussions/81)

[Auth0 authentication](https://github.com/pactumjs/pactum/issues/79)

[Testing OAuth2 Authorization Flow with Postman (Authorization Code Grant)](https://www.youtube.com/watch?v=NRU_KdUSjD4)

[Using REST-assured to Test OAuth 2.0 flow Examples](https://devqa.io/rest-assured-oauth2-workflow-examples/)

[Writing API tests with PactumJS and Jest](https://www.testingwithmarie.com/post/writing-api-tests-with-pactumjs-and-jest)
