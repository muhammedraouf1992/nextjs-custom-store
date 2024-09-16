import React from "react";
import HeroSection from "./_components/HeroSection";
import CategorySection from "./_components/CategorySection";
import TrendingProductSection from "./_components/TrendingProductSection";
import FilterImageGrid from "./_components/FilterImageGrid";

import Footer from "./_components/Footer";

const FrontendPage = () => {
  return (
    <div>
      <HeroSection />
      <div className="container">
        <CategorySection />
        <TrendingProductSection />
        <FilterImageGrid />
        <Slider />
      </div>
      <Footer />
    </div>
  );
};

export default FrontendPage;
