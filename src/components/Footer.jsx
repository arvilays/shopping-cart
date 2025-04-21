import { useState, useEffect } from "react";
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
          <img src={pochitaImage} alt="pochita" title="Source: Yootooz Pochita Plush" />
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
          <div className="footer-main-social"><img src={blueskyImage} alt="bluesky" /></div>
          <div className="footer-main-social"><img src={facebookImage} alt="facebook" /></div>
          <div className="footer-main-social"><img src={instagramImage} alt="instagram" /></div>
          <div className="footer-main-social"><img src={tiktokImage} alt="tiktok" /></div>
          <div className="footer-main-social"><img src={xImage} alt="x" /></div>
          <div className="footer-main-social"><img src={youtubeImage} alt="youtube" /></div>
        </div>
      </div>

      <div className="footer-credits">
        <div className="footer-credits-logo">
          <img src={logoImage} alt="mangakart" />
        </div>
        <div className="footer-credits-copyright">
          &copy; 2025-20XX, Mangakart, A Totally Real Company 
        </div>
      </div>
    </footer>
  );
}

export default Footer;

/* <img className="logo" src={logoImage} alt="mangakart" /> */