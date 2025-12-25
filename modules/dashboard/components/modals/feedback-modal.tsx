import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { useCurrentProject } from "@/modules/dashboard/store/use-current-project";
import { useFeedbackModal } from "@/modules/dashboard/store/use-feedback-modal";
import { useTRPC } from "@/server/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";

export const FeedbackModal = () => {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [open, setOpen] = useFeedbackModal();
  const [currentProject, setCurrentProject] = useCurrentProject();
  const { data: session } = authClient.useSession();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const createReview = useMutation(trpc.review.createReview.mutationOptions());
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createReview.mutateAsync(
      {
        projectId: currentProject?.id ?? "",
        author: session?.user.name ?? "",
        rating: rating ?? 1,
        comment: message,
      },
      {
        onSuccess: () => {
          toast.success("Review submitted successfully");
          queryClient.invalidateQueries(
            trpc.review.getAllReviews.queryOptions({
              projectId: currentProject?.id ?? "",
            }),
          );
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
    setMessage("");
    setRating(null);
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">How can we improve?</DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            Share your thoughts, suggestions, and feedback with us. You can also
            report bugs and issues.
          </DialogDescription>
        </DialogHeader>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label>Rating</Label>
            <div className="mt-1 flex gap-x-4">
              {["😡", "😞", "😐", "😊", "🤩"].map((emoji, idx) => (
                <button
                  type="button"
                  key={emoji}
                  onClick={() => setRating(idx + 1)}
                  className={cn(
                    "p-1 transition-all duration-300",
                    rating === idx + 1 && "scale-200",
                  )}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Message</Label>
            <Textarea
              placeholder="Tell us what you think..."
              className="h-40 resize-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              disabled={createReview.isPending}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={createReview.isPending}
          >
            {createReview.isPending ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
