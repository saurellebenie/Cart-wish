import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import "react-toastify/ReactToastify.css";
import { getJwt, getUser } from "./services/userService";
import setAuthToken from "./utils/setAuthToken";
import { toast, ToastContainer } from "react-toastify";
import UserContext from "./contexts/userContext";
import CartContext from "./contexts/cartContext";
import useData from "./hooks/useData";
import useAddToCart from "./hooks/cart/useAddToCart";
import useRemoveFromCart from "./hooks/cart/useRemoveFromCart";
import useUpdateToCart from "./hooks/cart/useUpdateeToCart";

setAuthToken(getJwt());

const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const { data: cartData, refetch } = useData("/cart", null, ["cart"]);

  const addToCartMutation = useAddToCart();
  const removeFromCartMutation = useRemoveFromCart();

  const useUpdateToCartMutation = useUpdateToCart();

  useEffect(() => {
    if (cartData) {
      setCart(cartData);
    }
  }, [cartData]);

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user]);

  useEffect(() => {
    try {
      const jwtUser = getUser();
      if (Date.now >= jwtUser.exp * 1000) {
        console.log("hello");

        localStorage.removeItem("token");
        location.reload();
      } else {
        setUser(jwtUser);
      }

      setUser(jwtUser);
    } catch (error) {}
  }, []);

  const addToCart = useCallback(
    (product, quantity) => {
      const updatedCart = [...cart];
      setCart(updatedCart);
      addToCartMutation.mutate(
        { id: product._id, quantity },
        {
          onError: (err) => {
            toast.error("Something Went Wrong!");
            setCart(cart);
          },
        }
      );
    },
    [cart]
  );

  const removeFromCart = useCallback(
    (id) => {
      const oldCrat = [...cart];
      setCart(oldCrat);
      removeFromCartMutation.mutate(
        { id },
        {
          onError: (err) => {
            console.log(err);

            toast.error("Something Went Wrong!");
            setCart(cart);
          },
        }
      );
    },
    [cart]
  );

  const updateCart = useCallback(
    (type, id) => {
      const oldCart = [...cart];
      const updatedCart = [...cart];
      const prodIndex = updatedCart.findIndex(
        (item) => item.product._id === id
      );
      if (type === "increase") {
        updatedCart[prodIndex].quantity += 1;
      }

      if (type === "decrease") {
        updatedCart[prodIndex].quantity -= 1;
      }
      setCart(updatedCart);
      useUpdateToCartMutation.mutate(
        { id, type },
        {
          onError: (err) => {
            console.log(err);

            toast.error("Something Went Wrong!");
            setCart(oldCart);
          },
        }
      );
    },
    [cart]
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateCart, setCart }}
    >
      <UserContext.Provider value={user}>
        <div className="app">
          <Navbar />
          <main>
            <ToastContainer position="bottom-right" />
            <Routing />
          </main>
        </div>
      </UserContext.Provider>
    </CartContext.Provider>
  );
};

export default App;
