import { useOutletContext } from "react-router-dom";
import "../style/home.css";
import Carousel from "../components/Carousel";
import PopularReleases from "../components/PopularReleases";

function Home() {
  const { storeData } = useOutletContext();

  return (
    <main className="home">
      <Carousel />
      <PopularReleases storeData={storeData} />

      <div className="home-categories">CATEGORIES</div>
      <div className="home-explore">EXPLORE</div>
      <div className="home-reviews">REVIEWS</div>
    </main>
  );
}

export default Home;

/*
  {name === "pageone" ? (
    <PageOne />
  ) : name === "pagetwo" ? (
    <PageTwo />
  ) : (
    <DefaultPage />
  )}
*/
