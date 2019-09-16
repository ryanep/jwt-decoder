import { parseJson, formatJson } from './json';

describe('utils/json', () => {
  describe('parseJson', () => {
    it('should return null with an invalid JSON payload', () => {
      const jsonString = '__INVALID_JSON__';
      const result = parseJson(jsonString);
      expect(result).toBe(null);
    });

    it('should return object with a valid JSON payload', () => {
      const jsonString = '{ "test": true }';
      const result = parseJson(jsonString);
      expect(result).toMatchObject({
        test: true,
      });
    });
  });

  describe('formatJson', () => {
    it('should return null is input is null', () => {
      const json: any = null;
      const result = formatJson(json);
      expect(result).toBe(null);
    });

    it('should return formatted JSON string with valid object', () => {
      const json = {
        test: true,
      };
      const result = formatJson(json);
      expect(result).toMatchSnapshot();
    });
  });
});
