"use client";

import { useParams } from "next/navigation";

import { getFeedbacks } from "@/actions/feedback";
import { useQuery } from "@tanstack/react-query";
import { AllFeedbacks } from "./all-feedbacks";
import { CreateFeedback } from "./create-feedback";

export const MainLayout = () => {
  const { username, slug: boardSlug } = useParams();
  const { data: feedbacks = [], isLoading } = useQuery({
    queryKey: ["feedbacks", username, boardSlug],
    queryFn: () => getFeedbacks(username, boardSlug),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchInterval: 1000,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="grid grid-cols-1 gap-8 md:grid-cols-3 mt-4 md:mt-12">
      <div className="md:col-span-1">
        <CreateFeedback username={username} boardSlug={boardSlug} />
      </div>
      <div className="md:col-span-2">
        <AllFeedbacks feedbacks={feedbacks} />
      </div>
    </main>
  );
};
