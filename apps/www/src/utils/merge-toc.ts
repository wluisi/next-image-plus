type TocItem = {
  id: string;
  title: string;
  level: string;
};

type Toc = ({ id: string; title: string; level: string } | null)[] | null;

type PropsDoc = {
  title: string;
  content: string | null;
  _meta: {
    filePath: string;
    fileName: string;
    directory: string;
    extension: string;
    path: string;
  };
  toc: ({ id: string; title: string; level: string } | null)[] | null;
} | null;

export function mergeToc(toc?: Toc, propsDoc: PropsDoc[] = []): TocItem[] {
  const result: TocItem[] = [];

  if (!toc?.length) {
    return result;
  }

  for (const item of toc) {
    if (!item) {
      continue;
    }

    result.push(item);

    const match = propsDoc.find((doc) => doc?._meta.path === item.id);
    if (match?.toc?.length) {
      for (const nestedItem of match.toc) {
        if (nestedItem) result.push(nestedItem);
      }
    }
  }

  return result;
}
