import { ADVANCED, DEFAULT } from './constants';

export const isPassed = (pass) => {
  return pass.filter((bool) => bool === false).length === 0;
};

export const getExpectedMatchType = (expectedType) => {
  if (expectedType === 'object') {
    return ADVANCED;
  }
  return DEFAULT;
};

export const isNumberOfKeysNotEqual = (obj1, obj2) =>
  Object.keys(obj1).length !== Object.keys(obj2).length;
