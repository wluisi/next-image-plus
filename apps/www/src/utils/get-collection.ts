import { allBlogs, allTags } from "content-collections";
import { Sort, QueryFilter } from "./types";

const registry = {
  blog: allBlogs,
  tag: allTags,
};

export interface GetCollectionOptions {
  limit: number;
  page: number;
  sort: Sort;
  filter: QueryFilter;
}

export function getCollection<K extends keyof typeof registry>(
  collection: K
): (typeof registry)[K] {
  return registry[collection];
}
