import { useParams, useOutletContext } from "react-router-dom";
import "../style/search.css";
import ProductCard from "../components/ProductCard";

function Search() {
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

      <div className="search-grid">
        {storeData.map((manga) => (
          <ProductCard key={manga.id} productData={manga} />
        ))}
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
