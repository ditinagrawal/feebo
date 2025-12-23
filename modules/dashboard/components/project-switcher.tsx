"use client";

import { useTRPC } from "@/server/client";
import { CheckIcon, ChevronDown, FolderIcon, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useCreateProjectModal } from "@/modules/dashboard/store/use-create-project-modal";
import { useCurrentProject } from "@/modules/dashboard/store/use-current-project";
import { useQuery } from "@tanstack/react-query";

export const ProjectSwitcher = () => {
  const trpc = useTRPC();
  const [open, setOpen] = useCreateProjectModal();
  const [currentProject, setCurrentProject] = useCurrentProject();
  const { data: projects } = useQuery(
    trpc.project.getAllProjects.queryOptions(),
  );
  if (!currentProject) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="w-fit px-1.5">
              <div className="bg-muted flex aspect-square size-5 items-center justify-center rounded-md">
                <FolderIcon className="size-3" />
              </div>
              <span className="truncate font-medium">
                {currentProject.name}
              </span>
              <ChevronDown className="opacity-50" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-64 rounded-lg"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Projects
            </DropdownMenuLabel>
            {projects?.map((project) => (
              <DropdownMenuItem
                key={project.id}
                onClick={() => setCurrentProject(project)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-xs border">
                  <FolderIcon className="size-4 shrink-0" />
                </div>
                {project.name}
                {project.id === currentProject?.id && (
                  <CheckIcon className="ml-auto size-4 shrink-0" />
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2 p-2"
              onClick={() => setOpen(true)}
            >
              <div className="bg-background flex size-6 items-center justify-center rounded-md border">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">
                Add project
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
