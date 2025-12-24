import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { ApiKeyView } from "@/modules/dashboard/views/api-key-view";

export default async function ReviewsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/auth");
  }
  return <ApiKeyView />;
}
