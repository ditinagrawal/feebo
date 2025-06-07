import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

const mockBoards = [
  {
    name: "Board 1",
    slug: "board-1",
  },
  {
    name: "Board 2",
    slug: "board-2",
  },
  {
    name: "Board 3",
    slug: "board-3",
  },
];

export const AllBoards = () => {
  return (
    <ScrollArea className="h-[calc(100vh-12rem)]">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockBoards.map((board) => (
            <BoardCard key={board.slug} board={board} />
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};

const BoardCard = ({ board }) => {
  return (
    <Link href={board.slug}>
      <Card>
        <CardHeader>
          <CardTitle>{board.name}</CardTitle>
          <CardDescription>{board.slug}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};
