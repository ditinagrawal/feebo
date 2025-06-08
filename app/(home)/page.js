import { AboutSection } from "@/components/home/about-section";
import { FeaturesSection } from "@/components/home/features-section";
import { Footer } from "@/components/home/footer";
import { FAQs } from "@/components/home/faqs";
import { HeroSection } from "@/components/home/hero-section";

export const metadata = {
  title: "Feebo - Build what users really want",
  description: "Collect feedback from your customers, prioritize features, and build a product users love.",
  openGraph: {
    title: "Feebo - Build what users really want",
    description: "Collect feedback from your customers, prioritize features, and build a product users love.",
    type: "website",
    locale: "en_US",
    siteName: "Feebo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Feebo - Build what users really want",
    description: "Collect feedback from your customers, prioritize features, and build a product users love.",
  },
};

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <FAQs />
      <Footer />
    </main>
  );
};

export default HomePage;
