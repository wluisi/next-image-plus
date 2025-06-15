import * as React from "react";
import { cn } from "@graphinery/ui";

interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  colorPalette?: keyof typeof tagColorMap | null;
}

const tagColorMap = {
  default: {
    border: "border-zinc-400",
    text: "text-zinc-500 dark:text-zinc-300",
  },
  blue: {
    border: "border-blue-400",
    text: "text-blue-600 dark:text-blue-300",
  },
  green: {
    border: "border-green-400",
    text: "text-green-700 dark:text-green-300",
  },
  red: {
    border: "border-red-400",
    text: "text-red-600 dark:text-red-300",
  },
  teal: {
    border: "border-teal-400",
    text: "text-teal-700 dark:text-teal-200",
  },
} as const;

export type TagColor = keyof typeof tagColorMap;

export default function Tag({
  colorPalette = null,
  className,
  children,
  ...props
}: TagProps) {
  const { border: borderColor, text: textColor } =
    tagColorMap[colorPalette ?? "default"];

  return (
    <div
      className={cn(
        "flex items-center text-xs font-bold px-2.5 py-0 border-[1.5px] rounded-md w-fit",
        borderColor,
        textColor,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
