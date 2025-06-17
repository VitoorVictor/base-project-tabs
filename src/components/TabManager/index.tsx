"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type { ReactNode } from "react";
import { useTabStore } from "@/store/tabStore";

export function TabManager({ children }: { children: ReactNode }) {
  const { tabs, activeKey, setActiveKey, closeTab } = useTabStore();

  return (
    <div className="flex flex-1 flex-col h-full">
      <Tabs
        value={activeKey}
        onValueChange={setActiveKey}
        className="flex-1 gap-0"
      >
        {/* Navegação das abas */}
        <ScrollArea className="border-b">
          <TabsList className="text-foreground h-auto gap-2 rounded-none bg-transparent">
            {tabs.map((tab) => (
              <div key={tab.key} className="relative">
                <TabsTrigger
                  value={tab.key}
                  className="h-8 hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative pr-8 after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  {/* {tab.icon && (
                    <span className="-ms-0.5 me-1.5 opacity-60" aria-hidden="true">
                      {tab.icon}
                    </span>
                  )} */}
                  {tab.title}
                  {/* {tab.badge && (
                    <Badge className="bg-primary/15 ms-1.5 min-w-5 px-1" variant="secondary">
                      {tab.badge}
                    </Badge>
                  )} */}
                </TabsTrigger>
                {/* {true && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-4 w-4 p-0 opacity-60 hover:opacity-100 hover:bg-destructive hover:text-destructive-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeTab(tab.key);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )} */}
              </div>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* Conteúdo das abas */}
        <div className="flex-1 bg-background-overlay p-4">
          {tabs.map((tab) => (
            <TabsContent key={tab.key} value={tab.key} className="h-full">
              {children}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
