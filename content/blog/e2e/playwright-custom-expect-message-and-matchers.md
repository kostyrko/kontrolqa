---
title: '🎭 Elevating Test Clarity with Custom Expect Messages and your own Matchers in Playwright'
date: 2023-09-02 10:00
category: playwright
tags: ["playwright", "javascript", "typescript", "assertion", "matcher"]
draft: false
---


Just as a gripping novel can transport you to another world, well-structured code should carry you through your testing journey seamlessly. In the realm of test automation with Playwright, crafting intelligible and informative expectations plays a pivotal role in building maintainable and effective test scripts. One way to achieve this is by harnessing the power of your own expect messages (additional context) and  custom assertion methods  (additional tooling).

## The Beauty of Readable Code

Readable code is the cornerstone of collaboration and long-term maintainability. When your code is crystal clear and concise, it becomes an invaluable asset for your team. This encompasses meaningful variable names, consistent formatting, and expressive assertions—all contributing to code that's easy to decipher and work with.

Playwright simplifies the creation of readable expectations with its built-in `expect` functions, enabling you to assert various conditions in your tests. For example:

```javascript
import { expect } from "@playwright/test";

expect(playlist.title).toBeTruthy(); // Value is truthy, i.e. not false, 0, null, etc.
expect(playlist.title).toContain('test'); // String contains a substring
expect(playlists.items).toHaveLength(4); // Array or string has length
```

These expectations provide essential insights into what is being tested, facilitating comprehension of the test's logic and purpose.
Check out the full list here: [Non-retrying assertions](https://playwright.dev/docs/test-assertions#non-retrying-assertions) and here [Auto-retrying assertions](https://playwright.dev/docs/test-assertions#auto-retrying-assertions) for a full description look here [API reference/ Assertions/ GenericAssertions](https://playwright.dev/docs/api/class-genericassertions)

## Custom Expect Messages

First of all you can specify a custom error message as a second argument to the expect function and thus providing the test content with additional context

```javascript
await expect(page.getByText('Name'), 'should be logged in').toBeVisible();
```

You can also go a step further and extend the `expect` object capabilities in your `playwright.config.ts`

::: source of the example presented below: [Sergei Gapanovich: Creating custom expects in Playwright: how to write your own assertions](https://playwrightsolutions.com/creating-custom-expects-in-playwright-how-to-write-your-own-assertions/) :::

You may desire more explicit expectations. Suppose you want to ascertain not just the value but also the type of a variable. Traditionally, you might express it as follows:

```javascript
let framework = "playwright";

expect(typeof framework).toBe("string");
```

While this is readable, wouldn't it be more elegant to convey your intention directly?

## Crafting Custom Matchers

To create custom expect messages and matchers in Playwright, extend the `expect` object in your `playwright.config.ts` file with additional methods. Imagine you want to verify if a value is a string:

```javascript
expect.extend({
  toBeString(received: string) {
    const check = typeof received === "string";
      
    if (check) {
      return {
        message: () => "passed",
        pass: true,
      };
    } else {
      return {
        message: () =>
          `toBeString() assertion failed.\nYou expected '${received}' to be a string but it's a ${typeof received}\n`,
        pass: false,
      };
    }
  },
});
```

With this custom matcher, express your expectations more intuitively:

```javascript
let framework = "playwright";

expect(framework).toBeString();
```

If this expectation fails, the custom message you defined will grace the test output, offering vital context for debugging.

## Going Beyond Strings

Custom matchers aren't confined to checking strings; they're versatile. You can craft matchers for various scenarios. For instance, you could create matchers like `.toBeNumber()` or `.toBeBoolean()` to enrich your toolkit.

Moreover, push the envelope and design matchers like `.toBeOneOfValues()`. This becomes immensely valuable when you need to validate if a value belongs to a predefined set, such as verifying the results of API calls.

```javascript
let validValues = ["failed", "pending", "successful"];
let testValue = "created"; 

expect(testValue).toBeOneOfValues(validValues);
```

If `testValue` doesn't match any of the values in `validValues`, your custom error message will offer comprehensive information about the failure.


## Conclusion

Custom expect messages and matchers in Playwright are formidable instruments for enhancing the readability and expressiveness of your test scripts. By designing custom matchers that align precisely with your test requirements, you can make your code more intuitive and self-explanatory.


By incorporating custom expect messages and matchers into your Playwright test automation, you can significantly enhance the clarity and readability of your test scripts, making them more accessible to your team and future maintainers you can share your creations with others as well i.e. check out a Matchers library created by Yevhen Laichenkov called [playwright-expect](https://github.com/elaichenkov/playwright-expect)  / now archived probably due to similarity with the matchers which are a part of Playwright library


[Playwright Custom Expect Message](https://www.programsbuzz.com/article/playwright-custom-expect-message)

[Creating custom expects in Playwright: how to write your own assertions](https://playwrightsolutions.com/creating-custom-expects-in-playwright-how-to-write-your-own-assertions/)

[Assertion Scopes, the one FluentAssertions feature you didn't know you needed](https://timdeschryver.dev/blog/assertion-scopes-the-one-fluentassertions-feature-you-didnt-know-you-needed)

[GenericAssertions](https://playwright.dev/docs/api/class-genericassertions)

[Expect more with playwright-expect](https://elaichenkov.medium.com/expect-more-with-playwright-expect-5eb4e23d3916)
