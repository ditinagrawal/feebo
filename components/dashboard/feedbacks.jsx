import { Trash } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFeedback } from "@/actions/feedback";

export const Feedbacks = ({ feedbacks }) => {
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
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteFeedback,
    onSuccess: () => {
      toast.success("Feedback deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["board"] });
    },
  });

  const handleDeleteFeedback = (id) => {
    mutate(id);
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
        <Badge variant="outline">{feedback.votes} Votes</Badge>
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500 hover:bg-red-500/10 cursor-pointer"
          onClick={() => handleDeleteFeedback(feedback.id)}
          disabled={isPending}
        >
          <Trash />
        </Button>
      </CardFooter>
    </Card>
  );
};
