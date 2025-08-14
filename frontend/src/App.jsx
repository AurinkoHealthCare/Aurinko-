import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import HorizontalBounceLoader from "../private/loader.jsx";

// Lazy Imports
const Home = lazy(() => import("./Home"));
const Search_bar = lazy(() => import("../utils/component/search.jsx"));
const Admin = lazy(() => import("./Admin/admin"));
const Human = lazy(() => import("./User/Human/Human.jsx"));
const Human_Home = lazy(() => import("./User/Human/Pages/Home/Homepage.jsx"));

const About = lazy(() => import("./User/Pages/About us/about.jsx"));
const Certificates = lazy(() => import("./User/Pages/About us/Certificates.jsx"));
const VisionMission = lazy(() => import("./User/Pages/About us/vision&mission.jsx"));
const ManufacturingFacility = lazy(() => import("./User/Pages/About us/manufacturing-facility.jsx"));
const ResearchDevelopment = lazy(() => import("./User/Pages/About us/ResearchDevelopment.jsx"));
const Export = lazy(() => import("./User/Pages/About us/Export.jsx"));

const Nanophosphosome = lazy(() => import("./User/Human/Pages/Nano-biotechnology Compounds/Nanophosphosomes.jsx"));
const Neunaparticles = lazy(() => import("./User/Human/Pages/Nano-biotechnology Compounds/Neunaparticles.jsx"));

const Healthsupplements = lazy(() => import("./User/Human/Pages/Human/Health-supplements.jsx"));
const Persnolcare = lazy(() => import("./User/Human/Pages/Human/Persnol care.jsx"));
const Yeppuen = lazy(() => import("./User/Human/Pages/Human/Yeppuen.jsx"));
const Wellness = lazy(() => import("./User/Human/Pages/Human/Wellness.jsx"));

const Reports = lazy(() => import("./User/Pages/Media/Report.jsx"));
const Gallery = lazy(() => import("./User/Pages/Media/Gallery/Gallery"));
const ProductBrochures = lazy(() => import("./User/Pages/Media/ProductBrochures.jsx"));
const Blog = lazy(() => import("./User/Pages/Media/Blog.jsx"));

const Articles = lazy(() => import("./User/Pages/Media/Articles.jsx"));
const Ingredients = lazy(() => import("./User/Pages/Media/Ingredients.jsx"));
const ContactUs = lazy(() => import("./User/Pages/contact/contact.jsx"));

const Veterinary = lazy(() => import("./User/Veterinary/Veterinary.jsx"));
const Veterinary_Home = lazy(() => import("./User/Veterinary/Pages/Home/Homepage.jsx"));
const VNanophosphosome = lazy(() => import("./User/Veterinary/Pages/Nano-biotechnology Compounds/Nanophosphosomes.jsx"));
const VNeunamin = lazy(() => import("./User/Veterinary/Pages/Nano-biotechnology Compounds/Neunamin.jsx"));
const VNeunaparticles = lazy(() => import("./User/Veterinary/Pages/Nano-biotechnology Compounds/Neunaparticles.jsx"));

const Livestock = lazy(() => import("./User/Veterinary/Pages/Veterinary/Livestock.jsx"));
const Poultry = lazy(() => import("./User/Veterinary/Pages/Veterinary/Poultry.jsx"));
const Aqua = lazy(() => import("./User/Veterinary/Pages/Veterinary/Aqua.jsx"));
const Equines = lazy(() => import("./User/Veterinary/Pages/Veterinary/Equines.jsx"));
const FeedGrain = lazy(() => import("./User/Veterinary/Pages/Veterinary/Feed & Grain.jsx"));
const Swine = lazy(() => import("./User/Veterinary/Pages/Veterinary/Swine.jsx"));
const Pet = lazy(() => import("./User/Veterinary/Pages/Veterinary/Pet.jsx"));

const Agriculture = lazy(() => import("./User/Agriculture/Agriculture.jsx"));
const Agriculture_Home = lazy(() => import("./User/Agriculture/Pages/Home/Homepage.jsx"));
const ANanophosphosome = lazy(() => import("./User/Agriculture/Pages/Nano-biotechnology Compounds/Nanophosphosomes.jsx"));
const ANeunaparticles = lazy(() => import("./User/Agriculture/Pages/Nano-biotechnology Compounds/Neunaparticles.jsx"));
const SoilMinerals = lazy(() => import("./User/Agriculture/Pages/Agriculture/SoilMinerals.jsx"));
const NanoFertilizers = lazy(() => import("./User/Agriculture/Pages/Agriculture/NanoFertilizers.jsx"));

const PrivateRoute = lazy(() => import("../private/privaterouts"));
const Dashboard = lazy(() => import("./Admin/Dashboard"));
const Unauthorized = lazy(() => import("../private/privatepage"));
const Dash_Home = lazy(() => import("./Admin/Pages/Home/Home"));

const Banner = lazy(() => import("./Admin/Pages/Media/Banner"));
const Global_Providers = lazy(() => import("./Admin/Pages/Media/Global_Providers.jsx"));
const Product_details = lazy(() => import("./Admin/Pages/Media/Product_details.jsx"));

const Product_Cart = lazy(() => import("./Admin/Pages/Pages/Home/Product_Cart"));
const Product_detail = lazy(() => import("./Admin/Pages/Pages/Home/Product_detail"));
const ImageSlider = lazy(() => import("./Admin/Pages/Pages/Home/Image_Slider.jsx"));

