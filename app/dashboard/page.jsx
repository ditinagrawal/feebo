"use client";

import { signOut } from "next-auth/react";

import { useUser } from "@/hooks/use-user";
import { Button } from "@/components/ui/button";

const DashboardPage = () => {
  const { user } = useUser();
  return (
    <div>
      <h1>Dashboard</h1>
      <p>
        Welcome, {user?.name} : {user?.slug}
      </p>
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
};

export default DashboardPage;
