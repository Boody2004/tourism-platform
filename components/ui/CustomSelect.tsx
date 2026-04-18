"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function placeholderCustomSelect({
  options,
  value,
  onChange,
  placeholder = "Select...",
  className = "",
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 bg-white border rounded-xl text-sm ${
          open
            ? "focus:ring-2 focus:ring-brand-400"
            : "border-slate-200 hover:border-brand-300"
        }`}
      >
        <span className={selected ? "text-slate-700 " : "text-slate-400"}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          size={15}
          className={`text-slate-400 shrink-0 transition-transform duration-200 ${
            open ? "rotate-180 text-brand-500" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1.5 bg-white border border-slate-100 rounded-xl shadow-2xl overflow-hidden">
          {/* All / clear option */}
          <button
            type="button"
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
              !value
                ? "text-brand-600 bg-brand-50"
                : "text-slate-600 hover:text-brand-600 hover:bg-brand-50"
            }`}
          >
            {placeholder}
          </button>

          {/* Options */}
          <div className="max-h-56 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                  value === option.value
                    ? "text-brand-600 bg-brand-50"
                    : "text-slate-600 hover:text-brand-600 hover:bg-brand-50"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
