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
import Whislist from "../pages/Whislist";
import Cart from "../pages/Cart";
import Error from "../pages/Error";
import JewelleryProduct from "../pages/JewelleryProduct";
import ShirtSelection from "../../src/pages/ShirtSelection";
import ShirtCustomization from "../pages/ShirtCustomization";
import StoreTwo from "../features/StoreTwo";
import { Provider } from "react-redux";
import CustomDesign from "../pages/CustomDesign";
import MenProductDetailPage from "../pages/MenProductDetailPage";
import WomenProductDetailPage from "../pages/WomenProductDetailPage";
import JewelleryProductDetailPage from "../pages/JewelleryProductDetailPage";
import TechProductDetailPage from "../pages/TechProductDetailPage";
import AccountPage from "../pages/YourAccount";
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
        element: <ProtectedRoute Element={MenProduct} />,
      },
      {
        path: "womenProduct",
        element: <ProtectedRoute Element={WomenProduct} />,
      },
      {
        path: "jewelleryProduct",
        element: <ProtectedRoute Element={JewelleryProduct} />,
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
        element: <Whislist />,
      },

      {
        path: "MenProductDetailPage/:id",
        element: <ProtectedRoute Element={MenProductDetailPage} />,
      },
      {
        path: "WomenProductDetailPage/:id",
        element: <ProtectedRoute Element={WomenProductDetailPage} />,
      },
      {
        path: "JewelleryProductDetailPage/:id",
        element: <ProtectedRoute Element={JewelleryProductDetailPage} />,
      },
      {
        path: "TechProductDetailPage/:id",
        element: <ProtectedRoute Element={TechProductDetailPage} />,
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
      {
        path: "customdesign",
        element: (
          <Provider store={StoreTwo}>
            <ProtectedRoute Element={ShirtSelection} />,
          </Provider>
        ),
      },
      {
        path: "customize/:shirtType",
        element: (
          <Provider store={StoreTwo}>
            <ProtectedRoute Element={ShirtCustomization} />
          </Provider>
        ),
      },
      {
        path: "customDesignToCart",
        element: (
          <Provider store={StoreTwo}>
            <ProtectedRoute Element={CustomDesign} />,
          </Provider>
        ),
      },
      {
        path: "profile",
        element: <ProtectedRoute Element={AccountPage} />,
      },
    ],
  },
]);

export { router };
