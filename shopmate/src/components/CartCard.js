// src/components/CartCard.js
import React from 'react';
import './CartCard.css';

export const CartCard = ({ product, removeFromCart }) => {
  const { name, price, image } = product;

  return (
    <div className="cartCard">
      <img src={image} alt={name} />
      <p>{name}</p>
      <p>${price}</p>
      <button onClick={() => removeFromCart(product)}>Remove</button>
    </div>
  );
};
