import { Badge } from "../ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

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
      </CardFooter>
    </Card>
  );
};
