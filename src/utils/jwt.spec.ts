import { decode } from './jwt';

describe('utils/jwt', () => {
  describe('decode', () => {
    it('should return the expected interface', () => {
      expect(typeof decode).toBe('function');
    });

    it('should return decoded jwt', () => {
      const jwt =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIn0.__signature__';
      const expectedHeader = {
        alg: 'HS256',
        typ: 'JWT',
      };
      const expectedBody = { sub: '1' };
      const expectedSignature = '__signature__';
      const decodedJwt = decode(jwt);
      expect(decodedJwt.header).toMatchObject(expectedHeader);
      expect(decodedJwt.body).toMatchObject(expectedBody);
      expect(decodedJwt.signature).toBe(expectedSignature);
    });
  });
});
