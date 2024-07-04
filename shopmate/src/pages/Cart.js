// src/pages/Cart.js
import { useTitle } from "../hooks/useTitle";
import { CartCard } from "../components";

export const Cart = ({ cartItems, removeFromCart }) => {
  useTitle("Cart");

  return (
    <main>
      <section className="cart">
        <h1>Cart Items: {cartItems.length}</h1>
        {cartItems.map((product, index) => (
          <CartCard key={index} product={product} removeFromCart={removeFromCart} />
        ))}
      </section>
    </main>
  );
};
