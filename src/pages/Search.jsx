import { useState, useEffect, useMemo } from "react";
import { useOutletContext, useLocation, useNavigate } from "react-router-dom";
import "../style/search.css";
import ProductCard from "../components/ProductCard";
import filterImage from "../assets/filter-variant.svg";

function Search() {
  const { storeData } = useOutletContext();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  // --- States initialized from URL ---
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
  const [selectedSeries, setSelectedSeries] = useState(
    queryParams.get("series") || "",
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const allGenres = useMemo(
    () =>
      storeData.length
        ? [...new Set(storeData.flatMap((product) => product.genre))].sort()
        : [],
    [storeData],
  );

  // --- Sync state with URL ---
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get("search") || "");
    setSortFilter(params.get("sort") || "name-asc");
    setSelectedGenres(params.get("genres")?.split(",") || []);
    setPriceRange({
      min: params.get("min") || "",
      max: params.get("max") || "",
    });
    setSelectedSeries(params.get("series") || "");
    setCurrentPage(1);
  }, [location.search]);

  // --- Debounced URL Update ---
  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams();
      if (searchTerm) params.set("search", searchTerm);
      if (sortFilter) params.set("sort", sortFilter);
      if (selectedGenres.length) params.set("genres", selectedGenres.join(","));
      if (priceRange.min) params.set("min", priceRange.min);
      if (priceRange.max) params.set("max", priceRange.max);
      if (selectedSeries) params.set("series", selectedSeries);

      navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm, sortFilter, selectedGenres, priceRange, selectedSeries]);

  // --- Filter & Sort Logic ---
  const filteredStoreData = useMemo(() => {
    const minPrice = parseFloat(priceRange.min) || 0;
    const maxPrice = parseFloat(priceRange.max) || Infinity;

    return storeData
      .filter((product) =>
        selectedSeries ? product.series === selectedSeries : true,
      )
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
      .filter(
        (product) => product.price >= minPrice && product.price <= maxPrice,
      )
      .sort((a, b) => {
        if (selectedSeries) {
          // If a series is selected, just sort by volume
          return a.volume - b.volume;
        }

        switch (sortFilter) {
          case "name-asc":
            if (a.series && b.series) {
              const seriesCompare = a.series.localeCompare(b.series);
              if (seriesCompare !== 0) {
                return seriesCompare; // Different series → sort alphabetically
              } else {
                // Same series → sort by volume
                return a.volume - b.volume;
              }
            } else {
              // Fallback: sort by title alphabetically
              return a.title.localeCompare(b.title);
            }

          case "name-desc":
            if (a.series && b.series) {
              const seriesCompare = b.series.localeCompare(a.series);
              if (seriesCompare !== 0) {
                return seriesCompare;
              } else {
                return a.volume - b.volume;
              }
            } else {
              return b.title.localeCompare(a.title);
            }

          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          default:
            return 0;
        }
      });
  }, [
    storeData,
    searchTerm,
    sortFilter,
    selectedGenres,
    priceRange,
    selectedSeries,
  ]);

  // --- Changing Pages ---
  const paginatedData = filteredStoreData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="search">
      <div className="search-results">Results</div>
      {searchTerm && (
        <div className="search-title">
          Showing results for "{searchTerm}".
        </div>
      )}
      <hr />

      <div className="search-main">
        <div className={`search-filter ${filterOpen ? "opened" : ""}`}>
          <div className="search-filter-content">
            <div className="search-filter-sort">
              <label htmlFor="sort" className="filter-title">
                Sort by:
              </label>
              <select
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

            <fieldset className="search-filter-genre">
              <legend className="filter-title">Filter by Genre:</legend>
              <div className="search-filter-genre-boxes">
                {allGenres.map((genre) => (
                  <label key={genre}>
                    <input
                      type="checkbox"
                      value={genre}
                      checked={selectedGenres.includes(genre)}
                      onChange={(e) => {
                        const value = e.target.value;
                        setSelectedGenres((prev) =>
                          e.target.checked
                            ? [...prev, value]
                            : prev.filter((g) => g !== value),
                        );
                      }}
                    />
                    {genre}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="search-filter-price">
              <legend className="filter-title">Filter by Price:</legend>
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
            </fieldset>
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
