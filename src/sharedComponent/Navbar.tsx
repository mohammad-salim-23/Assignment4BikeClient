import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout, useCurrenttoken } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; 
import logo from "../images/MotorcycleLogo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const token = useAppSelector(useCurrenttoken);
  const user = token ? verifyToken(token) : null;
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-black text-white shadow-md py-4 px-6 flex justify-between items-center relative">
      {/* Left Section: Logo */}
      <div className="flex items-center gap-4">
        <Link to="/" className="text-xl font-bold">
          <img
            src={logo}
            alt="Logo"
            className="h-14 w-auto md:h-14 lg:h-18"
          />
        </Link>
        {!user && (
          <Link to="/signup" className="md:hidden">
          <button className="border border-orange-500 text-orange-500 px-4 py-2 rounded-md hover:bg-orange-600 hover:text-white transition">
        Sign Up
      </button>
          </Link>
        )}
      </div>

      {/*  (Mobile) */}
      <button className="md:hidden text-2xl text-white" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* large screen */}
      <ul className="hidden md:flex space-x-6 text-lg font-medium">
        <li>
          <Link to="/" className="hover:text-orange-400 transition">Home</Link>
        </li>
        <li>
          <Link to="/allProducts" className="hover:text-orange-400 transition">All Products</Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-orange-400 transition">About</Link>
        </li>
      </ul>

      {/* Right Section*/}
      <div className="hidden md:flex items-center gap-4">
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
          <div className="flex items-center gap-3">
            <Link to={`/${user?.role}/dashboard`} className="hover:text-orange-400">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="border border-red-500 text-red-500 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-900 text-white shadow-lg md:hidden z-50">
          <ul className="flex flex-col space-y-4 p-4 text-lg font-medium">
            <li>
              <Link to="/" className="hover:text-orange-400" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/allProducts" className="hover:text-orange-400" onClick={() => setMenuOpen(false)}>
                All Products
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-orange-400" onClick={() => setMenuOpen(false)}>
                About
              </Link>
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
