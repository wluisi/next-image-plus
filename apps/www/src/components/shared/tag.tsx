import * as React from "react";
import { cn } from "@graphinery/ui";

type TagProps = React.HTMLAttributes<HTMLDivElement>;

export default function Tag({ className, children }: TagProps) {
  return (
    <div
      className={cn(
        "flex items-center bg-red-400 text-red-50 text-xs font-bold px-2.5 py-0 rounded-sm w-fit",
        className
      )}
    >
      {children}
    </div>
  );
}
