import {
  isPassed,
  getExpectedMatchType,
  isNumberOfKeysNotEqual,
} from './utils';
import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';
import getType from 'jest-get-type';

/**
 *
 * @param {*} received
 * @param {*} expected
 */
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

/**
 *
 * @param {*} received
 * @param {*} expected
 */
const checkAdvancedTypes = (received, expected) => () => {
  const types = [];
  const pass = [];
  if (isNumberOfKeysNotEqual(received, expected)) {
    pass.push(false);
  }
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

/**
 *
 * @param {*} received
 * @param {*} expected
 */
export const toBeTyped = (received, expected) => {
  const options = {
    DEFAULT: checkDefaultTypes(received, expected),
    ADVANCED: checkAdvancedTypes(received, expected),
  };
  return options[getExpectedMatchType(getType(expected))]();
};

export default {
  toBeTyped,
};

expect.extend({ toBeTyped });
