import { FormEvent, useState } from "react";
import img from "/logo_black.svg";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/Firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when registration starts

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: firstName,
          lastName: lastName,
        });
      }
      navigate("/account-section/login");
      toast.success("User Registered Successfully", {
        position: "top-center",
        style: { backgroundColor: "black", color: "white" },
        autoClose: 2000,
      });
      // console.log("User Registered Successfully");
    } catch (error: any) {
      toast.error(error.message, {
        position: "bottom-center",
        style: { backgroundColor: "black", color: "white" },
        autoClose: 2000,
      });
      // console.log("User Not Registered Successfully!!!");
    } finally {
      setIsLoading(false); // Reset loading state regardless of success or failure
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
        <h2 className="text-2xl mb-6 text-center">Create new account</h2>
        <form className="form" onSubmit={handleRegister}>
          <div className="grid-section">
            <div className="form-group">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="E.g. John"
                autoComplete="given-name"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="E.g. Doe"
                autoComplete="family-name"
              />
            </div>
          </div>
          <div className="form-group">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
          <button
            type="submit"
            className={`button ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading} // Disable the button when loading
          >
            {isLoading ? <Loader /> : "Register"}
          </button>
          <p className="register-link">
            Already have an account?{" "}
            <Link
              to="/account-section/login"
              className="text-black text-md font-bold underline pl-2"
            >
              Login Here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
