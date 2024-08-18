import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import lap1 from "/laptopPic/lap1.jpg";
import lap2 from "/laptopPic/lap2.jpg";
import lap3 from "/laptopPic/lap3.jpg";
import lap4 from "/laptopPic/lap4.jpg";
import lap5 from "/laptopPic/lap5.jpg";
import lap6 from "/laptopPic/lap6.jpg";
import Skeleton from "../components/Skeleton";
const Laptop = () => {
  interface Product {
    id: number;
    Brand: string;
    image: string;
    category: string;
    description: string;
    price: string;
  }
  const Laptop = [
    {
      id: 1,
      Brand: "Mac",
      image: lap1,
      category: "Mac Laptop",
      description:
        "MacBooks are renowned for their sleek designs, user-friendly interfaces, and seamless integration with other Apple devices. They run on macOS, offering a unique and secure operating system experience. With a range of models, including the MacBook Air and MacBook Pro, users can choose from various sizes, processors, and storage options. MacBooks are popular among creatives and professionals who value their performance, portability, and durability.",
      price: 950,
    },
    {
      id: 2,
      Brand: "Mac",
      image: lap2,
      category: "Mac Laptop",
      description:
        "MacBooks are renowned for their sleek designs, user-friendly interfaces, and seamless integration with other Apple devices. They run on macOS, offering a unique and secure operating system experience. With a range of models, including the MacBook Air and MacBook Pro, users can choose from various sizes, processors, and storage options. MacBooks are popular among creatives and professionals who value their performance, portability, and durability.",
      price: 1250,
    },
    {
      id: 3,
      Brand: "Hp",
      image: lap3,
      category: "Hp Laptop",
      description:
        "HP laptops offer a wide range of options to suit different needs and budgets, from budget-friendly Pavilion series to high-performance Omen gaming laptops. They are known for their durability and reliability, with many models featuring sleek designs and long-lasting batteries. HP laptops also offer advanced security features, such as fingerprint readers and facial recognition, to keep users' data safe. With HP, users can expect a great balance of performance, portability, and affordability.",
      price: 790,
    },
    {
      id: 4,
      Brand: "Del",
      image: lap4,
      category: "Del Laptop",
      description:
        "Dell laptops cater to various needs and budgets, offering a range of models such as Inspiron, XPS, and Latitude. They are known for their high-performance capabilities, sleek designs, and advanced security features. Dell laptops also provide users with a wide range of customization options, allowing them to tailor their device to their specific needs. With Dell, users can expect reliable performance, durability, and great value for their money.",
      price: 990,
    },
    {
      id: 5,
      Brand: "Acer",
      image: lap5,
      category: "Acer Laptop",
      description:
        "Acer laptops offer a perfect blend of performance, style, and affordability, making them a popular choice among users. Their Aspire and Predator series are known for their sleek designs, powerful processors, and advanced features like 4K displays and NVIDIA graphics. Acer laptops also provide long-lasting battery life, making them ideal for users who are always on-the-go. With Acer, users can expect a great balance of power, portability, and value for their money.",
      price: 850,
    },
    {
      id: 6,
      Brand: "Acer",
      image: lap6,
      category: "Lenovo Laptop",
      description:
        "Lenovo ThinkPad laptops are renowned for their durability, reliability, and business-centric features, making them a top choice among professionals. They offer a range of models, from the lightweight X1 Carbon to the powerful P53, each designed to meet specific business needs. ThinkPads are known for their excellent keyboards, long battery life, and robust security features, ensuring users can work efficiently and securely. With ThinkPad, users can expect a laptop that can keep up with their demanding work schedule and provide a great return on investment.",
      price: 1190,
    },
  ];

  if (Laptop.length === 0) {
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
    </div>;
  }
  return (
    <div className="h-[100vh] pt-20 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 place-items-center text-gray-600 border-gray-200 border-opacity-60">
      {/*  */}
      <div className="group mt-10 col-span-full">
        <h1 className="text-5xl text-center mb-10 text-black transition-transform transform hover:scale-105 hover:transition-all hover:duration-500 hover:ease-in-out hover:font-bold relative">
          Laptop
          <span className="block absolute left-0 bottom-0 w-full h-0.5 bg-black scale-x-0 origin-left transition-transform duration-500 ease-in-out group-hover:scale-x-100"></span>
        </h1>
      </div>
      {/* text-3xl col-span-full text-center */}
      {Laptop?.map((curProd) => (
        // By adding the Product interface, you're telling TypeScript that the data array contains objects with specific properties (e.g., id, name, price, etc.). Then, when you use the map method, you can specify the type of the elem parameter as Product, which allows you to access its properties without errors.
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
            {curProd.category}
          </h1>
          <p className="leading-relaxed mb-3 line-clamp-3">
            {curProd.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-sm font-semibold text-center text-white bg-black p-2 rounded cursor-pointer">
                Add to Cart
              </div>
              <Link to={"/account-section/wishlist"}>
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
  );
};

export default Laptop;
//
