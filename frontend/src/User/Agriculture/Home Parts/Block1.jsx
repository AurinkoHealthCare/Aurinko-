import React from 'react';
import { useTranslation } from 'react-i18next';

const Block1 = () => {
  const { t } = useTranslation('home_parts');

  const heading = t('heading');
  const paragraphs = t('paragraphs', { returnObjects: true });
  const imageSrc = t('image.src');
  const imageAlt = t('image.alt');
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center justify-center py-6 px-4 sm:px-6 md:px-12 lg:px-16">
      <div className="w-full md:w-1/2 px-4">
        <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-center md:text-left mb-4 md:mb-6 text-[#01421d] relative">
          {heading}
          <span className="absolute top-full left-1/2 md:left-0 transform -translate-x-1/2 md:translate-x-0 mt-2 w-20 sm:w-24 h-1 bg-[#01421d]"></span>
        </h1>
        {paragraphs.map((para, idx) => (
          <p
            key={idx}
            className={`text-gray-700 text-justify ${idx === 0 ? 'mb-3 md:mb-4' : ''} leading-relaxed text-sm lg:text-base`}
          >
            {para}
          </p>
        ))}
      </div>
      <div className="relative w-full md:w-1/2 h-60 sm:h-72 md:h-80 lg:h-96 xl:h-[35rem] shadow-lg rounded-xl overflow-hidden">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover rounded-xl transition-all duration-1000 ease-in-out"
        />
      </div>
    </div>
  );
};

export default Block1;
