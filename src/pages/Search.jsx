import { useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import "../style/search.css";
import ProductCard from "../components/ProductCard";
import filterImage from "../assets/filter-variant.svg";

function Search() {
  const [filterOpen, setFilterOpen] = useState(false);
  const { storeData } = useOutletContext();
  const { searchTerm } = useParams();

  return (
    <div className="search">
      {searchTerm && (
        <div className="search-title">
          Showing Results for "{searchTerm}".
          <hr />
        </div>
      )}

      <div className="search-main">
        <div className={`search-filter ${filterOpen ? "opened" : ""}`}> 
        </div>

        <div className="search-filter-toggle" onClick={() => setFilterOpen(!filterOpen)}>
          <img src={filterImage} alt="toggle filter" />
        </div>
        
        <div className="search-grid">
          {storeData.map((manga) => (
            <ProductCard key={manga.id} productData={manga} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;

/*
{
  name ? (
    <h1>This is the product page for {name}.</h1>
  ) : (
    <h1>Please select a product.</h1>
  )
}
*/
