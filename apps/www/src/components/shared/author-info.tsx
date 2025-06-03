import { Avatar, AvatarContainer } from "./../../components/blog/avatar";

type AuthorInfoProps = {
  fullName: string;
  handle: string;
};

export default function AuthorInfo({ fullName, handle }: AuthorInfoProps) {
  return (
    <div className="flex items-center !mb-10">
      <AvatarContainer>
        <Avatar large={false} />
      </AvatarContainer>
      <div className="pl-2">
        <div className="flex flex-col leading-tight">
          <span className="author-name text-sm leading-tight font-bold">
            {fullName}
          </span>
          <span className="author-handle text-xs text-zinc-700 dark:text-zinc-300 leading-tight">
            {handle}
          </span>
        </div>
      </div>
    </div>
  );
}
