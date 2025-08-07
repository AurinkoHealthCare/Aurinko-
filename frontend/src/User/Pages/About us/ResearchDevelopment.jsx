import React from "react";
import { useTranslation } from "react-i18next";

const ResearchDevelopment = () => {
  const { t } = useTranslation("research_development");

  return (
    <div className="font-sans">
      {/* Banner */}
      <div className="relative">
        <img
          src="/Assets/Aboutus/banner/Research and developement.webp"
          alt="Scientists working in a lab"
          className="w-full"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold">
            {t("title")}
          </h1>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4">
        {/* Section 1 */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t("research_and_development")}
            </h2>
            <hr className="border-t-2 border-green-800 w-16 mb-4" />
            <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-4">{t("paragraph1")}</h3>
            <p className="text-gray-700 mb-4">{t("paragraph2")}</p>
            <p className="text-gray-700">{t("paragraph3")}</p>
          </div>

          <div className="w-full md:w-1/2">
            <img
              src="/Assets/Aboutus/Research and developement/research img 1.jpg"
              alt="Scientist working with lab equipment"
              className="w-full h-auto mx-auto"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Section 2 */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("title1")}</h2>
            <hr className="border-t-2 border-green-800 w-16 mb-4" />
            <p className="text-gray-700 mb-4">{t("paragraph4")}</p>
            <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-4">{t("title1a")}</h3>
            <ul className="text-gray-700 list-disc pl-5 mb-4">
              <li>{t("line1a")}</li>
              <li>{t("line2a")}</li>
              <li>{t("line3a")}</li>
              <li>{t("line4a")}</li>
            </ul>
          </div>

          <div className="w-full md:w-1/2">
            <img
              src="/Assets/Aboutus/Research and developement/Nanophosphosome.jpg"
              alt="Nanophosphosome"
              className="h-96 mx-auto"
            />
          </div>
        </div>

        <div className="py-6">
          {/* Benefits and Applications */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-4">{t("title1b")}</h3>
              <ul className="text-gray-700 list-disc pl-5 mb-4">
                <li>{t("line1b")}</li>
                <li>{t("line2b")}</li>
                <li>{t("line3b")}</li>
                <li>{t("line4b")}</li>
              </ul>
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-4">{t("title1c")}</h3>
              <ul className="text-gray-700 list-disc pl-5 mb-4">
                <li>{t("line1c")}</li>
                <li>{t("line2c")}</li>
                <li>{t("line3c")}</li>
                <li>{t("line4c")}</li>
                <li>{t("line5c")}</li>
              </ul>
            </div>
          </div>

          {/* Images */}
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <img src="/Assets/Aboutus/Research and developement/Curcuma longa.jpg" alt="Curcuma longa" className="w-full rounded-lg shadow-lg" />
                <h2 className="text-center text-lg font-bold">{t("image1a")}</h2>
              </div>
              <div>
                <img src="/Assets/Aboutus/Research and developement/Berberis vulgaris.jpg" alt="Berberis vulgaris" className="w-full rounded-lg shadow-lg" />
                <h2 className="text-center text-lg font-bold">{t("image2a")}</h2>
              </div>
              <div>
                <img src="/Assets/Aboutus/Research and developement/Tagetes erecta.jpg" alt="Tagetes erecta" className="w-full rounded-lg shadow-lg" />
                <h2 className="text-center text-lg font-bold">{t("image3a")}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* NEUNA Section */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("title2")}</h2>
            <hr className="border-t-2 border-green-800 w-16 mb-4" />
            <p className="text-gray-700 mb-4">{t("paragraph5")}</p>

            <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-4">{t("title2a")}</h3>
            <ul className="text-gray-700 list-disc pl-5 mb-4">
              <li>{t("line1d")}</li>
              <li>{t("line2d")}</li>
              <li>{t("line3d")}</li>
              <li>{t("line4d")}</li>
            </ul>

            <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-4">{t("title2b")}</h3>
            <ul className="text-gray-700 list-disc pl-5 mb-4">
              <li>{t("line1e")}</li>
              <li>{t("line2e")}</li>
              <li>{t("line3e")}</li>
              <li>{t("line4e")}</li>
            </ul>
          </div>

          <div className="w-full md:w-1/2">
            <img
              src="/Assets/Aboutus/Research and developement/Neuna® particles.jpg"
              alt="Neuna particles"
              className="w-full h-auto mx-auto"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 my-8">
          <div className="w-full md:w-1/2">
            <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-4">{t("title2c")}</h3>
            <ul className="text-gray-700 pl-5 mb-4">
              <li>{t("line1f")}
                <ul>
                  <li>{t("line1f1")}</li>
                  <li>{t("line1f2")}</li>
                  <li>{t("line1f3")}</li>
                </ul>
              </li>
              <li>{t("line2f")}
                <ul>
                  <li>{t("line2f1")}</li>
                  <li>{t("line2f2")}</li>
                  <li>{t("line2f3")}</li>
                </ul>
              </li>
              <li>{t("line3f1")}</li>
              <li>{t("line3f2")}</li>
            </ul>
          </div>

          <div className="w-full md:w-1/2">
            <img
              src="/Assets/Aboutus/Research and developement/Application of neuna particle.jpg"
              alt="Application of neuna particle"
              className="h-72 mx-auto"
            />
          </div>
        </div>

        {/* Particle Images */}
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <img src="/Assets/Aboutus/Research and developement/Copper Neuna®.jpg" alt="Copper Neuna®" className="w-full rounded-lg shadow-lg" />
              <h2 className="text-center text-lg font-bold">{t("image1b")}</h2>
            </div>
            <div>
              <img src="/Assets/Aboutus/Research and developement/Silver Neuna®.jpg" alt="Silver Neuna®" className="w-full rounded-lg shadow-lg" />
              <h2 className="text-center text-lg font-bold">{t("image2b")}</h2>
            </div>
            <div>
              <img src="/Assets/Aboutus/Research and developement/Zinc Neuna®.jpg" alt="Zinc Neuna®" className="w-full rounded-lg shadow-lg" />
              <h2 className="text-center text-lg font-bold">{t("image3b")}</h2>
            </div>
            <div>
              <img src="/Assets/Aboutus/Research and developement/Potassium Neuna®.jpg" alt="Potassium Neuna®" className="w-full rounded-lg shadow-lg" />
              <h2 className="text-center text-lg font-bold">{t("image4b")}</h2>
            </div>
          </div>
        </div>

        {/* NEUNA® Min */}
        <div className="font-sans py-12 container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("title3")}</h2>
          <hr className="border-t-2 border-green-800 w-16 mb-4" />
          <p className="text-gray-700 mb-4">{t("paragraph6")}</p>
          <p className="text-gray-700 mb-4">
            <span className="font-bold">{t("paragraph6a")}</span> {t("paragraph6b")}
          </p>

          <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-4">{t("title3a")}</h3>

          {/* Technology 1 */}
          <div className="grid grid-cols-1 gap-8">
            <div className="flex gap-8 flex-wrap items-center">
              <img src="/Assets/Aboutus/Research and developement/Carbon Quantum Dots (CQDs).jpg" alt="CQDs" className="h-20 object-cover" />
              <div className="md:w-3/4 w-full">
                <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-4">
                  {t("title7a")}
                </h3>
                <p>{t("paragraph7")}</p>
              </div>
            </div>

            {/* Technology 2 */}
            <div className="flex gap-8 flex-wrap items-center">
              <img src="/Assets/Aboutus/Research and developement/Carbon Polymer Bio-caging.jpg" alt="Carbon Polymer" className="h-20 w-auto object-cover" />
              <div className="md:w-3/4 w-full">
                <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-2">
                  {t("title7b")}
                </h3>
                <p className="text-gray-700">{t("paragraph8")}</p>
              </div>
            </div>
          </div>

          {/* Properties */}
          <div className="mt-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("neuna_min_properties")}</h2>
            <ul className="text-gray-700 pl-5 mb-4">
              <li>
                <span className="font-bold">{t("neuna_min_prop1")}</span>
                <ul className="list-disc pl-5">
                  <li>{t("neuna_min_prop1a")}</li>
                  <li>{t("neuna_min_prop1b")}</li>
                </ul>
              </li>
              <li>
                <span className="font-bold">{t("neuna_min_prop2")}</span>
                <ul className="list-disc pl-5">
                  <li>{t("neuna_min_prop2a")}</li>
                  <li>{t("neuna_min_prop2b")}</li>
                </ul>
              </li>
              <li>
                <span className="font-bold">{t("neuna_min_prop3")}</span>
                <ul className="list-disc pl-5">
                  <li>{t("neuna_min_prop3a")}</li>
                  <li>{t("neuna_min_prop3b")}</li>
                </ul>
              </li>
            </ul>

            {/* Benefits */}
            <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-4">{t("neuna_min_benefits")}</h3>
            <ul className="text-gray-700 list-disc pl-5 mb-4">
              <li>{t("neuna_min_ben1")}</li>
              <li>{t("neuna_min_ben2")}</li>
              <li>{t("neuna_min_ben3")}</li>
              <li>{t("neuna_min_ben4")}</li>
              <li>{t("neuna_min_ben5")}</li>
            </ul>

            {/* Applications */}
            <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-4">{t("neuna_min_applications")}</h3>
            <ul className="text-gray-700 pl-5 mb-4">
              <li>
                <span className="font-bold">{t("neuna_min_env")}</span>
                <ul className="list-disc pl-5">
                  <li>{t("neuna_min_env1")}</li>
                </ul>
              </li>
              <li>
                <span className="font-bold">{t("neuna_min_med")}</span>
                <ul className="list-disc pl-5">
                  <li>{t("neuna_min_med1")}</li>
                  <li>{t("neuna_min_med2")}</li>
                </ul>
              </li>
              <li>
                <span className="font-bold">{t("neuna_min_agri")}</span>
                <ul className="list-disc pl-5">
                  <li>{t("neuna_min_agri1")}</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchDevelopment;
