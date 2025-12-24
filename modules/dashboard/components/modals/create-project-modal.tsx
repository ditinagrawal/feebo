import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTRPC } from "@/server/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useCreateProjectModal } from "../../store/use-create-project-modal";

export const CreateProjectModal = () => {
  const [projectName, setProjectName] = useState("");
  const [open, setOpen] = useCreateProjectModal();
  const queryClient = useQueryClient();
  const handleClose = () => {
    setOpen(false);
    setProjectName("");
  };
  const trpc = useTRPC();
  const createProject = useMutation(
    trpc.project.createProject.mutationOptions(),
  );
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!projectName) {
      toast.error("Project name is required");
      return;
    }
    await createProject.mutateAsync(
      {
        name: projectName,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(
            trpc.project.getAllProjects.queryOptions(),
          );
          toast.success("Project created successfully");
          handleClose();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">Create a project</DialogTitle>
          <DialogDescription>
            Enter a beautiful name and start collecting feedbacks.
          </DialogDescription>
        </DialogHeader>
        <div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="My Unicorn"
                required
                autoComplete="off"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                disabled={createProject.isPending}
              />
            </div>
            <Button className="w-full" disabled={createProject.isPending}>
              {createProject.isPending ? "Creating..." : "Create new project"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
