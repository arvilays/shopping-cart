import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/header.css";
import logoImage from "../assets/logo.png";
import searchImage from "../assets/magnify.svg";
import cartImage from "../assets/cart-outline.svg";

// TODO: Populate categories according to manga.json

function Header() {
  return (
    <header>
      <div className="header-main">
        <div className="header-main-logo">
          <Link to="/"><img src={logoImage} alt="mangakart" /></Link>
        </div>
        <div className="header-main-search">
          <div className="header-main-search-bar">
            <input type="text" name="search" id="search" placeholder="Search" />
          </div>
          <div className="header-main-search-icon">
            <Link to="/search"><img src={searchImage} alt="search" /></Link>
          </div>
        </div>
        <div className="header-main-cart">
          <Link to="/cart"><img src={cartImage} alt="cart" /></Link>
        </div>
      </div>

      <div className="header-categories">
        <div className="header-category">All</div>
        <div className="header-category">Action</div>
        <div className="header-category">Comedy</div>
        <div className="header-category">Drama</div>
        <div className="header-category">Thriller</div>
      </div>
    </header>
  );
}

export default Header;
