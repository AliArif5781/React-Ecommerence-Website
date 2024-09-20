import { FormEvent, useState } from "react";
import img from "/logo_black.svg";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/Firebase";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in Successfully", {
        position: "top-center",
        autoClose: 2000,
      });
      navigate("/");
    } catch (error: any) {
      handleAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthError = (error: any) => {
    if (error.code === "auth/wrong-password") {
      toast.error("Wrong Password", {
        position: "top-center",
        autoClose: 2000,
      });
    } else if (!email && !password) {
      toast.warning("Email and password are empty", {
        position: "top-center",
        autoClose: 2000,
      });
    } else if (!email) {
      toast.warning("Enter your email", {
        position: "top-center",
        autoClose: 2000,
      });
    } else if (!password) {
      toast.warning("Enter your password", {
        position: "top-center",
        autoClose: 2000,
      });
    } else if (!navigator.onLine) {
      toast.warn("No internet connection. Please check your network.", {
        position: "top-center",
        autoClose: 2000,
      });
    } else {
      toast.error("Wrong Email", { position: "top-center", autoClose: 2000 });
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // const signInWithGoogle = async () => {
  //   try {
  //     await signInWithPopup(auth, googleProvider);
  //     toast.success("Logged in with Google Successfully", {
  //       position: "top-center",
  //       autoClose: 2000,
  //     });
  //     navigate("/");
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Google sign-in failed", {
  //       position: "top-center",
  //       autoClose: 2000,
  //     });
  //   }
  // };

  const register = () => {
    navigate("/account-section/register");
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <div className="logo">
          <img src={img} alt="Logo" />
        </div>
        <h2>Log in to your account</h2>

        {/* Form for email/password login */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E.g. address@example.com"
              autoComplete="email"
            />
          </div>
          <div className="form-group flex flex-col">
            <label htmlFor="password" className="mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="***********"
                autoComplete="current-password"
                className="w-full h-10 border rounded pl-4 pr-10"
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer"
                onClick={handleTogglePassword}
              >
                {showPassword ? (
                  <Eye className="w-5 h-5 text-gray-500" />
                ) : (
                  <EyeOff className="w-5 h-5 text-gray-500" />
                )}
              </div>
            </div>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className={`w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? <Loader /> : "Login"}
          </button>
        </form>

        {/* Move Google button outside the form */}
        <div className=" flex justify-center items-center">
          <hr className="w-44 " />
          <span className="px-5 text-gray-500 font-bold">or</span>
          <hr className="w-44" />
        </div>

        {/* Google Sign-in button */}
        {/* <button
          className="flex items-center justify-center h-[50px] w-full bg-white shadow-xl my-2"
          onClick={signInWithGoogle}
        >
          <img src={googleLOGos} alt="Google Logo" className="h-9" />
          <div className="flex items-center">
            <p className="text-neutral-700 font-semibold">
              Sign in with Google
            </p>
          </div>
        </button> */}

        {/* Register link */}
        <p className="register-link">
          Don’t have an account?{" "}
          <button
            onClick={register}
            className="text-custom-black hover:underline"
          >
            Register Here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
