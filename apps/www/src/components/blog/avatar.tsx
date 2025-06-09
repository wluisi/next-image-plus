"use client";

import { cn } from "@graphinery/ui";
import Image from "next/image";
import Link from "next/link";

import avatarImage from "./../../images/wluisi-headshot-square.jpg";

export function AvatarContainer({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn(className, "h-10 w-10 rounded-full p-0.5")} {...props} />
  );
}

export function Avatar({
  large = false,
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof Link>, "href"> & {
  large?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Home"
      className={cn(className, "pointer-events-auto")}
      {...props}
    >
      <Image
        src={avatarImage}
        alt=""
        sizes={large ? "4rem" : "2.25rem"}
        className={cn(
          "rounded-full bg-zinc-100 object-cover dark:bg-zinc-800 grayscale brightness-110",
          large ? "h-16 w-16" : "h-9 w-9"
        )}
        priority
      />
    </Link>
  );
}
