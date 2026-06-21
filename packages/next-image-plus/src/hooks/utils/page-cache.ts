const fetchedPages = new Set<string>();

export function hasFetchedPage(url: string): boolean {
  return fetchedPages.has(url);
}

export function addFetchedPage(url: string): void {
  fetchedPages.add(url);
}
