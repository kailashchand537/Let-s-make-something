import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-3 rounded-pill font-display font-bold uppercase tracking-[0.14em] transition-all duration-200 ease-stage disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        default:
          "bg-mp-accent text-mp-ink-base hover:bg-mp-accent-press hover:shadow-accent active:scale-[0.98]",
        ghost:
          "bg-transparent text-mp-paper-dim hover:bg-mp-ink-hover hover:text-mp-paper-base",
        outline:
          "border-2 border-mp-ink-line bg-transparent text-mp-paper-base hover:border-mp-accent hover:text-mp-accent",
        hot: "bg-mp-hot text-mp-paper-pure hover:brightness-110 active:scale-[0.98]",
      },
      size: {
        default: "h-14 px-8 text-sm",
        lg: "h-16 px-10 text-base",
        icon: "h-14 w-14",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => (
  <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
));
Button.displayName = "Button";

export { Button, buttonVariants };
