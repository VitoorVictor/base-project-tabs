import { create } from "zustand";
import { ComponentType } from "react";
import { DashboardContent } from "@/components/Pages/Dashboard/dashboard-pages";
import { House, LucideIcon } from "lucide-react";

type Tab = {
  icon?: LucideIcon;
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
      icon: House,
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
      const indexForClose = s.tabs.findIndex((tab) => tab.key === key);
      const beforeActiveKeyTab =
        s.tabs[indexForClose > 0 ? indexForClose - 1 : 0];
      const tabs = s.tabs.filter((t) => t.key !== key);
      const activeKey =
        s.activeKey === key ? beforeActiveKeyTab?.key || "" : s.activeKey;
      return { tabs, activeKey };
    }),
  setActiveKey: (key) => set({ activeKey: key }),
  updateTab: (key, data) =>
    set((s) => ({
      tabs: s.tabs.map((t) => (t.key === key ? { ...t, ...data } : t)),
    })),
}));
