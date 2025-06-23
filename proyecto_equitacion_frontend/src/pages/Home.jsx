import {
  Banner,
  AcademiaSection,
  Equinoterapia,
  Noticias,
  Galeria,
  Ubicacion,
  Contacto,
  Footer,
} from "../components";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const Home = () => {
  const location = useLocation();
  useEffect(() => {
    // Scroll to top when navigating to this page
    if (location.pathname === "/") {
      window.scrollTo(0, 0);
    }
  }, [location]);
  return (
    <>
      <Banner />
      <AcademiaSection />
      <Equinoterapia />
      <Noticias />
      <Galeria />
      <Ubicacion />
      <Contacto />
      <Footer />
    </>
  );
};

export default Home;
