import { registry } from "./shared";
import { Sort, QueryFilter } from "./types";

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
