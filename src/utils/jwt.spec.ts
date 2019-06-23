import { decode } from './jwt';

describe('utils/jwt', () => {
  describe('decode', () => {
    it('should return the expected interface', () => {
      expect(typeof decode).toBe('function');
    });
  });
});
