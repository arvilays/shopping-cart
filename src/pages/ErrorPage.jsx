import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../style/errorpage.css";
import sadChopperImage from "../assets/sadchopper.png";

function ErrorPage() {
  return (
    <div>
      <Header />

      <div className="error">
        <div className="error-title">404</div>
        <div className="error-description">Page not Found!</div>
        <img src={sadChopperImage} alt="sad chopper" />
      </div>

      <Footer />
    </div>
  );
}

export default ErrorPage;
