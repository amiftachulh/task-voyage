import { getSession } from "$lib/server/services/users";
import { connectDb } from "./lib/server/db";
import { redirect, type Handle } from "@sveltejs/kit";

connectDb()
  .then(() => console.log("Connected to database."))
  .catch(console.error);

export const handle: Handle = async ({ event, resolve }) => {
  const { cookies } = event;
  const sessionId = cookies.get("session");
  const session = await getSession(sessionId);
  event.locals.auth = session?.user;

  if (!event.url.pathname.startsWith("/auth")) {
    if (!session) {
      redirect(303, "/auth/login");
    }
  } else {
    if (session) {
      redirect(303, "/");
    }
  }

  return await resolve(event);
};
