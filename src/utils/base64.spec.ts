import { decodeBase64 } from './base64';

describe('utils/base64', () => {
  describe('decodeBase64', () => {
    it('should return null when passed a normal string', () => {
      const input = '__INVALID_BASE64__';
      const response = decodeBase64(input);
      expect(response).toBe(null);
    });

    it('should return decoded value when passed a base64 string', () => {
      const input = window.btoa('__VALID_STRING__');
      const response = decodeBase64(input);
      expect(response).toBe('__VALID_STRING__');
    });
  });
});
