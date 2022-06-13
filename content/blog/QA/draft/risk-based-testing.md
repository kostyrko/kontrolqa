---
title: 'Risk based testing - testowanie bazujące na ocenie ryzyka'
date: 2022-03-26 10:00
category: qa
draft: true
---
Risk-Based Testing (RBT) - Testowanie bazujące na ocenie ryzyku oznacza zarządzanie, priorytetyzowanie oraz wykonywanie testów mając na uwadze ryzyko ich wystąpienia oraz wpływie na pracę całości lub części systemu/aplikacji.

Oznacza to również, że jesteśmy świadomi tego, że użytkownik może natknąć się na błąd 🐛 w aplikacji, ale ten w żadnym przypadku nie przeszkodzi mu w dalszym jej użytkowaniu oraz nie będzie on miał negatywnego wpływu na biznesową funkcjonalność aplikacji. 

Zalecane jest przyjęcie tej strategii testowani/pokrywania aplikacji testami w momencie kiedy:
Kryterium znaczenia:
- testowania aplikacji w której jej poszczególne części są obarczone wyjątkowo wysokim ryzykiem (wówczas te zyskują wysoki priorytet i wymagają wiele uwagi) np. aplikacje bankowe, aplikacje związane z zarządzaniem zdrowiem.
Kryterium czas:
- testowanie może stać się swego rodzaju wąskim gardłem w trakcie wypuszczania nowych wersji aplikacji (regresja zajmuje wiele czasu), które regularnie występują a ich terminaż jest przyjęty z góry.
- gdy dochodzi do opóźnień związanych z tworzeniem całości aplikacji (np. poprzez przyjęcie waterfallowej strategii tworzenia produktu)
- gdy aplikacja jest testowana po raz pierwszy

Wdrożenie:
1. Identyfikacja ryzyka (prawdopodobieństwo wystąpienia vs. znaczenie biznesowe/ kluczowość dla biznesu) - na podstawie przyjętych kryteriów ryzyka.
2. Priorytetyzacja modułów, części aplikacji (testów).
3. Zaplanowanie testów do wykonania

Jakie korzyści płyną z przyjęcia tej strategii testowania?
1. Skupienie uwagi na testach mających na uwadze końcowego użytkownika [co użytkownik chce/potrzebuje z perspektywy biznesowej tworzonego produktu]
2. Spełnienie kryterium czasowego związanego z realizacją postawionego zadania.
3. Optymalizacja pracy/uwagi QA w konkretnym kierunku.


Ryzyko:
1. Brak zrozumienia najistotniejszych części z punktu biznesowego rozwijanego produktu.


Metodologia Analizy Ryzyka - matryca 2x2 (możliwa 3x3 High/Medium/Low)

```bash
High    +----------++----------+
        |   Could  |  Must     | 
Risk    |   Test   |  Test     |
        |          |           |
Pro     +----------++----------+
ba      +----------++----------+
bili    |   Could  |  Should   |
ty      |   Test   |  Test     |
        |          |           |
Low     +----------++----------+
      Low     Risk Impact    High
```

Brak jednego klucza w ramach, którego istnieje możliwość wyznaczenia ryzyka dla każdej aplikacji. To może bazować zarówno na poszczególnych funkcjonalnościach jak i ścieżkach użycia, wymaganiach, zaplanowanych testach.

Likely/Quite Likely/Unlikely
Minor/Visible/Interruption

![](https://www.softwaretestinghelp.com/wp-content/qa/uploads/2018/05/Likelihood-and-impact-of-failure.jpg)

![](https://www.softwaretestinghelp.com/wp-content/qa/uploads/2018/05/Testing-Priority-grid.jpg)

![](https://www.softwaretestinghelp.com/wp-content/qa/uploads/2018/05/Level-of-Detail-of-Testing.jpg)

* Ocena Ryzyka
* Zebranie ocen i rozmieszczenie na matrycy
* Wyznaczenie priorytetów testowania na podstawie matrycy
* Określenie zakresu testowania poszczególnych części aplikacji

Risk probability powinno zostać ocenioną przez osoby posiadające techniczne kompetencje w zespole.




Wprowadzenie oznaczeń w trakcie produkcji np. Severity 1-4 / Priority 1-4 / Criticality 1-4



https://www.guru99.com/risk-based-testing.html - identyfikacja ryzyka



---
Źródło:

[Introducing change: Risk based regression](https://melissajfisher.medium.com/introducing-change-risk-based-regression-58969eb7bce9)

[Risk Based Testing: Approach, Matrix, Process & Examples](https://www.guru99.com/risk-based-testing.html)

[The Ultimate Guide To Risk Based Testing: Risk Management In Software Testing](https://www.softwaretestinghelp.com/risk-management-during-test-planning-risk-based-testing/)

[When Should You Take a Risk-based Approach to Testing and How To Implement It Right?](https://www.scnsoft.com/software-testing/risk-based-testing)

[What Is Software Testing Life Cycle (STLC)?](https://www.softwaretestinghelp.com/what-is-software-testing-life-cycle-stlc/)

[Risk-Based Testing Averse](https://qahiccupps.blogspot.com/2022/06/risk-based-testing-averse.html)