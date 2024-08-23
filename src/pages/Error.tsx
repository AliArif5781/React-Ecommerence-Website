import { NavLink } from "react-router-dom";
import { TriangleAlert } from "lucide-react";

const Error = () => {
  return (
    <div className="grid place-items-center min-h-screen">
      <div className="text-gray-700 text-center p-5 bg-white rounded ">
        <div className="h-20 w-20 mx-auto">
          <TriangleAlert className="h-full w-full dark:text-gray-500" />
        </div>
        <div className="text-5xl font-bold p-5">Oops Error!</div>
        <NavLink
          to={"/"}
          className="font-semibold text-gray-500 p-5 hover:underline"
        >
          Go to home Page
        </NavLink>
      </div>
    </div>
  );
};

export default Error;
