import { Avatar, AvatarContainer } from "./../../components/blog/avatar";

type AuthorInfoProps = {
  fullName: string;
  date: string;
};

export default function AuthorInfo({ fullName, date }: AuthorInfoProps) {
  return (
    <div className="flex items-center !mb-8">
      <AvatarContainer>
        <Avatar large={false} />
      </AvatarContainer>
      <div className="pl-2">
        <div className="flex flex-col gap-1.5">
          <span className="author-name text-sm leading-none font-bold">
            {fullName}
          </span>
          <span className="post-date text-zinc-500 text-xs leading-none">
            {date}
          </span>
        </div>
      </div>
    </div>
  );
}
