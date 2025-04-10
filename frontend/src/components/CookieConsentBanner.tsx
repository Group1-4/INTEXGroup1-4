import React from 'react';
import CookieConsent from 'react-cookie-consent';

const CookieConsentBanner: React.FC = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      declineButtonText="Decline"
      enableDeclineButton={true}
      cookieName="siteCookieConsent"
      expires={150}
      style={{
        background: "#F7E8C0",           // Retro cream background
        padding: "20px 30px",
        fontSize: "15px",
        color: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center", // This might need adjustment for button placement
      }}
      buttonStyle={{
        color: "#FFFFFF",
        fontSize: "14px",
        borderRadius: "4px",
        width: "120px",
        padding: "8px 12px",
        backgroundColor: "#A67C52", // Warm brown for accept button
        marginLeft: "10px",       // Add some space between buttons
      }}
      declineButtonStyle={{
        color: "#FFFFFF",
        background: "#8B5E3C",      // Slightly darker brown for decline button
        fontSize: "14px",
        borderRadius: "4px",
        width: "120px",
        padding: "8px 12px",
        marginLeft: "10px",       // Add some space between buttons
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
        <a
          href="/privacy-policy"
          style={{
            color: "#000000",
            textDecoration: "underline",
            fontWeight: "bold",
          }}
        >
          Privacy Policy
        </a>.
      </span>
    </CookieConsent>
  );
};

export default CookieConsentBanner;