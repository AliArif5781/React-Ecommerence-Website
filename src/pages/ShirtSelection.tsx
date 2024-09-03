import React from "react";
import { useNavigate } from "react-router-dom";
import img1 from "/T-shirt/a (1).png";
import img2 from "/T-shirt/aa.png";

const ShirtSelection: React.FC = () => {
  const navigate = useNavigate();

  const handleShirtClick = (shirtType: string) => {
    navigate(`/account-section/customize/${shirtType}`);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 px-4  pt-[150px] overflow-hidden">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
        Select T-Shirt
      </h1>
      <span className="text-sm sm:text-base text-center mb-8">
        Select one of the following T-shirts for custom designing.
      </span>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div
          className="relative flex justify-center items-center hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
          onClick={() => handleShirtClick("black")}
        >
          <img className="w-full  object-cover" src={img1} alt="Black Shirt" />
        </div>
        <div
          className="relative flex justify-center items-center hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
          onClick={() => handleShirtClick("white")}
        >
          <img className="w-full  object-cover" src={img2} alt="White Shirt" />
        </div>
      </div>
      <span>Important:</span>
      <span className="">
        Customize your custom t-shirt in laptop or in personal computer for
        better user experience.
      </span>
    </div>
  );
};

export default ShirtSelection;
