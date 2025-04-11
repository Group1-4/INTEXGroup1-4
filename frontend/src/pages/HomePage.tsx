import AccordionHomePage from "../components/AccordionHomePage";
import CarouselHomePage from "../components/CarouselHomePage";
import HeroCard from "../components/HeroCard";
// import Carousel from "../components/Carousel";


const HomePage: React.FC = () => {
  return (
    <>
    <HeroCard />
    <CarouselHomePage />
    <AccordionHomePage />
    </>
  );
};

export default HomePage;