// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { Auth } from "$lib/types/auth";

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      auth: Auth | null;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
