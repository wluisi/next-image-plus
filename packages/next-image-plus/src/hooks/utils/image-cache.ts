export const imagesCache = new Map<string, HTMLImageElement>();

export function hasCachedImage(src: string): boolean {
  return imagesCache.has(src);
}

export function cacheImage(src: string, img: HTMLImageElement): void {
  imagesCache.set(src, img);
}
