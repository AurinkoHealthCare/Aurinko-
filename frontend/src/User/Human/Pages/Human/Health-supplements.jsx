import React from "react";
// import ProductCard from "../../Components/Human/ProductCard.jsx";
// import human_data from "../../Data/Human_Data.jsx";

const Healthsupplements = () => {
  return (
    <div className="font-sans">
      <div className="relative">
        <img
          src="/Assets/Human/Health supplements.webp"
          alt="Health suppliments"
          className="w-full"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col  items-center text-white p-8">
          <h1 className="lg:text-4xl font-bold">Health Supplements</h1>
        </div>
      </div>
      {/* <div className="flex flex-col min-h-screen w-full p-4">
        {human_data?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4">
            {human_data.map((product) => (
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

export default Healthsupplements;