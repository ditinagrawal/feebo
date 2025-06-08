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
import { toast } from "sonner";
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
    onError: (error) => {
      toast.error(error.message || "Failed to delete feedback");
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
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:bg-red-500/10 cursor-pointer"
              disabled={isPending}
            >
              <Trash />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                feedback "{feedback.title}".
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDeleteFeedback(feedback.id)}
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
