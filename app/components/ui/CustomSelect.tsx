import { Check, ChevronDown, LucideIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../utils/cn";

export interface CustomSelectOption {
  value: string;
  label: string;
  sublabel?: string;
}

export interface CustomSelectProps {
  options: CustomSelectOption[];
  value: string;
  onChange: (value: string) => void;
  icon?: LucideIcon;
  label?: string;
  placeholder?: string;
  className?: string;
  dropdownClassName?: string;
  size?: "sm" | "md" | "lg";
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  icon: Icon,
  label,
  placeholder = "Select...",
  className,
  dropdownClassName,
  size = "md",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "ArrowDown" && isOpen) {
      e.preventDefault();
      const currentIndex = options.findIndex((opt) => opt.value === value);
      const nextIndex = (currentIndex + 1) % options.length;
      onChange(options[nextIndex].value);
    } else if (e.key === "ArrowUp" && isOpen) {
      e.preventDefault();
      const currentIndex = options.findIndex((opt) => opt.value === value);
      const prevIndex = (currentIndex - 1 + options.length) % options.length;
      onChange(options[prevIndex].value);
    }
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {label && (
        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={cn(
          "w-full flex items-center justify-between gap-2 bg-[#f8f7f4] hover:bg-white text-slate-900 font-semibold rounded-xl border border-[#e5e3dd] focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all cursor-pointer shadow-2xs text-left",
          size === "sm" ? "px-3 py-1.5 text-xs" : size === "lg" ? "px-4 py-3 text-base" : "px-3.5 py-2.5 text-sm",
          isOpen ? "bg-white border-slate-900 ring-2 ring-slate-900/10 shadow-md" : ""
        )}
      >
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          {Icon && <Icon className="w-4 h-4 text-slate-400 shrink-0" />}
          <span className="truncate block font-semibold text-slate-900">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200",
            isOpen ? "rotate-180 text-slate-900" : ""
          )}
        />
      </button>

      {/* Custom Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          className={cn(
            "absolute left-0 right-0 mt-1.5 bg-white rounded-2xl border border-[#e5e3dd] shadow-2xl p-1.5 z-50 max-h-60 overflow-y-auto space-y-0.5 animate-in fade-in-50 zoom-in-95 duration-150",
            dropdownClassName
          )}
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-all text-left cursor-pointer",
                  isSelected
                    ? "bg-slate-900 text-white font-bold shadow-xs"
                    : "text-slate-700 hover:bg-[#f8f7f4] hover:text-slate-900"
                )}
              >
                <div className="flex flex-col">
                  <span>{option.label}</span>
                  {option.sublabel && (
                    <span
                      className={cn(
                        "text-[10px] font-normal mt-0.5",
                        isSelected ? "text-slate-300" : "text-slate-400"
                      )}
                    >
                      {option.sublabel}
                    </span>
                  )}
                </div>
                {isSelected && <Check className="w-4 h-4 text-amber-400 shrink-0 ml-2" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
