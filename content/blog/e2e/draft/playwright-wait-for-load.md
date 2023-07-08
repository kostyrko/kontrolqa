---
title: 'Playwright - Wait for the page to load'
date: 2023-07-03 10:00
category: e2e, playwright
draft: true
---

The easy hard wait
Timeouts
https://playwright.dev/docs/test-timeouts


This is the way
Waiting for page navigations and API responses

1)page.waitForNavigation to wait until a page navigation (new URL or page reload) has completed.

2)page.waitForLoadState This waits until the required load state has been achieved.

3)page.waitForURL This waits until a navigation to the target URL.

4)page.waitForResponse waits till the response from the given API is received.

https://stackoverflow.com/questions/74920905/how-to-give-fixed-wait-in-playwright-with-out-any-condition-like-we-had-in-cypre
https://playwright.dev/docs/events

There are several options that may help you.

1. Solution 1:

First, you can maybe determine which element is loading last, and then go with

page.waitForSelector('yourselector')
or even wait for multiple selectors to appear

page.waitForSelector('yourselector1','yourselector2')
2. Solution 2

page.waitForLoadState('domcontentloaded')
Because

page.waitForLoadState('networkidle') 
by default will wait for network event and if 0.5 seconds nothing is network trafficking it will say, I am no longer need to wait. And that is why you maybe have stohastic beh.

https://stackoverflow.com/questions/71937343/playwright-how-to-wait-until-there-is-no-animation-on-the-page

https://dev.to/checkly/avoiding-hard-waits-in-playwright-and-puppeteer-272
