import { useEffect } from "react";
import EcoBrewSection from "./partials/EcoBrewSection";
import FeaturedProductsSection from "./partials/FeaturedProductsSection";
import ProductFeaturesSection from "./partials/ProductFeaturesSection";
import OrganicSection from "./partials/OrganicSection";
import CommitmentSection from "./partials/CommitmentSection";
import TestimonialsSection from "./partials/TestimonialsSection";
import NewsletterSection from "./partials/NewsletterSection";

export default function Home() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#F9F2EA]">
      {/* Hero Section with ECO BREW */}
      <EcoBrewSection />
      
      {/* Featured Products */}
      <FeaturedProductsSection />
      
      {/* Product Features */}
      <ProductFeaturesSection />
      
      {/* Organic Sourcing */}
      <OrganicSection />
      
      {/* Our Commitment */}
      <CommitmentSection />
      
      {/* Customer Testimonials */}
      <TestimonialsSection />

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  );
}