import { getContent } from "./../utils/get-content";

export default async function HomePage() {
  const page = await getContent("home");

  return (
    <>
      <h1>next-image-extras www</h1>
      {page.content}
    </>
  );
}
