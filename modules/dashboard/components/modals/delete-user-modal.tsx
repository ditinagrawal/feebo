import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { authClient } from "@/lib/auth-client";
import { useCurrentProject } from "@/modules/dashboard/store/use-current-project";
import { useDeleteUserModal } from "@/modules/dashboard/store/use-delete-user-modal";
import { useTRPC } from "@/server/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const DeleteUserModal = () => {
  const router = useRouter();
  const [open, setOpen] = useDeleteUserModal();
  const [currentProject, setCurrentProject] = useCurrentProject();
  const trpc = useTRPC();
  const deleteUser = useMutation(trpc.user.deleteAccount.mutationOptions());
  const handleDeleteUser = () => {
    deleteUser.mutateAsync(undefined, {
      onSuccess: () => {
        setCurrentProject(null);
        authClient.signOut();
        router.replace("/auth");
        toast.success("User deleted successfully");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
    handleClose();
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete your account?
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-4">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDeleteUser}>
            Delete Account
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
