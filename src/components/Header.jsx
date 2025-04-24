import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/header.css";
import logoImage from "../assets/logo.png";
import searchImage from "../assets/magnify.svg";
import cartImage from "../assets/cart-outline.svg";

function Header() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <header>
      <div className="header-main">
        <div className="header-main-logo">
          <Link to="/">
            <img src={logoImage} alt="mangakart" onClick={() => setSearchTerm("")} />
          </Link>
        </div>
        <div className="header-main-search">
          <div className="header-main-search-bar">
            <input 
              type="text" 
              name="search" 
              id="search" 
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate(`/search/${encodeURIComponent(searchTerm)}`);
                }
              }}
            />
          </div>
          <div className="header-main-search-icon">
            <Link to={`/search/${encodeURIComponent(searchTerm)}`}>
              <img src={searchImage} alt="search" />
            </Link>
          </div>
        </div>
        <div className="header-main-cart">
          <Link to="/cart">
            <img src={cartImage} alt="cart" />
          </Link>
        </div>
      </div>

      <div className="header-categories">
        <Link to="/search" className="header-category">All</Link>
        <div className="header-category">Action</div>
        <div className="header-category">Comedy</div>
        <div className="header-category">Drama</div>
        <div className="header-category">Thriller</div>
      </div>
    </header>
  );
}

export default Header;
