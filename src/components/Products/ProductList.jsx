import React, { use, useEffect, useState } from "react";
import "./ProductList.css";
import ProductCard from "./ProductCard";
import useData from "../../hooks/useData";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useSearchParams } from "react-router-dom";
import Pagination from "../Common/Pagination";
import { set } from "zod/v4-mini";

const ProductList = () => {
  const [search, setSeacrh] = useSearchParams();
  const [page, setPage] = useState(1);
  const category = search.get("category");

  const { data, error, isLoading } = useData(
    "/products",
    {
      params: {
        category,
        perPage: 10,
        page,
      },
    },
    [category, page]
  );

  useEffect(() => {
    setPage(1);
  }, [category]);

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];
  const handleChange = (page) => {
    const currentParams = Object.fromEntries([...search]);
    setSeacrh({ ...currentParams, page: parseInt(currentParams.page) + 1 });
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight - 1 &&
        !isLoading &&
        data &&
        page < data.totalPages
      ) {
        console.log("reached bottom", page);
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data, isLoading]);

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
        {error && <em className="form_error">{error}</em>}
        {data?.products &&
          data.products.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              price={product.price}
              rating={product.reviews.rate}
              ratingCounts={product.reviews.count}
              stock={product.stock}
              title={product.title}
              image={product.images[0]}
            />
          ))}
        {isLoading &&
          skeletons.map((skeleton) => <ProductCardSkeleton key={skeleton} />)}
      </div>
      {/* {data && (
        <Pagination
          totalPosts={data.totalProducts}
          postsPerPage={8}
          onClick={handleChange}
          currentPage={page}
        />
      )} */}
    </section>
  );
};

export default ProductList;
