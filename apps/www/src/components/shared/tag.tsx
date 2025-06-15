import * as React from "react";
import { cn } from "@graphinery/ui";

interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  colorPalette?: string | null;
}

const tagColorMap: any = {
  default: {
    bg: "border-zinc-400",
    text: "text-zinc-500 dark:text-zinc-300",
  },
  blue: {
    bg: "border-blue-400",
    text: "text-blue-600 dark:text-blue-300",
  },
  green: {
    bg: "border-green-400",
    text: "text-green-700 dark:text-green-300",
  },
  red: {
    bg: "border-red-400",
    text: "text-red-600 dark:text-red-300",
  },
  teal: {
    bg: "border-teal-400",
    text: "text-teal-700 dark:text-teal-200",
  },
};

export default function Tag({
  colorPalette = null,
  className,
  children,
}: TagProps) {
  const bgColor = colorPalette
    ? tagColorMap[colorPalette].bg
    : tagColorMap["default"].bg;

  const textColor = colorPalette
    ? tagColorMap[colorPalette].text
    : tagColorMap["default"].text;

  return (
    <div
      className={cn(
        "flex items-center text-xs font-bold px-2.5 py-0 border-[1.5px] rounded-md w-fit",
        `${bgColor} ${textColor}`,
        className
      )}
    >
      {children}
    </div>
  );
}
