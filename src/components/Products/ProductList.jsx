import React from "react";
import "./ProductList.css";
import ProductCard from "./ProductCard";

const ProductList = () => {
  return (
    <section className="products_list_section">
      <header className="align_center product_list_header">
        <h2>Products List</h2>
        <select name="sort" className="products_sorting" id="">
          <option value="">Relevance</option>
          <option value="price desc">Price HIGH TO LOW</option>
          <option value="price asc">Price LOW TO HIGH</option>
          <option value="rate desc">Rate HIGH TO LOW</option>
          <option value="rate asc">Rate LOW TO HIGH</option>
        </select>
      </header>

      <div className="products_list">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </section>
  );
};

export default ProductList;
