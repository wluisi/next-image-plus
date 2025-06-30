import * as React from "react";
import { cn } from "@graphinery/ui";

/**
 * Filters the given React children and returns only valid React elements.
 *
 * @param children - The React node(s) to filter.
 * @returns An array of valid React elements.
 */
function getValidReactChildren(
  children: React.ReactNode
): React.ReactElement[] {
  return React.Children.toArray(children).filter((child) =>
    React.isValidElement(child)
  ) as React.ReactElement[];
}

const badgeColorMap = {
  default: {
    bg: "bg-teal-50 dark:bg-zinc-800",
    text: "text-teal-600 dark:text-teal-100",
    border: "border-teal-600",
  },
  red: {
    bg: "bg-red-50 dark:bg-zinc-800",
    text: "text-red-600 dark:text-red-300",
    border: "border-red-600",
  },
  blue: {
    bg: "bg-blue-50 dark:bg-zinc-800",
    text: "text-blue-600 dark:text-blue-100",
    border: "border-blue-600",
  },
  green: {
    bg: "bg-green-50 dark:bg-zinc-800",
    text: "text-green-600 dark:text-green-100",
    border: "border-green-600",
  },
  purple: {
    bg: "bg-purple-50 dark:bg-zinc-800",
    text: "text-purple-600 dark:text-purple-100",
    border: "border-purple-600",
  },
  yellow: {
    bg: "bg-yellow-50 dark:bg-zinc-800",
    text: "text-yellow-700 dark:text-yellow-100",
    border: "border-yellow-600",
  },
} as const;

export type BadgeColor = keyof typeof badgeColorMap;

const sizeMap = {
  default: {
    text: "text-base",
    icon: "h-6 w-6",
  },
  xs: {
    text: "text-xs",
    icon: "h-4 w-4",
  },
  sm: {
    text: "text-sm",
    icon: "h-4 w-4",
  },
} as const;

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  colorPalette?: keyof typeof badgeColorMap | null;
  size?: keyof typeof sizeMap | null;
  className?: string;
}

export default function Badge({
  children,
  colorPalette = null,
  size = "default",
  className,
}: BadgeProps) {
  const { bg: bgColor, text: textColor } =
    badgeColorMap[colorPalette ?? "default"];

  const { icon: iconSize, text: textSize } = sizeMap[size ?? "default"];

  const childrenValidated = getValidReactChildren(children);

  // const parentClass =
  //   "badge flex items-center flex-row mb-2 w-fit bg-red-50 dark:bg-zinc-800 py-2 px-3 rounded-sm";

  const parentClass = cn(
    "badge flex items-center flex-row mb-2 w-fit py-2 px-3 rounded-sm",
    bgColor,
    className
  );

  // const textClass = "font-bold text-red-600 dark:text-red-300 [&>p]:m-0";
  const textClass = cn("font-bold [&>p]:m-0", textColor, textSize);

  if (childrenValidated.length === 1) {
    return (
      <div className={parentClass}>
        <div className={textClass}>{childrenValidated[0]}</div>
      </div>
    );
  }

  if (childrenValidated.length === 2) {
    const icon = React.cloneElement(
      childrenValidated[0] as React.ReactElement<any>,
      {
        className: cn("shrink-0 mr-3", iconSize, textColor),
      }
    );

    const text = childrenValidated[1];

    return (
      <div className={parentClass}>
        {icon}
        <div className={textClass}>{text}</div>
      </div>
    );
  }

  return null;
}

// @todo make sure new version colors match this.
// export default function Badge() {
//   return (
//     <div className="flex items-center flex-row mb-2 w-fit bg-red-50 dark:bg-zinc-800 py-2 px-3 rounded-sm">
//       <ImageIcon className="h-6 w-6 shrink-0 mr-3 text-red-600 dark:text-red-300" />
//       <div className="font-bold text-sm text-red-600 dark:text-red-300">
//         Responsive Images
//       </div>
//     </div>
//   );
// }
