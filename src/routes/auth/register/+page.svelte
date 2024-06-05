<script>
  import Button from "$lib/components/Button.svelte";
  import Input from "$lib/components/Input.svelte";
  import { Control, Field, FieldErrors, Label } from "formsnap";
  import { superForm } from "sveltekit-superforms";

  export let data;

  const form = superForm(data.form);
  const { form: formData, errors, enhance } = form;
</script>

<svelte:head>
  <title>Register • Task Voyage</title>
</svelte:head>

<form
  method="post"
  class="w-full max-w-sm p-6 sm:rounded-lg sm:bg-surface sm:shadow-md"
  use:enhance
>
  <h1 class="text-center text-2xl font-semibold">Register</h1>
  <div class="grid gap-4 text-sm">
    <div>
      <Field {form} name="email">
        <Control let:attrs>
          <Label>Email</Label>
          <Input {...attrs} type="email" autocomplete="off" bind:value={$formData.email} />
        </Control>
        <FieldErrors class="text-red-600" />
      </Field>
    </div>
    <div>
      <Field {form} name="name">
        <Control let:attrs>
          <Label>Username</Label>
          <Input {...attrs} autocomplete="off" bind:value={$formData.name} />
        </Control>
        <FieldErrors class="text-red-600" />
      </Field>
    </div>
    <div>
      <Field {form} name="displayName">
        <Control let:attrs>
          <Label>
            Display name
            <span class="text-muted-foreground">(optional)</span>
          </Label>
          <Input {...attrs} autocomplete="off" bind:value={$formData.displayName} />
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
    <div>
      <Field {form} name="confirmPassword">
        <Control let:attrs>
          <Label>Confirm password</Label>
          <Input {...attrs} type="password" bind:value={$formData.confirmPassword} />
        </Control>
        <FieldErrors class="text-red-600" />
      </Field>
    </div>
  </div>
  <div class="mt-4 text-center">
    <Button class="h-10 w-full">Register</Button>
    <a href="/auth/login" class="text-sm text-blue-600 hover:underline">
      Already have an account? Login
    </a>
  </div>
</form>
