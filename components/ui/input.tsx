import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-white px-3 py-1 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 hover:border-[#b8b6b0] focus:border-[#84b8ea] focus:ring-2 focus:ring-[#dcecff] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export { Input };
