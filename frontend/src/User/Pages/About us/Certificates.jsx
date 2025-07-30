import React from "react";
import { motion } from "framer-motion";
import certificates from "../../Data/certificates_data";

const Certificates = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-3xl font-bold text-center mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        OUR CERTIFICATES
      </motion.h1>
      <motion.div
        className="border-t-4 border-green-500 w-16 mx-auto mb-8"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {certificates.map((certificate, index) => (
          <motion.div
            key={certificate.name}
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
          >
            <motion.img
              src={certificate.imgSrc}
              alt={certificate.name + " Certificate"}
              className="mx-auto mb-2 h-64 rounded-lg shadow-lg hover:scale-110 transition-transform duration-300"
              whileHover={{ scale: 1.1, rotate: 3 }}
              transition={{ duration: 0.3 }}
            />
            <motion.p
              className="font-bold"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {certificate.name}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
};

export default Certificates;
