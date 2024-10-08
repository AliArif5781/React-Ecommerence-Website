import { Link } from "react-router-dom";
import img2 from "/ProductSection/img1.jpg";
import img3 from "/ProductSection/img2.jpg";
import img6 from "/ProductSection/img5.jpg";
import img1 from "/ProductSection/1.jpg";
import img4 from "/ProductSection/1.svg";
import { memo } from "react";

const ProductsSection = memo(() => {
  return (
    <section className="text-gray-600 body-font flex justify-center items-center">
      <div className="container px-5 py-24 mx-auto">
        {/* Heading with underline effect */}
        <div className="group mt-10">
          <h1 className="text-5xl text-center mb-10 text-black transition-transform transform hover:scale-105 hover:transition-all hover:duration-500 hover:ease-in-out hover:font-bold relative">
            Product Section
            <span className="block absolute left-0 bottom-0 w-full h-0.5 bg-black scale-x-0 origin-left transition-transform duration-500 ease-in-out group-hover:scale-x-100"></span>
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* First three product cards */}
          <Link to={"/menProduct"} className="flex justify-center items-center">
            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl hover:transition-all hover:duration-500 hover:ease-in-out">
              <img
                className="lg:h-96 md:h-72 sm:h-56 w-full object-cover object-center"
                src={img2}
                alt="Men's Clothing"
                loading="lazy"
              />
              <div className="p-6">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  CATEGORY
                </h2>
                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                  Men Clothes
                </h1>
                <p className="leading-relaxed mb-3">
                  Men's clothing often prioritizes comfort and versatility,
                  blending classic styles with modern trends.
                </p>
                <div className="flex items-center flex-wrap">
                  <button className="text-slate-500 inline-flex items-center md:mb-2 lg:mb-0 hover:bg-black transition duration-300 rounded py-[5px] px-2 justify-center hover:text-white hover:font-bold">
                    Click here
                    <svg
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </Link>

          <Link
            to={"/womenProduct"}
            className="flex justify-center items-center"
          >
            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl  duration-500 ease-in-out">
              <img
                className="lg:h-96 md:h-72 sm:h-56 w-full object-cover object-center"
                src={img3}
                alt="Women's Clothing"
                loading="lazy"
              />
              <div className="p-6">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  CATEGORY
                </h2>
                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                  Women Clothes
                </h1>
                <p className="leading-relaxed mb-3">
                  Women's clothing offers a variety of styles, from casual wear
                  to elegant dresses, combining comfort and fashion.
                </p>
                <div className="flex items-center flex-wrap">
                  <button className="text-slate-500 inline-flex items-center md:mb-2 lg:mb-0 hover:bg-black transition duration-300 rounded py-[5px] px-2 justify-center hover:text-white hover:font-bold">
                    Click here
                    <svg
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </Link>

          <Link
            to={"/jewelleryProduct"}
            className="flex justify-center items-center"
          >
            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl duration-500 ease-in-out">
              <img
                className="lg:h-96 md:h-72 sm:h-56 w-full object-cover object-center"
                src={img1}
                alt="Baby Clothes"
                loading="lazy"
              />
              <div className="p-6">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  CATEGORY
                </h2>
                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                  Jewellery
                </h1>
                <p className="leading-relaxed mb-3">
                  Jewelry is a symbol of love, luxury, and legacy. It's a way to
                  express oneself, to tell a story, and to pass down traditions.
                </p>
                <div className="flex items-center flex-wrap">
                  <button className="text-slate-500 inline-flex items-center md:mb-2 lg:mb-0 hover:bg-black transition duration-300 rounded py-[5px] px-2 justify-center hover:text-white hover:font-bold">
                    Click here
                    <svg
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Heading with underline effect */}
        <div className="group mt-10">
          <h1 className="text-5xl text-center mb-10 text-black transition-transform transform hover:scale-105 hover:transition-all hover:duration-500 hover:ease-in-out hover:font-bold relative">
            Tech Accesories
            <span className="block absolute left-0 bottom-0 w-full h-0.5 bg-black scale-x-0 origin-left transition-transform duration-500 ease-in-out group-hover:scale-x-100"></span>
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to={"/techAccesories"}
            className="flex justify-center items-center"
          >
            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl  duration-500 ease-in-out">
              <img
                className="lg:h-96 md:h-72 sm:h-56 w-full object-cover object-center"
                src={img6}
                alt="Mobile Accesories"
                loading="lazy"
              />
              <div className="p-6">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  CATEGORY
                </h2>
                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                  Tech Accesories
                </h1>
                <p className="leading-relaxed mb-3">
                  Enhance your tech experience with our premium collection of
                  accessories, designed to complement and elevate your devices.
                </p>
                <div className="flex items-center flex-wrap">
                  <button className="text-slate-500 inline-flex items-center md:mb-2 lg:mb-0 hover:bg-black transition duration-300 rounded py-[5px] px-2 justify-center hover:text-white hover:font-bold">
                    Click here
                    <svg
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="group mt-10">
          <h1 className="text-5xl text-center mb-10 text-black transition-transform transform hover:scale-105 hover:transition-all hover:duration-500 hover:ease-in-out hover:font-bold relative">
            Custom Design
            <span className="block absolute left-0 bottom-0 w-full h-0.5 bg-black scale-x-0 origin-left transition-transform duration-500 ease-in-out group-hover:scale-x-100"></span>
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to={"/account-section/customdesign"}
            className="flex justify-center items-center"
          >
            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl  duration-500 ease-in-out">
              <img
                className="lg:h-96 md:h-72 sm:h-56 w-full object-cover object-center"
                src={img4}
                alt="Mobile Accesories"
                loading="lazy"
              />
              <div className="p-6">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  CATEGORY
                </h2>
                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                  Custom Design
                </h1>
                <p className="leading-relaxed mb-3">
                  Allow customers to unleash their creativity and design their
                  own products, from custom logos to personalized messages.
                </p>
                <div className="flex items-center flex-wrap">
                  <button className="text-slate-500 inline-flex items-center md:mb-2 lg:mb-0 hover:bg-black transition duration-300 rounded py-[5px] px-2 justify-center hover:text-white hover:font-bold">
                    Click here
                    <svg
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
});

export default ProductsSection;
