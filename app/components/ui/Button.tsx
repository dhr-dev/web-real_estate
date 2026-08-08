import React from "react";
import { cn } from "../../utils/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none rounded-lg";

    const variants = {
      primary: "bg-slate-900 text-white hover:bg-slate-800 shadow-sm active:scale-[0.98]",
      secondary: "bg-amber-600 text-white hover:bg-amber-700 shadow-sm active:scale-[0.98]",
      outline: "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-400 active:scale-[0.98]",
      ghost: "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
      dark: "bg-slate-950 text-slate-100 hover:bg-slate-900 border border-slate-800 active:scale-[0.98]",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs font-semibold gap-1.5",
      md: "px-4 py-2.5 text-sm gap-2",
      lg: "px-6 py-3.5 text-base gap-2.5 font-semibold",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
