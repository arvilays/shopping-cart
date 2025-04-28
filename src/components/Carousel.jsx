import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import bannerOnePiece from "../assets/banner-onepiece.png";
import bannerChainsawMan from "../assets/banner-chainsawman.png";
import bannerDeliciousInDungeon from "../assets/banner-deliciousindungeon.png";

const autoScrollInterval = 8000;
const banners = [
  {
    src: bannerDeliciousInDungeon,
    alt: "Delicious in Dungeon",
    link: "/product/DELICIOUS-V1",
    title: "Source: Delicious in Dungeon x Arknights Collab",
  },
  {
    src: bannerOnePiece,
    alt: "One Piece",
    link: "/product/OP-V1",
    title: "Source: One Piece Vol. 1 Manga Spread",
  },
  {
    src: bannerChainsawMan,
    alt: "Chainsaw Man",
    link: "/product/CSM-V1",
    title: "Source: Chainsaw Man Vol. 1 Cover",
  },
];

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const startAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current); // Clear any existing interval
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, autoScrollInterval);
  };

  useEffect(() => {
    startAutoScroll();

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="home-carousel">
      <div className="home-carousel-banner">
        <Link to={banners[currentIndex].link}>
          <img
            src={banners[currentIndex].src}
            alt={banners[currentIndex].alt}
            title={banners[currentIndex].title}
          />
        </Link>
      </div>

      <div className="home-carousel-dots">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => {
              goToSlide(index);
              startAutoScroll(); // Reset timer when a dot is clicked
            }}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
