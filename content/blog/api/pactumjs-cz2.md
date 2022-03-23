---
title: '🤝 PactumJS - 2. podejście do testowania API przy pomocy JS'
date: 2022-03-20 18:02:00
category: api
thumbnail: { thumbnailSrc }
tags: ['pactumJS', 'js', 'api testing']
draft: true
---

## Wprowadzenie

Celem poniższego tekstu będzie dalsze przedstawienie możliwości testowania API przy pomocy pactumJS, tym razem bazując na konkretnych przykładach.

dzisiejszy wpis powstał w ramach zasady opisywanej przeze mnie w innym miejscu (patrz: 'Dobre zasady testowania') -> AAA (Arrange, Act, Assert) Organizowanie/Przeprowadzenie/Sprawdzenie.

W ramach pierwszej części zaproponuję znalezienie odpowiedniego API do testowania - korzystając z zasobów opublikowanych na [rapidAPI](https://rapidapi.com/) - przy pomocy tego portalu możemy wyszukać (oraz wykupić dostęp jeśli istnieje taka potrzeba) interesujące nas API przy pomocy, którego możemy stworzyć własną stronę/porta/apkę etc. Plus tego portalu jest taki, że w jednym miejscu grupuje wiele różnych api i w czytelny i zunifikowany sposób przedstawia wgląd w ich dokumentację.

Dużo proponowanych dostępów do API jest freemium, tzn mają ograniczenia w ilości requestów, które można wykonać w sposób darmowy. Na potrzeby moich ćwiczeń wykorzystam api portalu [imgur.com/](https://imgur.com/) - w darmowej opcji pozwala na 100k requestów miesięcznie + posiada requesty typu GET/PUT/POST/DELETE - ze względu na to, że aby skorzystać nawet z darmowej opcji należy podać dane karty postanowiłem ostatecznie wykorzystać informacje znajdujące się na stronie [apidocs.imgur.com](https://apidocs.imgur.com/) tzn u samego źródła, gdzie API jest dobrze udokumentowane (przygotowana jest nawet kolekcja w Postmanie).

## 1. Autoryzacja

Po utworzeniu konta na imgur należy zerejestrować aplikacjię odwiedzając stronę [api.imgur.com/oauth2/addclient](https://api.imgur.com/oauth2/addclient) i wypełnić formularz (na początek wybrałem opcję "OAuth 2 authorization without a callback URL"). Należy zapisać Client ID oraz Client Secret (ja takie rzeczy przechowuje w Bitwarenie w ramach aplikacji w pliku .env).
Wgląd w opcje "zarejestrowanej aplikacji" mamy dostęp pod tym linkiem [imgur.com/account/settings/apps](https://imgur.com/account/settings/apps)

[apidocs.imgur.com/#authorization-and-oauth](https://apidocs.imgur.com/#authorization-and-oauth)

### Access token i Postman

Imgur bazuje na autoryzacji typu OAuth2 - niestety w tym momencie w sieci brak patentów poradzenie sobie z tego typu autoryzacją z poziomu pactumJS. W przyszłości być może zastosowanie osobnej biblioteki do tego być może okazać się pomocne -> np. [simple-oauth2](https://www.npmjs.com/package/simple-oauth2)  🧐 🤔 - sprawa do przemyślenia i zbadania. / Na szybko znalazłem taki przykład testu w sieci [github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/simple-oauth2/simple-oauth2-tests.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/simple-oauth2/simple-oauth2-tests.ts).

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

(źródło grafiki: [The OAuth 2.0 Authorization Framework](https://datatracker.ietf.org/doc/html/rfc6749))

W przypadku autoryzacji typu OAuth sprawa wydaje się być prostsza i przykłady jej zastosowania w sieci są obecne i możliwe do znalezienia np. [www.zeljkovic.sh - REST API test automation with PactumJS](https://www.zeljkovic.sh/rest-api-test-automation-with-pactumjs/), - być może serwis flickr'a dostarcza odpowiednie API do przetestowania tego procesu [https://www.flickr.com/services/api/auth.oauth.html](https://www.flickr.com/services/api/auth.oauth.html#request_token)

W obecnym przypadku wykorzystamy Postmana oraz opisane kroki na str [apidocs.imgur.com/#authorization-and-oauth](https://apidocs.imgur.com/#authorization-and-oauth) w celu uzyskania tokenu, a następnie posłużymy się nim do stworzenia testów. (Być może skorzystanie z tego api za pośrednictwem serwisu rapidApi spowodowało by że ten problem by zniknął)

---

AAA (Arrange, Act, Assert) Organizowanie/Przeprowadzenie/Sprawdzenie - po raz kolejny, tym razem w przypadku stworzenia testów API 😉

Organizowanie - wysłanie zapytania, przygotowanie headerów, body itp. dążącego do wywołania konkretnego stanu (przeprowadzenie) oraz przy pomocy asercji sprawdzenie czy otrzymane dane są przedstawiają oczekiwany stan.


`inspect()` łączy się z get w celu wyświetlenia danych w konsoli

---

Źródła:

[Save request and response json details in variables](https://github.com/pactumjs/pactum/discussions/81)

[Auth0 authentication](https://github.com/pactumjs/pactum/issues/79)

[Testing OAuth2 Authorization Flow with Postman (Authorization Code Grant)](https://www.youtube.com/watch?v=NRU_KdUSjD4)

[Using REST-assured to Test OAuth 2.0 flow Examples](https://devqa.io/rest-assured-oauth2-workflow-examples/)