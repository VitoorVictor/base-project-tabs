"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useEffect, type ReactNode } from "react";
import { useTabStore } from "@/store/tabStore";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { usePermissionStore } from "@/store/permissionStore";
import { fetchUsuarioPermissao } from "@/services/usuario";
import { handleApiError } from "@/utils/handleApiError";
import { toast } from "react-toastify";

export function TabManager({ children }: { children: ReactNode }) {
  const { tabs, activeKey, setActiveKey, closeTab } = useTabStore();
  const { setPermissions } = usePermissionStore();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetchUsuarioPermissao();
        setPermissions(res);
      } catch (e) {
        const { message } = handleApiError(e);
        toast.error(message || "Erro ao buscar permissões do usuário");
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-1 flex-col h-full">
      <Tabs
        value={activeKey}
        onValueChange={setActiveKey}
        className="flex-1 gap-0 overflow-hidden"
      >
        {/* Navegação das abas */}
        <ScrollArea className="border-b-2 border-primary bg-background-overlay">
          <div className="overflow-hidden">
            <TabsList className="mx-1 mt-2 text-foreground rounded-none before:bg-border bg-transparent relative h-8 p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px">
              {tabs.map((tab) => (
                <div key={tab.key} className="relative">
                  <TabsTrigger
                    value={tab.key}
                    className={`pl-4 bg-background overflow-hidden rounded-b-none border-slate-300 border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:bg-primary data-[state=active]:text-background text-xs
                      ${tab.key === "dashboard" ? "pr-4" : "pr-8"}`}
                  >
                    {tab.icon && <tab.icon size={16} aria-hidden="true" />}
                    {tab.title}
                    {/* {tab.badge && (
                    <Badge className="bg-primary/15 ms-1.5 min-w-5 px-1" variant="secondary">
                      {tab.badge}
                    </Badge>
                  )} */}
                  </TabsTrigger>
                  {tab.key !== "dashboard" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 h-5 w-4 p-0 hover:bg-destructive hover:text-white text-white rounded-full cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        closeTab(tab.key);
                      }}
                    >
                      <X />
                    </Button>
                  )}
                </div>
              ))}
            </TabsList>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* Conteúdo das abas */}
        <div className="flex-1 h-full max-h-full custom-scrollbar overflow-y-auto">
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
