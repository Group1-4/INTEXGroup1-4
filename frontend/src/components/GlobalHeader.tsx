import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../App.css";

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const isAdmin = path.startsWith("/admin");

  const renderRightSide = () => {
    switch (path) {
      case "/":
        return (
          <>
            <Link to="/register">
              <button className="header-button">Sign Up</button>
            </Link>
            <Link to="/login">
              <button className="header-button">Log In</button>
            </Link>
          </>
        );
      case "/movies":
      case "/admin":
        return (
          <div className="profile-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
            >
              <path
                d="M12.1148 35.4123C13.8751 34.0662 15.8424 33.0049 18.0168 32.2283C20.1913 31.4517 22.4693 31.0634 24.8508 31.0634C27.2323 31.0634 29.5103 31.4517 31.6848 32.2283C33.8592 33.0049 35.8265 34.0662 37.5868 35.4123C38.7948 33.9972 39.7354 32.3923 40.4084 30.5975C41.0814 28.8027 41.418 26.8871 41.418 24.8508C41.418 20.2603 39.8044 16.3515 36.5773 13.1243C33.3501 9.89716 29.4413 8.28359 24.8508 8.28359C20.2603 8.28359 16.3515 9.89716 13.1244 13.1243C9.89721 16.3515 8.28364 20.2603 8.28364 24.8508C8.28364 26.8871 8.62016 28.8027 9.2932 30.5975C9.96624 32.3923 10.9068 33.9972 12.1148 35.4123ZM24.8508 26.9217C22.8144 26.9217 21.0973 26.2227 19.6995 24.8249C18.3016 23.427 17.6027 21.7099 17.6027 19.6735C17.6027 17.6371 18.3016 15.92 19.6995 14.5222C21.0973 13.1243 22.8144 12.4254 24.8508 12.4254C26.8872 12.4254 28.6043 13.1243 30.0022 14.5222C31.4 15.92 32.0989 17.6371 32.0989 19.6735C32.0989 21.7099 31.4 23.427 30.0022 24.8249C28.6043 26.2227 26.8872 26.9217 24.8508 26.9217ZM24.8508 45.5597C21.9861 45.5597 19.2939 45.0161 16.7743 43.9289C14.2547 42.8417 12.063 41.3661 10.1992 39.5023C8.33541 37.6385 6.8599 35.4468 5.77268 32.9273C4.68546 30.4077 4.14185 27.7155 4.14185 24.8508C4.14185 21.986 4.68546 19.2939 5.77268 16.7743C6.8599 14.2547 8.33541 12.063 10.1992 10.1992C12.063 8.33536 14.2547 6.85985 16.7743 5.77263C19.2939 4.68541 21.9861 4.1418 24.8508 4.1418C27.7155 4.1418 30.4077 4.68541 32.9273 5.77263C35.4469 6.85985 37.6386 8.33536 39.5024 10.1992C41.3662 12.063 42.8417 14.2547 43.9289 16.7743C45.0161 19.2939 45.5598 21.986 45.5598 24.8508C45.5598 27.7155 45.0161 30.4077 43.9289 32.9273C42.8417 35.4468 41.3662 37.6385 39.5024 39.5023C37.6386 41.3661 35.4469 42.8417 32.9273 43.9289C30.4077 45.0161 27.7155 45.5597 24.8508 45.5597Z"
                fill="#FFF1C2"
              />
            </svg>
          </div>
        );
      case "/login":
        return (
          <Link to="/register">
            <button className="header-button">Sign Up</button>
          </Link>
        );
      case "/register":
        return (
          <Link to="/login">
            <button className="header-button">Log In</button>
          </Link>
        );
      case "/privacy":
        return (
          <button className="header-button" onClick={() => navigate("/")}>
            Get Started
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <header className="cine-header">
      <div
        className="cine-logo"
        style={{ display: "flex", alignItems: "center" }}
      >
        <a href="/">
          <img
            src="/header-logo.png"
            alt="CineNiche Logo"
            className="logo-icon"
          />
        </a>
        {isAdmin && (
          <span
            className="admin-title"
            style={{ color: "#FFF1C2", marginLeft: "10px", fontSize: "1.2rem" }}
          >
            - Admin Portal
          </span>
        )}
      </div>

      <div
        className="header-right"
        style={{ display: "flex", gap: "10px", alignItems: "center" }}
      >
        {renderRightSide()}
      </div>
    </header>
  );
};

export default Header;
