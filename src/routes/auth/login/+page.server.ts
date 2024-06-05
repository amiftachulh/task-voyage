import { loginSchema } from "$lib/schemas/auth";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { Actions, PageServerLoad } from "./$types";
import { createSession } from "$lib/server/services/users";
import { verify } from "@node-rs/argon2";
import { User } from "$lib/server/db";

export const load: PageServerLoad = async () => {
  return { form: await superValidate(zod(loginSchema)) };
};

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const form = await superValidate(request, zod(loginSchema));
    if (!form.valid) {
      return fail(400, { form });
    }

    const { emailOrUsername, password } = form.data;
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { name: emailOrUsername }],
    });
    if (!user) {
      return fail(401, { form });
    }

    const match = await verify(user.password, password);
    if (!match) {
      return fail(401, { form });
    }

    try {
      const { session, expiresAt } = await createSession(user._id);
      cookies.set("session", session, {
        path: "/",
        expires: expiresAt,
      });
    } catch (error) {
      console.log(error);
      return fail(500, { form });
    }
    redirect(303, "/");
  },
};
