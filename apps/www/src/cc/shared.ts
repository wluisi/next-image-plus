import { allBlogs, allPages, allTags, allPropsDocs } from "content-collections";

export const registry = {
  blog: allBlogs,
  page: allPages,
  propsDoc: allPropsDocs,
  tag: allTags,
};
