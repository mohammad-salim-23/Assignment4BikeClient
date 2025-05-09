import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout, useCurrenttoken } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useState, useEffect, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../images/MotorcycleLogo.png";
import icon from "../../src/assets/images/navbarIcon.jpg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const token = useAppSelector(useCurrenttoken);
  const user = token ? verifyToken(token) : null;
  const dispatch = useAppDispatch();
  const totalItems = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-primaryColor text-white shadow-md py-3 px-4 flex justify-between items-center sticky top-0 z-10">
      {/* Left Section: Logo */}
      <div className="flex items-center gap-4">
        <Link to="/" className="text-xl font-bold">
          <img src={logo} alt="Logo" className="h-14 w-auto md:h-14 lg:h-18" />
        </Link>
        <Link to="/cart" className="relative md:hidden">
          🛒
          <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs px-1 rounded">
            {totalItems}
          </span>
        </Link>
        {!user && (
          <Link to="/signup" className="md:hidden">
            <button className="border border-orange-500 text-orange-500 px-4 py-2 rounded-md hover:bg-orange-600 hover:text-white transition">
              Sign Up
            </button>
          </Link>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <button className="md:hidden text-2xl text-white" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Large screen links */}
      <ul className="hidden md:flex space-x-6 text-sm font-medium">
        <li>
          <Link to="/" className="hover:text-orange-400 transition">Home</Link>
        </li>
        <li>
          <Link to="/allProducts" className="hover:text-orange-400 transition">All Products</Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-orange-400 transition">About</Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-orange-400 transition">Contact Us</Link>
        </li>
        <li>
          <Link to="/services" className="hover:text-orange-400 transition">Services</Link>
        </li>
      </ul>

      {/* Right Section */}
      <div className="hidden md:flex items-center gap-4">
        <Link to="/cart" className="relative">
          🛒
          <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs px-1 rounded">
            {totalItems}
          </span>
        </Link>

        {!user ? (
          <div className="flex gap-3">
            <Link to="/login">
              <button className="bg-secondaryColor text-white px-4 py-2 rounded-md hover:bg-orange-600 transition">
                Sign In
              </button>
            </Link>
            <Link to="/signup">
              <button className="border border-orange-500 text-orange-500 px-4 py-2 rounded-md hover:bg-orange-600 hover:text-white transition">
                Sign Up
              </button>
            </Link>
          </div>
        ) : (
          <div className="relative" ref={dropdownRef}>
           <button
  onClick={() => setDropdownOpen(!dropdownOpen)}
  className="focus:outline-none"
>
  <img
    src={icon}
    alt="User Avatar"
    className="h-8 w-8 rounded-full border-2 border-white"
  />
</button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg z-50">
                <Link
                  to={`/${user?.role}/dashboard`}
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-900 text-white shadow-lg md:hidden z-50">
          <ul className="flex flex-col space-y-4 p-4 text-sm font-medium">
            <li>
              <Link to="/" className="hover:text-orange-400" onClick={() => setMenuOpen(false)}>Home</Link>
            </li>
            <li>
              <Link to="/allProducts" className="hover:text-orange-400" onClick={() => setMenuOpen(false)}>All Products</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-orange-400" onClick={() => setMenuOpen(false)}>About</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-orange-400" onClick={() => setMenuOpen(false)}>Contact Us</Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-orange-400" onClick={() => setMenuOpen(false)}>Services</Link>
            </li>
            {user && (
              <>
                <li>
                  <Link to={`/${user?.role}/dashboard`} className="hover:text-orange-400" onClick={() => setMenuOpen(false)}>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="border border-red-500 text-red-500 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition w-full"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
