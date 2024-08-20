import { RootState } from "../features/Store";
import { CartItemProps } from "./Cart";
import { useDispatch, useSelector } from "react-redux";
import { removeToCart } from "../features/CartSlice";

const CartItems = ({ item }: CartItemProps) => {
  const { category, description, id, image, price, title } = item;

  const dispatch = useDispatch();
  // const cartSelector = useSelector((state: RootState) => state.cart);

  const removeCart = (product: number) => {
    dispatch(removeToCart(product));
  };
  return (
    <>
      <tbody>
        <tr className="border-b">
          <th
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            <img
              src={image}
              className="h-[80px] sm:h-[130px] grid place-content-center"
              alt={title}
            />
          </th>
          <td className="px-6 py-4 hidden md:flex h-[170px] items-center text-slate-800 text-[17px]">
            <div>{title}</div>
          </td>
          <td className="px-10 py-4">
            <div className="flex flex-1 max-w-[100px] items-center h-full border text-primary font-medium p-2">
              <div className="flex-1 flex justify-center items-center cursor-pointer h-full">
                {/* <IoMdRemove /> */}
              </div>
              <div className="h-full flex justify-center items-center px-2">
                {/* {amount} */}
              </div>
              <div
                // onClick={() => IncreaseAmount(id)}
                className="flex-1 h-full flex justify-center items-center cursor-pointer"
              >
                {/* <IoMdAdd /> */}
              </div>
            </div>
          </td>
          <td className="px-6 py-4 text-slate-800 text-[17px] font-bold">
            ${price.toFixed(2)}
          </td>
          <td className="px-6 py-4">
            <button
              onClick={() => removeCart(id)}
              className=" bg-black text-white p-3 font-bold outline-none px-8  transition-transform duration-300 ease-in-out"
            >
              Remove
            </button>
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default CartItems;
