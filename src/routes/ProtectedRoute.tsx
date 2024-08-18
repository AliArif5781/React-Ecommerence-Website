import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/Firebase";
import { Navigate } from "react-router-dom";
import { Loader } from "lucide-react";

interface ProtectedRouteProps {
  // Element: React.FC;       //  Use React.ComponentType instead of React.FC to accommodate both function and class components.
  Element: React.ComponentType;
  isAuthPage?: boolean;
}
const ProtectedRoute = ({ Element, isAuthPage }: ProtectedRouteProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      // console.log("user", user);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loader className="flex justify-center items-center" />;
  }

  if (!isAuthPage && user) {
    return <Element />;
  } else if (isAuthPage && !user) {
    return <Element />;
  } else if (!user) {
    return <Navigate to={"/account-section/login"} />;
  } else {
    return <Navigate to={"/"} />;
  }
};

export default ProtectedRoute;

/*
In your ProtectedRoute component, the Element prop is used to represent the component that should be rendered based on the authentication status of the user. Here’s a simplified explanation:

Purpose of Element: Element is the component you want to render based on the user's authentication status. It could be any React component, such as a login page, registration page, or any protected content.

How It Works:

Loading State: While checking the authentication status, the component shows a Loader to indicate that it's loading.
Authenticated User: If the user is authenticated (user is not null), and the page is not an authentication page (isAuthPage is false), it means the user is trying to access a protected route. In this case, Element will be rendered (e.g., a protected page component).
Unauthenticated User: If the user is not authenticated (user is null), and the page is an authentication page (isAuthPage is true), the Element (e.g., login or registration page) will be rendered because these pages are accessible without authentication.
Redirects: If the user is not authenticated and trying to access a protected route, they will be redirected to the login page. If the user is authenticated and trying to access an authentication page, they will be redirected to the home page or another specified route.
So, in simple terms:

If user exists and isAuthPage is false, render the Element (protected content).
If user does not exist and isAuthPage is true, render the Element (login or registration page).
Redirect to appropriate pages based on authentication status if conditions are not met.
x

 */
