import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState } from "../features/StoreTwo";
import {
  CartItem,
  setCartFromLocalStorage,
  removeItem,
} from "../features/AddItemCart";

// Define the types for the price options:
// Types help TypeScript understand what kind of data to expect. Define a type for the options available:
type Option = "polyester" | "cottonPolyester";

const CustomDesign: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  // Initial state for selected options and total price
  const [totalPrice, setTotalPrice] = useState<number>(25);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  // Prices for each option
  // Create an object to map options to their prices
  // Prices Object: Uses TypeScript's mapped types to ensure keys are of type Option and values are numbers.
  const prices: { [key in Option]: number } = {
    polyester: 9,
    cottonPolyester: 15,
  };

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    const newTotalPrice = 25 + prices[option];
    setTotalPrice(newTotalPrice);
    localStorage.setItem("totalPrice", newTotalPrice.toString()); // Save the total price to local storage
  };

  // Load the total price from local storage if available
  //
  useEffect(() => {
    const savedTotalPrice = localStorage.getItem("totalPrice");
    if (savedTotalPrice) {
      setTotalPrice(Number(savedTotalPrice));
    }

    const savedCart = localStorage.getItem("board");
    if (savedCart) {
      dispatch(setCartFromLocalStorage(JSON.parse(savedCart)));
    }
  }, [dispatch]);
  //
  const handleRemoveItem = (itemId: number) => {
    dispatch(removeItem(itemId));
    localStorage.removeItem("totalPrice");
  };

  const BuyNow = () => {
    alert(
      "At this time, I am focused on front-end development, and the purchasing process will be implemented in the future. Thank you for your understanding."
    );
  };

  return (
    <div className="min-h-screen p-4 pt-[100px] flex flex-col items-center">
      {cartItems.length === 0 ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="pb-10 text-3xl text-slate-700">Cart is Empty</p>
            <Link
              to="/account-section/customdesign"
              className="text-2xl sm:text-4xl border p-4 py-5 bg-black text-white rounded hover:bg-gray-800 transition duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-screen-lg space-y-8">
          <h1 className="text-4xl text-center text-gray-800 pt-[50px] font-bold">
            Your Customized T-Shirt
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full w-full">
            <div className="relative bg-gray-100 p-4 rounded-lg shadow-lg">
              {cartItems.map((item: CartItem) => (
                <div key={item.id} className="relative w-full h-[500px]">
                  <img
                    src={
                      item.shirtType === "white"
                        ? "/T-shirt/aa.png"
                        : "/T-shirt/a (1).png"
                    }
                    className="object-cover w-full h-full rounded-lg"
                    alt="Shirt"
                  />
                  <img
                    src={item.url}
                    alt={`Custom Logo ${item.id}`}
                    style={{
                      position: "absolute",
                      top: `${item.top}%`,
                      left: `${item.left}%`,
                      width: "100px",
                      height: "100px",
                      transform: `translate(${item.x}px, ${item.y}px)`,
                      objectFit: "cover",
                    }}
                    className="object-cover"
                  />
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="absolute top-2 right-2 bg-red-500 hover:scale-125 transition-transform text-white px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-center space-y-6 p-5">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                Your customized T-shirt
              </div>
              <p className="text-gray-600 text-lg">
                Unleash your creativity with our customizable black T-shirt! Our
                easy-to-use design tool allows you to upload your own logos or
                artwork, and position them exactly where you want on the shirt.
                Whether you're designing for a team, a special event, or just
                for fun, you have complete control over your design. Simply drag
                and drop your logo to any position on the T-shirt and adjust its
                size to fit your vision.
              </p>
              <div className="px-10">
                <hr />
              </div>
              <div className="flex justify-between items-center px-5 text-lg">
                <div className="opacity-0">1</div>
                <div className="font-bold text-gray-700">
                  Total: ${totalPrice.toFixed(2)}
                </div>
              </div>
              <div className="flex justify-between items-center gap-5">
                <div
                  onClick={() => handleOptionClick("polyester")}
                  className={`bg-neutral-100 h-[45px] w-full flex justify-between px-5 items-center cursor-pointer border rounded-lg hover:border-black hover:shadow-xl transition-all duration-300 ease-in-out transform ${
                    selectedOption === "polyester" ? "bg-neutral-200" : ""
                  } py-5`}
                >
                  <span className="text-gray-700">Polyester</span>
                  <span className="font-bold text-gray-800">
                    +${prices.polyester}
                  </span>
                </div>
                <div
                  onClick={() => handleOptionClick("cottonPolyester")}
                  className={`bg-neutral-100 h-[45px] w-full flex justify-between px-3 items-center cursor-pointer border rounded-lg hover:border-black hover:shadow-xl transition-all duration-300 ease-in-out transform ${
                    selectedOption === "cottonPolyester" ? "bg-neutral-200" : ""
                  } py-5`}
                >
                  <span className="text-gray-700">Cotton/Polyester</span>
                  <span className="font-bold text-gray-800">
                    +${prices.cottonPolyester}
                  </span>
                </div>
              </div>
              <button
                onClick={BuyNow}
                className="bg-slate-500 text-white px-6 py-3 rounded-lg hover:bg-slate-600 transition duration-300"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDesign;
