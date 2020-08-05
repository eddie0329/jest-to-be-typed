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
