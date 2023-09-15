---
title: '🎭 Playwright: soft assertion'
date: 2023-09-01 10:00
category: playwright
tags: ["playwright", "javascript", "chatgpt", "ai"]
draft: false
---

In this article, we'll explore the concept of soft assertions and learn how to leverage them effectively in Playwright tests.

## What Are Soft Assertions?

Assertions are checkpoints in your test scripts that verify whether certain conditions hold true during test execution. Traditionally, failing an assertion results in the immediate termination of the test, making it challenging to gather detailed information about all possible failed assertions within in a single run.

Playwright introduces the concept of "soft assertions" to address this limitation. Unlike traditional assertions, soft assertions do not stop the test execution when a failure occurs. Instead, they mark the test as failed and continue running subsequent assertions. This approach allows you to collect a comprehensive set of failure information in a single test run.

## Example Usage of Soft Assertions in Playwright

Let's dive into an example to see how soft assertions work in Playwright. Assume we are testing a BBC home page, and we want to verify various aspects of this webpage.

```javascript
test.only('soft assertions', async ({ page }) => {
    await page.goto('www.bbc.com');
    const locator = page.locator('h1');
    
    // Soft assertions in action
    await expect.soft(page).toHaveTitle('BBC - Homepage');
    await expect.soft(locator).toHaveAttribute('id', 'page-title');

    // Check if there are any soft assertion failures
    expect(test.info().errors).toHaveLength(0);

    // Continue with more assertions
    await expect.soft(locator).toHaveClass('module__title');
});
```

In this example, we perform multiple soft assertions to verify the title of the webpage and the attributes of a specific locator. The crucial part is that, even if one of these assertions fails, the test will not terminate immediately. Instead, it will continue to run the subsequent assertions.

After all the assertions have been executed, we check if there were any soft assertion failures using `expect(test.info().errors).toHaveLength(0)`. If there were any failures, the test will be marked as failed, and you can access detailed information about each failure.

## Incorporating Soft Assertions into Your Tests

To incorporate soft assertions into your Playwright tests, follow these steps:

1. Use `expect.soft()` to wrap the assertions you want to treat as soft assertions.

2. Continue your test script as usual after each soft assertion.

3. Check for soft assertion failures using `expect(test.info().errors).toHaveLength(0)` after running all the assertions.

Remember that soft assertions are only supported by the Playwright test runner.

## Conclusion

Soft assertions in Playwright are a game-changer for writing more robust and informative test scripts. They allow you to gather comprehensive failure information while continuing to execute other assertions. By mastering soft assertions, you can enhance the quality of your web application testing and streamline your debugging process.

So, the next time you're automating tests with Playwright, consider implementing soft assertions to gain better insights into the behavior of your web applications. Happy testing!

---

[playwright.dev/docs/test-assertions#soft-assertions](https://playwright.dev/docs/test-assertions#soft-assertions)

[Improve your test experience with Playwright Soft Assertions](https://timdeschryver.dev/blog/improve-your-test-experience-with-playwright-soft-assertions)