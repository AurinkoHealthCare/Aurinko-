import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";

// Human
import Human from "./User/Human/Human.jsx";
import Human_Home from "./User/Human/Pages/Home/Homepage.jsx";

// About us
import About from "./User/Pages/About us/about.jsx";
import Certificates from "./User/Pages/About us/Certificates.jsx";
import VisionMission from "./User/Pages/About us/vision&mission.jsx";
import ManufacturingFacility from "./User/Pages/About us/manufacturing-facility.jsx";
import ResearchDevelopment from "./User/Pages/About us/ResearchDevelopment.jsx";
import Export from "./User/Pages/About us/Export.jsx";

// Nano-biotechnology Compounds
import Nanophosphosome from "./User/Human/Pages/Nano-biotechnology Compounds/Nanophosphosomes.jsx";
import Neunamin from "./User/Human/Pages/Nano-biotechnology Compounds/Neunamin.jsx";
import Neunaparticles from "./User/Human/Pages/Nano-biotechnology Compounds/Neunaparticles.jsx";

// Human
import Healthsupplements from "./User/Human/Pages/Human/Health-supplements.jsx";
import Persnolcare from "./User/Human/Pages/Human/Persnol care.jsx";
import Yeppuen from "./User/Human/Pages/Human/Yeppuen.jsx";
import Wellness from "./User/Human/Pages/Human/Wellness.jsx";

// Media
import Reports from "./User/Pages/Media/Report.jsx";
import Gallery from "./User/Pages/Media/Gallery.jsx";
import ProductBrochures from "./User/Pages/Media/ProductBrochures.jsx";
import Blog from "./User/Pages/Media/Blog.jsx";
import Articles from "./User/Pages/Media/Articles.jsx";

// Ingredients
import Ingredients from "./User/Pages/Media/Ingredients.jsx";

// Contact US
import ContactUs from "./User/Pages/contact/contact.jsx";

// Veterinary
import Veterinary from "./User/Veterinary/Veterinary.jsx";
import Veterinary_Home from "./User/Veterinary/Pages/Home/Homepage.jsx";

// Nano-biotechnology Compounds
import VNanophosphosome from "./User/Veterinary/Pages/Nano-biotechnology Compounds/Nanophosphosomes.jsx";
import VNeunamin from "./User/Veterinary/Pages/Nano-biotechnology Compounds/Neunamin.jsx";
import VNeunaparticles from "./User/Veterinary/Pages/Nano-biotechnology Compounds/Neunaparticles.jsx";

// Veterinary
import Livestock from "./User/Veterinary/Pages/Veterinary/Livestock.jsx";
import Poultry from "./User/Veterinary/Pages/Veterinary/Poultry.jsx";
import Aqua from "./User/Veterinary/Pages/Veterinary/Aqua.jsx";
import Equines from "./User/Veterinary/Pages/Veterinary/Equines.jsx";
import FeedGrain from "./User/Veterinary/Pages/Veterinary/Feed & Grain.jsx";
import Swine from "./User/Veterinary/Pages/Veterinary/Swine.jsx";
import Pet from "./User/Veterinary/Pages/Veterinary/Pet.jsx";

// Agriculture
import Agriculture from "./User/Agriculture/Agriculture.jsx";
import Agriculture_Home from "./User/Agriculture/Pages/Home/Homepage.jsx";
import ANanophosphosome from "./User/Agriculture/Pages/Nano-biotechnology Compounds/Nanophosphosomes.jsx";
import ANeunamin from "./User/Agriculture/Pages/Nano-biotechnology Compounds/Neunamin.jsx";
import ANeunaparticles from "./User/Agriculture/Pages/Nano-biotechnology Compounds/Neunaparticles.jsx";
import SoilMinerals from "./User/Agriculture/Pages/Agriculture/SoilMinerals.jsx";
import NanoFertilizers from "./User/Agriculture/Pages/Agriculture/NanoFertilizers.jsx";



