import { Jwt } from './types/jwt';

export const decode = (jwt: string): Jwt => {
  const jwtSegments = jwt.split('.');

  if (jwtSegments.length !== 3) {
    throw new Error('Invalid JWT: Incorrect number of segments');
  }

  const decoded = [jwtSegments[0], jwtSegments[1]].map(segment => {
    return window.atob(segment);
  });

  const [header, body] = decoded;
  const decodedJwt: Jwt = {
    header: JSON.parse(header),
    body: JSON.parse(body),
    signature: jwtSegments[2],
  };

  return decodedJwt;
};
