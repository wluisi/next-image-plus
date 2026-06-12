import path from "path";
import { Document } from "@content-collections/core";

type GetBaseFieldsOptions = {
  collection: string;
  pathPrefix: string;
};

export function getBaseFields(
  document: Document,
  { collection, pathPrefix }: GetBaseFieldsOptions
) {
  const resolvedPath =
    document._meta.path === "index"
      ? pathPrefix
      : path.posix.join(pathPrefix, document._meta.path);

  return {
    _slug: document._meta.path.split("/").filter(Boolean),
    _path: resolvedPath,
    _collection: collection,
  };
}
