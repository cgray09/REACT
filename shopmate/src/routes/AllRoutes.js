// src/routes/AllRoutes.js
import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Cart } from "../pages/Cart";

export const AllRoutes = ({ cartItems, addToCart, removeFromCart }) => {
  return (
    <Routes>
      <Route path="/" element={<Home addToCart={addToCart} />} />
      <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
    </Routes>
  );
};
