import { useEffect, useRef } from "react";
import { Link, useOutletContext } from "react-router-dom";
import "../style/home.css";
import Carousel from "../components/Carousel";
import ProductBar from "../components/ProductBar";
import { shuffleArray } from "../helper";
import logoImage from "../assets/logo.png";

function Home() {
  const { storeData } = useOutletContext();
  const gridRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!gridRef.current) return;

      const scrollY = window.scrollY;
      const offsetTop = gridRef.current.offsetTop;
      const windowHeight = window.innerHeight;

      if (scrollY + windowHeight > offsetTop) {
        const distance = (scrollY + windowHeight - offsetTop) * 0.05; // adjust 0.05 to control speed
        gridRef.current.style.transform = `translateY(${distance}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="home">
      <Carousel />

      <ProductBar 
        storeData={storeData} 
        title="🔥Popular Releases" 
        link="/search" 
      />

      <div className="home-explore">
        <div className="home-explore-text">
          <img src={logoImage} alt="mangakart" className="home-explore-logo" />
          <div className="home-explore-title">Your One Stop Manga Shop!</div>
          <Link to="/search" className="home-explore-button" onClick={() => window.scrollTo(0, 0)}>SHOP NOW</Link>
        </div>
        <div className="home-explore-grid" ref={gridRef}>
          {shuffleArray(storeData).slice(0, 50).map((manga) => (
            <img src={manga.coverImage} alt={manga.title} key={manga.id} />
          ))}
        </div>
      </div>

      <ProductBar
        storeData={storeData.filter((product) => product.genre.includes("Action"))}
        title="⚔️Pulse-Pounding Action"
        link="/search?genres=Action"
      />
      <ProductBar
        storeData={storeData.filter((product) => product.genre.includes("Drama"))}
        title="💖Stories That Break and Mend"
        link="/search?genres=Drama"
      />

      <div className="home-reviews">
        <div className="home-review">
          <div className="home-review-text">❝ I Naruto-ran to the door when my package arrived. 10/10 ❞</div>
        </div>
        <div className="home-review">
          <div className="home-review-text">❝ Bought one volume, blacked out, woke up with a whole bookshelf. No regrets. Only manga. ❞</div>
        </div>
        <div className="home-review">
          <div className="home-review-text">❝ If loving this store is wrong, throw me in Impel Down with Luffy. I'm loyal to the brand now. ❞</div>
        </div>
      </div>
    </main>
  );
}

export default Home;
