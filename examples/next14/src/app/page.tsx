import * as React from "react";
import Link from "next/link";

export default async function Home() {
  return (
    <div>
      <h1>Next 14 Examples</h1>
      <ul>
        <li>
          <Link href="/picture">Picture example (app router)</Link>
        </li>
        <li>
          <Link href="/background">BackgroundImage example (app router)</Link>
        </li>
        <li>
          <Link href="/pages-examples/picture">
            Picture example (pages router)
          </Link>
        </li>
        <li>
          <Link href="/pages-examples/background">
            BackgroundImage example (pages router)
          </Link>
        </li>
      </ul>
    </div>
  );
}
