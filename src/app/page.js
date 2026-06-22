import FeaturedRecipesSection from "@/components/home/FeaturedRecipesSection";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import PopularRecipesSection from "@/components/home/PopularRecipesSection";
import PremiumSection from "@/components/home/PremiumSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedRecipesSection />
      <PopularRecipesSection />
      <HowItWorksSection />
      <PremiumSection />
    </>
  );
}
