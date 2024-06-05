import { DB_URL } from "$env/static/private";
import type { SessionColl, UserColl } from "$lib/types/db";
import { MongoClient } from "mongodb";

const client = new MongoClient(DB_URL);

export async function connectDb() {
  return client.connect();
}

const db = client.db();

// users
export const User = db.collection<UserColl>("users");
User.createIndex({ email: 1 }, { unique: true }).catch(console.error);
User.createIndex({ name: 1 }, { unique: true }).catch(console.error);
User.createIndex({ email: 1, name: 1 }, { collation: { locale: "en_US", strength: 2 } }).catch(
  console.error
);

// sessions
export const Session = db.collection<SessionColl>("sessions");
Session.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }).catch(console.error);

// boards
export const Board = db.collection("boards");
