import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Hero from "../components/Carousal";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Lay from "../pages/Lay";
import ProtectedRoute from "../routes/ProtectedRoute";
import { AuthProvider } from "../routes/AuthContext";
import MenProduct from "../pages/MenProduct";
import WomenProduct from "../pages/WomenProduct";
import TechProduct from "../pages/TechProduct";
import About from "../pages/About";
import BabyProduct from "../pages/BabyProduct";
import Whislist from "../pages/Whislist";
import Cart from "../pages/Cart";
import Error from "../pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Layout />
      </AuthProvider>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Hero />,
      },
      {
        path: "menProduct",
        // element: <MenProduct />,
        element: <ProtectedRoute Element={MenProduct} />,
      },
      {
        path: "womenProduct",
        element: <ProtectedRoute Element={WomenProduct} />,
      },
      {
        path: "childrenProduct",
        element: <ProtectedRoute Element={BabyProduct} />,
      },
      {
        path: "techAccesories",
        element: <ProtectedRoute Element={TechProduct} />,
      },
      {
        path: "aboutus",
        element: <About />,
      },
      {
        path: "wishlist",
        element: <ProtectedRoute Element={Whislist} />,
      },
    ],
  },
  {
    path: "/account-section",
    element: (
      <AuthProvider>
        <Lay />
      </AuthProvider>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "login",
        element: <ProtectedRoute isAuthPage={true} Element={Login} />,
      },
      {
        path: "register",
        element: <ProtectedRoute isAuthPage={true} Element={Register} />,
      },
      {
        path: "productCart",
        element: <ProtectedRoute Element={Cart} />,
      },
    ],
  },
]);

export { router };
