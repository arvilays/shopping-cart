import "../style/footer.css";
import pochitaImage from "../assets/pochita.png";
import blueskyImage from "../assets/bluesky.svg";
import facebookImage from "../assets/facebook.svg";
import instagramImage from "../assets/instagram.svg";
import tiktokImage from "../assets/tiktok.svg";
import xImage from "../assets/x.svg";
import youtubeImage from "../assets/youtube.svg";
import logoImage from "../assets/logo.png";

const socialLinks = [
  { href: "https://bsky.app/", src: blueskyImage, alt: "bluesky" },
  { href: "https://www.facebook.com/", src: facebookImage, alt: "facebook" },
  { href: "https://www.instagram.com/", src: instagramImage, alt: "instagram" },
  { href: "https://www.tiktok.com/", src: tiktokImage, alt: "tiktok" },
  { href: "https://x.com/", src: xImage, alt: "x" },
  { href: "https://www.youtube.com/", src: youtubeImage, alt: "youtube" },
];

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
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            aria-label="Email"
          />
        </div>
      </div>

      <div className="footer-main">
        <div className="footer-main-info">
          {[
            "About",
            "Accessibility",
            "Contact",
            "Employment",
            "FAQ",
            "Orders",
            "Privacy",
            "Terms & Conditions",
          ].map((text) => (
            <div key={text} className="footer-main-info-category">
              {text}
            </div>
          ))}
        </div>
        <div className="footer-main-location">
          <div>Japan, 〒101-0021 Tokyo, Chiyoda City,</div>
          <div>Sotokanda, 4-chōme−14−1 2F 秋葉原 UDX</div>
        </div>
        <div className="footer-main-socials">
          {socialLinks.map(({ href, src, alt }) => (
            <div className="footer-main-social" key={alt}>
              <a href={href} target="_blank" rel="noopener noreferrer">
                <img src={src} alt={alt} />
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="footer-credits">
        <div className="footer-credits-logo">
          <img src={logoImage} alt="MangaKart" />
        </div>
        <div className="footer-credits-copyright">
          &copy; 2025-20XX, MangaKart, A Totally Real Company
        </div>
        <div className="footer-credits-dev">
          Mock Store Project by&nbsp;
          <a href="https://github.com/arvilays" target="_blank" rel="noopener noreferrer">
            arvilays
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
