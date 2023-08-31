---
title: '🎭 Playwright: eslint + husky > guarding good practices with static pre-commit checks of static code'
date: 2023-08-01 10:00
category: playwright
tags: ["playwright", "eslint", "lint", "husky"]
draft: false
---

While working with [Playwright](https://playwright.dev/) test automation framework I found myself randomly committing to the remote repo focused tests marked with `only` method. In the past i.e. while using [Cypress](https://docs.cypress.io/) I was aided a plugin which does a static code analysis catching `only` method and stops you from committing focused tests > check out this plugin here: [stop-only](https://www.npmjs.com/package/stop-only)
  >"Detects '.only' left in the code accidentally. Works with "describe", "context" and "it".

Although this plugin could be applied to other test automation frameworks as well, this time I was looking for a tool which would broaden the context of static test analysis and one which would have a possibility to expand with my test suite. 

Options which I found suitable where 

1/ using a dedicated plugin: [eslint-plugin-playwright](https://github.com/playwright-community/eslint-plugin-playwright) (check the list of [Supported Rules](https://github.com/playwright-community/eslint-plugin-playwright#list-of-supported-rules) - btw. Cypress also has a similar plugin [eslint-plugin-cypress#rules](https://github.com/cypress-io/eslint-plugin-cypress#rules) which strangely doesn't catch focused tests and its rule list is somewhat short) 

2/ or configuring a bare eslint for the project myself

I went with the latter for the maintenance reasons: 

1/ I didn't feel the need of adding a plugin which rules I didn't need to follow at this stage 

2/ I figured out it would be easier to maintain rather than relay on a third party  


the recipe to implement it is as follows: 
## Eslint

1. Add four eslint related plugins during setup process (all will come in handy)

`@typescript-eslint/eslint-plugin` / `@typescript-eslint/parser` / `eslint`

and `eslint-plugin-ban`

as well as additional script to run `eslint` `check` and automatic `fix` locally to your `package.json` file

```js
"scripts": {
    "eslint:check": "npx eslint .",
    "eslint:fix": "npx eslint . --fix"
}

[...]

 "devDependencies": {
    [...]
    "@typescript-eslint/eslint-plugin": "^5.60.1",
    "@typescript-eslint/parser": "^5.60.1",
    "eslint": "^8.43.0",
    "eslint-plugin-ban": "^1.6.0",
    "typescript": "^5.1.6"
  }
```


2. create `.eslintrc.cjs` file and in the rules section add bans that you would like to apply

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

That's it - as easy as described above. 

Now to the second part > Husky application (pre-committ hook tool)


## Husky

1/ Install husky
npm install husky -D


2/ run script in the terminal `npm pkg set scripts.prepare="husky install"` that will 
will add/create a script in `package.json` file

```js
  "scripts": {
    [..]
    "prepare": "husky install"
  },
```

in the terminal run `npm run prepare` that will run 2 scripts

> <project-name>@<project-version> prepare
> husky install

which result in > husky - Git hooks installed

3/ now we need to add pre-commit hooks, in the terminal run
```
npx husky add .husky/pre-commit "npm run lint"
husky - created .husky/pre-commit
```
which created a  `.husky` folder in the root dir with pre-commit filewith content

```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
npm run lint
```

4/ It is worth following with the next step and change linting check to staged files only
by running additional command in the terminal

```
npx husky add .husky/pre-commit "npx lint-staged"
```

Voilà - now while committing a change lint will run automatically through changed files.


## Resources/Further Reading

[github - playwright-community/eslint-plugin-playwright](https://github.com/playwright-community/eslint-plugin-playwright)


[Don't commit focused tests](https://timdeschryver.dev/blog/dont-commit-focused-tests#tslint)


[Run ESLint on git commit with Husky and Lint Staged](https://prabinpoudel.com.np/articles/run-eslint-on-git-commit-with-husky-and-lint-staged/)


[gist - Setting up Prettier and ESLint with pre-commit hook](https://gist.github.com/estorgio/e8bcaa8e87d0fcdcf85fdf598956e34c)


[npm: lint-staged](https://www.npmjs.com/package/lint-staged?activeTab=readme)

[cypress-io/eslint-plugin-cypress](https://github.com/cypress-io/eslint-plugin-cypress)