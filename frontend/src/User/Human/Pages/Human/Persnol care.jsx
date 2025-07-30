import React from "react";
// import ProductCard from "../../Components/Human/ProductCard.jsx";
// import Persnol_care_Data from "../../Data/Persnol_care_Data.jsx";

const Persnolcare = () => {
  return (
    <div className="font-sans">
      <div className="relative">
        <img
          src="/Assets/Human/Persnol care.webp"
          alt="Persnol care"
          className="w-full"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-2">
          <h1 className="lg:text-4xl font-bold">Personal Care</h1>
        </div>
      </div>
      {/* <div className="flex flex-col min-h-screen w-full p-4">
        {Persnol_care_Data?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4">
            {Persnol_care_Data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No health supplements available.</p>
        )}
      </div> */}
    </div>
  );
};

export default Persnolcare;
