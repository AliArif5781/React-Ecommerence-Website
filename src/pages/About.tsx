import video1 from "/laptopPic/video.mp4";
const About = () => {
  return (
    <>
      <div className=" pt-16 grid place-items-center text-gray-600 border-gray-200 border-opacity-60">
        <div className="group mt-10 col-span-full">
          <h1 className="text-5xl font-semibold text-center mb-10 text-black transition-transform transform hover:scale-105 hover:transition-all hover:duration-500 hover:ease-in-out hover:font-bold relative">
            About Us
            <span className="block absolute left-0 bottom-0 w-full h-0.5 bg-black scale-x-0 origin-left transition-transform duration-500 ease-in-out group-hover:scale-x-100"></span>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 place-items-center pt-5">
        <div className="max-w-xl w-full text-center lg:text-left">
          <h1 className="text-5xl leading-[55px] font-bold w-full max-w-full">
            To deliver exceptional{" "}
            <span className="bg-gray-800 text-white px-1">
              products and services
            </span>{" "}
            that enhance the lives of our customers
          </h1>
          <p className="mt-4 w-full text-gray-700">
            A website that allows people to buy and sell physical goods,
            services, and digital products over the internet rather than at a
            brick-and-mortar location. Through an e-commerce website, a business
            can process orders, accept payments, manage shipping and logistics,
            and provide customer service.
          </p>
        </div>
        <div>
          {/* <img src={img} alt="About Us" className="rounded-lg shadow-lg" /> */}
          <video src={video1} autoPlay loop muted></video>
        </div>
      </div>
    </>
  );
};

export default About;
