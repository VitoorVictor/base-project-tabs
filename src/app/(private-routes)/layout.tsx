import { AppSidebar } from "@/components/Sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React, { ReactNode } from "react";

interface PrivateLayoutProps {
  children: ReactNode;
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col w-full h-screen overflow-hidden">
        <div className="flex-1 max-h-full overflow-y-auto custom-scrollbar">
          <div className="h-full">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}
