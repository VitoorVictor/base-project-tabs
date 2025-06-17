import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import packageJson from "../../../package.json";

export function SideLogo() {
  const { toggleSidebar } = useSidebar();
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex justify-between items-center pt-2">
        <div className="flex items-center gap-2">
          <div
            className="size-8 aspect-square flex items-center justify-center cursor-pointer"
            onClick={() => toggleSidebar()}
          >
            <Image
              src="/logo-white.png"
              alt="Logo"
              width={30}
              height={30}
              className="object-contain"
            />
          </div>
          <div className="text-left text-neutral-100 leading-tight  group-has-[[data-collapsible=icon]]/sidebar-wrapper:hidden">
            <span className="block text-base font-semibold">ADMIN</span>
            <span className="block text-xs">v{packageJson.version}</span>
          </div>
        </div>
        {/* <SidebarMenuButton
          size="lg"
          className="p-2 flex items-center hover:bg-primary active:bg-primary"
        >
          <Link href="/tickets" className="flex items-center gap-2">
            <div className="size-8 aspect-square flex items-center justify-center">
              <Image
                src="/logo-white.png"
                alt="Logo"
                width={30}
                height={30}
                className="object-contain"
              />
            </div>
            <div className="text-left text-neutral-100 leading-tight">
              <span className="block text-base font-semibold">ADMIN</span>
              <span className="block text-xs">v{packageJson.version}</span>
            </div>
          </Link>
        </SidebarMenuButton> */}
        <SidebarTrigger className="text-muted hover:text-black hover:bg-accent group-has-[[data-collapsible=icon]]/sidebar-wrapper:hidden" />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
