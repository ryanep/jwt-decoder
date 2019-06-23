export interface Jwt {
  header: {
    alg: string;
    typ: string;
  };
  body: any;
  signature: any;
};
