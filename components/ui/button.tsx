import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4",
  {
    variants: {
      variant: {
        default: "bg-foreground text-white hover:bg-primary",
        secondary:
          "bg-surface text-foreground border border-border hover:bg-surface-muted",
        violet:
          "bg-surface text-violet border border-violet/40 hover:bg-violet-soft",
        ghost: "hover:bg-surface-muted text-foreground",
        link: "text-primary underline-offset-4 hover:underline px-0",
      },
      size: {
        default: "h-11 min-h-11 px-4",
        sm: "h-11 min-h-11 px-4 text-xs",
        lg: "h-11 min-h-11 px-5",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
