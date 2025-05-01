import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./style/reset.css";
import "./style/style.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [storeData, setStoreData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartData, setCartData] = useState(() => {
    const saved = localStorage.getItem("cartData");
    return saved ? JSON.parse(saved) : [];
  });

  // Save cartData to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cartData));
  }, [cartData]);

  const fetchManga = async () => {
    try {
      const res = await fetch("/manga.json");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setStoreData(data);
    } catch (error) {
      console.error("Failed to fetch manga:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchManga();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <>
      <Header cartData={cartData} />
      <Outlet context={{ storeData, cartData, setCartData }} />
      <Footer />
    </>
  );
}

export default App;
