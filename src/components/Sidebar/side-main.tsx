"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ComponentType, ReactElement } from "react";
import { useTabStore } from "@/store/tabStore";
type SidebarItem = {
  title: string;
  icon?: LucideIcon;
  key?: string;
  permission?: string;
  items?: SidebarItem[];
  component?: ComponentType;
  modal?: ReactElement;
};

export function SideMain({ items }: { items: SidebarItem[] }) {
  const { openTab, activeKey } = useTabStore();
  const { setOpen } = useSidebar();

  const handleTabClick = (item: SidebarItem) => {
    if (!item.key || !item.component) return;
    setOpen(false);
    console.log(item.component);
    openTab({
      key: item.key,
      title: item.title,
      component: item.component,
    });
  };

  const renderSubMenu = (subItem: SidebarItem) => (
    <SidebarMenuSubItem key={subItem.key || subItem.title}>
      <SidebarMenuSubButton
        asChild
        className={`py-5 cursor-pointer font-semibold ${
          subItem.key === activeKey
            ? "bg-muted text-foreground hover:bg-muted/90"
            : "text-white hover:bg-muted hover:text-foreground"
        }`}
      >
        <button
          className="py-4 w-full text-left"
          onClick={() => handleTabClick(subItem)}
        >
          <span>{subItem.title}</span>
        </button>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );

  const renderNestedSubMenu = (item: SidebarItem) => (
    <Collapsible
      key={item.key || item.title}
      asChild
      defaultOpen={false}
      className="group/collapsible-2"
    >
      <SidebarMenuSubItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuSubButton className="py-5 font-semibold text-white cursor-pointer hover:bg-muted">
            {item.icon && (
              <item.icon className="text-white hover:bg-muted hover:text-foreground" />
            )}
            <span>{item.title}</span>
            <ChevronRight className="text-white ml-auto transition-transform duration-200 group-data-[state=open]/collapsible-2:rotate-90" />
          </SidebarMenuSubButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className="m-0.5">
            {item.items?.map(renderSubMenu)}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuSubItem>
    </Collapsible>
  );

  const renderCollapsibleMenu = (item: SidebarItem) => (
    <Collapsible
      key={item.key || item.title}
      asChild
      defaultOpen={false}
      className="group/collapsible-1"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            tooltip={item.title}
            className="py-5 font-semibold text-white cursor-pointer hover:bg-muted"
          >
            {item.icon && (
              <item.icon className="text-white hover:bg-muted hover:text-foreground" />
            )}
            <span>{item.title}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible-1:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className="m-0.5">
            {item.items?.map((subItem) =>
              subItem.items
                ? renderNestedSubMenu(subItem)
                : renderSubMenu(subItem)
            )}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );

  const renderSidebarItem = (item: SidebarItem) => {
    if (item.modal) {
      return (
        <SidebarMenuItem key={item.key || item.title}>
          {item.modal}
        </SidebarMenuItem>
      );
    }

    return (
      <SidebarMenuItem key={item.key || item.title}>
        <SidebarMenuButton
          tooltip={item.title}
          className={`py-5 cursor-pointer font-semibold ${
            item.key === activeKey
              ? "bg-muted text-foreground hover:bg-muted/90"
              : "text-white hover:bg-muted hover:text-foreground"
          }`}
          onClick={() => handleTabClick(item)}
        >
          {item.icon && (
            <item.icon className="text-white hover:bg-muted hover:text-foreground" />
          )}
          <span>{item.title}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) =>
          item.items ? renderCollapsibleMenu(item) : renderSidebarItem(item)
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
