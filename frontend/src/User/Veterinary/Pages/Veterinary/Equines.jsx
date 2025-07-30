import React from "react";

const Equines = () => {
  return (
    <div className="font-sans">
      <div className="relative">
        <img
          src="/Assets/veterinary/Equines.jpg"
          alt="Equines"
          className="w-full min-h-screen object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-2">
          <h1 className="text-4xl font-bold p-5">Equines</h1>
          <h1 className="text-4xl font-bold p-5">Comming soon</h1>
        </div>
      </div>
    </div>
  );
};

export default Equines;