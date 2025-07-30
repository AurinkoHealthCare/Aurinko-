import React from "react";
// import ProductCard from "../../../Components/Human/ProductCard";
// import V_Neunaparticles_data from "../../../Data/V_Neunaparticles_data";


const ANeunaparticles = () => {
  return (
    <div className="font-sans">
      <div className="relative">
        <img src="/Assets/Nano-biotechnology Compounds/Neuna Particles.webp" alt="Nanophosphosome" className="w-full" />
      </div>
      {/* <div className="flex flex-col min-h-screen w-full p-4">
        {V_Neunaparticles_data?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4">
            {V_Neunaparticles_data.map((product) => (
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

export default ANeunaparticles;
