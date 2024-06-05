import type { ObjectId } from "mongodb";

export type UserColl = {
  email: string;
  name: string;
  displayName: string | null;
  password: string;
  createdAt: string;
  updatedAt: string;
};

export type SessionColl = {
  _id: string;
  user: ObjectId;
  expiresAt: string;
};
