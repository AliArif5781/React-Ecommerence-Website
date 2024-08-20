import Skeleton from "../components/Skeleton";
import { Product, useGetWomenProductQuery } from "../features/ApiSlice";
import Error from "./Error";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/CartSlice";
import { toast } from "react-toastify";

const WomenProduct = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError } =
    useGetWomenProductQuery("women's clothing");

  if (isLoading) {
    return (
      <div className="h-[100%] pt-44 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
        {/* <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton /> */}
        {/* || or */}
        {[...Array(4)].map((_, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    );
  } else if (isError) {
    return (
      <div className="h-[100%] pt-44 ">
        <Error />
      </div>
    );
  }

  const AddToCart = (product: Product) => {
    dispatch(addToCart(product));
    toast.success(`${product.title}`, {
      position: "top-center",
      autoClose: 2000,
    });
  };
  return (
    <>
      <div className="h-[100vh] pt-20 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 place-items-center text-gray-600 border-gray-200 border-opacity-60">
        {/*  */}
        <div className="group mt-10 col-span-full">
          <h1 className="text-5xl text-center mb-10 text-black transition-transform transform hover:scale-105 hover:transition-all hover:duration-500 hover:ease-in-out hover:font-bold relative">
            Women Clothes
            <span className="block absolute left-0 bottom-0 w-full h-0.5 bg-black scale-x-0 origin-left transition-transform duration-500 ease-in-out group-hover:scale-x-100"></span>
          </h1>
        </div>
        {/* text-3xl col-span-full text-center */}
        {data?.map((curProd: Product) => (
          <div
            key={curProd.id}
            className="p-4 w-[90%] max-w-[300px] rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl hover:transition-all hover:duration-500 hover:ease-in-out bg-white"
          >
            <div className="relative h-60 mb-4 flex justify-center items-center overflow-hidden py-2">
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
              Women Clothes
            </h1>
            <p className="leading-relaxed mb-3 line-clamp-3">
              {curProd.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="text-sm font-semibold text-center text-white bg-black p-2 rounded cursor-pointer"
                  onClick={() => AddToCart(curProd)}
                >
                  Add to Cart
                </div>
                <Link to={"/wishlist"}>
                  <Heart />
                </Link>
              </div>
              <div className="text-lg font-bold text-gray-900">
                ${curProd.price}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default WomenProduct;
