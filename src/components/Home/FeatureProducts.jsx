import React from "react";
import "./FeatureProducts.css";
import ProductCard from "../Products/ProductCard";
import useData from "../../hooks/useData";
import ProductCardSkeleton from "../Products/ProductCardSkeleton";
import { motion } from "motion/react";

const FeatureProducts = () => {
  const {
    data: products,
    error,
    isLoading,
  } = useData(
    "/products/featured",
    null,
    ["products", "featured"],
    10 * 60 * 60 * 1000
  );

  const skeletons = [1, 2, 3];

  return (
    <section className="featured_products">
      <motion.h2
        className="align_center navbar"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        Featured Products
      </motion.h2>
      <div className="align_center featured_products_list">
        {error && <em className="form_error">{error}</em>}
        {products &&
          products.map((product, index) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
                delay: index * 0.25,
              }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <ProductCard key={product._id} product={product} />
            </motion.div>
          ))}
        {isLoading &&
          skeletons.map((skeleton) => <ProductCardSkeleton key={skeleton} />)}
      </div>
    </section>
  );
};

export default FeatureProducts;
