import {
  Tag,
  TagColor,
  TagGroup as GraphineryUiTagGroup,
} from "@graphinery/ui";

type Tag = {
  title: string;
  _meta: {
    path: string;
  };
};

interface TagGroupProps {
  tags: Tag[];
}

export function TagGroup({ tags }: TagGroupProps) {
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
            key={tag._meta.path}
            variant="outline"
            colorPalette={colorPaletteMap[tag._meta.path] ?? "blue"}
          >
            {tag.title.toLowerCase()}
          </Tag>
        );
      })}
    </GraphineryUiTagGroup>
  );
}
