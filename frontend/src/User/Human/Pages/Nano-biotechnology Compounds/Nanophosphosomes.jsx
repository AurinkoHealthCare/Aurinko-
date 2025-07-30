import React from "react";
// import Human_Nano_biotechnology from "../../../Components/Human/Human_Nano-biotechnology";
// import nanophosphosome_data from "../../../Data/H_Nanophosphosome_data";

const Nanophosphosome = () => {
  return (
    <div className="font-sans">
      <div className="relative">
        <img src="/Assets/Nano-biotechnology Compounds/Nanophosphosome.webp" alt="Nanophosphosome" className="w-full" />
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

export default Nanophosphosome;
