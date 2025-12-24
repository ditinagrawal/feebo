import { auth } from "@/lib/auth";
import { ProfileView } from "@/modules/dashboard/views/profile-view";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/auth");
  }
  return <ProfileView />;
}
