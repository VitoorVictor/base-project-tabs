import { TabContentRender } from "@/components/TabContentRender";
import { TabManager } from "@/components/TabManager";

export default function HomePage() {
  return (
    <TabManager>
      <TabContentRender />
    </TabManager>
  );
}
