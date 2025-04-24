import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import "./style/reset.css";
import "./style/style.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [loading, setLoading] = useState(true);
  const [storeData, setStoreData] = useState([]);

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

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <Outlet context={{ storeData }} />
      <Footer />
    </>
  );
}

export default App;

/*<div>
  {storeData.map((manga) => (
    <div key={manga.id}>
      <h3>{manga.title}</h3>
    </div>
  ))}
</div>*/

{
  /* <Link to="/product">Product</Link> */
}
