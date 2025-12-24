"use client";

import { Button } from "@/components/ui/button";
import { useCurrentProject } from "@/modules/dashboard/store/use-current-project";
import { useTRPC } from "@/server/client";
import { useQuery } from "@tanstack/react-query";
import { CheckCheckIcon, CopyIcon, InfoIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

export const ApiKeyView = () => {
  const [isCopied, setIsCopied] = useState(false);
  const trpc = useTRPC();
  const [currentProject, _] = useCurrentProject();
  if (!currentProject) {
    return null;
  }
  const { data: project } = useQuery(
    trpc.project.getProjectById.queryOptions({ id: currentProject.id }),
  );
  const handleCopy = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(project?.key ?? "");
    toast.success("Copied to clipboard");
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  return (
    <div className="mx-auto max-w-3xl">
      <div className="space-y-4 pt-12">
        <h2 className="ms-1 text-2xl font-medium">API Key</h2>
        <div className="space-y-6 rounded-2xl bg-white p-8">
          <div>
            <h4 className="text-lg font-medium">Api Credentials</h4>
            <p className="text-muted-foreground text-sm">
              Use your API key to authenticate your requests to the Feebo API.
            </p>
          </div>
          <div className="flex">
            <input
              type="password"
              value={project?.key}
              className="w-full flex-1 outline-none"
              readOnly
            />
            <Button variant="outline" size="icon" onClick={handleCopy}>
              {isCopied ? (
                <CheckCheckIcon className="size-4" />
              ) : (
                <CopyIcon className="size-4" />
              )}
            </Button>
          </div>
          <div>
            <p className="text-muted-foreground flex items-center gap-2 text-sm">
              <InfoIcon className="size-4" />
              <span>Do not share your API key with anyone.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
