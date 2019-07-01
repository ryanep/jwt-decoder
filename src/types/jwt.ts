export type DecodedJwt = {
  header: {
    alg: string;
    typ: string;
  };
  payload: any;
  signature: any;
};

export type EncodedJwt = {
  header: string;
  payload: string;
  signature: string;
};
