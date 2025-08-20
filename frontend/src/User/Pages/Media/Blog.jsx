import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Blog = () => {
  const { t } = useTranslation("blog");

  return (
    <div className="min-h-screen">
      <header className="flex justify-center items-center py-4">
        <h1 className="text-4xl font-bold">{t("heading1")}</h1>
      </header>
      <main className="container mx-auto py-8 px-4">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row">
            <img src="/Assets/blog/Blog Cows.jpg" alt="A cow and a calf standing on a grassy field" className="w-full md:w-1/3 rounded-lg mb-4 md:mb-0 md:mr-6" />
            <div className="md:w-2/3">
              <Link to="blog1"><h2 className="text-4xl font-bold mb-4">{t("heading2")}</h2></Link>
              <p>{t("paragraph1")} […]</p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row">
            <img src="/Assets/blog/MILK-FERVER-COW.jpg" alt="A cow lying on a straw bed" className="w-full md:w-1/3 rounded-lg mb-4 md:mb-0 md:mr-6" />
            <div className="md:w-2/3">
              <Link to="blog2"><h2 className="text-4xl font-bold mb-4">{t("heading3")}</h2></Link>
              <p>{t("paragraph2")} […]</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Blog;
