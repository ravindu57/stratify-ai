import React, { ReactNode } from "react";

export function Button({
  children,
  onClick,
  className = "",
  variant = "default",
  ...props
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "outline";
  [key: string]: any;
}) {
  const baseClass =
    "rounded-2xl font-medium transition px-6 py-3 inline-flex items-center justify-center gap-2";
  const variantClass =
    variant === "outline"
      ? "border border-white/15 bg-white/5 text-white hover:bg-white/10"
      : "bg-cyan-400 text-black hover:bg-cyan-300";

  return (
    <button
      onClick={onClick}
      className={`${baseClass} ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Card({
  children,
  className = "",
  ...props
}: {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}) {
  return (
    <div
      className={`rounded-[28px] border border-white/10 bg-white/[0.045] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export function Input({
  placeholder,
  className = "",
  ...props
}: {
  placeholder?: string;
  className?: string;
  [key: string]: any;
}) {
  return (
    <input
      placeholder={placeholder}
      className={`h-12 rounded-2xl border border-white/10 bg-white/5 px-4 text-white placeholder:text-white/45 focus:outline-none focus:border-white/20 focus:bg-white/10 ${className}`}
      {...props}
    />
  );
}

export function Textarea({
  placeholder,
  className = "",
  ...props
}: {
  placeholder?: string;
  className?: string;
  [key: string]: any;
}) {
  return (
    <textarea
      placeholder={placeholder}
      className={`min-h-[160px] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/45 focus:outline-none focus:border-white/20 focus:bg-white/10 ${className}`}
      {...props}
    />
  );
}
