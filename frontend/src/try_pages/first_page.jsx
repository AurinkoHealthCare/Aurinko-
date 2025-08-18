import React from "react";
import { Link } from "react-router-dom";

const First_page = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-8 min-h-screen bg-gray-100">
      
      <div className="w-64 h-64 p-4 bg-white rounded-2xl shadow-lg text-center cursor-pointer transition-transform duration-300 hover:scale-105">
        <Link to="/second">
          <img
            src="https://source.unsplash.com/400x250/?nature"
            alt="Card One"
            className="w-full h-40 object-cover rounded-xl mb-3"
          />
          <p className="text-sm text-gray-600">Explore the beauty of nature.</p>
        </Link>
      </div>

      <div className="w-64 h-64 p-4 bg-white rounded-2xl shadow-lg text-center cursor-pointer transition-transform duration-300 hover:scale-105">
        <Link to="/second">
          <img
            src="https://source.unsplash.com/400x250/?technology"
            alt="Card Two"
            className="w-full h-40 object-cover rounded-xl mb-3"
          />
          <p className="text-sm text-gray-600">Latest innovations in technology.</p>
        </Link>
      </div>

      <div className="w-64 h-64 p-4 bg-white rounded-2xl shadow-lg text-center cursor-pointer transition-transform duration-300 hover:scale-105">
        <Link to="/second">
          <img
            src="https://source.unsplash.com/400x250/?travel"
            alt="Card Three"
            className="w-full h-40 object-cover rounded-xl mb-3"
          />
          <p className="text-sm text-gray-600">Discover amazing places around the world.</p>
        </Link>
      </div>

      <div className="w-64 h-64 p-4 bg-white rounded-2xl shadow-lg text-center cursor-pointer transition-transform duration-300 hover:scale-105">
        <Link to="/second">
          <img
            src="https://source.unsplash.com/400x250/?food"
            alt="Card Four"
            className="w-full h-40 object-cover rounded-xl mb-3"
          />
          <p className="text-sm text-gray-600">Delicious food and recipes.</p>
        </Link>
      </div>

      <div className="w-64 h-64 p-4 bg-white rounded-2xl shadow-lg text-center cursor-pointer transition-transform duration-300 hover:scale-105">
        <Link to="/second">
          <img
            src="https://source.unsplash.com/400x250/?sports"
            alt="Card Five"
            className="w-full h-40 object-cover rounded-xl mb-3"
          />
          <p className="text-sm text-gray-600">Exciting moments in sports.</p>
        </Link>
      </div>
    </div>
  );
};

export default First_page;
