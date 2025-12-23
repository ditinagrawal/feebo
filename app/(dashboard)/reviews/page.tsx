import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { ReviewsView } from "@/modules/dashboard/views/reviews-view";
import { HydrateClient, prefetch, trpc } from "@/server/server";

export default async function ReviewsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/auth");
  }
  prefetch(trpc.project.getAllProjects.queryOptions());
  return (
    <HydrateClient>
      <ReviewsView />
    </HydrateClient>
  );
}
