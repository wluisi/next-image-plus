import * as React from "react";
import propsJson from "../../../../generated/props.json";
import { CodeSnippet, HeadingAnchorLink } from "@graphinery/ui";

export function PropsTable({ name }: { name: string }) {
  const component = propsJson.find((c) => c.component === name); // <-- use 'component' here
  if (!component) return <p>No props found for {name}</p>;

  return (
    <div className="overflow-x-auto" tabIndex={0}>
      <table>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Example</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {component.props.map((prop) => (
            <tr key={prop.name}>
              <td>{prop.name}</td>
              <td>
                {prop.examples && prop.examples.length
                  ? prop.examples.map((e, i) => <code key={i}>{e}</code>)
                  : "-"}
              </td>
              <td>{prop.type}</td>
              <td>{prop.required ? "Required" : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ComponentPropsDescriptionSet({ name }: { name: string }) {
  const component = propsJson.find((c) => c.component === name); // <-- use 'component' here
  if (!component) return <p>No props found for {name}</p>;

  console.log("component.props", component.props);

  // @todo
  // - use HeadingAnchorLink instead of <h3>
  // - something

  return component.props.map((prop) => {
    return (
      <>
        <HeadingAnchorLink
          key={prop.name}
          // className="text-1xl font-bold mb-5 heading-anchor-link flex items-center"
          level="h3"
          title={prop.name}
        />

        {prop.examples.length > 0 && (
          <CodeSnippet
            language="ts"
            code={prop.examples[0]}
            theme="material-theme-palenight"
            colorReplacements={{
              "#676e95": "#b9bbcb",
            }}
          />
        )}
        <p>{prop.description}</p>
      </>
    );
  });
}
