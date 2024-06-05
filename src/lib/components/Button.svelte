<script lang="ts">
  import cn from "$lib/utils/cn";
  import { Button } from "bits-ui";
  import { type VariantProps, tv } from "tailwind-variants";

  type ButtonProps = Button.Props & {
    variant?: VariantProps<typeof buttonVariants>["variant"];
    size?: VariantProps<typeof buttonVariants>["size"];
  };

  type $$Props = ButtonProps;

  const buttonVariants = tv({
    base: "rounded text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50",
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        outline: "border border-primary text-primary hover:bg-primary/10",
      },
      size: {
        default: "px-4 py-2",
        sm: "px-3",
        lg: "px-8",
        icon: "w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  });

  let className: $$Props["class"] = undefined;
  export { className as class };
  export let variant: $$Props["variant"] = "default";
  export let size: $$Props["size"] = "default";
</script>

<Button.Root class={cn(buttonVariants({ variant, size, className }))} {...$$restProps}>
  <slot />
</Button.Root>
