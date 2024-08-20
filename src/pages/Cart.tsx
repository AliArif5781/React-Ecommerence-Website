import { useSelector } from "react-redux";
import { RootState } from "../features/Store";
import { Link } from "react-router-dom";
import CartItems from "./CartItems";
import { Product } from "../features/ApiSlice";
import React from "react";

export interface CartItemProps {
  item: Product & { quantity: number };
}
const Cart: React.FC<CartItemProps> = () => {
  const cart = useSelector((state: RootState) => state.cart);
  return (
    <>
      <div className="group pt-36">
        <h1 className="text-5xl text-center mb-10 text-black transition-transform transform hover:scale-105 hover:transition-all hover:duration-500 hover:ease-in-out hover:font-bold">
          <span className="relative inline-block">
            Product Section
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-black scale-x-0 origin-left transition-transform duration-500 ease-in-out group-hover:scale-x-100"></span>
          </span>
        </h1>
      </div>
      {cart.length !== 0 ? (
        <div className="relative overflow-x-auto pt-16">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 font-roboto">
            {cart.map((item) => {
              return <CartItems item={item} key={item.id} />;
            })}

            <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product image
                </th>
                <th scope="col" className="px-6 py-3 hidden md:flex">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
          </table>
          <div>
            <div className="flex justify-end">
              {" "}
              {/** */}
              <div className=" mt-10 mr-10 border w-auto min-h-[250px]">
                <div className="px-2">
                  <h1 className="text-2xl text-center">Total Items Price</h1>
                  <div className="flex mt-10 text-lg">
                    Total:
                    <div className="mt-[15px] px-2">
                      <hr className="w-[170px]  mx-auto " />
                    </div>
                    {/* <div>{`$${parseFloat(price).toFixed(2)}`}</div> */}
                  </div>
                  <div>
                    <div className="flex mt-10 text-lg">
                      Discount:
                      <div className="mt-[15px] px-2">
                        <hr className="w-[140px]  mx-auto " />
                      </div>
                      <div>{`$5`}</div>
                    </div>
                    <div>
                      <div className="flex mt-10 text-lg">
                        Total Price:
                        <div className="mt-[15px] px-2">
                          <hr className="w-[140px]  mx-auto " />
                        </div>
                        <div className="font-roboto font-semibold text-slate-600">
                          {/* {`$${parseFloat(totalPrice).toFixed(2)}`} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center pb-5">
                  <Link to={"/"}>
                    <button className="bg-black p-3 mt-5 px-5 text-white font-roboto font-semibold">
                      CheckOut
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-3xl pt-40 text-center">
          <p className="pb-10 font-roboto text-slate-700">Cart is Empty</p>
          <Link to={"/"} className="flex justify-center items-center ">
            <button className="text-2xl sm:text-4xl border p-4 py-5 text bg-black text-white ">
              Continue Shopping
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Cart;
