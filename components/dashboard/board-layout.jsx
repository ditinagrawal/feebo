"use client";

import { useParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import { getSingleBoard } from "@/actions/boards";
import { BoardDetails } from "./board-details";
import { Feedbacks } from "./feedbacks";
import { Loading } from "../ui/loading";
import { toast } from "sonner";

export const BoardLayout = () => {
  const { slug } = useParams();
  const {
    data: board,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["board", slug],
    queryFn: () => getSingleBoard(slug),
  });

  if (isLoading) return <Loading />;
  if (error) {
    toast.error("Failed to load board");
    return null;
  }
  if (!board) return null;

  return (
    <main className="grid grid-cols-1 gap-8 md:grid-cols-3 mt-4 md:mt-12">
      <div className="md:col-span-1">
        <BoardDetails board={board} />
      </div>
      <div className="md:col-span-2">
        <Feedbacks feedbacks={board?.feedbacks} />
      </div>
    </main>
  );
};
