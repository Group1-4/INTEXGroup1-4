import React from 'react';
import CookieConsent from 'react-cookie-consent';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const CookieConsentBanner: React.FC = () => {
  const navigate = useNavigate(); // Initialize the navigate hook

  const handlePrivacyClick = () => {
    navigate('/privacy'); // Programmatically navigate to /privacy
  };

  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      declineButtonText="Decline"
      enableDeclineButton={true}
      cookieName="siteCookieConsent"
      expires={150}
      style={{
        background: "#F7E8C0",
        padding: "20px 30px",
        fontSize: "15px",
        color: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      buttonStyle={{
        color: "#FFFFFF",
        fontSize: "14px",
        borderRadius: "4px",
        width: "120px",
        padding: "8px 12px",
        backgroundColor: "#A67C52",
        marginLeft: "10px",
      }}
      declineButtonStyle={{
        color: "#FFFFFF",
        background: "#8B5E3C",
        fontSize: "14px",
        borderRadius: "4px",
        width: "120px",
        padding: "8px 12px",
        marginLeft: "10px",
      }}
      onAccept={() => {
        console.log("Cookie consent accepted!");
      }}
      onDecline={() => {
        console.log("Cookie consent declined!");
      }}
    >
      <span>
        We use cookies to enhance your browsing experience, analyze site traffic, and personalize content and ads.
        By clicking "Accept," you consent to our use of cookies. If you click "Decline," non-essential cookies will not be activated.
        For more details, please refer to our{" "}
        <span
          onClick={handlePrivacyClick} // Call the navigate function on click
          style={{
            color: "#000000",
            textDecoration: "underline",
            fontWeight: "bold",
            cursor: "pointer", // Indicate it's clickable
          }}
        >
          Privacy Policy
        </span>.
      </span>
    </CookieConsent>
  );
};

export default CookieConsentBanner;