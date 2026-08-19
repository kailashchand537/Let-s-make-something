import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-card border-2 p-gutter [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border-mp-ink-line bg-mp-ink-raised text-mp-paper-base",
        success: "border-mp-correct bg-mp-correct-soft text-mp-paper-base",
        destructive: "border-mp-wrong bg-mp-wrong-soft text-mp-paper-base",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

const Alert = React.forwardRef(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="status" className={cn(alertVariants({ variant }), className)} {...props} />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      "font-display text-eyebrow uppercase text-mp-paper-dim",
      className
    )}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-body-xl leading-relaxed", className)} {...props} />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
