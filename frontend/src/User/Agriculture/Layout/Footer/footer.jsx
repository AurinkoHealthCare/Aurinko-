import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation('footer');

  const reloadPage = (e, url) => {
    e.preventDefault();
    window.location.href = url;
  };

  return (
    <footer className="bg-[#01421d] text-white py-12">
      <div className="container mx-auto px-6">

        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-5 text-center md:text-left">

          <div>
            <h4 className="text-xl font-semibold mb-2 text-green-400">{t("information")}</h4>
            <ul className="space-y-1 text-base">
              <li><Link to="/agriculture" onClick={(e) => reloadPage(e, "/agriculture")} className="hover:text-green-300 transition">{t("home")}</Link></li>
              <li><Link to="/agriculture/about" onClick={(e) => reloadPage(e, "/agriculture/about")} className="hover:text-green-300 transition">{t("about_us")}</Link></li>
              <li><Link to="/agriculture/ingredients" onClick={(e) => reloadPage(e, "/agriculture/ingredients")} className="hover:text-green-300 transition">{t("ingredients")}</Link></li>
              <li><Link to="/agriculture/contact_us" onClick={(e) => reloadPage(e, "/agriculture/contact_us")} className="hover:text-green-300 transition">{t("contact_us")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-2 text-green-400">{t("products")}</h4>
            <ul className="space-y-1 text-base">
              <li><Link to="/agriculture/NanoFertilizers" onClick={(e) => reloadPage(e, "/agriculture/NanoFertilizers")} className="hover:text-green-300 transition">{t("nano_fertilizers")}</Link></li>
              <li><Link to="/agriculture/SoilMinerals" onClick={(e) => reloadPage(e, "/agriculture/SoilMinerals")} className="hover:text-green-300 transition">{t("soil_minerals")}</Link></li>
            </ul>
          </div>
        </div>

        <div className="text-center md:text-left mt-2">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
            <div>
              <h5 className="font-semibold mb-2">{t("india_head_office")}</h5>
              <p className="mb-2 font-semibold">{t("aurinko_one_health")}</p>
              <p>
                <i className="fas fa-map-marker-alt mr-2"></i>
                <Link to="https://maps.app.goo.gl/26BJUNAtfpp1FtMr6" target="_blank" className="hover:text-green-300 transition">
                  {t("address_india")}
                </Link>
              </p>
              <p><i className="fa fa-phone mr-2"></i> {t("phone_india")}</p>
              <p><i className="fa fa-envelope mr-2"></i> {t("email_india")}</p>
            </div>

            <div>
              <h5 className="font-semibold mb-2">{t("zimbabwe")}</h5>
              <p className="mb-2 font-semibold">{t("zimbabwe_aurinko_one_health")}</p>
              <p>
                <i className="fas fa-map-marker-alt mr-2"></i>
                <Link to="" target="_blank" className="hover:text-green-300 transition">
                  {t("address_zimbabwe")}
                </Link>
              </p>
              <p><i className="fa fa-phone mr-2"></i>{t("phone_zimbabwe")}</p>
              <p><i className="fa fa-envelope mr-2"></i>{t("email_zimbabwe")}</p>
            </div>

            <div>
              <h5 className="font-semibold mb-2">{t("Korea")}</h5>
              <p className="mb-2 font-semibold">{t("Korea_aurinko_one_health")}</p>
              <p>
                <i className="fas fa-map-marker-alt mr-2"></i>
                <Link to="" target="_blank" className="hover:text-green-300 transition">
                  {t("address_Korea")}
                </Link>
              </p>
              <p><i className="fa fa-phone mr-2"></i> {t("phone_Korea")}</p>
              <p><i className="fa fa-envelope mr-2"></i> {t("email_india")}</p>
            </div>

          </div>
        </div>

        <div className="text-center mt-8 text-sm border-t border-white/30 pt-4">
          © {new Date().getFullYear()} {t("all_rights_reserved")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
