import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation('footer');

  const reloadPage = (e, url) => {
    e.preventDefault();
    window.location.href = url;
  };

  return (
    <footer className="bg-[#7b1c1c] text-white py-12 font-sans">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-center md:text-left">

          {/* Information */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-red-400 tracking-wide">{t("information")}</h4>
            <ul className="space-y-2 text-base">
              <li>
                <Link
                  to="/human"
                  onClick={(e) => reloadPage(e, "/human")}
                  className="hover:text-red-300 transition duration-200"
                >{t("home")}</Link>
              </li>
              <li>
                <Link
                  to="/human/about"
                  onClick={(e) => reloadPage(e, "/human/about")}
                  className="hover:text-red-300 transition duration-200"
                >{t("about_us")}</Link>
              </li>
              <li>
                <Link
                  to="/human/ingredients"
                  onClick={(e) => reloadPage(e, "/human/ingredients")}
                  className="hover:text-red-300 transition duration-200"
                >{t("ingredients")}</Link>
              </li>
              <li>
                <Link
                  to="/human/contact_us"
                  onClick={(e) => reloadPage(e, "/human/contact_us")}
                  className="hover:text-red-300 transition duration-200"
                >{t("contact_us")}</Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-red-400 tracking-wide">{t("products")}</h4>
            <ul className="space-y-2 text-base">
              <li>
                <Link
                  to="/human/Health_supplements"
                  onClick={(e) => reloadPage(e, "/human/Health_supplements")}
                  className="hover:text-red-300 transition duration-200"
                >{t("health_supplements")}</Link>
              </li>
              <li>
                <Link
                  to="/human/Personal_Care"
                  onClick={(e) => reloadPage(e, "/human/Personal_Care")}
                  className="hover:text-red-300 transition duration-200"
                >{t("personal_care")}</Link>
              </li>
              <li>
                <Link
                  to="/human/Yeppuen"
                  onClick={(e) => reloadPage(e, "/human/Yeppuen")}
                  className="hover:text-red-300 transition duration-200"
                >{t("yeppuen")}</Link>
              </li>
              <li>
                <Link
                  to="/human/Wellness"
                  onClick={(e) => reloadPage(e, "/human/Wellness")}
                  className="hover:text-red-300 transition duration-200"
                >{t("wellness")}</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Office Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/20 pt-8 text-sm">

          {/* India Office */}
          <div>
            <h5 className="text-lg font-semibold mb-2 text-red-400">{t("india_head_office")}</h5>
            <p className="font-medium mb-1">{t("aurinko_one_health")}</p>
            <p className="mb-1">
              <i className="fas fa-map-marker-alt mr-2" />
              <Link to="https://maps.app.goo.gl/26BJUNAtfpp1FtMr6" target="_blank" className="hover:text-red-300 transition">{t("address_india")}</Link>
            </p>
            <p><i className="fa fa-phone mr-2" />{t("phone_india")}</p>
            <p><i className="fa fa-envelope mr-2" />{t("email_india")}</p>
          </div>

          {/* Korea Office */}
          <div>
            <h5 className="text-lg font-semibold mb-2 text-red-400">{t("Korea")}</h5>
            <p className="font-medium mb-1">{t("Korea_aurinko_one_health")}</p>
            <p className="mb-1">
              <i className="fas fa-map-marker-alt mr-2" />{t("address_Korea")}</p>
            <p><i className="fa fa-phone mr-2" />{t("phone_Korea")}</p>
            <p><i className="fa fa-envelope mr-2" />{t("email_india")}</p>
          </div>

        </div>

        {/* Copyright */}
        <div className="text-center mt-10 text-sm text-white/80">
          © {new Date().getFullYear()} {t("all_rights_reserved")}
        </div>

      </div>
    </footer>
  );
};

export default Footer;
