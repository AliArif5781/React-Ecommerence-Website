// import Login from "../pages/Login";
import { Link } from "react-router-dom";
import img from "/logo_black.svg";
import { useCallback, useEffect, useState } from "react";
const Nav = () => {
  const [scrollActive, setScrollIsActive] = useState<boolean>(false);

  const scrollBar = useCallback(() => {
    window.scrollY > 30 ? setScrollIsActive(true) : setScrollIsActive(false);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", scrollBar);
    return () => {
      window.removeEventListener("scroll", scrollBar);
    };
  }, [scrollBar]);
  return (
    <>
      <header
        className={`header-section ${
          scrollActive ? "bg-white opacity-70" : ""
        }`}
      >
        <Link to={"/"}>
          <div className="px-2 flex justify-start items-center ">
            <img className="h-[24px] cursor-pointer" src={img} alt="Logo" />
          </div>
        </Link>{" "}
      </header>
    </>
  );
};

export default Nav;
