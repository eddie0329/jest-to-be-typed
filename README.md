# 🎉 Jest To be Typed

[![version](https://img.shields.io/npm/v/jest-chain.svg?style=flat-square)](https://www.npmjs.com/package/jest-to-be-typed)
[![downloads](https://img.shields.io/npm/dm/jest-chain.svg?style=flat-square)](http://npm-stat.com/charts.html?package=jest-to-be-typed&from=2020-08-03)
[![MIT License](https://img.shields.io/npm/l/jest-chain.svg?style=flat-square)](https://github.com/eddie0329/jest-to-be-typed/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

Jest matcher that allows you to test the expected type of value.


## 🔧 Installation

### With npm

```sh
npm i jest-to-be-typed
```
### With yarn

```sh
yarn add jest-to-be-typed
```

## 📦 Setup

### Jest >v24

Add `jest-to-be-typed` to your Jest `setupFilesAfterEnv` configuration. [See for help](https://jestjs.io/docs/en/next/configuration#setupfilesafterenv-array)

```json
"jest": {
  "setupFilesAfterEnv": ["jest-to-be-typed"]
}
```

### Jest <v23

```json
"jest": {
  "setupTestFrameworkScriptFile": "jest-to-be-typed"
}
```

OR

Simply import `toBeTyped`

```javascript
// *.test.js
import toBeTyped from 'jest-to-be-typed'

expect.extend(toBeTyped);
```


## ✏️ Usage

There are two kinds of modes.

### Default mode:

Default mode checks typeof expected value.

```javascript
  expect('').toBeTyped('string');
  expect({}).toBeTyped('object');
  expect(1).toBeTyped('number');
  expect(false).toBeTyped('boolean');
  expect(Symbol('foobar')).toBeTyped('symbol');
  expect(() => {}).toBeTyped('function');
  expect([]).toBeTyped('array');
  expect(/foobar/).toBeTyped('regexp');
  expect(new RegExp('foobar')).toBeTyped('regexp');
  expect(null).toBeTyped('null');
  expect(undefined).toBeTyped('undefined');
  expect(new Map()).toBeTyped('map');
  expect(new Set()).toBeTyped('set');
  expect(new Date()).toBeTyped('date');
```

### Advanced mode:

Advanced mode is somelike typescript interface.

```javascript
  const data = {
    name: 'eddie',
    age: 13,
    address: [],
    isMarried: false
  };
  const types = {
    name: 'string',
    age: 'number',
    address: 'array',
    isMarried: 'boolean'
  };
  expect(data).toBeTyped(types);
```


## 📄 License

[MIT](/LICENSE)

## 💡 Reference

Inspired by [jest-tobetype](https://github.com/abritinthebay/jest-tobetype)
