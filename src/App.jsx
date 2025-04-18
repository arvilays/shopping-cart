import { useState, useEffect } from 'react';
import { Link, Outlet } from "react-router-dom";
import "./style/reset.css";
import "./style/style.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      
      <Link to="/">Home</Link>
      <Link to="/list">List</Link>
      <Link to="/product">Product</Link>
      <Link to="/cart">Cart</Link>
      <Outlet />
        
      <Footer />
    </>
  );
}

export default App;