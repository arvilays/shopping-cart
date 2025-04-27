import { useState, useEffect } from "react";
import { useOutletContext, useLocation, useNavigate } from "react-router-dom";
import "../style/search.css";
import ProductCard from "../components/ProductCard";
import filterImage from "../assets/filter-variant.svg";

function Search() {
  const { storeData } = useOutletContext();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  // States initialized from URL params
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(queryParams.get("search") || "");
  const [sortFilter, setSortFilter] = useState(
    queryParams.get("sort") || "name-asc",
  );
  const [selectedGenres, setSelectedGenres] = useState(
    queryParams.get("genres")?.split(",") || [],
  );
  const [priceRange, setPriceRange] = useState({
    min: queryParams.get("min") || "",
    max: queryParams.get("max") || "",
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // Number of items per page

  // Generate list of unique genres
  const allGenres = storeData.length
    ? [...new Set(storeData.flatMap((product) => product.genre))].sort()
    : [];

  // Update state based on URL changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get("search") || "");
    setSortFilter(params.get("sort") || "name-asc");
    setSelectedGenres(params.get("genres")?.split(",") || []);
    setPriceRange({
      min: params.get("min") || "",
      max: params.get("max") || "",
    });
    setCurrentPage(1);
  }, [location.search]);

  // Update URL whenever filters change
  const updateURL = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (sortFilter) params.set("sort", sortFilter);
    if (selectedGenres.length) params.set("genres", selectedGenres.join(","));
    if (priceRange.min) params.set("min", priceRange.min);
    if (priceRange.max) params.set("max", priceRange.max);
    setCurrentPage(1);

    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  useEffect(() => {
    updateURL();
  }, [searchTerm, sortFilter, selectedGenres, priceRange]);

  // Apply filters to storeData
  let filteredStoreData = storeData
    .filter((product) =>
      searchTerm
        ? product.title.toLowerCase().includes(searchTerm.toLowerCase())
        : true,
    )
    .filter((product) =>
      selectedGenres.length
        ? selectedGenres.some((genre) => product.genre.includes(genre))
        : true,
    )
    .filter((product) => {
      const min = priceRange.min ? parseFloat(priceRange.min) : 0;
      const max = priceRange.max ? parseFloat(priceRange.max) : Infinity;
      return product.price >= min && product.price <= max;
    })
    .sort((a, b) => {
      switch (sortFilter) {
        case "name-asc":
          return a.title.localeCompare(b.title);
        case "name-desc":
          return b.title.localeCompare(a.title);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        default:
          return 0;
      }
    });

  // Pagination: Slice the filtered data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredStoreData.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

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
          <div className="search-filter-content">
            <div className="search-filter-sort">
              <label htmlFor="sort" className="filter-title">
                Sort by:
              </label>
              <select
                name="sort"
                id="sort"
                value={sortFilter}
                onChange={(e) => setSortFilter(e.target.value)}
              >
                <option value="name-asc">Name: A-Z</option>
                <option value="name-desc">Name: Z-A</option>
                <option value="price-asc">Price: Low-High</option>
                <option value="price-desc">Price: High-Low</option>
              </select>
            </div>

            <div className="search-filter-genre">
              <div className="filter-title">Filter by Genre:</div>
              <div className="search-filter-genre-boxes">
                {allGenres.map((genre) => (
                  <label key={genre}>
                    <input
                      type="checkbox"
                      value={genre}
                      checked={selectedGenres.includes(genre)}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (e.target.checked) {
                          setSelectedGenres((prev) => [...prev, value]);
                        } else {
                          setSelectedGenres((prev) =>
                            prev.filter((g) => g !== value),
                          );
                        }
                      }}
                    />
                    {genre}
                  </label>
                ))}
              </div>
            </div>

            <div className="search-filter-price">
              <div className="filter-title">Filter by Price:</div>
              <div className="search-filter-price-inputs">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) =>
                    setPriceRange((prev) => ({ ...prev, min: e.target.value }))
                  }
                />
                -
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange((prev) => ({ ...prev, max: e.target.value }))
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className="search-filter-toggle"
          onClick={() => setFilterOpen(!filterOpen)}
        >
          <img src={filterImage} alt="toggle filter" />
        </div>

        <div className="search-grid">
          {paginatedData.map((product) => (
            <ProductCard key={product.id} productData={product} />
          ))}
        </div>
      </div>

      <div className="search-pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div>Page {currentPage}</div>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={paginatedData.length < itemsPerPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Search;
