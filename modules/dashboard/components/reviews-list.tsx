import { useTRPC } from "@/server/client";
import { useQuery } from "@tanstack/react-query";
import { useCurrentProject } from "../store/use-current-project";

export const ReviewsList = () => {
  const trpc = useTRPC();
  const [currentProject, setCurrentProject] = useCurrentProject();
  const { data: reviews } = useQuery(
    trpc.review.getAllReviews.queryOptions({
      projectId: currentProject?.id ?? "",
    }),
  );
  return (
    <div>
      {reviews?.map((review) => (
        <div key={review.id}>
          <h3>{review.author}</h3>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};
