import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/Firebase";
import { UserRound, Box, CreditCard, Settings } from "lucide-react";

interface UserDetails {
  photo: string;
  firstName: string;
  lastName: string;
  email: string;
}

const SkeletonLoader: React.FC = () => {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg animate-pulse">
      <h2 className="text-xl font-semibold mb-4 bg-gray-300 h-6 w-1/4 rounded"></h2>
      <p className="text-gray-500 mb-4 bg-gray-300 h-4 w-1/2 rounded"></p>

      {[...Array(3)].map((_, index) => (
        <div key={index} className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700 bg-gray-300 h-4 w-1/4 rounded"></label>
          <div className="w-full p-3 border border-gray-300 rounded-lg bg-gray-200 h-10"></div>
        </div>
      ))}
    </div>
  );
};

const SkeletonTabs: React.FC = () => {
  return (
    <div className="bg-gray-100 mb-6">
      <div className="flex flex-col md:flex-row justify-between border-b">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex-1 m-2">
            <div className="py-3 border-b-2 border-transparent bg-white rounded-lg animate-pulse">
              <div className="flex items-center justify-center">
                <span className="mr-2 bg-gray-300 h-5 w-5 rounded-full"></span>
                <div className="bg-gray-300 h-5 w-24 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AccountPage: React.FC = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("profile"); // State to track active tab

  const [tooltipMessage, setTooltipMessage] = useState("");
  useEffect(() => {
    const unscubscribe = auth.onAuthStateChanged(async (user) => {
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
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data() as UserDetails);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = (message: string) => {
    setTooltipMessage(message);
    setTimeout(() => {
      setTooltipMessage("");
    }, 2000); // Hide after 2 seconds
  };

  return (
    <div className="w-[90vw] max-w-6xl mx-auto pt-28">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Account</h1>

      {/* Tabs Section */}
      {loading ? (
        <SkeletonTabs />
      ) : (
        <div className="bg-gray-100">
          <div className="flex flex-col md:flex-row justify-between mb-6 border-b">
            <button
              className={`flex-1 py-3 border-b-2 border-transparent text-center rounded-lg m-2 ${
                activeTab === "profile" ? "bg-white" : ""
              }`}
              onClick={() => setActiveTab("profile")}
            >
              <span className="inline-flex items-center">
                <span className="mr-2">
                  <UserRound />
                </span>
                Profile
              </span>
            </button>
            <button
              className={`flex-1 py-3 border-b-2 border-transparent text-center rounded-lg m-2 ${
                activeTab === "orders" ? "bg-white" : ""
              }`}
              onClick={() => {
                // setActiveTab("orders");
                handleButtonClick("Feature coming soon!");
              }}
            >
              <span className="inline-flex items-center">
                <span className="mr-2">
                  <Box />
                </span>
                Orders
              </span>
            </button>
            <button
              className={`flex-1 py-3 border-b-2 border-transparent text-center rounded-lg m-2 ${
                activeTab === "payments" ? "bg-white" : ""
              }`}
              onClick={() => {
                // setActiveTab("payments");
                handleButtonClick("Feature coming soon!");
              }}
            >
              <span className="inline-flex items-center">
                <span className="mr-2">
                  <CreditCard />
                </span>
                Payments
              </span>
            </button>
            <button
              className={`flex-1 py-3 border-b-2 border-transparent text-center rounded-lg m-2 ${
                activeTab === "settings" ? "bg-white" : ""
              }`}
              onClick={() => {
                // setActiveTab("settings");
                handleButtonClick("Feature coming soon!");
              }}
            >
              <span className="inline-flex items-center">
                <span className="mr-2">
                  <Settings />
                </span>
                Settings
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Tooltip */}
      {tooltipMessage && (
        <span className="flex justify-center items-center text-custom-black font-bold text-balance p-2 rounded-lg">
          {tooltipMessage}
        </span>
      )}

      {/* Profile Section */}
      {loading ? (
        <SkeletonLoader />
      ) : (
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <p className="text-gray-500 mb-4">See your personal details here.</p>

          <form>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                First Name
              </label>
              {user ? (
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                  value={userDetails?.firstName || ""}
                  readOnly
                />
              ) : null}
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Last Name
              </label>
              {user ? (
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                  value={userDetails?.lastName || ""}
                  readOnly
                />
              ) : null}
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>
              {user ? (
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                  value={userDetails?.email || ""}
                  readOnly
                />
              ) : null}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
