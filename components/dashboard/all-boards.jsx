"use client";

import Link from "next/link";

import { getBoards } from "@/actions/boards";
import { useUser } from "@/hooks/use-user";
import { useQuery } from "@tanstack/react-query";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Loading } from "../ui/loading";

export const AllBoards = () => {
  const { user } = useUser();

  const { data: boards = [], isLoading } = useQuery({
    queryKey: ["boards", user?.id],
    queryFn: async () => {
      const boards = await getBoards(user.id);
      return boards;
    },
    enabled: !!user,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  if (isLoading) return <Loading />;

  return (
    <ScrollArea className="h-[calc(100vh-12rem)]">
      <div className="text-2xl font-bold">Your Boards</div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {boards.length > 0 &&
            boards.map((board) => <BoardCard key={board.id} board={board} />)}
        </div>
      </div>
    </ScrollArea>
  );
};

const BoardCard = ({ board }) => {
  return (
    <Link href={`/dashboard/b/${board.slug}`}>
      <Card>
        <CardHeader>
          <CardTitle>{board.name}</CardTitle>
          <CardDescription>{board.slug}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};
