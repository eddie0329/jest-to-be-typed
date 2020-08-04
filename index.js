import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';
import getType from 'jest-get-type';

export const ADVANCED = 'ADVANCED';
export const DEFAULT = 'DEFAULT';

export const isPassed = (pass) => {
  return pass.filter((bool) => bool === false).length === 0;
};

export const getExpectedMatchType = (expectedType) => {
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
      types.push(receivedType);
    } else {
      pass.push(false);
    }
  });
  console.log(types);
  console.log(pass);

  const message =
    pass.filter((bool) => bool !== false).length === 0
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

  // return { pass.filter(), message };
};

export const toBeTyped = (received, expected) => {
  const options = {
    DEFAULT: checkDefaultTypes(received, expected),
    ADVANCED: checkAdvancedTypes(received, expected),
  };
  return options[getExpectedMatchType(getType(expected))]();
};

expect.extend({ toBeTyped });
