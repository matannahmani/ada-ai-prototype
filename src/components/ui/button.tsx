import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full px-8 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        success: "bg-success text-success-foreground hover:bg-success/90",
        outline:
          "border-[3px] font-semibold border-input hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
        facebook: "bg-facebook text-facebook-foreground hover:bg-facebook/90",
        google: "bg-google text-google-foreground hover:bg-google/90",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        xl: "h-12 px-10 text-lg",
        "2xl": "h-14 px-12 text-xl",
        "3xl": "h-16 px-14 text-xl",
        xs: "h-6 text-xs px-2",
        icon: "h-10 w-10",
      },
      outlineColor: {
        default:
          "ring-primary hover:fill-primary-foreground fill-primary text-primary border-primary hover:bg-primary/90 hover:text-primary-foreground",
        destructive:
          "ring-destructive text-destructive border-destructive hover:bg-destructive/90 hover:text-destructive-foreground",
        success:
          "ring-success text-success border-success hover:bg-success/90 hover:text-success-foreground",
        accent:
          "ring-accent text-accent border-accent hover:bg-accent/90 hover:text-accent-foreground",
        secondary:
          "ring-secondary text-secondary border-secondary hover:bg-secondary/80 hover:text-secondary-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, outlineColor, size, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            size,
            className,
            outlineColor,
          })
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
