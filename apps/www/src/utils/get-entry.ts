import { allBlogs, allPages, allTags } from "content-collections";

const registry = {
  blog: allBlogs,
  page: allPages,
  tag: allTags,
};

export function getEntry<K extends keyof typeof registry>(
  slug: string,
  { collection }: { collection: K }
): (typeof registry)[K][number] | undefined {
  return registry[collection].find((entry) => entry._meta.path === slug) as
    | (typeof registry)[K][number]
    | undefined;
}
