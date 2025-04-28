import "../style/footer.css";
import pochitaImage from "../assets/pochita.png";
import logoImage from "../assets/logo.png";
import blueskyImage from "../assets/bluesky.svg";
import facebookImage from "../assets/facebook.svg";
import instagramImage from "../assets/instagram.svg";
import tiktokImage from "../assets/tiktok.svg";
import xImage from "../assets/x.svg";
import youtubeImage from "../assets/youtube.svg";

function Footer() {
  return (
    <footer>
      <div className="footer-newsletter">
        <div className="footer-newsletter-mascot">
          <img
            src={pochitaImage}
            alt="pochita"
            title="Source: Yootooz Pochita Plush"
          />
        </div>
        <div className="footer-newsletter-title">
          Sign up for our newsletter!
        </div>
        <div className="footer-newsletter-signup">
          <input type="email" name="email" id="email" placeholder="Email" />
        </div>
      </div>

      <div className="footer-main">
        <div className="footer-main-info">
          <div className="footer-main-info-category">About</div>
          <div className="footer-main-info-category">Accessibility</div>
          <div className="footer-main-info-category">Contact</div>
          <div className="footer-main-info-category">Employment</div>
          <div className="footer-main-info-category">FAQ</div>
          <div className="footer-main-info-category">Orders</div>
          <div className="footer-main-info-category">Privacy</div>
          <div className="footer-main-info-category">Terms & Conditions</div>
        </div>
        <div className="footer-main-location">
          <div>Japan, 〒101-0021 Tokyo, Chiyoda City,</div>
          <div>Sotokanda, 4-chōme−14−1 2F 秋葉原 UDX</div>
        </div>
        <div className="footer-main-socials">
          <div className="footer-main-social">
            <a
              href="https://bsky.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={blueskyImage} alt="bluesky" />
            </a>
          </div>
          <div className="footer-main-social">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={facebookImage} alt="facebook" />
            </a>
          </div>
          <div className="footer-main-social">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={instagramImage} alt="instagram" />
            </a>
          </div>
          <div className="footer-main-social">
            <a
              href="https://www.tiktok.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={tiktokImage} alt="tiktok" />
            </a>
          </div>
          <div className="footer-main-social">
            <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
              <img src={xImage} alt="x" />
            </a>
          </div>
          <div className="footer-main-social">
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={youtubeImage} alt="youtube" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-credits">
        <div className="footer-credits-logo">
          <img src={logoImage} alt="mangakart" />
        </div>
        <div className="footer-credits-copyright">
          &copy; 2025-20XX, MangaKart, A Totally Real Company
        </div>
      </div>
    </footer>
  );
}

export default Footer;

/* <img className="logo" src={logoImage} alt="mangakart" /> */
