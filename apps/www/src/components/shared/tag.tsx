import { cn } from "@graphinery/ui";

type TagProps = React.HTMLAttributes<HTMLDivElement>;

export default function Tag({ className, children }: TagProps) {
  return (
    <div
      className={cn(
        "bg-red-200 text-red-900 px-3 rounded-lg text-sm font-bold leading-7",
        className
      )}
    >
      {children}
    </div>
  );
}
