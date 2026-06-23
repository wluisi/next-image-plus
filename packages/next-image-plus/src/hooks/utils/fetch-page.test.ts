import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchPage } from "./fetch-page";
import { imagesCache } from "./image-cache";

const urlMock = "https://example.com/page";

describe("fetchPage()", () => {
  let originalFetch: typeof global.fetch;

  beforeEach(() => {
    imagesCache.clear();
    originalFetch = global.fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("should call fetch with the provided url.", async () => {
    const fetchSpy = vi.fn(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve("<html></html>"),
      } as Response)
    );
    global.fetch = fetchSpy;
    await fetchPage(urlMock);
    expect(fetchSpy).toHaveBeenCalledWith(urlMock);
  });

  it("should do nothing when fetch response is not ok.", async () => {
    global.fetch = vi.fn(() => Promise.resolve({ ok: false } as Response));
    await fetchPage(urlMock);
    expect(imagesCache.size).toBe(0);
  });
});
