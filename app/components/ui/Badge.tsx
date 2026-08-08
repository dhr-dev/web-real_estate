import React from "react";
import { cn } from "../../utils/cn";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "gold" | "dark" | "outline" | "sale" | "rent" | "success";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = "default", className }) => {
  const base = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors";
  
  const variants = {
    default: "bg-slate-100 text-slate-800 border border-slate-200/60",
    gold: "bg-amber-50 text-amber-900 border border-amber-200/80 font-bold",
    dark: "bg-slate-900 text-slate-100",
    outline: "bg-transparent border border-slate-300 text-slate-700",
    sale: "bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold",
    rent: "bg-indigo-50 text-indigo-800 border border-indigo-200 font-semibold",
    success: "bg-teal-50 text-teal-800 border border-teal-200 font-semibold",
  };

  return <span className={cn(base, variants[variant], className)}>{children}</span>;
};
