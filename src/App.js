import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Load persistent state from localStorage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
      }
    }
    if (storedWishlist) {
      try {
        setWishlist(JSON.parse(storedWishlist));
      } catch (error) {
        console.error('Error parsing wishlist from localStorage:', error);
      }
    }
  }, []);

  // Update and persist cart state
  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  // Update and persist wishlist state
  const updateWishlist = (newWishlist) => {
    setWishlist(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
  };

  // Handlers for adding products – avoid duplicates
  const handleAddToCart = (product) => {
    if (!cart.find(item => item.id === product.id)) {
      updateCart([...cart, product]);
    }
  };

  const handleAddToWishlist = (product) => {
    if (!wishlist.find(item => item.id === product.id)) {
      updateWishlist([...wishlist, product]);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>FakeStore App</h1>
        <div className="header-info">
          <span className="counter">Cart: {cart.length} items</span>
          <span className="counter">Wishlist: {wishlist.length} items</span>
        </div>
      </header>
      <main>
        <ProductList 
          onAddToCart={handleAddToCart} 
          onAddToWishlist={handleAddToWishlist}
          cart={cart}
          wishlist={wishlist}
        />
      </main>
    </div>
  );
}

export default App;
