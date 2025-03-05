import * as React from "react";

export interface ContentComponentsProps<T> {
  /** The content for a content field. An array of objects. */
  content: ContentComponentsItem[];
  /** A map of components, keyed by type name. */
  components: T;
}

export interface ContentComponentsItem {
  id: string;
  __typename: string;
}

export function ContentComponents<T extends Record<string, any>>({
  content,
  components,
}: ContentComponentsProps<T>) {
  return (
    <>
      {content &&
        content.map((item: ContentComponentsItem) => {
          if (
            item !== null &&
            typeof components[item["__typename"]] !== "undefined"
          ) {
            const componentType = components[item["__typename"]];

            return React.createElement(componentType, {
              key: `${item.__typename}-${item.id}`,
              ...item,
            });
          }
        })}
    </>
  );
}
