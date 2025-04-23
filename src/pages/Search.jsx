import { useOutletContext } from "react-router-dom";
import "../style/search.css";
import ProductCard from "../components/ProductCard";

function Search() {
  const { storeData } = useOutletContext();

  return (
    <div className="search">
      <div className="search-grid">
        {storeData.map((manga) => (
          <ProductCard
            productData={manga}
          />
        ))}
      </div>
    </div>
  );
}

export default Search;
