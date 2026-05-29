import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import FeaturesSection from "../components/home/Features";
import Footer from "../components/home/Footer";

const Home = () => {
  return (
    <div className="w-full overflow-hidden bg-white">
      <Navbar />

      <Hero />

      <div className="w-full h-10 sm:h-36 lg:h-1 bg-white pointer-events-none" />

      <FeaturesSection />

    </div>
  );
};

export default Home;