---
title: 'K6 - Wprowadzenie'
date: 2022-02-21 10:00
category: performance
draft: true
---

![]()

Rodzaje testów wydajnościowych: 
- load testy (liczba użytkowników (sesji) na jednostkę czasu / ilość requestów na jednostkę czasu - coś na jednostkę czasu/ testy obciążeniowe)
- peak load testy (testy z maksymalnym spodziewanym obciążeniem - to powinno znaleźć się w specyfikacji - testy powinny być zorientowane na cel)
- maximum, capacity testy - test szukający granicy niefunkcjonalnego działania
- stress testy / testy obciążeniowe - testowanie pod dużo wyższym obciążeniem niż przewidywany maksimum capacity (pytania związane z jej możliwościami zmarchwistania/recovery np. czy sama wstanie czy wymaga asysty dev)
- soak test - przesączeniowe - (dłuższy horyzont czasowy - testy w długiej perspektywie czasu ale na średnim zużyciu pamięci - problemy z pamięcią, puchnięcie danych, wyciek pamięci)
- spike testy - gwałtowny wzrost i spadek obciążenia, w krótkim przedziale czasu (nie musi być do maks. obciążenia, ważne aby był szybki).

#### Instalacja + cli (wstęp)
https://github.com/kostyrko/k6training/blob/master/002_install_k6/01_teoria.md

k6 run --help // wyświetla listę opcji przebiegu skryptu

k6 run --vus=2 --duration=10s script.js // uruchomienie skryptu z 2 użytkownikami w 10s

k6 run --vus=2 --iterations=10 script.js
// [k6 run --vus=2 -i=10 script.js]

Tworzenie archiwum:
k6 archive --vus 10 --iterations 10 script.js
k6 inspect script.tar

można wyszukać odp. do requesta odpowiadając przez jego ID

// przełącznik --http-debug=full to przeglądania całości info
k6 run --http-debug=full script.js

VSC - wtyczki 'k6 for Visual Studio Code', 'k6 snippets'
cmd+shit+P > k6 run current snippet

snippets
def - definicja funkcji // podstawowy boiler plate
get - get request
post - post request
put - put request
delete - delete request
opt...

k6 convert -O har-session.js session.har
k6 convert -O har-session.js red-water-022d04b03.azurestaticapps.net.har


W chromie -> Inspect -> Network -> Request -> klikam na request -> eksport do HAR
w konsoli np.: k6 convert -O 02_odpowiedz.js red-water-022d04b03.azurestaticapps.net.har
// przeprowadzenie testu
k6 run --http-debug --vus 10 --duration 30s 02_odpowiedz.js
k6 run --http-debug=full --vus 10 --duration 30s 02_odpowiedz.js

#### Wysyłanie żądań

// wysłanie żądania
import http from 'k6/http';

//simplest test possible
export default function () { //https://stackoverflow.com/questions/21117160/what-is-export-default-in-javascript
    //początek iteracji
    let res = http.get('https://appxx.azurewebsites.net/'); //request - response
    console.log(JSON.stringify(res)); //The JSON.stringify() method converts a JavaScript object or value to a JSON string
    //koniec iteracji
}

export default function () // k6 rozpoznaje po `export` i `default` (nadanie nazwy w trakcie importu), że jest to funkcja pomocnicza (funkcja ta może być anonimowa) - ponieważ każdy plik testowy dla k6 jest modułem i dlatego export/default jest potrzebny (funkcja iteracji użytkownika)

Obiekt musi być skonwertowany do postaci tekstowej (np. z obiektu do JSON) - funkcja JSON.stringify() - funkcja nie może być przesłana, więc ta będzie usunięta. [w kolejnym kierunku JSON.parse()]

Jak wysyłamy to obiekt zmieniamy na tekst, a jak przyjmujemy to zmieniamy tekst na obiekt.


Scenariusze należy przetłumaczyć na żądania http i następnie to do k6
[inbeded request- tzn że żądanie jest wykonywane w ramach innego żądania, tych żądań może być wiele] -> 1 interakacja użytkownika oznacza wiele interakcja ze strony protokołu http

Batching w k6 służy do robienie równoległych zapytań do serwera.
Grupowanie służy do organizowania żądań.

    export default function () {
        group('Get Main Page', function () { //
            sendGet();
        });
        group('Add Post', function () {
            sendPost();
            sendGet();
        });
        
    }

Batching - przyjmuje listę listę

    export default function () {
        group('Get Main Page over 5 TCP connections', function(){
            http.batch([
                //method, url, body, params
                ['GET',URL,null,null],
                ['GET',URL,null,null],
                ['GET',URL,null,null],
                ['GET',URL,null,null],
                ['GET',URL,null,null],
            ]);
        });
        sleep(1);
    }


Jeśli wychodzą  równolegle żądania to wówczas jest to wysyłane TCP (przepływ komunikatów). Niebezpieczeństwo batchingu jest takie że TCP na lokalnej maszynie jest ograniczone np. do 16k (ilość dostępnych portów), a każde zapytanie należy pomnożyć przez ilość użytkowników.


Checks i Tresholds

Checks - działa = true/false / zastosowanie wewnętrzne dla testera // podobne do asercji - na obiekcie zwracanej odpowiedzi zakłada się check'i (false check nie oznacza fail testu)
Tresholds / przedziały - quality gate (czy spełnia zadania niefunkcjonalne) [fail tresholdu oznacza fail testu]

Check jest wewnętrzny - treshold jest ważną częścią testu - faktycznie testowaną wartością

Obiekt options - wypływa na zachowanie testu z poziomu kod a nie CLI

```javascript
export let options = {
    vus: 10,
    duration: '1m',
    iterations: 10,
    stages: [{ duration: '3m', target: 10 },{ duration: '5m', target: 10 }], //stage służą do sterowania obciążeniem
    thresholds: { //quality gate'y
        http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
    },
    scenarios: { //pozwala definiować wiele różnych scenariuszy w ramach jednego testu
        ...
    },
    discardResponseBodies: true,
    batch: 15, //maksymalna liczba równoległych żądań w batchu
    httpDebug: 'full'
}
```
Stages pozwala na symulowanie różnych etapów ruchu

#### Struktura

każdy element z export jest widoczny na zewnątrz, ale jest tych obiektów więcej // cykl życia jest // 
różne etapy init/setup/VU(kod iteracji użytkownika)/teardown



init - wywoływane przed każdym testem (importy, varasy)

setup - lety, data, etc.

VU code - export default

teardown - zamykanie po każdym teście


----

Źródła:

[]()


[](https://sajidmanzoor.wordpress.com/2012/12/26/performance-testing-requirement-gathering-questionnaire/)

[Rendezvous with k6](https://k6.io/blog/rendezvous-with-k6/?utm_campaign=Software%2BTesting%2BWeekly&utm_medium=email&utm_source=Software_Testing_Weekly_127)

