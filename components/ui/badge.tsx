import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium leading-4",
  {
    variants: {
      variant: {
        default: "border-transparent bg-foreground text-white",
        secondary: "border-transparent bg-muted text-muted-foreground",
        outline: "border-border bg-white text-muted-foreground",
        blue: "border-[#c8def5] bg-[#edf6ff] text-[#1b6ca8]",
        green: "border-[#bfe1ca] bg-[#edf8f0] text-[#267047]",
        amber: "border-[#ead7ad] bg-[#fbf4df] text-[#815f20]",
        violet: "border-[#d8ccef] bg-[#f4effc] text-[#694e9e]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
