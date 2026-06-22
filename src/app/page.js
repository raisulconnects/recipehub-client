import FeaturedRecipesSection from "@/components/home/FeaturedRecipesSection";
import HeroSection from "@/components/home/HeroSection";
import PopularRecipesSection from "@/components/home/PopularRecipesSection";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedRecipesSection />
      <PopularRecipesSection />
    </>
  );
}
