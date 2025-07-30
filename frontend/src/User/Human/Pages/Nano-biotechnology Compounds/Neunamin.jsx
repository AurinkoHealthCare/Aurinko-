import React from "react";

const Neunamin = () => {
  return (
    <div className="font-sans">
      <div className="relative">
        <img src="/Assets/Nano-biotechnology Compounds/Neunamin.webp" alt="Neunamin" className="w-full" />
      </div>
      {/* <div className="flex flex-col w-full p-4">
        {nanophosphosome_data?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4">
            {nanophosphosome_data.map((product) => (
              <Human_Nano_biotechnology key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No health supplements available.</p>
        )}
      </div> */}
    </div>
  );
};

export default Neunamin;
