import * as React from "react";
import propsJson from "../../../../generated/props.json";

export function PropsTable({ name }: { name: string }) {
  const component = propsJson.find((c) => c.component === name);

  if (!component) {
    return null;
  }

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
