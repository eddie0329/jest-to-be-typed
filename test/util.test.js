import { getExpectedMatchType, DEFAULT, TYPES } from '../index';

describe('Util test', () => {
  describe('matchType test', () => {
    it('string -> default', () => {
      expect(getExpectedMatchType('string')).toBe(DEFAULT);
    });
    it('number -> default', () => {
      expect(getExpectedMatchType('number')).toBe(DEFAULT);
    });
    it('boolean -> default', () => {
      expect(getExpectedMatchType('boolean')).toBe(DEFAULT);
    });
    it('function -> default', () => {
      expect(getExpectedMatchType('function')).toBe(DEFAULT);
    });
    it('object -> types', () => {
      expect(getExpectedMatchType('object')).toBe(TYPES);
    });
  });
});
