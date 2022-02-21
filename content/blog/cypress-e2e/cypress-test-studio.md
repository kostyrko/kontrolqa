---
title: '🌲 Cypress - test studio'
date: 2022-02-09 13:00
category: cypress
thumbnail: { thumbnailSrc }
draft: false
---

![](https://docs.cypress.io/_nuxt/img/add-test-save-test.f776eb3.png)

## Cypress Test studio

**Cypress Test Studio** - jest narzędziem (w wersji Beta w momencie pisania tego artykułu) pozwalającym na tworzenie testów w Cypressie (tryb Open) bez pisania kodu... Ponieważ ta funkcjonalność jest jedynie w wersji beta jest ograniczona do zaledwie paru funkcji (check, select,click,type,uncheck - ).

Po skonfigurowaniu właściwości **Cypress Test Studio** w pliku **cypress.json** 

```js
    {
            "experimentalStudio": true
    }
```

![Add-command-to-test](https://docs.cypress.io/_nuxt/img/extend-activate-studio.91d9bd8.png)

Gdy włączymy wstępnie napisany przez nas test - w prawym górnym roku lewego docku z testami znajdziemy ikonę różdżki (tool tip: Add Commands to Test), po jej wciśnięciu przechodzimy do tryby **studio** - teraz gdy klikamy w prawym oknie (przeglądarka), zauważymy że w lewym docku gdzie znajdują się testy pojawiają się nowe komendy pod nagłówkiem "Studio Commands" - to pozwala nam na uzupełnienie testu o kolejne komendy. Po uzupełnieniu treści testu należy kliknąc **Save commands** (button) - test się wykona a w kodzie naszego tekstu pojawi nowe komendy oznaczone **Generated with Cypress Studio** - które mogą stać się dobrym punktem wyjścia do dalszego ulepszenia testu.


źródła/materiały

[cypress.io/cypress-studio](https://docs.cypress.io/guides/core-concepts/cypress-studio#Overview)

[Introducing Cypress Studio - E2E web application testing](https://www.youtube.com/watch?v=ado-aAAFe2o&ab_channel=BasaratCodes)