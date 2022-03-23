---
title: 'Dobre zasady testowania'
date: 2021-06-25 10:00
category: qa
draft: false
---

![](https://static-cms.hotjar.com/documents/conducting-usability-test_yon4BQT.svg)

Niedawno (2021-06-25) odbyła się zdalna konferencja prowadzona przez Applitools oraz Cypress nazwana Front-End Test Fest 2021. Jedeno z wystąpień było poświęcone dobrym praktykom pisania testów (link w źródłach) i dzisiejszy wpis jest ekstraktem z tego wystąpienia

### Główna zasada: testy powinny być proste - "flat test desing"

Pisanie testów nie powinno być realizowane w sposób identyczny jak pisanie kodu, prostota powinna znajdować się na pierwszym miejscu, nawet kosztem powtarzalności kodu. Oznacza to,  że test o ile to możliwe nie powinien korzystać z dodatkowej abstrakcji i cechować się płaskim modelem (bez zagłębień).

### Cel testu powinien być zrozumiały -> "get test instantly"

Opis testu powinien przedstawiać w sposób klarowny jego intencje, aby to było możliwe należy spełnić 3 warunki i opisać:

1) co jest testowane (np. właściwość elementu)

2) w jakich warunkach jest testowane (np. na użytkowania właściwości)

3) jaki jest oczekiwany efekt

### Układ testu - zasada AAA (Arrange, Act, Assert)

-> Arrange = setup scenariusza (zmienne, mockowanie etc.)

-> Act = przeprowadzenie akcji, które prowadzą do końcowego rezultatu

-> Assert = sprawdzanie wykonania się scenariusza

### Niezależność testów

Każdy z testów powinien posiadać własne izolowane środowisko i nie powinien być zależny od wyniku poprzedzającego go testu. Oznacza, to że testy nie powinny być od siebie zależne ani ze sobą powiązane w żaden sposób - środowisko danych powinno być takie samo dla każdego testu.

### Realistyczne dane

Jednym z elementów czytelności testu jest wprowadzanie realistycznych danych (nie bazowanie na tzw. place holderach jak np Foo Bar), w ten sposób można w prostszy sposób zrozumieć powiązanie z testowanym produktem

### Selektory

Nie należy korzystać z selektorów, które mogą ulec zmianie - zamiast tego najlepiej podczepiać się pod właściwości, które są widoczne lub istotne również dla użytkownika (np. poprzez cy.contains()) lub przypisywanie testowych atrybutów typu data do testowanego obiektu (np. data-cy).

### Czekanie...

Zamiast arbitralnie ustalonego czakania na wykonanie się jakiegoś testowego zadania (w dużej mierze będzie to zależne od zapytania HTTP) można ustawić czekanie na pozytywną odpowiedź tego zapytania


        cy.wiat('@request')
            .its('response.statusCode')
            .should('equal', 200);

---
Źródło:

[Front-End Test Fest 2021: Recordings - It's a (Testing) Trap! - Common Testing Pitfalls and How to Solve Them](https://www.youtube.com/watch?v=uvJwWQLaVqU&list=PL8GlT7H3xOcIXrl0nXmyDBYztCKcVqQQg&index=6&ab_channel=Cypress.io)