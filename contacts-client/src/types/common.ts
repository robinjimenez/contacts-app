export type User = {
  id: string;
  username: string;
  email: string;
  accessToken: string;
};

export type Literal = {
  [language: string]: string;
};
