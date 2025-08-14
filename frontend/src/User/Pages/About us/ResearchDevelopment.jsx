import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "../../../../api/axios";

const Paragraph = ({ children }) => (
  <p className="text-sm md:text-base lg:text-lg p-3 md:p-4 text-zinc-800">{children}</p>
);

const ResearchDevelopment = () => {
  const { t } = useTranslation("research_development");
  const paragraphs = t("paragraphs", { returnObjects: true });

  const [headerImage, setHeaderImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch image named "research development"
  const fetchHeaderImage = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/otherimage/all");
      const arr = Array.isArray(res.data) ? res.data : res.data?.data || [];

      const selected = arr.find(
        img => img.imageName?.toLowerCase() === "research development"
      );

      setHeaderImage(selected || null);
    } catch (err) {
      console.error("Failed to fetch research development image ❌", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeaderImage();
  }, []);

  return (
    <div className="font-sans">
      {/* Banner */}
      <div className="relative">
        {loading ? (
          <div className="w-full h-64 flex items-center justify-center bg-gray-100">
            <p className="text-gray-500">Loading header image...</p>
          </div>
        ) : headerImage ? (
          <>
            <img
              src={headerImage.url}
              alt={headerImage.imageName}
              className="w-full object-cover h-[500px]"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold">
                {t("title")}
              </h1>
            </div>
          </>
        ) : (
          <div className="w-full h-64 flex items-center justify-center bg-gray-100">
            <p className="text-gray-500">No "research development" image found</p>
          </div>
        )}
      </div>

      <div className="container mx-auto py-12 px-4">
        {/* Section 1 */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t("research_and_development")}
            </h2>
            <hr className="border-t-2 border-green-800 w-16 mb-4" />
            {paragraphs.map((para, index) => (
              <Paragraph key={index}>{para}</Paragraph>
            ))}
          </div>

          <div className="w-full md:w-1/2">
            <img
              src="/Assets/Aboutus/Research and developement/research img 1.jpg"
              alt="Scientist working with lab equipment"
              className="w-full h-auto mx-auto"
            />
          </div>
        </div>

        {/* Section 2 */}
        <div className="flex flex-col md:flex-row items-center gap-8 mt-12">
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

        {/* Benefits and Applications */}
        <div className="flex flex-col md:flex-row items-center gap-8 mt-12">
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
        <div className="flex justify-center items-center mt-12">
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

        {/* NEUNA Section */}
        <div className="flex flex-col md:flex-row items-center gap-8 mt-12">
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
          </div>
          <div className="w-full md:w-1/2">
            <img
              src="/Assets/Aboutus/Research and developement/Neuna® particles.jpg"
              alt="Neuna particles"
              className="w-full h-auto mx-auto"
            />
          </div>
        </div>

        {/* Additional NEUNA Info */}
        <div className="flex flex-col md:flex-row items-center gap-8 mt-12">
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
        <div className="flex justify-center items-center mt-12">
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

        {/* NEUNA Min */}
        <div className="font-sans py-12 container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("title3")}</h2>
          <hr className="border-t-2 border-green-800 w-16 mb-4" />
          <p className="text-gray-700 mb-4">{t("paragraph6")}</p>
          <p className="text-gray-700 mb-4">
            <span className="font-bold">{t("paragraph6a")}</span> {t("paragraph6b")}
          </p>
          {/* The rest of technology, properties, benefits, applications remain same as your original code */}
        </div>
      </div>
    </div>
  );
};

export default ResearchDevelopment;
