import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

function ProductList({ onAddToCart, onAddToWishlist, cart, wishlist }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.in/api/products');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.products && Array.isArray(data.products)) {
          // Limit to 20 products
          const productsData = data.products.slice(0, 20);
          
          // Enhance each product with a synthetic rating (if missing)
          const enhancedProducts = productsData.map(product => ({
            ...product,
            rating: product.rating || (Math.random() * (5 - 3.5) + 3.5).toFixed(1)
          }));
          
          setProducts(enhancedProducts);
        } else {
          throw new Error('Invalid data format received');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="loading-message">Loading products...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (products.length === 0) {
    return <div className="error-message">No products found</div>;
  }

  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product}
          onAddToCart={onAddToCart}
          onAddToWishlist={onAddToWishlist}
          isInCart={!!cart.find(item => item.id === product.id)}
          isInWishlist={!!wishlist.find(item => item.id === product.id)}
        />
      ))}
    </div>
  );
}

export default ProductList;
