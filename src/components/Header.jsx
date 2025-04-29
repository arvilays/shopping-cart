import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/header.css";
import searchImage from "../assets/magnify.svg";
import cartImage from "../assets/cart-outline.svg";

const genres = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Thriller",
];

function Header() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    const trimmed = searchTerm.trim();
    navigate(`/search?search=${encodeURIComponent(trimmed)}`);
  };

  return (
    <header>
      <div className="header-main">
        <Link to="/" className="header-main-logo" onClick={() => setSearchTerm("")}>
          MANGA<span>KART</span>🍥
        </Link>

        <div className="header-main-search-cart">
          <div className="header-main-search">
            <div className="header-main-search-bar">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <div
              className="header-main-search-icon"
              onClick={handleSearch}
              aria-label="Search"
            >
              <img src={searchImage} alt="search icon" />
            </div>
          </div>
          <div className="header-main-cart">
            <Link to="/cart">
              <img src={cartImage} alt="cart" />
            </Link>
          </div>
        </div>
      </div>

      <div className="header-categories">
        <Link to="/search" className="header-category">
          All
        </Link>
        {genres.map((genre) => (
          <Link
            key={genre}
            to={`/search?genres=${encodeURIComponent(genre)}`}
            className="header-category"
          >
            {genre}
          </Link>
        ))}
      </div>
    </header>
  );
}

export default Header;
