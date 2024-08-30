import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../features/StoreTwo";
import { CartItem, setCartFromLocalStorage } from "../features/AddItemCart";

const CustomDesign: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  useEffect(() => {
    // Load cart from local storage into the Redux store
    const savedCart = localStorage.getItem("board");
    if (savedCart) {
      dispatch(setCartFromLocalStorage(JSON.parse(savedCart)));
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* <h2 className="text-2xl font-bold mb-4">Your Cart</h2> */}
      {/* <p className="mb-4">Number of items in cart: {cartItems.length}</p> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cartItems.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center text-center">
            <span className="text-3xl pb-10 text-slate-700">Cart is Empty</span>
            <Link
              to="/customdesign"
              className="inline-block text-2xl sm:text-4xl border p-4 py-5 bg-black text-white rounded hover:bg-gray-800 transition duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          cartItems.map((item: CartItem) => (
            <div
              key={item.id}
              className="relative bg-gray-100 p-4 border border-gray-200 rounded-lg shadow-md w-full h-[500px]"
            >
              <img
                src={
                  item.shirtType === "white"
                    ? "/T-shirt/aa.png"
                    : "/T-shirt/a (1).png"
                }
                alt={`Shirt ${item.shirtType}`}
                className="w-full h-full object-cover"
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
                }}
                className="object-cover"
              />
              <p className="mt-2 text-lg">Shirt ID: {item.id}</p>
              <button
                // onClick={() => handleRemoveItem(item.id)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CustomDesign;
