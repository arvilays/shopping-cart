import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/header.css";
import menuImage from "../assets/menu.svg";
import closeImage from "../assets/close.svg";
import logoImage from "../assets/logo.png";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  }

  const handleSearch = () => {
    const trimmed = searchTerm.trim();
    navigate(`/search?search=${encodeURIComponent(trimmed)}`);
  };

  const handleOutsideClick = (e) => {
    const menuIcon = document.getElementById("menu-icon");
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(e.target) &&
      !menuIcon.contains(e.target)
    ) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (sidebarOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [sidebarOpen]);

  return (
    <>
      <header>
        <div className="header-main">
          <div className="header-main-menu-logo">
            <img src={sidebarOpen ? closeImage : menuImage} alt="menu" className={sidebarOpen ? "menu-opened" : ""} id="menu-icon" onClick={toggleSidebar} />
            <Link to="/" className="header-main-logo" onClick={() => setSearchTerm("")}>
              <img src={logoImage} alt="MangaKart" />
            </Link>
          </div>

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
      </header>

      <div ref={sidebarRef} className={`sidebar ${sidebarOpen ? "sidebar-opened" : ""}`}>
        <Link to="/search" className="sidebar-category">
          All
        </Link>

        {genres.map((genre) => (
          <Link
            key={genre}
            to={`/search?genres=${encodeURIComponent(genre)}`}
            className="sidebar-category"
          >
            {genre}
          </Link>
        ))}
      </div>
    </>
  );
}

export default Header;
