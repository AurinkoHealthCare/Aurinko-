import { Link } from "react-router-dom";

const Footer = () => {
  const reloadPage = (e, url) => {
    e.preventDefault();
    window.location.href = url;
  };

  return (
    <footer className="bg-green-900 text-white py-12">
      <div className="container mx-auto px-6">

        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 text-center md:text-left">

          <div>
            <h4 className="text-xl font-semibold mb-2 text-green-400">INFORMATION</h4>
            <ul className="space-y-1 text-base">
              <li><Link to="/" onClick={(e) => reloadPage(e, "/")} className="hover:text-green-300 transition">Home</Link></li>
              <li><Link to="/about-us" onClick={(e) => reloadPage(e, "/about-us")} className="hover:text-green-300 transition">About Us</Link></li>
              <li><Link to="/ingredients" onClick={(e) => reloadPage(e, "/ingredients")} className="hover:text-green-300 transition">Ingredients</Link></li>
              <li><Link to="/contact-us" onClick={(e) => reloadPage(e, "/contact-us")} className="hover:text-green-300 transition">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-2 text-green-400">PRODUCTS</h4>
            <ul className="space-y-1 text-base">
              {["Health Supplements", "Personal Care", "Livestock", "Poultry", "Aqua", "Swine", "Pet", "Equine"].map((item, index) => (
                <li key={index}>
                  <Link
                    to={`/${item.toLowerCase().replace(" ", "-")}`}
                    onClick={(e) => reloadPage(e, `/${item.toLowerCase().replace(" ", "-")}`)}
                    className="hover:text-green-300 transition"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-2 text-green-400">SERVICES</h4>
            <ul className="space-y-1 text-base">
              <li className="hover:text-green-300 transition">FAQ</li>
              <li className="hover:text-green-300 transition">Privacy Policy</li>
              <li className="hover:text-green-300 transition">Terms and Conditions</li>
            </ul>
          </div>

        </div>

        <div className="text-center md:text-left mt-2">
          <h4 className="text-xl font-semibold mb-4 text-green-400">GET IN TOUCH</h4>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">

            <div>
              <h5 className="font-semibold mb-2">India Head Office</h5>
              <p className="mb-2 font-semibold">Aurinko One Health Private Limited</p>
              <p>
                <i className="fas fa-map-marker-alt mr-2"></i>
                <Link to="https://maps.app.goo.gl/26BJUNAtfpp1FtMr6" target="_blank" className="hover:text-green-300 transition">
                  Plot: 1, Mirzapur, Sec-74, Ballabhgarh, Faridabad, Haryana-121004 (India)
                </Link>
              </p>
              <p><i className="fa fa-phone mr-2"></i> 01296662200</p>
              <p><i className="fa fa-envelope mr-2"></i> info@aurinkohealthcare.com</p>
            </div>

            <div>
              <h5 className="font-semibold mb-2">Zimbabwe</h5>
              <p className="mb-2 font-semibold">Aurinko One Health Zimbabwe Private Limited</p>
              <p>
                <i className="fas fa-map-marker-alt mr-2"></i>
                <Link to="" target="_blank" className="hover:text-green-300 transition">
                  Unit 10, 248 Williams Way, MASA, Harare, Zimbabwe
                </Link>
              </p>
              <p><i className="fa fa-phone mr-2"></i> +263772235379 (Gorge Rundogo)</p>
              <p><i className="fa fa-envelope mr-2"></i> Drabhay@aurinkohealthcare.com</p>
            </div>

            <div>
              <h5 className="font-semibold mb-2">Korea</h5>
              <p className="mb-2 font-semibold">Aurinko One Health Korea Private Limited</p>
              <p>
                <i className="fas fa-map-marker-alt mr-2"></i>
                <Link to="" target="_blank" className="hover:text-green-300 transition">
                  1622 Suite, U1 center, 385 bungil 25, jomaruro, Buchuncity, Gyunggido, Korea
                </Link>
              </p>
              <p><i className="fa fa-phone mr-2"></i> +82 10 5277 8200 (Youngsun Yoo)</p>
              <p><i className="fa fa-envelope mr-2"></i> info@aurinkohealthcare.com</p>
            </div>

          </div>
        </div>

        <div className="text-center mt-8 text-sm border-t border-white/30 pt-4">
          © 2025 Aurinko One Health Pvt. Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
