import { useState, useEffect } from "react";
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
  },
  { src: bannerOnePiece, alt: "One Piece", link: "/product/OP-V1" },
  { src: bannerChainsawMan, alt: "Chainsaw Man", link: "/product/CSM-V1" },
];

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto-scroll every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, autoScrollInterval);

    return () => clearInterval(interval); // Clean up interval when component unmounts
  }, []);

  return (
    <div className="home-carousel">
      <div className="home-carousel-banner">
        <Link to={banners[currentIndex].link}>
          <img
            src={banners[currentIndex].src}
            alt={banners[currentIndex].alt}
          />
        </Link>
      </div>

      <div className="home-carousel-dots">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
