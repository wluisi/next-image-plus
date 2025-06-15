import Image from "next/image";
import avatarImage from "./../../images/wluisi-headshot-square.jpg";

type AuthorInfoProps = {
  fullName: string;
  date: string;
};

export default function AuthorInfo({ fullName, date }: AuthorInfoProps) {
  return (
    <div className="flex items-center !mb-8">
      <Image
        src={avatarImage}
        alt=""
        className="h-9 w-9 rounded-full bg-zinc-100 object-cover dark:bg-zinc-800 grayscale brightness-110"
        width={72}
        height={72}
        priority
      />
      <div className="pl-2">
        <div className="flex flex-col gap-1.5">
          <span className="author-name text-sm leading-none font-bold">
            {fullName}
          </span>
          <span className="post-date text-zinc-500 dark:text-zinc-400 text-xs leading-none">
            {date}
          </span>
        </div>
      </div>
    </div>
  );
}
