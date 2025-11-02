type TocItem = {
  id: string;
  title: string;
  level: string;
};

type Toc = {
  items?: TocItem[];
};

type PropsDoc = {
  internalId: string;
  toc?: Toc;
};

export function mergeToc(toc?: Toc, propsDoc: PropsDoc[] = []): TocItem[] {
  const result: TocItem[] = [];

  if (!toc?.items?.length) {
    return result;
  }

  for (const item of toc.items) {
    result.push(item);

    const match = propsDoc.find((doc) => doc.internalId === item.id);
    if (match?.toc?.items?.length) {
      result.push(...match.toc.items);
    }
  }

  return result;
}
