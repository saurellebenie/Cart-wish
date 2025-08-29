import React from "react";
import "./ProductSideBar.css";
import LinkWithIcon from "../Navbar/LinkWithIcon";
import rocket from "../../assets/rocket.png";

const ProductSideBar = () => {
  return (
    <aside className="products_sidebar">
      <h2>Category</h2>
      <div className="category_links">
        <LinkWithIcon
          title="Electronics"
          link="products?category=electronics"
          emoji={rocket}
          sidebar={true}
        />
      </div>
    </aside>
  );
};

export default ProductSideBar;
