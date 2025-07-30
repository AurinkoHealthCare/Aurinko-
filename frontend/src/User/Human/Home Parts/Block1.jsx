import React from 'react';

const Block1 = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center justify-center py-6 px-4 sm:px-6 md:px-12 lg:px-16">
      <div className="w-full md:w-1/2 px-4">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-4xl text-center md:text-left mb-4 md:mb-6 text-red-800 relative">
          Welcome to Aurinko One Health
          <span className="absolute top-full left-1/2 md:left-0 transform -translate-x-1/2 md:translate-x-0 mt-2 w-20 sm:w-24 h-1 bg-red-600"></span>
        </h1>
        <p className="text-gray-700 text-justify mb-3 md:mb-4 leading-relaxed text-sm sm:text-base">
          Aurinko One Health is an innovation driven pharmaceutical and nanobiotechnology company incorporated
          on 21st November 2014, previously known as Aurinko Healthcare Pvt. Ltd., received Start up recognition and certification from Department of Industrial
          Policy and Promotion, Govt. of India. Aurinko One Health is a WHO-GMP, FSSAI, APEDA and HACCP certified
          company with ISO 9001-2015, ISO 22000-2018 certifications received for robust management systems.
        </p>
        <p className="text-gray-700 text-justify leading-relaxed text-sm sm:text-base">
          Promoters of this organization are well qualified pharmaceutical and financial business professionals
          having illustrious recognition in the areas of strategic marketing, branding, innovation, formulation
          development and business finance with over 30 years of rich domain experience.
        </p>
      </div>
      <div className="relative w-full md:w-1/2 h-60 sm:h-72 md:h-80 lg:h-96 xl:h-[35rem] shadow-lg rounded-xl overflow-hidden">
        <img
          src="/Assets/AurinkoHome1.png"
          alt="Aurinko Home"
          className="w-full h-full object-cover rounded-xl transition-all duration-1000 ease-in-out"
        />
      </div>
    </div>
  );
};

export default Block1;
