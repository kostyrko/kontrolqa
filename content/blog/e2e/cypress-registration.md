---
title: '🌲 Cypress - rejestracja wykorzystująca email (nodemailer/ethereal)'
date: 2022-03-06 10:00
category: cypress
draft: false
---

Rejstracja wykorzystująca email



---
[<img src="https://miro.medium.com/max/1400/1*0LQQHeiuT4vcR-JmgkQXWw.png" width="100%"/>](https://miro.medium.com/max/1400/1*0LQQHeiuT4vcR-JmgkQXWw.png)
### Ethereal email + SendGrid

[Full Testing of HTML Emails using SendGrid and Ethereal Accounts](https://www.cypress.io/blog/2021/05/24/full-testing-of-html-emails-using-ethereal-accounts/)

[🗄 -  cypress-ethereal-email-example](https://github.com/bahmutov/cypress-ethereal-email-example/blob/main/cypress/plugins/email-account.js)

odwiedź: https://app.sendgrid.com/settings/sender_auth/senders
stwórz nowy adres oraz go zweryfikuj => new sender

odwiedź: https://app.sendgrid.com/guide/integrate/langs/smtp
stówrz nowy klucz api / api key

stwórz plik `.as-a.ini` w katalogu głównym projektu
```env
[cypress-ethereal-email-example-main]
SENDGRID_HOST=smtp.sendgrid.net
SENDGRID_PORT=465
SENDGRID_USER=apikey
SENDGRID_PASSWORD=SG.Fo[...]I
SENDGRID_FROM=xyzg@xyz.com
```

zainstaluj => `npm i -D as-a` (https://github.com/bahmutov/as-a)



```bash
as-a cypress-ethereal-email-example-main npm run local
```

```bash
mikolaj@MacBook-Air cypress-ethereal-email-example-main % as-a cypress-ethereal-email-example-main npm run local

> cypress-ethereal-email-example@1.0.0 local
> start-test 3000 cy:open

1: starting server using command "npm run start"
and when url "[ 'http://localhost:3000' ]" is responding with HTTP status code 200
running tests using command "npm run cy:open"


> cypress-ethereal-email-example@1.0.0 start
> next dev

ready - started server on 0.0.0.0:3000, url: http://localhost:3000
info  - Loaded env from /Users/mikolaj/Downloads/cypress-ethereal-email-example-main/.env
event - compiled client and server successfully in 946 ms (110 modules)
wait  - compiling / (client and server)...
Browserslist: caniuse-lite is outdated. Please run:
npx browserslist@latest --update-db

Why you should do it regularly:
https://github.com/browserslist/browserslist#browsers-data-updating
event - compiled client and server successfully in 3.2s (127 modules)

> cypress-ethereal-email-example@1.0.0 cy:open
> cypress open

created new email account das6ia2slj2wxgg7@ethereal.email
for debugging, the password is 4DwxhRKRRk3SUHqJem
```


---








----


[<img src="https://user-images.githubusercontent.com/4564386/122464439-814de100-cfbf-11eb-9227-95a9cc3cc2f1.png" width="100%"/>](https://user-images.githubusercontent.com/4564386/122464439-814de100-cfbf-11eb-9227-95a9cc3cc2f1.png)
### gmail-tester



Źródła

[How to poll a Gmail inbox using cypress.io](https://levz0r.medium.com/how-to-poll-a-gmail-inbox-in-cypress-io-a4286cfdb888)

[🗄 - gmail-tester](https://github.com/levz0r/gmail-tester)

[🗄 - gmail-tester-extended](https://github.com/kateyurasova/gmail-tester)

[🗄 - gmail-tester-examples](https://github.com/kateyurasova/gmail-tester-examples/tree/master/cypress)

[📽 -  How to generate creds and token file for using gmail-tester-extended](https://www.youtube.com/watch?v=3S1gjrbi1uw&ab_channel=KateYurasova)



----

Źródła/artykuły do materiałów o podobnej tematyce:

[📄 - docs.cypress.io - Environment Variables](https://docs.cypress.io/guides/guides/environment-variables#Option-2-cypress-env-json)

[cypress.io/blog -> Testing HTML Emails using Cypress](https://www.cypress.io/blog/2021/05/11/testing-html-emails-using-cypress/)

[📽 - Testing HTML emails using Cypress](https://www.youtube.com/watch?v=16WTH7XeIVw)

[cypress.io/blog -> Full Testing of HTML Emails using SendGrid and Ethereal Accounts](https://www.cypress.io/blog/2021/05/24/full-testing-of-html-emails-using-ethereal-accounts/)

[📽 - Cypress Testing for HTML Emails Sent via SendGrid Service](https://www.youtube.com/watch?v=N_VNS8ysUQc&ab_channel=glebbahmutov)






















---
[<img src="https://www.mailslurp.com/logo.png" width="50%"/>](https://www.mailslurp.com/logo.png)
-----
### Mailslurp

Punktem wyjścia jest ten artykuł -> [Cypress JS Email Plugin —how to test with real email addresses! 🚀](https://mailslurp.medium.com/cypress-js-email-plugin-how-to-test-with-real-email-addresses-ed811d9e98a0) przedstawiony również tutaj [www.mailslurp.com - Test emails with Cypress JS](https://www.mailslurp.com/examples/cypress-js/) patrz również ten commit u mnie na repo [add basic mailslurp-playground tests](https://github.com/kostyrko/cypress-sandbox/commit/ed06313f70d2c22bcbc3c8ce7f1c95c66fb495e5)

Pomysł na wykorzystanie twittera znalazłem tutaj
[Test email sign-up with real email addresses (NodeJS, CypressJS, and MailSlurp)](https://dev.to/mailslurp/test-email-sign-up-with-real-email-addresses-nodejs-cypressjs-and-mailslurp-3mpp)
1) Założenie konta na mailslurp.com - po zalogowaniu się widoczne jest API KEY 

2) Założenie projektu/ instalacja zależności - Cypress + mailslurp-client

```js
npm i --save cypress mailslurp-client
```

3) w pliku `cypress.env.json` przechowanie API KEY + dodanie cypress.env.json do .gitignore

```js
{
"API_KEY": "ba23e7de[...]ff41a73v"
}
```



4) Stworzenia custom command

```js
const { MailSlurp } = require("mailslurp-client");

Cypress.Commands.add("newEmailAddress", () => {
  // inicjacja MailSlurp
  const mailslurp = new MailSlurp({ apiKey: Cypress.env("API_KEY") });
  // zwrócenie { id, emailAddress }
  return mailslurp.createInbox();
});
```

5) stworzenie testu wypełniającego formularz rejestracyjny np. dla twitter.com

```js
describe('Sign up to twitter.com', () => {
    context('Example sign up page', () => {
        it('fills the sign up form', () => {
            cy.newEmailAddress().then(({ emailAddress }) => {
                cy.visit('https://twitter.com/i/flow/signup');
                cy.contains('Join Twitter today');
                cy.contains('Sign up with phone or email').click()
                cy.contains('Create your account');
                cy.contains('Use email instead').click()
                cy.get('[name="name"]').type('Mike')
                cy.get('[name="email"]').type(emailAddress)
                cy.get('#SELECTOR_1').select('January')
                cy.get('#SELECTOR_2').select('1')
                cy.get('#SELECTOR_3').select('1990')
                cy.contains('Next').click()
                cy.contains('Next').click()
                cy.contains('Sign up').click()
                cy.contains('We sent you a code').should('exist')
            })
        });
    })
});
```

<input autocapitalize="sentences" autocomplete="on" autocorrect="on" name="password" spellcheck="true" type="password" dir="auto" class="r-30o5oe r-1niwhzg r-17gur6a r-1yadl64 r-deolkf r-homxoj r-poiln3 r-7cikom r-1ny4l3l r-t60dpp r-1dz5y72 r-fdjqy7 r-13qz1uu" value="">




dalsze źródła na temat Mailslurp: 

[www.mailslurp.com - Testing user sign up with test email accounts](https://www.mailslurp.com/guides/test-user-sign-up-with-test-email-accounts/)

[https://playground.mailslurp.com/](https://playground.mailslurp.com/)

[www.mailslurp.com/ - Free plan limitations](https://www.mailslurp.com/support/free-plan-limitations/)

[🗄 -  mailslurp/playground](https://github.com/mailslurp/playground/tree/master/src)

[🗄 -  mailslurp/cypress-mailslurp](https://github.com/mailslurp/cypress-mailslurp)

[🗄 -  mailslurp/cypress-mailslurp - examples](https://github.com/mailslurp/examples/tree/master/javascript-cypress-js/cypress)