const Report = lazy(() => import("./Admin/Pages/Pages/Media/Reports"));
const Gallerys = lazy(() => import("./Admin/Pages/Pages/Media/Gallery"));
const Brochure = lazy(() => import("./Admin/Pages/Pages/Media/Brochures"));
const Blogs = lazy(() => import("./Admin/Pages/Pages/Media/Blogs"));
const Pages_Banner = lazy(() => import("./Admin/Pages/Media/Pages_Banner.jsx"));
const Page_banner = lazy(() => import("./Admin/Pages/Pages/Media/page_banner.jsx"));
const Video = lazy(() => import("./Admin/Pages/Pages/Media/Videos"));
const Video_view = lazy(() => import("./Admin/Pages/Media/Video_view.jsx"));
const Feedback = lazy(() => import("./Admin/Pages/Feedback/Feedback"));

const TrackVisitor = lazy(() => import("../api/totalvisitors"));
const Reports_Articles = lazy(() => import("./Admin/Pages/Media/Reports_Articles.jsx"));
const Gallery_view = lazy(() => import("./Admin/Pages/Media/Gallery_view.jsx"));
const Brochure_view = lazy(() => import("./Admin/Pages/Media/Brochure_view.jsx"));
const PhotoGallery = lazy(() => import("./User/Pages/Media/Gallery/PhotoGallery.jsx"));
import FloatingSocialMenu from "../utils/message.jsx";
function App() {
  return (
    <div>
      <TrackVisitor ></TrackVisitor>
      <Suspense fallback={<HorizontalBounceLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search_bar />} />
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
            <Route path="/human/Neuna_particles" element={<Neunaparticles />} />

            {/* Human */}
            <Route path="/human/Health_supplements" element={<Healthsupplements />} />
            <Route path="/human/Wellness" element={<Wellness />} />
            <Route path="/human/Personal_Care" element={<Persnolcare />} />
            <Route path="/human/Yeppuen" element={<Yeppuen />} />

            {/* Media */}
            <Route path="/human/report" element={<Reports type="Human" category="Reports" />} />
            <Route path="/human/gallery" element={<Gallery category="human" />} />
            <Route path="/human/photo_gallery" element={<PhotoGallery category="human" />} />
            <Route path="/human/brochures" element={<ProductBrochures category="Human" />} />
            <Route path="/human/blog" element={<Blog />} />
            <Route path="/human/articles" element={<Articles type="Human" category="Articles" />} />

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
            <Route path="/veterinary/report" element={<Reports type="Veterinary" category="Reports" />} />
            <Route path="/veterinary/gallery" element={<Gallery category="Veterinary" />} />
            <Route path="/veterinary/photo_gallery" element={<PhotoGallery category="Veterinary" />} />
            <Route path="/veterinary/brochures" element={<ProductBrochures category="Veterinary" />} />
            <Route path="/veterinary/blog" element={<Blog />} />
            <Route path="/veterinary/articles" element={<Articles type="Veterinary" category="Articles" />} />

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
            <Route path="/agriculture/Neuna_particles" element={<ANeunaparticles />} />

            {/* Veterinary */}
            <Route path="/agriculture/SoilMinerals" element={<SoilMinerals />} />
            <Route path="/agriculture/NanoFertilizers" element={<NanoFertilizers />} />

            {/* Media */}
            <Route path="/agriculture/report" element={<Reports type="Agriculture" category="Reports" />} />
            <Route path="/agriculture/gallery" element={<Gallery category="Agriculture" />} />
            <Route path="/agriculture/photo_gallery" element={<PhotoGallery category="Agriculture" />} />
            <Route path="/agriculture/brochures" element={<ProductBrochures category="Agriculture" />} />
            <Route path="/agriculture/blog" element={<Blog />} />
            <Route path="/agriculture/articles" element={<Articles type="Agriculture" category="Articles" />} />

            {/* Ingredients */}
            <Route path="/agriculture/ingredients" element={<Ingredients />} />

            {/* Contact US */}
            <Route path="/agriculture/contact_us" element={<ContactUs />} />
          </Route>

          {/* Admin */}
          <Route path="/AurinkoOne" element={<Admin />} />
          <Route path="/dashboard" element={
            <PrivateRoute
              allowedRoles={["admin"]}>
              <Dashboard />
            </PrivateRoute>
          }
          >
            <Route path='/dashboard/' element={<Dash_Home />} />

            {/* Update & Replace */}
            <Route path='/dashboard/banner' element={<Banner />} />
            <Route path='/dashboard/global_providers' element={<Global_Providers />} />
            <Route path='/dashboard/product_details' element={<Product_details />} />
            <Route path="/dashboard/reports_articles" element={<Reports_Articles />} />
            <Route path='/dashboard/gallery_view' element={<Gallery_view />} />
            <Route path='/dashboard/brochure_view' element={<Brochure_view />} />
            <Route path="/dashboard/video_view" element={<Video_view />} />

            {/* Home */}
            <Route path='/dashboard/image_slider' element={<ImageSlider />} />
            <Route path='/dashboard/product_cart' element={<Product_Cart />} />
            <Route path="/dashboard/pages_banner" element={<Pages_Banner />} />
            <Route path='/dashboard/product_detail' element={<Product_detail />} />

            {/* Media */}
            <Route path='/dashboard/Reports' element={<Report />} />
            <Route path='/dashboard/Gallery' element={<Gallerys />} />
            <Route path='/dashboard/Brochures' element={<Brochure />} />
            <Route path='/dashboard/Blogs' element={<Blogs />} />
            <Route path='/dashboard/page_banner' element={<Page_banner />} />
            <Route path='/dashboard/Videos' element={<Video />} />

            {/* Feedback */}
            <Route path='/dashboard/feedback' element={<Feedback />} />
          </Route>
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/loader" element={<HorizontalBounceLoader />} />
          <Route path="/social" element={<FloatingSocialMenu />} />
        </Routes>
      </Suspense>
    </div>
  );
}
export default App;