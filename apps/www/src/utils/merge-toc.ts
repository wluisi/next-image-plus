type TocItem = {
  id: string;
  title: string;
  level: string;
};

type Toc = {
  items:
    | ({
        id: string;
        title: string;
        level: string;
      } | null)[]
    | null;
} | null;

type PropsDoc = {
  id: string;
  internalId: string;
  title: string;
  content: string | null;
  toc: {
    items:
      | ({
          id: string;
          title: string;
          level: string;
        } | null)[]
      | null;
  } | null;
} | null;

export function mergeToc(toc?: Toc, propsDoc: PropsDoc[] = []): TocItem[] {
  const result: TocItem[] = [];

  if (!toc?.items?.length) {
    return result;
  }

  for (const item of toc.items) {
    if (!item) {
      continue;
    }

    result.push(item);

    const match = propsDoc.find((doc) => doc?.internalId === item.id);
    if (match?.toc?.items?.length) {
      for (const nestedItem of match.toc.items) {
        if (nestedItem) result.push(nestedItem);
      }
    }
  }

  return result;
}
