import { ADVANCED, DEFAULT } from '../src/constants';
import { getExpectedMatchType, isPassed } from '../src/utils';
import getType from 'jest-get-type';

describe('Util test', () => {
  describe('matchType test', () => {
    it('string -> default', () => {
      expect(getExpectedMatchType(getType('string'))).toBe(DEFAULT);
    });
    it('number -> default', () => {
      expect(getExpectedMatchType(getType(123))).toBe(DEFAULT);
    });
    it('boolean -> default', () => {
      expect(getExpectedMatchType(getType(true))).toBe(DEFAULT);
    });
    it('function -> default', () => {
      expect(getExpectedMatchType(getType(() => {}))).toBe(DEFAULT);
    });
    it('object -> types', () => {
      expect(getExpectedMatchType(getType({}))).toBe(ADVANCED);
    });
  });

  describe('isPassed test', () => {
    it('[true, ture] -> true', () => {
      expect(isPassed([true, true])).toBeTruthy();
    });
    it('[true, false] -> false', () => {
      expect(isPassed([true, false])).toBeFalsy();
    });
  });
});
