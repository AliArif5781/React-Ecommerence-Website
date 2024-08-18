import { FormEvent, useState } from "react";
import img from "/logo_black.svg";
import { Link, useNavigate } from "react-router-dom";
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
      // console.log("User logged in Successfully");
      toast.success("logged in Successfully", {
        position: "top-center",
        style: { backgroundColor: "black", color: "whitesmoke" },
        autoClose: 2000,
      });
      navigate("/");
    } catch (error: any) {
      // console.log(error);
      if (error === "Firebase: Error (auth/wrong-password).") {
        toast.error("Wrong Password", {
          position: "top-center",
          style: { backgroundColor: "black", color: "white" },
          autoClose: 2000,
        });
      } else if (email.length === 0 && password.length === 0) {
        toast.warning("Email and password is empty", {
          position: "top-center",
          style: { backgroundColor: "black", color: "white" },
          autoClose: 2000,
        });
      } else if (email.length === 0 && password.length !== 0) {
        toast.warning("Enter your email", {
          position: "top-center",
          style: { backgroundColor: "black", color: "white" },
          autoClose: 2000,
        });
      } else if (email.length !== 0 && password.length === 0) {
        toast.warning("Enter your password", {
          position: "top-center",
          style: { backgroundColor: "black", color: "white" },
          autoClose: 2000,
        });
      } else if (!navigator.onLine) {
        // Handle the case when the user is offline
        toast.warn("No internet connection. Please check your network.", {
          position: "top-center",
          style: { backgroundColor: "black", color: "white" },
          autoClose: 2000,
        });
      } else {
        toast.error("Wrong Email", {
          position: "top-center",
          style: { backgroundColor: "black", color: "white" },
          autoClose: 2000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="login-container">
      <div className="form-container">
        <div className="logo">
          <img src={img} alt="Logo" />
        </div>
        <h2>Log in to your account</h2>
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

          {/*  */}
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

          {/*  */}
          <button
            type="submit"
            className={`button ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading} // Disable the button when loading
          >
            {loading ? <Loader /> : "Register"}
          </button>
        </form>
        <p className="register-link">
          Don’t have an account?{" "}
          <Link to="/account-section/register">Register Here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
