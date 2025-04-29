import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { shuffleArray } from "../helper";
import "../style/productbar.css";

function ProductBar({
  storeData,
  title,
  link,
  showViewMore = true,
  shuffle = true,
  uniqueSeries = true,
}) {
  const filteredData = uniqueSeries
    ? storeData.filter((product) => product.volume <= 1)
    : storeData;

  const displayData = shuffle
    ? shuffleArray(filteredData).slice(0, 12)
    : filteredData.slice(0, 12);

  return (
    <div className="product-bar">
      <div className="product-bar-header">
        <div className="product-bar-title">{title}</div>
        {showViewMore && (
          <Link
            to={link}
            className="product-bar-more"
            onClick={() => window.scrollTo(0, 0)}
          >
            View More »
          </Link>
        )}
      </div>

      <hr />

      <div className="product-bar-grid">
        {displayData.map((manga) => (
          <ProductCard key={manga.id} productData={manga} />
        ))}
      </div>
    </div>
  );
}

export default ProductBar;
