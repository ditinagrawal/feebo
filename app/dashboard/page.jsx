import { MainLayout } from "@/components/dashboard/main-layout";

export const metadata = {
  title: "Dashboard | Feebo",
  description:
    "Manage your feedback, track user requests, and prioritize features.",
  openGraph: {
    title: "Dashboard | Feebo",
    description:
      "Manage your feedback, track user requests, and prioritize features.",
    type: "website",
    locale: "en_US",
    siteName: "Feebo",
  },
};

export const loading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
    </div>
  );
};

const DashboardPage = () => {
  return <MainLayout />;
};

export default DashboardPage;
