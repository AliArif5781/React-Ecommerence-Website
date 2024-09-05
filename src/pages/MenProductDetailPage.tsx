import { useEffect, useState } from "react";
import { Product, useGetSingleProductQuery } from "../features/ApiSlice";
import { useParams } from "react-router-dom";
import { ProductDetail } from "./MenProduct";
import Skeleton from "../components/Skeleton";
import Error from "./Error";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/CartSlice";
import { toast } from "react-toastify";
const MenProductDetailPage = () => {
  const { id } = useParams<{ id: string }>(); // Extract the id from url
  const { data, isLoading, isError } =
    useGetSingleProductQuery("men's clothing");

  const [product, setProduct] = useState<ProductDetail | null>();
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      const foundProduct = data.find(
        (item: ProductDetail) => item.id === parseInt(id || "")
      );
      setProduct(foundProduct || null);
    }
  }, [data, id]);

  // If data is loading, show skeletons
  if (isLoading) {
    return (
      <div className="h-[100%] pt-44 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
        {[...Array(1)].map((_, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="h-[100vh] ">
        <Error />
      </div>
    );
  }

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    toast.success(`${product.title}`, {
      position: "top-center",
      autoClose: 1000,
    });
  };

  const BuyNow = () => {
    alert(
      "At this time, I am focused on front-end development, and the purchasing process will be implemented in the future. Thank you for your understanding."
    );
  };

  const { title, description, price, image } = product;
  return (
    <div className="flex justify-center items-center h-[100vh] w-full max-w-6xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-10 w-full">
        <div className="lg:flex-1 flex justify-center lg:justify-end">
          <img
            src={image}
            alt={title}
            className="object-contain w-full h-64 sm:h-80 md:h-96 lg:h-[400px] rounded-lg"
          />
        </div>
        <div className="text-center lg:text-left lg:flex-1">
          <h1 className="text-3xl sm:text-4xl font-semibold mb-4 text-gray-800 break-words">
            {title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 break-words">
            {description}
          </p>
          <div className="text-2xl font-bold text-gray-900 mb-4">
            ${price.toFixed(2)}
          </div>
          <div className="flex flex-col gap-4 w-full max-w-md lg:max-w-lg mx-auto">
            <button
              onClick={() => handleAddToCart(product)}
              className="border border-gray-400 text-gray-800 font-semibold py-3 px-4 shadow-md hover:bg-gray-200 hover:text-gray-900 transition duration-300 w-full"
            >
              Add To Cart
            </button>
            <button
              onClick={() => BuyNow()}
              className="bg-neutral-800 text-white font-semibold py-3 px-4 shadow-md hover:bg-gray-600 transition duration-300 w-full"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenProductDetailPage;
