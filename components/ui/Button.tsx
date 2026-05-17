import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        coral:
          "bg-coral text-white shadow-sm hover:bg-coral-dark focus-visible:ring-coral",
        primary:
          "bg-primary text-white shadow-sm hover:bg-primary-dark focus-visible:ring-primary",
        outlineLight:
          "border border-white/40 bg-transparent text-white hover:bg-white/10 focus-visible:ring-white",
        outlineDark:
          "border border-primary/30 bg-white text-primary-dark hover:bg-primary/5 focus-visible:ring-primary",
        ghost:
          "bg-transparent text-primary-dark hover:bg-primary/5 focus-visible:ring-primary",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-6",
        lg: "h-12 px-7 text-base",
      },
    },
    defaultVariants: {
      variant: "coral",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
