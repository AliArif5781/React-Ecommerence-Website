import { useCallback, useEffect, useState } from "react";
import img from "/logo_black.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import img1 from "/logo_white.svg";
import {
  UserRound,
  Heart,
  ShoppingCart,
  Search,
  AlignJustify,
  X,
  ChevronRight,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { auth, db } from "../firebase/Firebase";
import { doc, getDoc } from "firebase/firestore";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../features/Store";
import { QuantityValue } from "../features/CartSlice";

interface UserDetails {
  photo: string;
  firstName: string;
  lastName: string;
  email: string;
}
const Navbar = () => {
  const [isFabricDropDown, setIsFabricDropDown] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [scrollActive, setScrollIsActive] = useState<boolean>(false);
  const [user, setUser] = useState(auth.currentUser);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart);
  const totalQuantity = QuantityValue(cartItems);
  const scrollBar = useCallback(() => {
    window.scrollY > 60 ? setScrollIsActive(true) : setScrollIsActive(false);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", scrollBar);
    return () => {
      window.removeEventListener("scroll", scrollBar);
    };
  }, [scrollBar]);

  useEffect(() => {
    const unscubscribe = auth.onAuthStateChanged(async (user) => {
      // console.log("Auth state changed", user);
      if (user) {
        setUser(user);
        await fetchUserData(user);
      } else {
        setUserDetails(null);
        setLoading(false);
      }
    });
    return () => unscubscribe();
  }, []);

  const fetchUserData = async (user: any) => {
    if (!user) return;

    try {
      const docRef = doc(db, "Users", user.uid); // Reference to user document
      // [doc] contain db in our firebase store ,["Users"] this is the name of our collection [uid] which we have to find
      const docSnap = await getDoc(docRef); // Get document snapshot
      if (docSnap.exists()) {
        // console.log("User details:", docSnap.data());
        setUserDetails(docSnap.data() as UserDetails); // Update state with user details
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false); // Stop loading after fetching data
    }
  };

  const handleLogOut = async () => {
    try {
      await auth.signOut();
      navigate("/account-section/login");
      // console.log("User Logged out successfully");
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 200,
      });
      // console.error("Error Logged out:", error);
    }
  };

  const WishListNavigator = () => {
    setIsMenuOpen(!isMenuOpen);
    return navigate("/wishlist");
  };
  return (
    <>
      <header
        className={`${
          scrollActive ? "bg-white opacity-70 border-b" : " bg-none"
        } bg-white py-6 md:px-10 px-5 fixed w-full z-10 transition-all`}
      >
        <nav className="mx-auto flex justify-between items-center">
          {isSearchOpen ? (
            // Search mode layout
            <div
              className={`flex-grow flex items-center px-3 md:px-8 transition-transform  duration-300 ease-in${
                isSearchOpen ? " translate-y-0" : "top-0 ease-out duration-200"
              }`}
            >
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-black focus:outline-none mr-2 transition-all duration-30 opacity-60"
              >
                <X className="h-6 w-6 border-none" />
              </button>
              <input
                type="text"
                placeholder="Search..."
                className="flex-grow py-2 px-4 border-0 focus:outline-none font-bold text-slate-600"
              />
              <button className="bg-black text-white px-3 py-[8px] rounded focus:outline-none ml-2">
                Search
              </button>
            </div>
          ) : (
            <>
              <div className="flex gap-2 justify-center items-center">
                <div className="block lg:hidden">
                  <AlignJustify
                    className="h-6 w-6 cursor-pointer"
                    onClick={() => setIsMenuOpen(true)}
                  />
                </div>
                <Link
                  to={"/"}
                  className="px-2 flex justify-center items-center cursor-pointer"
                >
                  <img className="h-[24px]" src={img} alt="Logo" />
                </Link>
              </div>
              <div className="hidden lg:flex">
                <ul className="flex justify-between gap-5">
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        `font-bold block duration-200 ${
                          isActive ? "font-semibold" : ""
                        }`
                      }
                      to="/"
                    >
                      Home
                    </NavLink>
                  </li>
                  <hr className="bg-white  h-1" />
                  <li
                    className="relative"
                    onMouseEnter={() => setIsFabricDropDown(true)}
                    onMouseLeave={() => setIsFabricDropDown(false)}
                  >
                    <ul className="font-semibold cursor-pointer">
                      Fabric <span className="font-bold"></span>
                    </ul>
                    {isFabricDropDown && (
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-auto px-5 bg-white shadow-lg rounded-md py-2 z-10">
                        <div className="px-4 py-5 space-x-8 flex gap-10">
                          <div>
                            <h3 className="font-bold whitespace-nowrap">
                              Mens Clothing
                            </h3>
                            <ul className=" space-y-1">
                              <li className=" leading-loose">
                                <Link
                                  to="/menProduct"
                                  className="hover:text-gray-400 hover:underline "
                                >
                                  Men Clothes
                                </Link>
                              </li>
                            </ul>
                          </div>
                          {/*  */}
                          <div>
                            <h3 className="font-bold whitespace-nowrap">
                              Women Clothing
                            </h3>
                            <ul className=" space-y-1">
                              <li className=" leading-loose">
                                <Link
                                  to="/womenProduct"
                                  className="hover:text-gray-400 hover:underline "
                                >
                                  Women Clothes
                                </Link>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h3 className="font-bold whitespace-nowrap">
                              TechAccesories
                            </h3>
                            <ul className=" space-y-1">
                              <li className=" leading-loose">
                                <Link
                                  to="/techAccesories"
                                  className="hover:text-gray-400 hover:underline "
                                >
                                  TechAccesories
                                </Link>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h3 className="font-bold whitespace-nowrap">
                              Jewellery Product
                            </h3>
                            <ul className=" space-y-1">
                              <li className=" leading-loose">
                                <Link
                                  to="/jewelleryProduct"
                                  className="hover:text-gray-400 hover:underline "
                                >
                                  Jewellery Product
                                </Link>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h3 className="font-bold whitespace-nowrap">
                              Custom Design
                            </h3>
                            <ul className=" space-y-1">
                              <li className=" leading-loose">
                                <Link
                                  to="/account-section/customdesign"
                                  className="hover:text-gray-400 hover:underline "
                                >
                                  Custom Design
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                  <li>
                    <Link
                      to={"/aboutus"}
                      className="font-semibold block duration-200"
                    >
                      About us
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="flex gap-3">
                <div onClick={() => setIsSearchOpen(true)}>
                  <Search className="h-[19px] w-[19px] cursor-pointer" />
                </div>
                {/*  */}
                <div className="relative group ">
                  <div className="hidden lg:flex">
                    <UserRound className="h-[19px] w-[19px] cursor-pointer" />
                  </div>
                  <div className="absolute w-56 top-5 right-0 p-4 bg-white rounded shadow-lg transition-opacity transition-visibility duration-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                    {user ? (
                      <div>
                        <div className="text-lg flex">
                          Hello,
                          <span className="text-lg text-gray-800 font-bold pl-2">
                            {userDetails?.firstName ? (
                              userDetails.firstName.toUpperCase().slice(0, 13)
                            ) : (
                              <>
                                <Loader />
                              </>
                            )}
                          </span>
                        </div>
                        <div className="py-2">
                          <hr />
                        </div>
                        <div className="space-y-3">
                          <li className="flex items-center cursor-pointer">
                            <UserRound />
                            <Link
                              to={"/account-section/profile"}
                              className="hover:underline pl-4 text-[17px] flex items-center"
                            >
                              Your Account
                            </Link>
                          </li>
                          <li className="flex items-center cursor-pointer">
                            <Heart />
                            <Link
                              to={"/wishlist"}
                              className="hover:underline pl-4 text-[17px] flex items-center"
                            >
                              Wishlist
                            </Link>
                          </li>
                          <li className="flex items-center cursor-pointer">
                            <LogOut />
                            <button
                              onClick={handleLogOut}
                              className="hover:underline pl-4 text-[17px] flex items-center"
                            >
                              Logout
                            </button>
                          </li>
                        </div>
                      </div>
                    ) : (
                      <div className="overflow-hidden">
                        <Link
                          to={"/account-section/login"}
                          className="mt-2 flex items-center justify-center bg-black text-white py-2 rounded-md hover:bg-gray-900 transition duration-200"
                        >
                          Login
                        </Link>
                        <br />
                        <span className="text-base text-gray-700">
                          Not a Member Yet?
                        </span>
                        <div className="pt-2 w-full">
                          <span className="text-[15px]">
                            Join Elegasilk for great discounts and exclusive
                            member benefits & offers.
                          </span>
                        </div>
                        <div className="underline pt-2 text-lg text-bold">
                          <Link to={"/account-section/register"}>
                            create an account
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/*  */}
                <Link to={"/wishlist"}>
                  <Heart className="h-[19px] w-[19px] cursor-pointer" />
                </Link>
                <Link to={"/account-section/productCart"}>
                  <ShoppingCart className="h-[19px] w-[19px] cursor-pointer" />
                  <div className="bg-black absolute right-2 bottom-9  md:right-7 md:bottom-9 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
                    {totalQuantity}
                  </div>
                </Link>
              </div>
            </>
          )}
        </nav>
      </header>
      {/* Full-page slide-in menu */}
      <div
        className={`text-white fixed top-0 left-0 h-full w-full bg-slate-900 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-20 overflow-y-auto`}
      >
        <div className="flex justify-between items-center bg-slate-950 p-5">
          {/* Hidden logo */}
          <div>
            <img className="h-[24px] text-white hidden" src={img1} alt="Logo" />
          </div>
          {/* Logo */}
          <div className="flex justify-center items-center cursor-pointer">
            <img className="h-[24px] text-white" src={img1} alt="Logo" />
          </div>
          <button onClick={() => setIsMenuOpen(false)}>
            {/* X icon to close the menu */}
            <X className="text-xl flex items-center text-white" />
          </button>
        </div>
        <div className="flex flex-col items-center mt-2">
          <div className="relative w-full flex justify-center bg-slate-800 py-5">
            <NavLink
              className="text-lg font-bold flex items-center w-full justify-between px-5"
              to="/"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
              <ChevronRight className="hidden" />
            </NavLink>
          </div>
          <div className="relative w-full bg-slate-800 py-5">
            <button
              className={`text-lg font-bold flex items-center w-full justify-between px-5 ${
                isFabricDropDown ? "pb-5" : ""
              }`}
              onClick={() => setIsFabricDropDown(!isFabricDropDown)}
            >
              Fabric
              {isFabricDropDown ? <ChevronDown /> : <ChevronRight />}
            </button>
            <div
              className={`bg-slate-950 overflow-hidden transition-max-height duration-300 ease-in-out ${
                isFabricDropDown ? "max-h-96" : "max-h-0"
              }`}
            >
              <div>
                <div className="px-4 py-2">
                  <h3 className="font-bold text-gray-400">Men Clothing</h3>
                  <ul>
                    <li onClick={() => setIsMenuOpen(!isMenuOpen)}>
                      <Link to="/menProduct">Men Clothes</Link>
                    </li>
                  </ul>
                </div>
                <div className="px-4 py-2">
                  <h3 className="font-bold text-gray-400">Women Clothing</h3>
                  <ul>
                    <li onClick={() => setIsMenuOpen(!isMenuOpen)}>
                      <Link to="/womenProduct">Women Clothes</Link>
                    </li>
                  </ul>
                </div>
                <div className="px-4 py-2">
                  <h3 className="font-bold text-gray-400">
                    Children's Clothing
                  </h3>
                  <ul>
                    <li onClick={() => setIsMenuOpen(!isMenuOpen)}>
                      <Link to="/childrenProduct">Children's Clothes</Link>
                    </li>
                  </ul>
                </div>
                {/*  */}
                <div className="px-4 py-2">
                  <h3 className="font-bold text-gray-400">Laptop</h3>
                  <ul>
                    <li onClick={() => setIsMenuOpen(!isMenuOpen)}>
                      <Link to="/laptop">Laptop</Link>
                    </li>
                  </ul>
                </div>
                {/*  */}
                <div className="px-4 py-2">
                  <h3 className="font-bold text-gray-400">TechAccesories</h3>
                  <ul>
                    <li onClick={() => setIsMenuOpen(!isMenuOpen)}>
                      <Link to="/techAccesories">TechAccesories</Link>
                    </li>
                  </ul>
                </div>
                {/*  */}
                <div className="px-4 py-2">
                  <h3 className="font-bold text-gray-400">Custom Designing</h3>
                  <ul>
                    <li onClick={() => setIsMenuOpen(!isMenuOpen)}>
                      <Link to="/account-section/customdesign">
                        Custom Design
                      </Link>
                    </li>
                  </ul>
                </div>
                {/*  */}
              </div>
            </div>
          </div>
          <div className="relative w-full flex justify-center bg-slate-800 py-5">
            <NavLink
              className="text-lg font-bold flex items-center w-full justify-between px-5"
              to="/"
              onClick={() => setIsMenuOpen(false)}
            >
              Occasion
              <ChevronRight className="hidden" />
            </NavLink>
          </div>
          <div className="relative w-full flex justify-center bg-slate-800 py-5">
            <NavLink
              className="text-lg font-bold flex items-center w-full justify-between px-5"
              to="/"
              onClick={() => setIsMenuOpen(false)}
            >
              Collection
              <ChevronRight className="hidden" />
            </NavLink>
          </div>
          <div className="relative w-full flex justify-center bg-slate-800 py-5">
            <NavLink
              className="text-lg font-bold flex items-center w-full justify-between px-5"
              to="/"
              onClick={() => setIsMenuOpen(false)}
            >
              Origin
              <ChevronRight className="hidden" />
            </NavLink>
          </div>

          {/* Bottom section fixed at the bottom */}
          {user ? (
            <>
              <div className="relative w-full flex bg-slate-800 py-5 pl-5">
                <div className="flex items-center cursor-pointer">
                  <Heart />
                  <div onClick={WishListNavigator}>
                    <li className="hover:underline pl-4 text-[17px] flex items-center">
                      Wishlist
                    </li>
                  </div>
                </div>
              </div>
              <hr className="bg-white" />
              <div className="relative w-full flex bg-slate-800 py-5 pl-5">
                <div className="flex items-center cursor-pointer">
                  <UserRound />
                  <Link to={"/account-section/profile"}>
                    <li className="hover:underline pl-4 text-[17px] flex items-center">
                      Account
                    </li>
                  </Link>
                </div>
              </div>
              <hr />
              <div
                className="relative w-full flex bg-slate-800 py-5 pl-5"
                onClick={handleLogOut}
              >
                <div className="flex items-center cursor-pointer">
                  <LogOut />
                  <Link to={"/account-section/login"}>
                    <li className="hover:underline pl-4 text-[17px] flex items-center">
                      LogOut
                    </li>
                  </Link>
                </div>
              </div>
              <div className="text-base flex py-2 ">
                Welcome,
                <p className="text-balance text-gray-500 font-bold pl-2">
                  {userDetails?.firstName.toUpperCase()}{" "}
                  {userDetails?.lastName.toUpperCase()}!
                </p>
              </div>
            </>
          ) : (
            <div className="py-64">
              <div className="fixed bottom-0 left-0 w-full bg-slate-800 text-white ">
                <div className="text-center text-sm px-5">
                  Not a Member Yet? Join Elegasilk for great discounts and
                  exclusive member benefits & offers.
                </div>
                <div className="flex justify-center mt-3 px-5 py-2">
                  <button
                    className="text-lg px-8 py-2 rounded bg-white text-black w-full font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </button>
                </div>
                <div className="flex justify-center mt-3 px-5 py-2">
                  <button
                    className="text-lg px-8 py-2 rounded  border-white border-solid border-2 text-white w-full font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          )}

          {/*  */}
        </div>
      </div>
    </>
  );
};

export default Navbar;
