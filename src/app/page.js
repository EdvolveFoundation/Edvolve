import AboutHero from "@/components/AboutHero";
import FeatureBar from "@/components/FeatureBar";
import FeaturedCampaign from "@/components/FeaturedCampaign";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import PortfolioGallery from "@/components/PortfolioGallery";
import TestimonialSection from "@/components/TestimonialSection";

export default function Home() {
  return (
    <main>
     <Hero/>
     <FeatureBar/>
     <AboutHero/>
     <FeaturedCampaign/>
     <PortfolioGallery/>
     <Partners/>
     <TestimonialSection/>

    </main>
  );
}