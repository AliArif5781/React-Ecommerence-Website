import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist, addToCart } from "../features/CartSlice";
import { RootState } from "../features/Store";
import { Product } from "../features/ApiSlice";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.cart.wishlist);

  const handleRemoveFromWishlist = (id: number) => {
    dispatch(removeFromWishlist(id));
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="container mx-auto px-4 pt-[100px] pb-32">
      <h1 className="text-4xl font-bold mb-8 text-center">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <div>
          <p className="text-center text-gray-500">Your wishlist is empty.</p>
          <div className="text-center text-custom-black text-balance flex justify-center pt-24 ">
            <Link to={"/"} className="hover:underline font-bold">
              Go to Home Page
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 place-items-center text-gray-600 border-gray-200 border-opacity-60 pt-11">
          {wishlist.map((curProd: Product) => (
            <div
              key={curProd.id}
              className="p-4 w-[90%] max-w-[300px] rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl hover:transition-all hover:duration-500 hover:ease-in-out bg-white"
            >
              <div
                className="relative h-60 mb-4 flex justify-center items-center overflow-hidden py-2 cursor-pointer"
                // onClick={() => handleProductClick(curProd.id)}
              >
                <img
                  src={curProd.image}
                  alt={curProd.category}
                  className="object-contain h-full w-full"
                />
              </div>
              <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1 py-2">
                CATEGORY
              </h2>
              <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                {curProd.title}
              </h1>
              <p className="leading-relaxed mb-3 line-clamp-3">
                {curProd.description}
              </p>
              <div className="">
                <div className="flex items-center justify-between px-2 gap-2 ">
                  <Trash2
                    className="text-red-600 h-6 w-6 cursor-pointer"
                    onClick={() => handleRemoveFromWishlist(curProd.id)}
                  />
                  <div
                    className="text-sm font-semibold text-center text-white bg-black p-2 rounded cursor-pointer px-3"
                    onClick={() => handleAddToCart(curProd)}
                  >
                    Add to Cart
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
