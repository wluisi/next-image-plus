import { ContentTreeEntry } from "./types";

type GetActiveTrailOptions = { contentTree: ContentTreeEntry[] };

export function getActiveTrail(
  currentPath: string,
  { contentTree }: GetActiveTrailOptions
): ContentTreeEntry[] {
  const map = new Map<string, ContentTreeEntry>();

  function flatten(entries: ContentTreeEntry[]) {
    for (const entry of entries) {
      map.set(entry.path, entry);
      if (entry.items?.length) {
        flatten(entry.items);
      }
    }
  }

  flatten(contentTree);

  const activeTrail: ContentTreeEntry[] = [];
  let current = map.get(currentPath);

  while (current) {
    activeTrail.unshift(current);
    current = map.get(current.parent);
  }

  return activeTrail;
}
