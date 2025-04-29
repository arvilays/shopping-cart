import { Link } from "react-router-dom";
import "../style/productcard.css";

function ProductCard({ productData }) {
  return (
    <div className="product-card">
      <Link
        to={`/product/${productData.id}`}
        onClick={() => window.scrollTo(0, 0)}
        className="product-content"
      >
        <div className="product-card-image">
          <img src={productData.coverImage} alt={productData.title} />
        </div>
        <div className="product-card-title">{productData.title}</div>
        <div className="product-card-price">${productData.price}</div>
      </Link>
    </div>
  );
}

export default ProductCard;
