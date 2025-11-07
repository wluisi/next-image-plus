import {
  Tag,
  TagColor,
  TagGroup as GraphineryUiTagGroup,
} from "@graphinery/ui";

import { graphql, FragmentOf, readFragment } from "./../../types";

export const TagFieldsFragment = graphql(`
  fragment TagFields on Tag @_unmask {
    id
    internalId
    title
  }
`);

interface TagGroupProps {
  tags: (FragmentOf<typeof TagFieldsFragment> | null)[];
}

export function TagGroup({ tags: blogTags }: TagGroupProps) {
  const tags = readFragment(TagFieldsFragment, blogTags);

  if (!tags) {
    return null;
  }

  const colorPaletteMap: Record<string, TagColor> = {
    article: "red",
    release: "green",
  };

  return (
    <GraphineryUiTagGroup>
      {tags.map((tag) => {
        if (!tag) {
          return null;
        }

        return (
          <Tag
            key={tag.internalId}
            variant="outline"
            colorPalette={colorPaletteMap[tag.internalId] ?? "blue"}
          >
            {tag.title.toLowerCase()}
          </Tag>
        );
      })}
    </GraphineryUiTagGroup>
  );
}
