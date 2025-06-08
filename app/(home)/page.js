import { AboutSection } from "@/components/home/about-section";
import { FeaturesSection } from "@/components/home/features-section";
import { Footer } from "@/components/home/footer";
import { FAQs } from "@/components/home/faqs";
import { HeroSection } from "@/components/home/hero-section";

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
