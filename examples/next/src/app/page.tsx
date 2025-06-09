import Link from "next/link";

export default function Home() {
  return (
    <div className="grid p-10">
      <h1>Home</h1>
      <ul>
        <li>
          <Link href="/picture">Picture Component</Link>
        </li>
        <li>
          <Link href="/background-image">BackgroundImage Component</Link>
        </li>
      </ul>
    </div>
  );
}
