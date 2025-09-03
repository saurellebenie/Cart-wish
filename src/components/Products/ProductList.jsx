import React, { use, useEffect, useState } from "react";
import "./ProductList.css";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useSearchParams } from "react-router-dom";
import useProductList from "../../hooks/useProductList";

const ProductList = () => {
  const [search, setSeacrh] = useSearchParams();

  const category = search.get("category");
  const searchQuery = search.get("search");
  const [sortBy, setSortBy] = useState("");
  const [sortValue, setSortValue] = useState([]);

  const { data, error, isFetching, hasNextPage, fetchNextPage } =
    useProductList({
      search: searchQuery,
      category,
      perPage: 10,
    });

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight - 1 &&
        !isFetching &&
        hasNextPage &&
        data
      ) {
        console.log("Reached to Bottom!");
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [data, isFetching]);

  useEffect(() => {
    if (data && data?.pages) {
      const products = data?.pages.flatMap((page) => page.products);
      if (sortBy === "price desc") {
        setSortValue(products.sort((a, b) => b.price - a.price));
      } else if (sortBy === "price asc") {
        setSortValue(products.sort((a, b) => a.price - b.price));
      } else if (sortBy === "rate desc") {
        setSortValue(products.sort((a, b) => b.reviews.rate - a.reviews.rate));
      } else if (sortBy === "rate asc") {
        setSortValue(products.sort((a, b) => a.reviews.rate - b.reviews.rate));
      } else setSortValue(products);
    }
  }, [sortBy, data]);

  return (
    <section className="products_list_section">
      <header className="align_center product_list_header">
        <h2>Products List</h2>
        <select
          name="sort"
          className="products_sorting"
          id=""
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Relevance</option>
          <option value="price desc">Price HIGH TO LOW</option>
          <option value="price asc">Price LOW TO HIGH</option>
          <option value="rate desc">Rate HIGH TO LOW</option>
          <option value="rate asc">Rate LOW TO HIGH</option>
        </select>
      </header>

      <div className="products_list">
        {error && <em className="form_error">{error}</em>}

        {sortValue.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}

        {isFetching &&
          skeletons.map((skeleton) => <ProductCardSkeleton key={skeleton} />)}
      </div>
    </section>
  );
};

export default ProductList;
