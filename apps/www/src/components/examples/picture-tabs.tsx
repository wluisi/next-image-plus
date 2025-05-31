import { Tabs, TabsContent, TabsList, TabsTrigger } from "@graphinery/ui";
import { default as ExamplesCardGrid } from "./CardGrid";

export default function PictureExampleTabs({ children }: { children: any }) {
  return (
    <Tabs defaultValue="preview">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        <ExamplesCardGrid />
      </TabsContent>
      <TabsContent value="code">
        <div className="md:my-10">{children}</div>
      </TabsContent>
    </Tabs>
  );
}
