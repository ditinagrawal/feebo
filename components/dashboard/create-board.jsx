"use client";

import { useState } from "react";

import { createBoard } from "@/actions/boards";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { useUser } from "@/hooks/use-user";
import { Loader } from "lucide-react";
import { toast } from "sonner";

export const CreateBoard = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const [boardName, setBoardName] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const board = await createBoard(boardName, user.id);
      return board;
    },
    onSuccess: () => {
      setBoardName("");
      queryClient.invalidateQueries({ queryKey: ["boards", user.id] });
      toast.success("Board created successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create board");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!boardName) return;
    mutate();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Board</CardTitle>
        <CardDescription>
          You can create a board for your team, project, or anything you want.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Board Name"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            disabled={isPending}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? <Loader className="animate-spin" /> : "Create Board"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
