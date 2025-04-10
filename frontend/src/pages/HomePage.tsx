import React from 'react';
import AccordionHomePage from "../components/AccordionHomePage";
import HeroCard from "../components/HeroCard";
import CookieConsentBanner from "../components/CookieConsentBanner"; // Import the banner component

const HomePage: React.FC = () => {
  return (
    <>
      <HeroCard />
      {/* <Carousel /> */}
      <AccordionHomePage />
      <CookieConsentBanner /> {/* Render the banner component */}
    </>
  );
};

export default HomePage;