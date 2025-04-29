import { Link } from "react-router-dom";
import "../style/productcard.css";

function ProductCard({ productData }) {
  const { id, title, price, coverImage } = productData;

  return (
    <div className="product-card">
      <Link
        to={`/product/${id}`}
        onClick={() => window.scrollTo(0, 0)}
        className="product-content"
      >
        <div className="product-card-image">
          <img src={coverImage} alt={title} />
        </div>
        <div className="product-card-title">{title}</div>
        <div className="product-card-price">${price.toFixed(2)}</div>
      </Link>
    </div>
  );
}

export default ProductCard;
