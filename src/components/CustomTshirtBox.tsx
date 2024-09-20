import { useState } from "react";
import { X } from "lucide-react";

export default function CustomTShirtPurchaseMessage() {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  if (!isVisible) {
    return null;
  }

  const handleShopNowClick = () => {
    // Scroll to the bottom of the page
    // window.scrollTo({
    //   top: document.body.scrollHeight,
    //   behavior: "smooth", // Smooth scroll
    // });
    // Alternatively, to scroll to a specific pixel
    window.scrollTo({
      top: 2100, // Change this value to your desired pixel
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:max-w-md bg-black text-white p-4 rounded-md shadow-lg flex items-center justify-between z-10">
      <button className="text-sm md:text-base" onClick={handleShopNowClick}>
        Now customer customize their own T-shirt with your own custom logo
      </button>
      <button
        onClick={() => setIsVisible(false)}
        className="ml-4 p-1 rounded-full hover:bg-gray-700 transition-colors duration-200"
        aria-label="Close message"
      >
        <X size={18} />
      </button>
    </div>
  );
}
