import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-white text-black border-slate-200 border-2 hover:bg-slate-100 text-slate-500",
        primary: "bg-sky-400 text-primary-foreground hover:bg-sky-400/90 border-sky-500",
        primaryOutline: "bg-white text-sky-500 hover:bg-slate-100",
        secondary: "bg-black/15 text-primary-foreground hover:bg-black/5 border-black/25",
        secondaryOutline: "bg-white text-black/25 hover:bg-slate-100",
        rose: "bg-gradient-to-r from-[#CC95C0] via-[#DBD4B4] to-[#7AA1D2] text-primary-foreground text-black/65 hover:opacity-80 border-black/15",
        roseOutline: "bg-white text-black/25 hover:opacity-80",
        ghost: "bg-transparent text-black border-transparent border-0 hover:bg-slate-100",
        sidebar: "bg-transparent text-black/80 border-1 border-transparent hover:bg-black/25 transition-none",
        sidebarOutline: "bg-black/15 text-black/80 border-black/25 border-1 hover:bg-black/25 transition-none"
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
        rounded: "rounded-full"
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
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
