import { Badge } from "../ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFeedbackVotes } from "@/actions/feedback";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { ArrowBigUp } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

export const AllFeedbacks = ({ feedbacks }) => {
  return (
    <ScrollArea className="h-[calc(100vh-12rem)]">
      <div className="text-2xl font-bold">All Feedbacks</div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {feedbacks.map((feedback) => (
            <FeedbackCard key={feedback.id} feedback={feedback} />
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};

const FeedbackCard = ({ feedback }) => {
  const { username, slug: boardSlug } = useParams();
  const queryClient = useQueryClient();
  const [isVoted, setIsVoted] = useState(false);

  const { mutate: updateVotes, isPending } = useMutation({
    mutationFn: ({ id, increment }) => updateFeedbackVotes(id, increment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["feedbacks", username, boardSlug],
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update vote");
      // Revert the vote state on error
      setIsVoted(!isVoted);
    },
  });

  const handleVote = () => {
    setIsVoted(!isVoted);
    updateVotes({ id: feedback.id, increment: !isVoted });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{feedback.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {feedback.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className={`hover:bg-primary/10 transition-colors ${
              isVoted ? "text-primary" : "text-muted-foreground"
            }`}
            onClick={handleVote}
            disabled={isPending}
          >
            <ArrowBigUp className="w-5 h-5" />
          </Button>
          <Badge variant="outline">{feedback.votes} Votes</Badge>
        </div>
      </CardFooter>
    </Card>
  );
};
