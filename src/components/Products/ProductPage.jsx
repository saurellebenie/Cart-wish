import React from "react";
import "./ProductPage.css";
import ProductSideBar from "./ProductSideBar";
import ProductList from "./ProductList";

const ProductPage = () => {
  return (
    <section className="products_page">
      <ProductSideBar />
      <ProductList />
    </section>
  );
};

export default ProductPage;
