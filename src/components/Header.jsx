import { useState, useEffect } from "react";
import "../style/header.css";

// TODO: Populate categories according to manga.json

function Header() {
  return (
    <header>
      <div className="header-main">
        <div className="header-main-logo">MANGAKART</div>
        <div className="header-main-search">
          <input type="text" name="search" id="search" placeholder="Search" />
        </div>
        <div className="header-main-cart">CART</div>
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