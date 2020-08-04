import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';
import getType from 'jest-get-type';

export const TYPES = 'TYPES';
export const DEFAULT = 'DEFAULT';

export const getExpectedMatchType = (expectedType) => {
  if (expectedType === 'object') {
    return TYPES;
  }
  return DEFAULT;
};

const checkDefaultTypes = (received, expected) => {
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

const checkAdvancedTypes = (received, expected, strict) => {};

export const toBeTyped = (received, expected, strict = false) => {
  const options = {
    DEFAULT: checkDefaultTypes(received, expected),
    TYPES: checkAdvancedTypes(strict),
  };
  return options[getExpectedMatchType(getType(expected))];
};

expect.extend({ toBeTyped });
