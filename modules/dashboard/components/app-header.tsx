"use client";

import { usePathname } from "next/navigation";

import { MessageCircleIcon } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserProfile } from "@/modules/dashboard/components/user-profile";
import { useFeedbackModal } from "@/modules/dashboard/store/use-feedback-modal";

export const AppHeader = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const [open, setOpen] = useFeedbackModal();
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
        <Button
          className="ml-auto"
          variant="ghost"
          onClick={() => setOpen(true)}
        >
          <MessageCircleIcon className="size-4" />
          Feedback
        </Button>
        <UserProfile />
      </div>
    </header>
  );
};
