import { MainLayout } from "@/components/feedback/main-layout";
import { Suspense } from "react";

export const metadata = {
  title: "Feedback | Feebo",
  description: "View and manage your Feebo feedback.",
  openGraph: {
    title: "Feedback | Feebo",
    description: "View and manage your Feebo feedback.",
    type: "website",
    locale: "en_US",
    siteName: "Feebo",
  },
};

const LoadingSpinner = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
    </div>
  );
};

const FeedbackPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <MainLayout />
    </Suspense>
  );
};

export default FeedbackPage;
