import { Tabs, TabsContent, TabsList, TabsTrigger } from "@graphinery/ui";
import CardGrid from "./CardGrid";

export default function PictureExampleTabs({ children }: { children: any }) {
  return (
    <Tabs defaultValue="preview">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        <CardGrid />
      </TabsContent>
      <TabsContent value="code">
        <div className="md:my-10">{children}</div>
      </TabsContent>
    </Tabs>
  );
}
