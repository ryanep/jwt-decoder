import { parseJson } from './json';
import { decodeBase64 } from './base64';
import { DecodedJwt, EncodedJwt } from '../types/jwt';

export const decodeJwt = (encodedJwt: EncodedJwt): DecodedJwt | null => {
  if (!encodedJwt) {
    return null;
  }

  const decoded = [encodedJwt.header, encodedJwt.payload].map(segment =>
    decodeBase64(segment),
  );
  const [header, payload] = decoded;
  const decodedJwt: DecodedJwt = {
    header: parseJson(header),
    payload: parseJson(payload),
    signature: encodedJwt.signature,
  };

  if (!decodedJwt.header || !decodedJwt.payload || !decodedJwt.signature) {
    return null;
  }

  return decodedJwt;
};

export const splitJwt = (jwt: string): EncodedJwt => {
  const jwtSegments = jwt.split('.');
  if (jwtSegments.length !== 3) return null;
  const [header, payload, signature] = jwtSegments;
  return {
    header,
    payload,
    signature,
  };
};
