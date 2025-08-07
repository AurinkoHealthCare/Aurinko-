import React from "react";
import { useTranslation } from "react-i18next";

const ResearchDevelopment = () => {
  const { t } = useTranslation("research_development");

  return (
    <div className="font-sans">
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
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t("research_and_development")}
            </h2>
            <hr className="border-t-2 border-green-800 w-16 mb-4" />
            <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-4">{t("paragraph1")}</h3>
            <p className="text-gray-700 mb-4">
              {t("paragraph2")}
            </p>
            <p className="text-gray-700">
              {t("paragraph3")}
            </p>
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
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t("title1")}
            </h2>
            <hr className="border-t-2 border-green-800 w-16 mb-4" />
            <p className="text-gray-700 mb-4">
              {t("paragraph4")}
            </p>
            <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-4">
              {t("title1a")}
            </h3>
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
              className=" h-96 mx-auto"
            />
          </div>
        </div>

        <div className="py-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-4">
                {t("title1b")}
              </h3>
              <ul className="text-gray-700 list-disc pl-5 mb-4">
                <li>{t("line1b")}</li>
                <li>{t("line2b")}</li>
                <li>{t("line3b")}</li>
                <li>{t("line4b")}</li>
              </ul>
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-4">
                {t("title1c")}
              </h3>
              <ul className="text-gray-700 list-disc pl-5 mb-4">
                <li>{t("line1c")}</li>
                <li>{t("line2c")}</li>
                <li>{t("line3c")}</li>
                <li>{t("line4c")}</li>
                <li>{t("line5c")}</li>
              </ul>
            </div>
          </div>
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

        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t("title2")}
            </h2>
            <hr className="border-t-2 border-green-800 w-16 mb-4" />
            <p className="text-gray-700 mb-4">
              {t("paragraph5")}
            </p>
            <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-4">
              {t("title2a")}
            </h3>
            <ul className="text-gray-700 list-disc pl-5 mb-4">
              <li>{t("line1d")}</li>
              <li>{t("line2d")}</li>
              <li>{t("line3d")}</li>
              <li>{t("line4d")}</li>
            </ul>
            <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-4">
              {t("title2b")}
            </h3>
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
              alt="Neuna® particles"
              className="w-full h-auto mx-auto"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 my-8">
          <div className="w-full md:w-1/2">
            <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-4">
              {t("title2c")}
            </h3>
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
        <div className="font-sans py-12 container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("title3")}</h2>
          <hr className="border-t-2 border-green-800 w-16 mb-4" />
          <p className="text-gray-700 mb-4">
            {t("paragraph6")}
          </p>
          <p className="text-gray-700 mb-4">
            <span className="font-bold">{t("paragraph6a")}</span> {t("paragraph6b")}
          </p>

          <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-4">
            {t("title3a")}
          </h3>

          <div className="grid grid-cols-1 gap-8">
            <div className="flex gap-8 flex-wrap items-center">
              <div>
                <img
                  src="/Assets/Aboutus/Research and developement/Carbon Quantum Dots (CQDs).jpg"
                  alt="Carbon Quantum Dots (CQDs)"
                  className="h-20 object-cover"
                />
              </div>
              <div className="md:w-3/4 w-full">
                <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-4">
                  1. Carbon Quantum Dots (CQDs)
                </h3>
                <p>
                  {t("paragraph7")}
                  Carbon Quantum Dots passivated Minerals (CQD Minerals) is a highly bioavailable form of supplemental minerals which can be used further for the production of high-quality mineral feeds and supplements.
                </p>
              </div>
            </div>
            <div className="flex gap-8 flex-wrap items-center">
              <div className="w-20">
                <img
                  src="/Assets/Aboutus/Research and developement/Carbon Polymer Bio-caging.jpg"
                  alt="Carbon Polymer Bio-caging"
                  className="h-20 w-auto object-cover"
                />
              </div>

              <div className="md:w-3/4 w-full">
                <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-2">
                  2. Carbon Polymer Bio-caging
                </h3>
                <p className="text-gray-700">
                  {t("paragraph8")}
                  Bio-cage is a carbon polymer which can be used as a carrier for minerals, including trace minerals and can form nanoparticles after complexation.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Properties of Neuna® Min
            </h2>
            <ul className="text-gray-700 pl-5 mb-4">
              <li>
                <span className="font-bold">High Surface Area-to-Volume Ratio</span>
                <ul className="list-disc pl-5">
                  <li>Increases reactivity and adsorption capabilities.</li>
                  <li>Enhances catalytic efficiency in chemical processes.</li>
                </ul>
              </li>
              <li>
                <span className="font-bold">Enhances Mechanical Strength</span>
                <ul className="list-disc pl-5">
                  <li>Neuna® Min exhibit improved hardness and durability.</li>
                  <li>Used in reinforcement of composite materials.</li>
                </ul>
              </li>
              <li>
                <span className="font-bold">Improves Thermal Stability</span>
                <ul className="list-disc pl-5">
                  <li>Neuna® Min can withstand high temperatures without significant degradation.</li>
                  <li>Applied in heat-resistant coatings and thermal insulation materials.</li>
                </ul>
              </li>
            </ul>

            <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-4">
              Benefits of Neuna® Min
            </h3>
            <ul className="text-gray-700 list-disc pl-5 mb-4">
              <li>Greater Bioavailability</li>
              <li>Higher Cellular Availability</li>
              <li>Higher Retention</li>
              <li>Lower Faecal Excretion</li>
              <li>Broad Safety Margin</li>
            </ul>

            <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-4">
              Applications of Neuna® Min
            </h3>
            <ul className="text-gray-700 pl-5 mb-4">
              <li>
                <span className="font-bold">Environmental Applications</span>
                <ul className="list-disc pl-5">
                  <li>
                    Soil Remediation: Neuna® Min can break down contaminants in soil, making it safer for agriculture and construction.
                  </li>
                </ul>
              </li>
              <li>
                <span className="font-bold">Medical and Healthcare</span>
                <ul className="list-disc pl-5">
                  <li>
                    Drug Delivery Systems: Neuna® Min can be engineered to deliver drugs to specific sites in the body, increasing treatment efficacy and reducing side effects.
                  </li>
                  <li>
                    Antibacterial Coatings: Silver and copper nanoparticles exhibit strong antimicrobial properties.
                  </li>
                </ul>
              </li>
              <li>
                <span className="font-bold">Agricultural Applications</span>
                <ul className="list-disc pl-5">
                  <li>
                    Nano-fertilizers: Improves nutrient absorption and enhances crop yield.
                  </li>
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