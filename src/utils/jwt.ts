import { DecodedJwt, EncodedJwt } from '../types/jwt';

export const decode = (encodedJwt: EncodedJwt): DecodedJwt => {
  if (!encodedJwt.header || !encodedJwt.payload || !encodedJwt.signature) {
    throw new Error('Invalid JWT: Incorrect number of segments');
  }

  const decoded = [encodedJwt.header, encodedJwt.payload].map(segment =>
    window.atob(segment),
  );

  try {
    const [header, payload] = decoded;
    const decodedJwt: DecodedJwt = {
      header: JSON.parse(header),
      payload: JSON.parse(payload),
      signature: encodedJwt.signature,
    };
    return decodedJwt;
  } catch {
    throw new Error('Invalid JWT: Payload invalid');
  }
};

export const split = (jwt: string): EncodedJwt => {
  const jwtSegments = jwt.split('.');
  const [header, payload, signature] = jwtSegments;
  return {
    header,
    payload,
    signature,
  };
};

export const isValid = (encodedJwt: EncodedJwt): boolean => {
  return !!encodedJwt.header && !!encodedJwt.payload && !!encodedJwt.signature;
};
