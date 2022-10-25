import { Types } from "mongoose";

export type User = {
  username: string;
  email: string;
  accessToken?: string;
};

export type UserWithId = User & { _id: Types.ObjectId } ;

export type Literal = {
  [language: string]: string;
};
