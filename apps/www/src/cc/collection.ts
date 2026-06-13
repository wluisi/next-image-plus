import { registry } from "./shared";
import { Sort, QueryFilter } from "./types";
import { filterByField, sortByField } from "@graphinery/core";

export interface GetCollectionOptions {
  limit?: number;
  page?: number;
  sort?: Sort;
  filter: QueryFilter;
}

export function getCollection<K extends keyof typeof registry>(
  collection: K,
  options?: GetCollectionOptions
): (typeof registry)[K] {
  type Entry = (typeof registry)[K][number];
  let entries: Entry[] = registry[collection] as Entry[];

  if (options?.filter) {
    entries = filterByField({ items: entries, filter: options.filter });
  }

  entries = sortByField({
    items: entries,
    field: (options?.sort?.field ?? "title") as keyof Entry,
    direction: (options?.sort?.direction ?? "ASC") as "ASC" | "DESC",
  });

  return entries as (typeof registry)[K];
}

export function getEntry<K extends keyof typeof registry>(
  path: string,
  { collection }: { collection: K }
): (typeof registry)[K][number] | undefined {
  return registry[collection].find((entry) => entry._path === path) as
    | (typeof registry)[K][number]
    | undefined;
}
