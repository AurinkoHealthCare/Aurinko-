import React from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <div className="min-h-screen">
      <header className="flex justify-center items-center py-4">
        <h1 className="text-4xl font-bold">OUR BLOGS</h1>
      </header>
      <main className="container mx-auto py-8 px-4">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row">
            <img src="/Assets/Media/Blog Cows.jpg" alt="A cow and a calf standing on a grassy field" className="w-full md:w-1/3 rounded-lg mb-4 md:mb-0 md:mr-6" />
            <div className="md:w-2/3">
              <Link to="blog1"><h2 className="text-4xl font-bold mb-4">HOW TO IMPROVE EARLY LACTATION PERFORMANCE FOR HIGHER PEAK MILK YIELD?</h2></Link>
              <p>Successfully guiding cows through early lactation is key to their health and performance. Thus, nutrition and health during early lactation greatly affect peak milk yields. Preventing health problems and having good feed practices can improve peak milk yields. Ten ways to improve early lactation performance and peak milk yield Research shows dry period nutrition and […]</p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row">
            <img src="/Assets/Media/MILK-FERVER-COW.jpg" alt="A cow lying on a straw bed" className="w-full md:w-1/3 rounded-lg mb-4 md:mb-0 md:mr-6" />
            <div className="md:w-2/3">
              <Link to="blog2"><h2 className="text-4xl font-bold mb-4">MILK FEVER SIGNS CAUSES PREVENTION AND TREATMENT</h2></Link>
              <p>Thinking Ahead SIGNS, CAUSES, PREVENTION, AND TREATMENT Milk fever is a disorder mainly of dairy cows close to calving. It is a metabolic disease caused by a low blood calcium level (Hypocalcemia). Calcium is necessary for proper contraction of the muscle. Muscle contraction is reduced by any decrease in blood calcium. Daniel et.al.,(1983) demonstrated that […]</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Blog;
