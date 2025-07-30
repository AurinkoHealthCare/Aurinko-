import React from "react";
// import v_nanophosphosome_data from "../../../Data/V_Nanophosphosome_data";
// import ProductCard from "../../../Components/Human/ProductCard";

const ANanophosphosome = () => {
  return (
    <div className="font-sans">
      <div className="relative">
        <img src="/Assets/Nano-biotechnology Compounds/Nanophosphosome.webp" alt="Nanophosphosome" className="w-full"/>
      </div>
      {/* <div className="flex flex-col min-h-screen w-full p-4">
        {v_nanophosphosome_data?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4">
            {v_nanophosphosome_data.map((product) => (
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

export default ANanophosphosome;