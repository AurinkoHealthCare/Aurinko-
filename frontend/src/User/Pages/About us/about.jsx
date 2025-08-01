import React from "react";
import { useTranslation } from "react-i18next";

const Paragraph = ({ children }) => (
  <p className="text-sm md:text-base lg:text-lg p-3 md:p-4 text-zinc-800">
    {children}
  </p>
);

const About = () => {
  const { t } = useTranslation("about");
  const paragraphs = t("paragraphs", { returnObjects: true });

  return (
    <div className="font-sans">
      <div className="relative">
        <img
          src="/Assets/AurinkoHome1.png"
          alt={t("aboutImageAlt")}
          className="w-full"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl relative text-center mb-6">
            {t("heading")}
          </h1>
        </div>
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
