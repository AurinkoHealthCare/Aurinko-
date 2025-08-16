import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "../../../../api/axios";

const Paragraph = ({ children }) => (
  <p className="text-sm md:text-base lg:text-lg p-3 md:p-4 text-zinc-800">
    {children}
  </p>
);

const About = () => {
  const { t } = useTranslation("about");
  const paragraphs = t("paragraphs", { returnObjects: true });

  const [headerImage, setHeaderImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch image named "about us"
  const fetchHeaderImage = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/otherimage/all");
      const arr = Array.isArray(res.data) ? res.data : res.data?.data || [];

      // ✅ find the image where name is "about us"
      const selected = arr.find(
        img => img.imageName?.toLowerCase() === "about us"
      );

      setHeaderImage(selected ||  null);
    } catch (err) {
      console.error("Failed to fetch image ❌", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeaderImage();
  }, []);

  return (
    <div className="font-sans">
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
              className="w-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
              <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl relative text-center mb-6">
                {headerImage.imageName}
              </h1>
            </div>
          </>
        ) : (
          <div className="w-full h-64 flex items-center justify-center bg-gray-100">
            <p className="text-gray-500">No "about us" image found</p>
          </div>
        )}
      </div>

      <div className="px-10 py-8 md:px-14 lg:px-20">
        <section className="mt-6">
          {paragraphs.map((para, index) => (
            <Paragraph key={index}>{para}</Paragraph>
          ))}
        </section>
      </div>
    </div>
  );
};

export default About;
