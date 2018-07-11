# postcss-purifycss

[![npm version](https://img.shields.io/npm/v/postcss-purifycss.svg)](https://www.npmjs.com/package/postcss-purifycss) ![node](https://img.shields.io/node/v/postcss-purifycss.svg)

Clean unnecessary CSS with [PurifyCSS](https://github.com/purifycss/purifycss)

## Features

- Easily integrates PurifyCSS with postcss
- Allows you to use any PurifyCSS options
- Ignore a line or whole chunks of code, exactly like with [`uncss`](https://github.com/uncss/uncss)
  ```css
  /* purifycss:ignore */
  .selector1 {
    /* this rule will be ignored */
  }

  .selector2 {
    /* this will NOT be ignored */
  }

  /* purifycss:ignore start */

  /* all rules in here will be ignored */

  /* purifycss:ignore end */
  ```
  _– taken from UnCSS example_

## Usage

An example of how to use this module:

```js
const purify = require('postcss-purifycss');

postcss([
  purify({
    content: [],
    whitelist: [],
    purifyOptions: {
      info: false,
      rejected: false,
      whitelist: [],
    }
  }),
]);
```

### Options

| Option  | Required | Description |
| ------------ | :------------: | ----------- |
| `content` | ✓ | [The PurifyCSS content argument](https://github.com/purifycss/purifycss#the-content-argument)
| `whitelist` || A whitelist using Regular Expressions
| `purifyOptions` || [The optional PurifyCSS options argument](https://github.com/purifycss/purifycss#the-optional-options-argument)

## Credits

Credits to [UnCSS](https://github.com/uncss/uncss) (MIT) for the ignoring code and the foundation of a PostCSS plugin.
