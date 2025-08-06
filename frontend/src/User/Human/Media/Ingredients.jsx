import React from 'react';
import { motion } from 'framer-motion';

const Ingredients = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1 
        className="text-4xl font-bold mb-10 text-center text-green-800"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Ingredients
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {[
          { img: "/Assets/Ingredients/APIS.jpg", alt: "APIs", title: "APIs", desc: "An API, or Application Programming Interface, is a set of rules and protocols for building and interacting with software applications." },
          { img: "/Assets/Ingredients/Herbs.jpg", alt: "Herbs and Extracts", title: "Herbs and Extracts", desc: "Herbs and extracts are derived from various parts of plants, used in culinary, medicinal, and skincare products." },
          { img: "/Assets/Ingredients/Spices.jpg", alt: "Spices", title: "Spices", desc: "Spices are aromatic substances used to add flavor, color, and aroma to food, enhancing the taste of dishes." },
          { img: "/Assets/Ingredients/vegetables.jpg", alt: "Dried Vegetables", title: "Dried Vegetables", desc: "Dried vegetables are preserved by removing moisture, making them easy to store and use in various dishes." }
        ].map((item, index) => (
          <motion.div 
            key={index}
            className="bg-white shadow-lg rounded-xl overflow-hidden"
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
                className="text-2xl font-semibold mb-4 text-green-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {item.title}
              </motion.h2>
              <motion.p 
                className="text-gray-700 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {item.desc}
              </motion.p>
            </div>
          </motion.div>
        ))}

      </div>
    </div>
  );
};

export default Ingredients;
