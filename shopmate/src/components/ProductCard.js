// src/components/ProductCard.js
import "./ProductCard.css";

export const ProductCard = ({ product, addToCart }) => {
  const { name, price, image } = product;

  return (
    <div className="productCard">
      <img src={image} alt={name} />
      <p className="name">{name}</p>
      <div className="action">
        <p>${price}</p>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
};
