<script lang="ts">
  import cn from "$lib/utils/cn";
  import type { HTMLInputAttributes } from "svelte/elements";

  type $$Props = HTMLInputAttributes;

  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<input
  class={cn(
    "w-full rounded border-2 border-input p-2 outline-none transition-colors duration-200 focus-visible:border-primary",
    className
  )}
  {...$$restProps}
/>
