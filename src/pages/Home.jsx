import { useOutletContext } from "react-router-dom";
import "../style/home.css";
import PopularReleases from "../components/PopularReleases";

function Home() {
  const { storeData } = useOutletContext();

  return (
    <main className="home">
      <div className="home-gallery">
        GALLERY
        {storeData.length}
      </div>

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
