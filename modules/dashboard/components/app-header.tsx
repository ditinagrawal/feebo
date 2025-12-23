"use client";

import { usePathname } from "next/navigation";

import { MessageCircleIcon } from "lucide-react";
import { Link } from "next-view-transitions";

import { UserProfile } from "@/modules/dashboard/components/user-profile";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const AppHeader = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex w-full items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize">
                {segments[0]}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button className="ml-auto" variant="ghost" asChild>
          <Link href="/">
            <MessageCircleIcon className="size-4" />
            Feedback
          </Link>
        </Button>
        <UserProfile />
      </div>
    </header>
  );
};
