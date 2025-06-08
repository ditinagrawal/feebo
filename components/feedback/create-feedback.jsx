"use client";

import { useState } from "react";
import Link from "next/link";

import { createFeedback } from "@/actions/feedback";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";

export const CreateFeedback = ({ username, boardSlug }) => {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const feedback = await createFeedback(
        username,
        boardSlug,
        title,
        description
      );
      return feedback;
    },
    onSuccess: () => {
      setTitle("");
      setDescription("");
      queryClient.invalidateQueries({
        queryKey: ["feedbacks", username, boardSlug],
      });
      toast.success("Feedback submitted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to submit feedback");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return;
    mutate();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Suggest Something</CardTitle>
        <CardDescription>
          Whatever you want to suggest, just write it down here. You can also
          roast if you want to.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isPending}
          />
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isPending}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <Loader className="animate-spin" />
            ) : (
              "Submit Feedback"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <Link
          href="https://feebo.vercel.app"
          target="_blank"
          className="text-sm text-muted-foreground hover:underline"
        >
          Powered by <span className="font-bold">Feebo</span>
        </Link>
      </CardFooter>
    </Card>
  );
};
