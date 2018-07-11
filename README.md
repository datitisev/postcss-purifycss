# postcss-purifycss

[![npm version](https://img.shields.io/npm/v/postcss-purifycss.svg)](https://www.npmjs.com/package/postcss-purifycss) ![node](https://img.shields.io/node/v/@reflar/postcss-purifycss.svg)

Clean unnecessary CSS with [PurifyCSS](https://github.com/purifycss/purifycss)

## Usage

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
