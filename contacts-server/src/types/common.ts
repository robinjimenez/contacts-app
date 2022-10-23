export type User = {
  username: string;
  email: string;
  accessToken?: string;
};

export type Literal = {
  [language: string]: string;
};
