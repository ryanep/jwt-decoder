import { DecodedJwt } from '../types/jwt';

export const decode = (jwt: string): DecodedJwt => {
  const jwtSegments = jwt.split('.');

  if (jwtSegments.length !== 3) {
    throw new Error('Invalid JWT: Incorrect number of segments');
  }

  const decoded = [jwtSegments[0], jwtSegments[1]].map(segment => {
    return window.atob(segment);
  });

  const [header, payload] = decoded;
  const decodedJwt: DecodedJwt = {
    header: JSON.parse(header),
    payload: JSON.parse(payload),
    signature: jwtSegments[2],
  };

  return decodedJwt;
};
