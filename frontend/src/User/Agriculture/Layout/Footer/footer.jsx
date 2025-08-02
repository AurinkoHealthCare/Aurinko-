import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation('footer');

  const reloadPage = (e, url) => {
    e.preventDefault();
    window.location.href = url;
  };

  return (
    <footer className="bg-green-900 text-white py-12">
      <div className="container mx-auto px-6">

        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-5 text-center md:text-left">

          <div>
            <h4 className="text-xl font-semibold mb-2 text-green-400">{t("information")}</h4>
            <ul className="space-y-1 text-base">
              <li><Link to="/" onClick={(e) => reloadPage(e, "/")} className="hover:text-green-300 transition">{t("home")}</Link></li>
              <li><Link to="/about-us" onClick={(e) => reloadPage(e, "/about-us")} className="hover:text-green-300 transition">{t("about_us")}</Link></li>
              <li><Link to="/ingredients" onClick={(e) => reloadPage(e, "/ingredients")} className="hover:text-green-300 transition">{t("ingredients")}</Link></li>
              <li><Link to="/contact-us" onClick={(e) => reloadPage(e, "/contact-us")} className="hover:text-green-300 transition">{t("contact_us")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-2 text-green-400">{t("products")}</h4>
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
          © {new Date().getFullYear()}{t("all_rights_reserved")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
