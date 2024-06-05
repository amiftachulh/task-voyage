import type { RegisterSchema } from "$lib/schemas/auth";
import { hash } from "@node-rs/argon2";
import { encodeBase64 } from "../utils/encode";
import { User, Session } from "../db";
import type { ObjectId } from "mongodb";

export async function isEmailOrUsernameExists(email: string, username: string) {
  const user = await User.findOne({ $or: [{ email }, { name: username }] });
  if (!user) return null;
  return {
    email: user?.email === email,
    username: user?.name === username,
  };
}

export async function createUser(payload: Omit<RegisterSchema, "confirmPassword">) {
  const { password, ...data } = payload;
  const hashedPassword = await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1,
  });
  const createdAt = new Date().toISOString();
  await User.insertOne({ ...data, password: hashedPassword, createdAt, updatedAt: createdAt });
}

export async function createSession(userId: ObjectId) {
  const sessionId = encodeBase64(crypto.getRandomValues(new Uint8Array(25)));
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);
  await Session.insertOne({
    _id: sessionId,
    user: userId,
    expiresAt: expiresAt.toISOString(),
  });
  return { session: sessionId, expiresAt };
}

export async function getSession(sessionId?: string) {
  if (!sessionId) return null;
  const session = await Session.aggregate([
    {
      $match: { _id: sessionId },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        pipeline: [{ $project: { password: 0 } }],
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
  ]).toArray();
  if (session.length < 1) return null;
  return session[0];
}
