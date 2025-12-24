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
import { useUpdateUsernameModal } from "@/modules/dashboard/store/use-update-username-modal";
import { useTRPC } from "@/server/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";

export const UpdateUsernameModal = () => {
  const [username, setUsername] = useState("");
  const [open, setOpen] = useUpdateUsernameModal();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const updateUsername = useMutation(
    trpc.user.updateUsername.mutationOptions(),
  );
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateUsername.mutateAsync(
      { username },
      {
        onSuccess: () => {
          toast.success("Username updated successfully");
          queryClient.invalidateQueries(trpc.user.getUser.queryOptions());
          handleClose();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };
  const handleClose = () => {
    setOpen(false);
    setUsername("");
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Username</DialogTitle>
          <DialogDescription>
            Choose a new username for your account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">New Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="off"
              disabled={updateUsername.isPending}
            />
          </div>
          <Button
            className="w-full"
            type="submit"
            disabled={updateUsername.isPending}
          >
            {updateUsername.isPending ? "Updating..." : "Update Username"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
