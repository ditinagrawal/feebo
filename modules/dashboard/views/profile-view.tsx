"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/server/client";
import { useQuery } from "@tanstack/react-query";
import { useDeleteUserModal } from "@/modules/dashboard/store/use-delete-user-modal";
import { useUpdateUsernameModal } from "@/modules/dashboard/store/use-update-username-modal";

export const ProfileView = () => {
  const trpc = useTRPC();
  const [openUpdateUsernameModal, setOpenUpdateUsernameModal] =
    useUpdateUsernameModal();
  const [openDeleteUserModal, setOpenDeleteUserModal] = useDeleteUserModal();
  const { data: user, isLoading } = useQuery(trpc.user.getUser.queryOptions());
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const handleUpdateUsername = () => {
    if (!openUpdateUsernameModal) {
      setOpenUpdateUsernameModal(true);
    }
  };
  const handleDeleteUser = () => {
    if (!openDeleteUserModal) {
      setOpenDeleteUserModal(true);
    }
  };
  return (
    <div className="mx-auto max-w-3xl">
      <div className="space-y-6 pt-10">
        <div className="ms-1 space-y-1">
          <h2 className="text-2xl font-medium">
            Hi, {user?.name?.split(" ")[0]}
          </h2>
          <p className="text-muted-foreground text-sm">
            Manage your profile settings and preferences here.
          </p>
        </div>
        <div className="rounded-2xl bg-white p-8">
          <div className="space-y-4">
            <h4 className="text-muted-foreground text-sm">
              Profile Information
            </h4>
            <div>
              <h5 className="font-medium">{user?.name}</h5>
              <p className="text-muted-foreground text-sm">{user?.email}</p>
            </div>
            <div>
              <h5 className="font-medium">Username</h5>
              <p className="text-muted-foreground text-sm">{user?.slug}</p>
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="secondary" onClick={handleUpdateUsername}>
              Update Username
            </Button>
          </div>
        </div>
        <div className="space-y-6 rounded-2xl bg-white p-8">
          <div className="space-y-1">
            <h4 className="text-lg font-medium text-rose-600">Danger Zone</h4>
            <p className="text-muted-foreground text-sm">
              All your data will be deleted and you will not be able to recover
              it. <br /> This action is irreversible.
            </p>
          </div>
          <div className="flex justify-end">
            <Button variant="destructive" onClick={handleDeleteUser}>
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
