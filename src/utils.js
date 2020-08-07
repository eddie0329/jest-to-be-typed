import { ADVANCED, DEFAULT } from './constants';

/**
 *
 * @param {array} pass
 */
export const isPassed = (pass) => {
  return pass.filter((bool) => bool === false).length === 0;
};

/**
 *
 * @param {*} expectedType
 */
export const getExpectedMatchType = (expectedType) => {
  if (expectedType === 'object') {
    return ADVANCED;
  }
  return DEFAULT;
};

/**
 *
 * @param {object} obj1
 * @param {object} obj2
 */
export const isNumberOfKeysNotEqual = (obj1, obj2) =>
  Object.keys(obj1).length !== Object.keys(obj2).length;
