import Image from "next/image";

import { Link } from "next-view-transitions";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Menu } from "./menu";

export const AppSidebar = (props: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar {...props} className="border-none">
      <SidebarHeader className="py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={100}
            height={100}
            className="size-8"
            priority
            draggable={false}
          />
          <h3 className="font-display text-2xl font-semibold">Feebo</h3>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <Menu />
      </SidebarContent>
      <SidebarFooter>
        <Link
          href="https://ditin.in"
          target="_blank"
          className="flex items-end gap-2"
        >
          <Image
            src="/avatar.png"
            alt="Avatar"
            width={1000}
            height={1000}
            className="size-28"
            priority
            draggable={false}
          />
          <p className="font-medium">
            <span className="font-display text-2xl">Chef</span> <br /> of the
            App
            <br />
            <span className="text-muted-foreground text-sm">
              — Ditin Agrawal
            </span>
          </p>
        </Link>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
