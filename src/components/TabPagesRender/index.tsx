"use client";
import { useTabStore } from "@/store/tabStore";

export function TabPagesRender() {
  const { activeKey, tabs } = useTabStore();

  if (!activeKey) return <div>Nenhuma aba ativa</div>;

  const tab = tabs.find((tab) => tab.key === activeKey);
  return tab ? <tab.component /> : <div>Tela não encontrada</div>;
}
