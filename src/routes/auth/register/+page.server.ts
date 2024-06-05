import { registerSchema } from "$lib/schemas/auth";
import { createUser, isEmailOrUsernameExists } from "$lib/server/services/users";
import { fail, redirect } from "@sveltejs/kit";
import { setError, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  return { form: await superValidate(zod(registerSchema)) };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod(registerSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    const { email, name, displayName, password } = form.data;
    const duplicate = await isEmailOrUsernameExists(email, name);
    if (duplicate) {
      if (duplicate.username) setError(form, "name", "Username already exists.");
      if (duplicate.email) setError(form, "email", "Email already exists.");
      return fail(400, { form });
    }

    try {
      await createUser({ email, name, displayName, password });
    } catch (error) {
      console.error("Failed to register:", error);
      return fail(500, { form });
    }

    redirect(303, "/auth/login");
  },
};
