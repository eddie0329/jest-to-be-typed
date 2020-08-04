import { matchType } from '../index';

const DEFAULT = 'DEFAULT';
const TYPES = 'TYPES';

describe('Util test', () => {
  describe('matchType test', () => {
    it('string -> default', () => {
      expect(matchType('string')).toBe(DEFAULT);
    });
    it('number -> default', () => {
      expect(matchType('number')).toBe(DEFAULT);
    });
    it('boolean -> default', () => {
      expect(matchType('boolean')).toBe(DEFAULT);
    });
    it('function -> default', () => {
      expect(matchType('function')).toBe(DEFAULT);
    });
    it('object -> types', () => {
      expect(matchType('object')).toBe(TYPES);
    });
  });
});
