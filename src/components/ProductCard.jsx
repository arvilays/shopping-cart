import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/productcard.css";

function ProductCard({ productData }) {
  return (
    <Link to={`/product/${productData.id}`} className="product-card" key={productData.id}>
        <div className="product-card-image">
          <img src={productData.coverImage} alt={productData.title} />
        </div>
        <div className="product-card-title">
          {productData.title}
        </div>
        <div className="product-card-price">
          ${productData.price}
        </div>
    </Link>
  );
}

export default ProductCard;