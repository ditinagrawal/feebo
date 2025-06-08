import { MainLayout } from "@/components/dashboard/main-layout";

export const metadata = {
  title: "Feedback | Feebo",
  description: "View and manage your Feebo feedback.",
  openGraph: {
    title: "Feedback | Feebo",
    description: "View and manage your Feebo feedback.",
    type: "feedback",
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

const FeedbackPage = () => {
  return <MainLayout />;
};

export default FeedbackPage;
