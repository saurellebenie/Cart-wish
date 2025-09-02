import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import ProductPage from "../Products/ProductPage";
import SingleProduct from "../SingleProduct/SingleProduct";
import SingleProductPage from "../SingleProduct/SingleProduct";
import CartPage from "../Cart/CartPage";
import MyOrderPage from "../MyOder/MyOrderPage";
import LoginPage from "../Authentication/LoginPage";
import SignupPage from "../Authentication/SignupPage";
import Logout from "../Authentication/Logout";
import ProtectedRoute from "./ProtectedRoute";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductPage />} />
      <Route path="/product/:id" element={<SingleProductPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/myorders" element={<MyOrderPage />} />
        <Route path="/logout" element={<Logout />} />{" "}
      </Route>
    </Routes>
  );
};

export default Routing;
