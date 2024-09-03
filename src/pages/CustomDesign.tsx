import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState } from "../features/StoreTwo";
import {
  CartItem,
  setCartFromLocalStorage,
  removeItem,
} from "../features/AddItemCart";

const CustomDesign: React.FC = () => {
  const { shirtType } = useParams<{ shirtType: string }>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedCart = localStorage.getItem("board");
    if (savedCart) {
      dispatch(setCartFromLocalStorage(JSON.parse(savedCart)));
    }
  }, [dispatch]);

  const handleRemoveItem = (itemId: number) => {
    dispatch(removeItem(itemId));
  };

  const BuyNow = () => {
    alert(
      "At this time, I am focused on front-end development, and the purchasing process will be implemented in the future. Thank you for your understanding."
    );
  };
  return (
    <div className="min-h-screen p-4 pt-[100px] flex flex-col items-center">
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center space-y-10">
          <span className="text-3xl text-slate-700">Cart is Empty</span>
          <Link
            to="/account-section/customdesign"
            className="text-2xl sm:text-4xl border p-4 py-5 bg-black text-white rounded hover:bg-gray-800 transition duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="w-full max-w-screen-lg space-y-8">
          <h1 className="text-4xl text-center text-gray-800 pt-[50px] font-bold">
            Your Customized {shirtType === "white" ? "White" : "Black"} Shirt
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
                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                Your customized {shirtType === "white" ? "white" : "black"}{" "}
                T-shirt
              </h1>
              <p className="text-gray-600 text-lg">
                Unleash your creativity with our customizable black T-shirt! Our
                easy-to-use design tool allows you to upload your own logos or
                artwork, and position them exactly where you want on the shirt.
                Whether you're designing for a team, a special event, or just
                for fun, you have complete control over your design. Simply drag
                and drop your logo to any position on the T-shirt and adjust its
                size to fit your vision. Create a unique and personal statement
                piece that stands out in any crowd. Your custom design
                awaits—let your imagination run wild!
              </p>
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
