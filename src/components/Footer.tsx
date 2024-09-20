import { FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-[250px] lg:mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About ELEGASILK</h3>
            <p className="text-gray-400">
              Discover modern casual looks with our premium fashion products.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to={"/"}
                  className="text-gray-400 hover:text-white transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/menProduct"
                  className="text-gray-400 hover:text-white transition"
                >
                  Men Clothes
                </Link>
              </li>
              <li>
                <Link
                  to="/aboutus"
                  className="text-gray-400 hover:text-white transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition"
                  onClick={(e) => e.preventDefault()}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-white transition"
                  onClick={(e) => e.preventDefault()}
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-white transition"
                  onClick={(e) => e.preventDefault()}
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-white transition"
                  onClick={(e) => e.preventDefault()}
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-white transition"
                  onClick={(e) => e.preventDefault()}
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {/* <a href="#" className="text-gray-400 hover:text-white transition">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Instagram size={24} />
              </a> */}
              <a
                href="https://github.com/AliArif5781"
                className="text-gray-400 hover:text-white transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/ali-arif-140bb8274/"
                className="text-gray-400 hover:text-white transition"
                target="_blank"
                rel="noopener noreferrer" // This is recommended for security
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} ELEGASILK. All rights reserved.
          </p>
          <p className="text-gray-400 mt-2">
            Designed and developed by AliArif
          </p>
        </div>
      </div>
    </footer>
  );
}

/*
target="_blank": This attribute opens the link in a new tab.
rel="noopener noreferrer": This is a security measure that prevents the new page from being able to access the window.opener property, reducing the risk of certain types of attacks.
 */
