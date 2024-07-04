// src/App.js
import React, { useState } from 'react';
import { AllRoutes } from './routes/AllRoutes';
import { Header } from './components';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const removeFromCart = (productToRemove) => {
    setCartItems((prevItems) => prevItems.filter(product => product.id !== productToRemove.id));
  };

  return (
    <div className="App">
      <Header cartItems={cartItems} />
      <AllRoutes cartItems={cartItems} addToCart={addToCart} removeFromCart={removeFromCart} />
    </div>
  );
}

export default App;
