import { Tabs, TabsContent, TabsList, TabsTrigger } from "@graphinery/ui";
import { default as ExamplesHero } from "./Hero";

export default function BackgroundImageExampleTabs({
  children,
}: {
  children: any;
}) {
  return (
    <Tabs defaultValue="preview">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview" className="md:my-5">
        <ExamplesHero
          title="Background image example"
          description="Create stunning websites and applications with our powerful platform. Get started today and bring your ideas to life."
        />
      </TabsContent>
      <TabsContent value="code" className="md:my-5">
        {children}
      </TabsContent>
    </Tabs>
  );
}
