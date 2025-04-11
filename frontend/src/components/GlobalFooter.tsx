import React from 'react';
import { FaFacebookF, FaYoutube, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import './GlobalFooter.css';

const GlobalFooter: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* BROWSE Column */}
        <div>
          <h4 className="footer-heading">BROWSE</h4>
          <ul className="footer-list">
            <li>Indie Favorites</li>
            <li>Documentary Vault</li>
            <li>International Gems</li>
            <li>Festival Winners</li>
            <li>Cult Classics</li>
            <li>New Releases</li>
            <li>CineNiche Originals</li>
            <li>Hidden Treasures</li>
            <li>Family & Animation</li>
            <li>Staff Picks</li>
          </ul>
        </div>
 

        {/* HELP + ABOUT US */}
        <div>
          <h4 className="footer-heading">HELP</h4>
          <ul className="footer-list">
            <li>Account & Billing</li>
            <li>Plans & Pricing</li>
            <li>Student Discount</li>
            <li>Supported Devices</li>
            <li>Accessibility</li>
            <li>Shop CineNiche</li>
            <li>Press</li>
            <li>Jobs</li>
            <li>Contact</li>
            <li>Guides | What to Watch</li>
          </ul>

        </div>
        <div>
            <h4 className="footer-heading">LEGAL</h4>
            <ul className="footer-list">
            <Link to="/privacy">
                <li className="footer-privacy">
                  Privacy Policy
                </li>
            </Link>
                <li>About Ads</li>
                <li>Subscriber Agreement</li>
                <li>Do Not Sell or Share My Personal Information</li>
                <li>Your US State Privacy Rights</li>
                <li>Movie Parental Guidelines</li>
                <li>Sitemap</li>
                <li>© 2025 CineNiche, LLC</li>
            </ul>
        </div>

        {/* SOCIAL */}
        <div className="footer-social">
            <ul>
                <li className="icon-hover">
                <a href="https://www.facebook.com/groups/1199210663926081/posts/hey-rollers-lets-rick-roll-with-a-new-link/1199670603880087/" target="_blank" rel="noopener noreferrer">
                    <FaFacebookF />
                </a>
                </li>
                <li className="icon-hover">
                <a href="https://x.com/MIT_CSAIL/status/1363172815315214336?lang=en" target="_blank" rel="noopener noreferrer">
                    <FaXTwitter />
                </a>
                </li>
                <li className="icon-hover">
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">
                    <FaYoutube />
                </a>
                </li>
                <li className="icon-hover">
                <a href="https://www.instagram.com/ooferjuice/p/BgSlRglAKBn/?hl=en" target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                </a>
                </li>
            </ul>
        </div>
        </div>
    </footer>
  );
};

export default GlobalFooter;