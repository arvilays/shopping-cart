import { useEffect, useRef } from "react";
import { Link, useOutletContext } from "react-router-dom";
import "../style/home.css";
import Carousel from "../components/Carousel";
import ProductBar from "../components/ProductBar";
import { shuffleArray } from "../helper";
import logoImage from "../assets/logo.png";
import avatar1Image from "../assets/avatar1.png";
import avatar2Image from "../assets/avatar2.png";
import avatar3Image from "../assets/avatar3.png";

function Home() {
  const { storeData } = useOutletContext();
  const gridRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!gridRef.current) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const offsetTop = gridRef.current.offsetTop;
          const windowHeight = window.innerHeight;

          if (scrollY + windowHeight > offsetTop) {
            const distance = (scrollY + windowHeight - offsetTop) * 0.05;
            gridRef.current.style.transform = `translateY(${distance}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const featuredProducts = storeData.filter((product) => product.volume <= 1);

  return (
    <main className="home">
      <Carousel />

      <ProductBar
        storeData={featuredProducts}
        title="🔥Popular Releases"
        link="/search"
      />

      <div className="home-explore">
        <div className="home-explore-text">
          <img src={logoImage} alt="mangakart" className="home-explore-logo" />
          <div className="home-explore-title">Your One Stop Manga Shop!</div>
          <Link
            to="/search"
            className="home-explore-button"
            onClick={() => window.scrollTo(0, 0)}
          >
            SHOP NOW
          </Link>
        </div>
        <div className="home-explore-grid" ref={gridRef}>
          {shuffleArray(featuredProducts)
            .slice(0, 50)
            .map((manga) => (
              <img src={manga.coverImage} alt={manga.title} key={manga.id} />
            ))}
        </div>
      </div>

      <ProductBar
        storeData={featuredProducts.filter((product) =>
          product.genre.includes("Action"),
        )}
        title="⚔️Pulse-Pounding Action"
        link="/search?genres=Action"
      />
      <ProductBar
        storeData={featuredProducts.filter((product) =>
          product.genre.includes("Drama"),
        )}
        title="💖Stories That Break and Mend"
        link="/search?genres=Drama"
      />

      <div className="home-reviews">
        <div className="home-reviews-title">
          🗣️Voices from the MangaKart Community
        </div>
        <div className="home-reviews-collection">
          <div className="home-review">
            <div className="home-review-text">
              ❝I Naruto-ran to the door when my package arrived. 10/10❞
            </div>
            <div className="home-review-avatar">
              <img
                src={avatar1Image}
                alt="Avatar of an enthusiastic reviewer"
                title="Source: Dead Dead Demon's Dededede Destruction"
              />
            </div>
          </div>
          <div className="home-review">
            <div className="home-review-text">
              ❝Bought one volume, blacked out, woke up with a whole bookshelf.
              No regrets. Only manga.❞
            </div>
            <div className="home-review-avatar">
              <img
                src={avatar2Image}
                alt="Avatar of an easygoing reviewer"
                title="Source: Delicious in Dungeon"
              />
            </div>
          </div>
          <div className="home-review">
            <div className="home-review-text">
              ❝If loving this store is wrong, throw me in Impel Down with Luffy.
              I'm loyal to the brand now.❞
            </div>
            <div className="home-review-avatar">
              <img
                src={avatar3Image}
                alt="Avatar of a loyal reviewer"
                title="Source: One Piece"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
