---
title: '馃尣 Cypress - test studio'
date: 2022-02-09 13:00
category: e2e
thumbnail: { thumbnailSrc }
tags: ["cypress", "test studio", "experimental"]
draft: false
---


## Wprowadzenie

**Cypress Test Studio** - jest narz臋dziem (w wersji Beta w momencie pisania tego artyku艂u) pozwalaj膮cym na tworzenie test贸w w Cypressie (tryb Open) bez pisania kodu... Poniewa偶 ta funkcjonalno艣膰 jest jedynie w wersji beta jest ograniczona do zaledwie paru funkcji (check, select,click,type,uncheck) oraz ograniczonej liczby asercji.

Do czego oraz dla kogo zatem mo偶e by膰 przydatne Cypress Studio

* dla os贸b zaczynaj膮cych przygod臋 z Cypressem/testami e2e
* do stworzenie  w szybki spos贸b jednorazowego testu pre-MVP
* do 膰wiczenia oraz zapoznania si臋 ze sk艂adni膮 JS/Cypress os贸b, kt贸re do tej pory nie mia艂y do tej pory styczno艣ci z Cypressem i nie posiadaj膮 wiedzy na temat JS

Z pewno艣ci na tym etapie rozwoju **Cypress Test Studio** NIE b臋dzie przydatne do
* tworzenia test贸w d艂ugoterminowych lub wielokrotnego u偶ytku

---
## U偶ytkowanie


Instalujemy Cypressa

```shell
npm i cypress
```

Konfigurowaniu mo偶liwo艣膰 korzystania z **Cypress Test Studio** w pliku **cypress.json** 

```js
{
    "experimentalStudio": true
}
```

Tworzymy plik w folderze integrations np. `/cypress/integration/sample_spec.js`

oraz wype艂niamy go podstawowym kodem nast臋pnie odnajdujemy nasz test w Cypress test runnerze i w艂膮czamy go

```js
describe('example to-do app', () => {
    it('should add a todo', () => {
        cy.visit('https://www.saucedemo.com/')

    })
})
```


Gdy w艂膮czymy wst臋pnie napisany przez nas test - w prawym g贸rnym roku lewego docku z testami znajdziemy ikon臋 r贸偶d偶ki (tool tip: Add Commands to Test).

Po jej wci艣ni臋ciu przechodzimy do tryby **studio**


Teraz gdy klikamy w prawym oknie (przegl膮darka), zauwa偶ymy 偶e w lewym docku gdzie znajduj膮 si臋 testy pojawiaj膮 si臋 nowe komendy pod nag艂贸wkiem "Studio Commands" - to pozwala nam na uzupe艂nienie testu o kolejne komendy. 


Po klikni臋ciu prawym klawiszem myszy w dane pole powinno rozwin膮膰 si臋 menu, kt贸re pozwoli nam na dodanie podstawowej asercji.


Po uzupe艂nieniu tre艣ci testu nale偶y klikn膮膰 **Save commands** (button).


Test si臋 wykona a w kodzie naszego tekstu pojawi nowe komendy oznaczone **Generated with Cypress Studio** - te mog膮 sta膰 si臋 dobrym punktem wyj艣cia do dalszego ulepszenia testu.



藕r贸d艂a/materia艂y

[cypress.io/cypress-studio](https://docs.cypress.io/guides/core-concepts/cypress-studio#Overview)

[Introducing Cypress Studio - E2E web application testing](https://www.youtube.com/watch?v=ado-aAAFe2o&ab_channel=BasaratCodes)

[Recording a Cypress Test with Cypress Studio](https://dev.to/leading-edje/record-a-cypress-test-with-cypress-studio-4npk)