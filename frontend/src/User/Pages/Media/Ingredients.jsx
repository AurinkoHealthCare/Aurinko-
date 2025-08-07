import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Ingredients = () => {
  const { t } = useTranslation('ingredients');
  const translations = t('ingredientsList', { returnObjects: true });

  const fixedData = [
    { img: "/Assets/Ingredients/APIS.jpg", alt: "APIs" },
    { img: "/Assets/Ingredients/Herbs.jpg", alt: "Herbs and Extracts" },
    { img: "/Assets/Ingredients/Spices.jpg", alt: "Spices" },
    { img: "/Assets/Ingredients/vegetables.jpg", alt: "Dried Vegetables" }
  ];

  return (
    <div className="container mx-auto px-4 py-12">

      <motion.h1
        className="text-4xl font-bold mb-10 text-center text-blue-700"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {t('ingredientsTitle')}
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {fixedData.map((item, index) => (
          <motion.div
            key={index}
            className="shadow-md rounded-xl overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            viewport={{ once: true }}
          >
            <motion.img
              src={item.img}
              alt={item.alt}
              className="w-full h-72 object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="p-6">
              <motion.h2
                className="text-2xl font-semibold mb-4 text-red-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {translations[index].title}
              </motion.h2>
              <motion.p
                className="text-green-900 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {translations[index].desc}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Ingredients;
