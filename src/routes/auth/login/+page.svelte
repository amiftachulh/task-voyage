<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import Input from "$lib/components/Input.svelte";
  import { Control, Field, FieldErrors, Label } from "formsnap";
  import { superForm } from "sveltekit-superforms";

  export let data;

  const form = superForm(data.form);
  const { form: formData, errors, enhance } = form;
</script>

<svelte:head>
  <title>Login • Task Voyage</title>
</svelte:head>

<form
  method="post"
  class="w-full max-w-sm p-6 sm:rounded-lg sm:bg-surface sm:shadow-md"
  use:enhance
>
  <h1 class="text-center text-2xl font-semibold">Login</h1>
  <div class="grid gap-4 text-sm">
    <div>
      <Field {form} name="emailOrUsername">
        <Control let:attrs>
          <Label>Email or username</Label>
          <Input {...attrs} autocomplete="off" bind:value={$formData.emailOrUsername} />
        </Control>
        <FieldErrors class="text-red-600" />
      </Field>
    </div>
    <div>
      <Field {form} name="password">
        <Control let:attrs>
          <Label>Password</Label>
          <Input {...attrs} type="password" bind:value={$formData.password} />
        </Control>
        <FieldErrors class="text-red-600" />
      </Field>
    </div>
  </div>
  <div class="mt-4 text-center">
    <Button class="h-10 w-full">Login</Button>
    <a href="/auth/register" class="text-sm text-blue-600 hover:underline">
      Don't have an account? Register
    </a>
  </div>
</form>
