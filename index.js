import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';
import getType from 'jest-get-type';

const TYPES = 'TYPES';
const DEFAULT = 'DEFAULT';

export const matchType = (expectedType) => {
  if (expectedType === 'object') {
    return TYPES;
  }
  return DEFAULT;
};

export const toBeTyped = (received, expected) => {
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

expect.extend({ toBeTyped });
