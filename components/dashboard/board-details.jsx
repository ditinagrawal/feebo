"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { deleteBoard } from "@/actions/boards";
import { useMutation } from "@tanstack/react-query";
import { Loader, MessageCircle, Trash } from "lucide-react";
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
        <Link
          href={`/${user.slug}/${board.slug}`}
          target="_blank"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary hover:underline mt-4 font-semibold"
        >
          <MessageCircle className="w-4 h-4" />
          View Feedbacks
        </Link>
      </CardContent>
      <CardFooter>
        <Button
          variant="destructive"
          className="w-full cursor-pointer"
          onClick={handleDeleteBoard}
          disabled={isPending}
        >
          {isPending ? (
            <Loader className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Trash className="w-4 h-4 mr-2" />
          )}
          {isPending ? "Deleting..." : "Delete Board"}
        </Button>
      </CardFooter>
    </Card>
  );
};
