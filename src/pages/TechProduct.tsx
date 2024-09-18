import { useCallback, useEffect, useState } from "react";
import { Product, useGetElectronicProductQuery } from "../features/ApiSlice";
import Skeleton from "../components/Skeleton";
import Error from "./Error";
import { Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, addToWishlist } from "../features/CartSlice";
import { toast } from "react-toastify";
import Search from "../components/Search";

const TechProduct = () => {
  const [query, setQuery] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"default" | "asc" | "desc">(
    "default"
  );
  const [products, setProducts] = useState<Product[]>([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading, isError } =
    useGetElectronicProductQuery("electronics");

  const sortProducts = useCallback(
    (products: Product[], order: "default" | "asc" | "desc") => {
      if (order === "default") return products;
      return [...products].sort((a, b) =>
        order === "asc" ? a.price - b.price : b.price - a.price
      );
    },
    []
  );

  useEffect(() => {
    if (data) {
      const filteredProducts = data.filter((product: Product) =>
        product.title?.toLowerCase().includes(query.toLowerCase())
      );
      const sortedProducts = sortProducts(filteredProducts, sortOrder);
      setProducts(sortedProducts);
    }
  }, [data, query, sortOrder, sortProducts]);

  if (isLoading) {
    return (
      <div className="h-[100%] pt-44 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
        {[...Array(4)].map((_, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    );
  } else if (isError) {
    return (
      <div className="h-[100%] pt-44">
        <Error />
      </div>
    );
  }

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart`, {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const handleProductClick = (id: number) => {
    navigate(`/TechProductDetailPage/${id}`);
  };

  const handleAddToWishlist = (product: Product) => {
    dispatch(addToWishlist(product));
    toast.info(`${product.title} added to wishlist`, {
      position: "top-center",
      autoClose: 1000,
    });
  };

  return (
    <div className="py-20 relative">
      <div className="mb-10">
        <h1 className="text-5xl text-center text-black pt-10">Tech Product</h1>
        <div className="flex flex-col items-end mb-5 px-5 sm:pt-5">
          <div className="mb-2 w-full max-w-xs pt-5 sm:pt-0">
            <Search setQuery={setQuery} query={query} />
          </div>
          <select
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value as "default" | "asc" | "desc")
            }
            className="border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="default">Default</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 place-items-center text-gray-600 border-gray-200 border-opacity-60 pt-11">
        {products.map((product: Product) => (
          <div
            key={product.id}
            className="p-4 w-[90%] max-w-[300px] rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl hover:transition-all hover:duration-500 hover:ease-in-out bg-white"
          >
            <div
              className="relative h-60 mb-4 flex justify-center items-center overflow-hidden py-2 cursor-pointer"
              onClick={() => handleProductClick(product.id)}
            >
              <img
                src={product.image}
                alt={product.title}
                className="object-contain h-full w-full"
              />
            </div>
            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1 py-2">
              CATEGORY
            </h2>
            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
              {product.title}
            </h1>
            <p className="leading-relaxed mb-3 line-clamp-3">
              {product.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="text-sm font-semibold text-center text-white bg-black p-2 rounded cursor-pointer px-3"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </div>
                <div
                  onClick={() => handleAddToWishlist(product)}
                  className="cursor-pointer"
                >
                  <Heart />
                </div>
              </div>
              <div className="text-lg font-bold text-gray-900">
                ${product.price}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechProduct;
