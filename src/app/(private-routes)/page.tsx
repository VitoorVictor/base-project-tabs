import { TabPagesRender } from "@/components/TabPagesRender";
import { TabManager } from "@/components/TabManager";

export default function HomePage() {
  return (
    <TabManager>
      <TabPagesRender />
    </TabManager>
  );
}
