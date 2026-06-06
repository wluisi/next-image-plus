import type { ContentTree, ContentTreeEntry } from "./types";
import path from "path";

export function getContentTree(pages: any[]): ContentTreeEntry[] {
  const map = new Map<string, ContentTreeEntry>();

  for (const page of pages) {
    const p = page._meta.path;
    if (p === "index") {
      continue;
    }

    const entry: ContentTreeEntry = {
      id: page._path,
      title: page.title,
      path: page._path,
      url: page._path,
      parent: "/" + path.posix.dirname(p).replace(/^\.$/, ""),
      items: [],
    };

    map.set(page._path, entry);
  }

  for (const entry of map.values()) {
    const parent = map.get(entry.parent);
    if (parent) {
      parent.items = parent.items ?? [];
      parent.items.push(entry);
    }
  }

  // Return only top-level entries (those whose parent isn't in the map)
  return [...map.values()].filter((entry) => !map.has(entry.parent));
}
