import React from "react";
import HeroSection from "./HeroSection";

import iphone from "../../assets/iphone-14-pro.webp";
import mac from "../../assets/mac-system-cut.jfif";
import FeatureProducts from "./FeatureProducts";
const Home = () => {
  return (
    <div>
      <HeroSection
        subtitle="Experience the power of the latest iphone 14 with our most Pro camera ever."
        title="Buy iphone 14 Pro"
        image={iphone}
        link="/product/68b1f4b72f8094560d1ca712"
      />
      <FeatureProducts />
      <HeroSection
        subtitle="You can add Studio and colour-matched Magic accessories to your bag after configure your Mac mini."
        title="Build the ultimate setup"
        image={mac}
        link="/product/68b1f4b72f8094560d1ca71a"
      />
    </div>
  );
};

export default Home;
