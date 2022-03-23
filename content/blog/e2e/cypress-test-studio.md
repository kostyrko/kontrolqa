---
title: '🌲 Cypress - test studio'
date: 2022-02-09 13:00
category: e2e
thumbnail: { thumbnailSrc }
tags: ["cypress", "test studio", "experimental"]
draft: false
---


## Wprowadzenie

**Cypress Test Studio** - jest narzędziem (w wersji Beta w momencie pisania tego artykułu) pozwalającym na tworzenie testów w Cypressie (tryb Open) bez pisania kodu... Ponieważ ta funkcjonalność jest jedynie w wersji beta jest ograniczona do zaledwie paru funkcji (check, select,click,type,uncheck) oraz ograniczonej liczby asercji.

Do czego oraz dla kogo zatem może być przydatne Cypress Studio

* dla osób zaczynających przygodę z Cypressem/testami e2e
* do stworzenie  w szybki sposób jednorazowego testu pre-MVP
* do ćwiczenia oraz zapoznania się ze składnią JS/Cypress osób, które do tej pory nie miały do tej pory styczności z Cypressem i nie posiadają wiedzy na temat JS

Z pewności na tym etapie rozwoju **Cypress Test Studio** NIE będzie przydatne do
* tworzenia testów długoterminowych lub wielokrotnego użytku

---
## Użytkowanie


Instalujemy Cypressa

```shell
npm i cypress
```

Konfigurowaniu możliwość korzystania z **Cypress Test Studio** w pliku **cypress.json** 

```js
{
    "experimentalStudio": true
}
```

Tworzymy plik w folderze integrations np. `/cypress/integration/sample_spec.js`

oraz wypełniamy go podstawowym kodem następnie odnajdujemy nasz test w Cypress test runnerze i włączamy go

```js
describe('example to-do app', () => {
    it('should add a todo', () => {
        cy.visit('https://www.saucedemo.com/')

    })
})
```


Gdy włączymy wstępnie napisany przez nas test - w prawym górnym roku lewego docku z testami znajdziemy ikonę różdżki (tool tip: Add Commands to Test).

Po jej wciśnięciu przechodzimy do tryby **studio**


Teraz gdy klikamy w prawym oknie (przeglądarka), zauważymy że w lewym docku gdzie znajdują się testy pojawiają się nowe komendy pod nagłówkiem "Studio Commands" - to pozwala nam na uzupełnienie testu o kolejne komendy. 


Po kliknięciu prawym klawiszem myszy w dane pole powinno rozwinąć się menu, które pozwoli nam na dodanie podstawowej asercji.


Po uzupełnieniu treści testu należy kliknąć **Save commands** (button).


Test się wykona a w kodzie naszego tekstu pojawi nowe komendy oznaczone **Generated with Cypress Studio** - te mogą stać się dobrym punktem wyjścia do dalszego ulepszenia testu.



źródła/materiały

[cypress.io/cypress-studio](https://docs.cypress.io/guides/core-concepts/cypress-studio#Overview)

[Introducing Cypress Studio - E2E web application testing](https://www.youtube.com/watch?v=ado-aAAFe2o&ab_channel=BasaratCodes)

[Recording a Cypress Test with Cypress Studio](https://dev.to/leading-edje/record-a-cypress-test-with-cypress-studio-4npk)