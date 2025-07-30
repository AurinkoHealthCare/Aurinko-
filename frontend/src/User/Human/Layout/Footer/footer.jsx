import { Link } from "react-router-dom";

const Footer = () => {
  const reloadPage = (e, url) => {
    e.preventDefault();
    window.location.href = url;
  };

  return (
    <footer className="bg-[#7b1c1c] text-white py-12 font-sans">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 text-center md:text-left">

          {/* Information */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-red-400 tracking-wide">INFORMATION</h4>
            <ul className="space-y-2 text-base">
              <li>
                <Link
                  to="/"
                  onClick={(e) => reloadPage(e, "/")}
                  className="hover:text-red-300 transition duration-200"
                >Home</Link>
              </li>
              <li>
                <Link
                  to="/about-us"
                  onClick={(e) => reloadPage(e, "/about-us")}
                  className="hover:text-red-300 transition duration-200"
                >About Us</Link>
              </li>
              <li>
                <Link
                  to="/ingredients"
                  onClick={(e) => reloadPage(e, "/ingredients")}
                  className="hover:text-red-300 transition duration-200"
                >Ingredients</Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  onClick={(e) => reloadPage(e, "/contact-us")}
                  className="hover:text-red-300 transition duration-200"
                >Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-red-400 tracking-wide">PRODUCTS</h4>
            <ul className="space-y-2 text-base">
              <li>
                <Link
                  to="/health-supplements"
                  onClick={(e) => reloadPage(e, "/health-supplements")}
                  className="hover:text-red-300 transition duration-200"
                >Health Supplements</Link>
              </li>
              <li>
                <Link
                  to="/personal-care"
                  onClick={(e) => reloadPage(e, "/personal-care")}
                  className="hover:text-red-300 transition duration-200"
                >Personal Care</Link>
              </li>
              <li>
                <Link
                  to="/personal-care"
                  onClick={(e) => reloadPage(e, "/personal-care")}
                  className="hover:text-red-300 transition duration-200"
                >Yeppuen</Link>
              </li>
              <li>
                <Link
                  to="/personal-care"
                  onClick={(e) => reloadPage(e, "/personal-care")}
                  className="hover:text-red-300 transition duration-200"
                >Welness</Link>
              </li>
            </ul>
          </div>

          {/* Social or Additional Section Placeholder */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-red-400 tracking-wide">FOLLOW US</h4>
            <p className="text-sm mb-2">Stay connected with us:</p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="hover:text-red-300 transition duration-200">Facebook</a>
              <a href="#" className="hover:text-red-300 transition duration-200">LinkedIn</a>
              <a href="#" className="hover:text-red-300 transition duration-200">Instagram</a>
            </div>
          </div>

        </div>

        {/* Office Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/20 pt-8 text-sm">

          {/* India Office */}
          <div>
            <h5 className="text-lg font-semibold mb-2 text-red-400">India Head Office</h5>
            <p className="font-medium mb-1">Aurinko One Health Private Limited</p>
            <p className="mb-1">
              <i className="fas fa-map-marker-alt mr-2" />
              <Link
                to="https://maps.app.goo.gl/26BJUNAtfpp1FtMr6"
                target="_blank"
                className="hover:text-red-300 transition"
              >
                Plot: 1, Mirzapur, Sec-74, Ballabhgarh, Faridabad, Haryana-121004 (India)
              </Link>
            </p>
            <p><i className="fa fa-phone mr-2" />01296662200</p>
            <p><i className="fa fa-envelope mr-2" />info@aurinkohealthcare.com</p>
          </div>

          {/* Korea Office */}
          <div>
            <h5 className="text-lg font-semibold mb-2 text-red-400">Korea</h5>
            <p className="font-medium mb-1">Aurinko One Health Korea Private Limited</p>
            <p className="mb-1">
              <i className="fas fa-map-marker-alt mr-2" />
              1622 Suite, U1 center, 385 bungil 25, jomaruro, Buchuncity, Gyunggido, Korea
            </p>
            <p><i className="fa fa-phone mr-2" />+82 10 5277 8200 (Youngsun Yoo)</p>
            <p><i className="fa fa-envelope mr-2" />info@aurinkohealthcare.com</p>
          </div>

        </div>

        {/* Copyright */}
        <div className="text-center mt-10 text-sm text-white/80">
          © {new Date().getFullYear()} Aurinko One Health Pvt. Ltd. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
