import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export const CreateBoard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Board</CardTitle>
        <CardDescription>
          You can create a board for your team, project, or anything you want.
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};
