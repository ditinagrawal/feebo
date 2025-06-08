"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { deleteBoard } from "@/actions/boards";
import { useMutation } from "@tanstack/react-query";
import { Copy, Loader, MessageCircle, Trash } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useUser } from "@/hooks/use-user";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

export const BoardDetails = ({ board }) => {
  const router = useRouter();
  const { user } = useUser();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteBoard,
    onSuccess: () => {
      toast.success("Board deleted successfully");
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const handleDeleteBoard = async () => {
    mutate(board.slug);
  };
  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/${user.slug}/${board.slug}`
    );
    toast.success("Link copied to clipboard");
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Board Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-semibold">{board?.name}</p>
          <p className="text-md text-muted-foreground">
            {board?.feedbacks?.length} feedbacks
          </p>
          <p className="text-sm text-muted-foreground">
            Created on {board?.createdAt.toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center justify-between gap-2 mt-4">
          <Link
            href={`/${user.slug}/${board.slug}`}
            target="_blank"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary hover:underline"
          >
            <MessageCircle className="w-4 h-4" />
            Share This Board to Get Feedback
          </Link>
          <Button
            size="icon"
            className="size-8 cursor-pointer"
            variant="outline"
            onClick={handleCopyLink}
          >
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              className="w-full cursor-pointer"
              disabled={isPending}
            >
              {isPending ? (
                <Loader className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Trash className="w-4 h-4 mr-2" />
              )}
              {isPending ? "Deleting..." : "Delete Board"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                board "{board.name}" and all its feedbacks.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteBoard}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};
