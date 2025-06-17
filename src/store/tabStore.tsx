import { create } from "zustand";
import { ComponentType } from "react";
import { DashboardContent } from "@/components/Contents/Dashboard/dashboard-content";

type Tab = {
  key: string;
  title: string;
  component: ComponentType;
  unsavedChanges?: boolean;
};
type TabStore = {
  tabs: Tab[];
  activeKey: string;
  openTab: (tab: Tab) => void;
  closeTab: (key: string) => void;
  setActiveKey: (key: string) => void;
  updateTab: (key: string, data: Partial<Tab>) => void;
};

export const useTabStore = create<TabStore>((set) => ({
  tabs: [
    {
      key: "dashboard",
      title: "Dashboard",
      component: DashboardContent,
    },
  ],
  activeKey: "dashboard",
  openTab: (tab) =>
    set((s) => ({
      tabs: s.tabs.find((t) => t.key === tab.key) ? s.tabs : [...s.tabs, tab],
      activeKey: tab.key,
    })),
  closeTab: (key) =>
    set((s) => {
      const tabs = s.tabs.filter((t) => t.key !== key);
      const activeKey =
        s.activeKey === key ? tabs.pop()?.key || "" : s.activeKey;
      return { tabs, activeKey };
    }),
  setActiveKey: (key) => set({ activeKey: key }),
  updateTab: (key, data) =>
    set((s) => ({
      tabs: s.tabs.map((t) => (t.key === key ? { ...t, ...data } : t)),
    })),
}));
