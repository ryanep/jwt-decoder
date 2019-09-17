import { decodeJwt, splitJwt } from './jwt';
import { EncodedJwt } from '../types/jwt';

describe('utils/jwt', () => {
  describe('decodeJwt', () => {
    it('should return the expected interface', () => {
      expect(typeof decodeJwt).toBe('function');
    });

    it('should return null with undefined payload', () => {
      const encodedJwt: EncodedJwt = undefined;
      const decodedJwt = decodeJwt(encodedJwt);
      expect(decodedJwt).toBe(null);
    });

    it('should return null jwt with undefined payload', () => {
      const encodedJwt: EncodedJwt = {
        header: undefined,
        payload: undefined,
        signature: '__signature__',
      };
      const decodedJwt = decodeJwt(encodedJwt);
      expect(decodedJwt).toBe(null);
    });

    it('should return decoded jwt with valid payload', () => {
      const jwt =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIn0.__signature__';
      const encodedJwt = splitJwt(jwt);
      const expectedHeader = {
        alg: 'HS256',
        typ: 'JWT',
      };
      const expectedBody = { sub: '1' };
      const expectedSignature = '__signature__';
      const decodedJwt = decodeJwt(encodedJwt);
      expect(decodedJwt.header).toMatchObject(expectedHeader);
      expect(decodedJwt.payload).toMatchObject(expectedBody);
      expect(decodedJwt.signature).toBe(expectedSignature);
    });
  });

  describe('splitJwt', () => {
    it('should return null with invalid jwt payload', () => {
      const jwt = '__INVALID_JWT__';
      const result = splitJwt(jwt);
      expect(result).toBe(null);
    });
  });
});
