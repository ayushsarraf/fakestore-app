import React from 'react';
import './ProductCard.css';

function ProductCard({ product, onAddToCart, onAddToWishlist, isInCart, isInWishlist }) {
  const { image, title, rating, price, description } = product;

  // Truncate description if it's too long
  const truncateDescription = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          className="product-image" 
          src={image} 
          alt={title}
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNzBDMTA1LjUyMyA3MCAxMTAgNzQuNDc3IDExMCA4MEM4MCA4NSA4MCA5MCA4MCA5NUg2MEM2MCA5MCA2MCA4NSA2MCA4MEM2MCA3NC40NzcgNjQuNDc3IDcwIDcwIDcwSDEwMFoiIGZpbGw9IiM5Q0E0QUYiLz4KPHBhdGggZD0iTTEwMCAxMDBDMTA1LjUyMyAxMDAgMTEwIDEwNC40NzcgMTEwIDExMEMxMTAgMTE1LjUyMyAxMDUuNTIzIDEyMCAxMDAgMTIwQzk0LjQ3NyAxMjAgOTAgMTE1LjUyMyA5MCAxMTBDOTAgMTA0LjQ3NyA5NC40NzcgMTAwIDEwMCAxMDBaIiBmaWxsPSIjOUNBNEFGIi8+Cjwvc3ZnPgo=';
          }}
        />
      </div>
      <div className="product-details">
        <h3 className="product-title">{title}</h3>
        <div className="product-meta">
          <span className="product-rating">★ {rating}/5</span>
          <span className="product-price">${price}</span>
        </div>
        <p className="product-description">{truncateDescription(description)}</p>
      </div>
      <div className="product-actions">
        <button 
          className={`btn btn-cart ${isInCart ? 'btn-added' : ''}`}
          onClick={() => onAddToCart(product)}
          disabled={isInCart}
        >
          {isInCart ? "Added to Cart" : "Add to Cart"}
        </button>
        <button 
          className={`btn btn-wishlist ${isInWishlist ? 'btn-added' : ''}`}
          onClick={() => onAddToWishlist(product)}
          disabled={isInWishlist}
        >
          {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
