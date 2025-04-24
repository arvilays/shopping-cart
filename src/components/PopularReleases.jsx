import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { shuffleArray } from "../helper";

function PopularReleases({ storeData }) {
  const shuffledStoreData = shuffleArray(storeData).slice(0, 11);

  return (
    <div className="home-popular">
      <div className="home-popular-bar">
        <div className="home-popular-title">🔥Popular Releases</div>
        <Link to="/search" className="home-popular-more">
          View More »
        </Link>
      </div>

      <hr />

      <div className="home-popular-grid">
        {shuffledStoreData.map((manga) => (
          <ProductCard key={manga.id} productData={manga} />
        ))}
      </div>
    </div>
  );
}

export default PopularReleases;
