"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

import { useCreateProjectModal } from "@/modules/dashboard/store/use-create-project-modal";
import { useCurrentProject } from "@/modules/dashboard/store/use-current-project";
import { useTRPC } from "@/server/client";

export const ReviewsView = () => {
  const trpc = useTRPC();
  const [open, setOpen] = useCreateProjectModal();
  const [currentProject, setCurrentProject] = useCurrentProject();
  const { data, isLoading, isFetching } = useQuery(
    trpc.project.getAllProjects.queryOptions(),
  );
  const projectId = useMemo(() => data?.[0]?.id, [data]);
  useEffect(() => {
    if (isLoading || isFetching) return;
    if (projectId) {
      setCurrentProject({
        id: data?.[0]?.id ?? "",
        name: data?.[0]?.name ?? "",
        slug: data?.[0]?.slug ?? "",
      });
    } else if (!open) {
      setOpen(true);
    }
  }, [projectId, isLoading, isFetching, open, setOpen]);
  return <div>{currentProject?.name}</div>;
};
