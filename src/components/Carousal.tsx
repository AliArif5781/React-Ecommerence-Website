import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useRef, useCallback, useMemo } from "react";
import { RxDotFilled } from "react-icons/rx";
import ProductsSection from "../components/ProductsSection";
import img1 from "/CarousalImg/img1.jpg";
import img2 from "/CarousalImg/img2.jpg";
import img3 from "/CarousalImg/img3.jpeg";
import img4 from "/CarousalImg/img4.jpeg";
import img5 from "/CarousalImg/img5.jpg";
const Carousel = () => {
  const slides = useMemo(
    () => [
      {
        url: img1,
      },
      {
        url: img2,
      },
      {
        url: img3,
      },
      {
        url: img4,
      },
      {
        url: img5,
      },
    ],
    []
  );

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const targetRef = useRef<HTMLDivElement>(null);

  const prevSlide = useCallback(() => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides.length]);

  const nextSlide = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides.length]);

  const goToSlide = useCallback((slideIndex: any) => {
    setCurrentIndex(slideIndex);
  }, []);

  const handleShopNowClick = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const slideStyle = {
    backgroundImage: `url(${slides[currentIndex].url})`,
  };
  return (
    <>
      <div className="pt-[72px] max-w-[100%] h-[600px] w-full m-auto relative group">
        <div
          style={slideStyle}
          className=" h-full w-full bg-center bg-cover duration-500"
        >
          <div className="h-full flex flex-col justify-center items-center text-center w-full text-white bg-black bg-opacity-50">
            <h1 className="uppercase md:text-5xl text-3xl font-bold pt-32">
              Products
            </h1>
            <button
              className="mt-4 bg-black py-3 px-4 text-white font-bold tracking-[1px]"
              onClick={handleShopNowClick}
            >
              Shop Now
            </button>
          </div>
        </div>
        {/* Left Arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <ArrowLeft onClick={prevSlide} size={25} />
        </div>
        {/* Right Arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <ArrowRight onClick={nextSlide} size={25} />
        </div>
        <div className="flex justify-center py-2">
          {slides.map((_, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className="text-2xl cursor-pointer"
            >
              <RxDotFilled />
            </div>
          ))}
        </div>
      </div>
      {/* Add a target element below */}
      <div ref={targetRef} className="h-[100%] bg-gray-200">
        {/* <ProductsSection /> */}
        <ProductsSection />
      </div>
    </>
  );
};

export default Carousel;

// https://youtube.com/shorts/tWdq7gg96tw?si=HTHUzCHI8o5B-D1P
