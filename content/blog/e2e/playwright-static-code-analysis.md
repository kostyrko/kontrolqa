---
title: 'Playwright - static code analysis for best practices usage'
date: 2023-07-03 10:00
category: e2e, playwright
draft: true
---


.eslintrc.cjs

```js
/* eslint-env node */
module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'ban'],
    root: true,
    rules: {
        "ban/ban": [
            2,
            { "name": ["describe", "only"], "message": "don't focus tests" },
            { "name": ["test", "only"], "message": "don't focus tests" },
        ]
    }
};
````

package.json
```
"scripts": {
    "eslint:check": "npx eslint .",
    "eslint:fix": "npx eslint . --fix"
}

[...]

 "devDependencies": {
    "@playwright/test": "^1.34.3",
    //// nowe ////
    "@typescript-eslint/eslint-plugin": "^5.60.1",
    "@typescript-eslint/parser": "^5.60.1",
    "eslint": "^8.43.0",
    "eslint-plugin-ban": "^1.6.0",
    "typescript": "^5.1.6"
  },
```
---=

## Husky
1/
npm install husky -D

this
2/ npm pkg set scripts.prepare="husky install"
will add

  "scripts": {
    [..]
    "prepare": "husky install"
  },

npm run prepare

> clickview-playwright-poc@1.0.0 prepare
> husky install

husky - Git hooks installed

3/ 
% npx husky add .husky/pre-commit "npm run lint"
husky - created .husky/pre-commit

.husky folder with pre-commit file

with content

#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint

4/ change to staged only files check
npx husky add .husky/pre-commit "npx lint-staged"


[](https://github.com/playwright-community/eslint-plugin-playwright)

https://timdeschryver.dev/blog/dont-commit-focused-tests#tslint

https://prabinpoudel.com.np/articles/run-eslint-on-git-commit-with-husky-and-lint-staged/

https://gist.github.com/estorgio/e8bcaa8e87d0fcdcf85fdf598956e34c


https://www.npmjs.com/package/lint-staged?activeTab=readme