function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <img
          src="/Assets/AurinkoLogo.png"
          alt="Logo"
          className="w-52 h-auto logo-zoom"
        />
      </div>
    );
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Human */}
        <Route path="/human" element={<Human />} >
          <Route path="/human" element={<Human_Home />} />

          {/* About us  */}
          <Route path="/human/about" element={<About />} />
          <Route path="/human/vision" element={<VisionMission />} />
          <Route path="/human/manufacturing" element={<ManufacturingFacility />} />
          <Route path="/human/research" element={<ResearchDevelopment />} />
          <Route path="/human/export" element={<Export />} />
          <Route path="/human/certificates" element={<Certificates />} />

          {/* Nano-biotechnology Compounds */}
          <Route path="/human/Nanophosphosomes" element={<Nanophosphosome />} />
          <Route path="/human/Neuna_mins" element={<Neunamin />} />
          <Route path="/human/Neuna_particles" element={<Neunaparticles />} />

          {/* Human */}
          <Route path="/human/Health_supplements" element={<Healthsupplements />} />
          <Route path="/human/Wellness" element={<Wellness />} />
          <Route path="/human/Personal_Care" element={<Persnolcare />} />
          <Route path="/human/Yeppuen" element={<Yeppuen />} />

          {/* Media */}
          <Route path="/human/report" element={<Reports />} />
          <Route path="/human/gallery" element={<Gallery />} />
          <Route path="/human/brochures" element={<ProductBrochures />} />
          <Route path="/human/blog" element={<Blog />} />
          <Route path="/human/articles" element={<Articles />} />

          {/* Ingredients */}
          <Route path="/human/ingredients" element={<Ingredients />} />

          {/* Contact US */}
          <Route path="/human/contact_us" element={<ContactUs />} />
        </Route>

        {/* Veterinary */}
        <Route path="/veterinary" element={<Veterinary />}>
          <Route path="/veterinary" element={<Veterinary_Home />} />

          {/* About us  */}
          <Route path="/veterinary/about" element={<About />} />
          <Route path="/veterinary/vision" element={<VisionMission />} />
          <Route path="/veterinary/manufacturing" element={<ManufacturingFacility />} />
          <Route path="/veterinary/research" element={<ResearchDevelopment />} />
          <Route path="/veterinary/export" element={<Export />} />
          <Route path="/veterinary/certificates" element={<Certificates />} />

          {/* Nano-biotechnology Compounds */}
          <Route path="/veterinary/Nanophosphosomes" element={<VNanophosphosome />} />
          <Route path="/veterinary/Neuna_mins" element={<VNeunamin />} />
          <Route path="/veterinary/Neuna_particles" element={<VNeunaparticles />} />

          {/* Veterinary */}
          <Route path="/veterinary/livestock" element={<Livestock />} />
          <Route path="/veterinary/poultry" element={<Poultry />} />
          <Route path="/veterinary/Aqua" element={<Aqua />} />
          <Route path="/veterinary/Swine" element={<Swine />} />
          <Route path="/veterinary/Equine" element={<Equines />} />
          <Route path="/veterinary/pet" element={<Pet />} />
          <Route path="/veterinary/feed_grain" element={<FeedGrain />} />

          {/* Media */}
          <Route path="/veterinary/report" element={<Reports />} />
          <Route path="/veterinary/gallery" element={<Gallery />} />
          <Route path="/veterinary/brochures" element={<ProductBrochures />} />
          <Route path="/veterinary/blog" element={<Blog />} />
          <Route path="/veterinary/articles" element={<Articles />} />

          {/* Ingredients */}
          <Route path="/veterinary/ingredients" element={<Ingredients />} />

          {/* Contact US */}
          <Route path="/veterinary/contact_us" element={<ContactUs />} />
        </Route>

        {/* Agriculture */}
        <Route path="/agriculture" element={<Agriculture />} >
          <Route path="/agriculture/" element={<Agriculture_Home />} />

          {/* About us  */}
          <Route path="/agriculture/about" element={<About />} />
          <Route path="/agriculture/vision" element={<VisionMission />} />
          <Route path="/agriculture/manufacturing" element={<ManufacturingFacility />} />
          <Route path="/agriculture/research" element={<ResearchDevelopment />} />
          <Route path="/agriculture/export" element={<Export />} />
          <Route path="/agriculture/certificates" element={<Certificates />} />

          {/* Nano-biotechnology Compounds */}
          <Route path="/agriculture/Nanophosphosomes" element={<ANanophosphosome />} />
          <Route path="/agriculture/Neuna_mins" element={<ANeunamin />} />
          <Route path="/agriculture/Neuna_particles" element={<ANeunaparticles />} />

          {/* Veterinary */}
          <Route path="/agriculture/SoilMinerals" element={<SoilMinerals />} />
          <Route path="/agriculture/NanoFertilizers" element={<NanoFertilizers />} />

          {/* Media */}
          <Route path="/agriculture/report" element={<Reports />} />
          <Route path="/agriculture/gallery" element={<Gallery />} />
          <Route path="/agriculture/brochures" element={<ProductBrochures />} />
          <Route path="/agriculture/blog" element={<Blog />} />
          <Route path="/agriculture/articles" element={<Articles />} />

          {/* Ingredients */}
          <Route path="/agriculture/ingredients" element={<Ingredients />} />

          {/* Contact US */}
          <Route path="/agriculture/contact_us" element={<ContactUs />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
