"use client";

import { usePathname } from "next/navigation";

import {
  BookIcon,
  KeyIcon,
  SettingsIcon,
  StarIcon,
  UserIcon,
} from "lucide-react";
import { Link } from "next-view-transitions";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const MENU_ITEMS = [
  {
    label: "Reviews",
    href: "/reviews",
    icon: <StarIcon />,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: <SettingsIcon />,
  },
];

const USER_ITEMS = [
  {
    label: "Profile",
    href: "/profile",
    icon: <UserIcon />,
  },
];

const DEVELOPER_MENU_ITEMS = [
  {
    label: "Docs",
    href: "/docs",
    icon: <BookIcon />,
  },
  {
    label: "Api Keys",
    href: "/api-keys",
    icon: <KeyIcon />,
  },
];

export const Menu = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarMenu>
          {MENU_ITEMS.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={isActive(item.href)}>
                <Link href={item.href}>
                  {item.icon} {item.label}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>User</SidebarGroupLabel>
        <SidebarMenu>
          {USER_ITEMS.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={isActive(item.href)}>
                <Link href={item.href}>
                  {item.icon} {item.label}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Developer</SidebarGroupLabel>
        <SidebarMenu>
          {DEVELOPER_MENU_ITEMS.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={isActive(item.href)}>
                <Link href={item.href}>
                  {item.icon} {item.label}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
};
