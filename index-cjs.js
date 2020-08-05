const {
  matcherHint,
  printExpected,
  printReceived,
} = require('jest-matcher-utils');
const getType = require('jest-get-type');

const ADVANCED = 'ADVANCED';
const DEFAULT = 'DEFAULT';

const isPassed = (pass) => {
  return pass.filter((bool) => bool === false).length === 0;
};

const getExpectedMatchType = (expectedType) => {
  if (expectedType === 'object') {
    return ADVANCED;
  }
  return DEFAULT;
};

const checkDefaultTypes = (received, expected) => () => {
  const type = getType(received);
  const pass = type === expected;
  const message = pass
    ? () =>
        matcherHint('.not.toBeType', 'value', 'type') +
        '\n\n' +
        `Expected value to be of type:\n` +
        `  ${printExpected(expected)}\n` +
        `Received:\n` +
        `  ${printReceived(received)}\n`
    : () =>
        matcherHint('.toBeType', 'value', 'type') +
        '\n\n' +
        `Expected value to be of type:\n` +
        `  ${printExpected(expected)}\n` +
        `Received:\n` +
        `  ${printReceived(received)}\n` +
        `type:\n` +
        `  ${printReceived(type)}`;

  return { pass, message };
};

const checkAdvancedTypes = (received, expected) => () => {
  const types = [];
  const pass = [];
  Object.entries(expected).forEach(([key, value]) => {
    const receivedType = getType(received[key]);
    if (receivedType === value) {
      pass.push(true);
    } else {
      pass.push(false);
    }
    types.unshift(receivedType);
  });
  const filteredPass = isPassed(pass);

  const message = filteredPass
    ? () =>
        matcherHint('.not.toBeType', 'value', 'type') +
        '\n\n' +
        `Expected value to be of type:\n` +
        `  ${printExpected(expected)}\n` +
        `Received:\n` +
        `  ${printReceived(received)}\n`
    : () =>
        matcherHint('.toBeType', 'value', 'type') +
        '\n\n' +
        `Expected value to be of type:\n` +
        `  ${printExpected(expected)}\n` +
        `Received:\n` +
        `  ${printReceived(received)}\n` +
        `type:\n` +
        `  ${printReceived(types)}`;

  return { pass: filteredPass, message };
};

const toBeTyped = (received, expected) => {
  const options = {
    DEFAULT: checkDefaultTypes(received, expected),
    ADVANCED: checkAdvancedTypes(received, expected),
  };
  return options[getExpectedMatchType(getType(expected))]();
};

exports.default = { toBeTyped };
module.exports = { toBeTyped };
expect.extend({ toBeTyped });
