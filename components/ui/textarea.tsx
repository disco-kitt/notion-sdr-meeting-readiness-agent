import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn(
        "flex min-h-[84px] w-full resize-none rounded-md border border-input bg-white px-3 py-2 text-sm leading-6 outline-none transition-colors placeholder:text-muted-foreground/70 hover:border-[#b8b6b0] focus:border-[#84b8ea] focus:ring-2 focus:ring-[#dcecff] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";

export { Textarea };
