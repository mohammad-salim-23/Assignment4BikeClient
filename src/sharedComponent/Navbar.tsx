import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout, useCurrenttoken } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons
import logo from "../images/MotorcycleLogo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const token = useAppSelector(useCurrenttoken);
  const user = token ? verifyToken(token) : null;
  const dispatch = useAppDispatch();
  const Role = user?.role;
  console.log(user);
 const handleLogout = ()=>{
  dispatch(logout());
 }
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center relative">
      {/* Left Section: Logo */}
      <div className="flex items-center gap-4">
        <Link to="/" className="text-xl font-bold text-primaryColor">
          <img src={logo} alt="Logo" className="h-12 w-auto md:h-12 lg:h-16 mix-blend-multiply" />
        </Link>
        {/* Sign Up button (Only for Mobile) */}
        {!user && (
          <Link to="/signup" className="md:hidden">
            <button className="border border-primaryColor text-primaryColor px-4 py-2 rounded-md hover:bg-primaryColor hover:text-white">
              Sign Up
            </button>
          </Link>
        )}
      </div>

      {/* Hamburger Menu (Mobile) */}
      <button 
        className="md:hidden text-2xl" 
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Center Section: Navigation Items (Desktop) */}
      <ul className="hidden md:flex space-x-6 text-lg font-medium">
        <li><Link to="/" className="hover:text-primaryColor">Home</Link></li>
        <li><Link to="/allProducts" className="hover:text-primaryColor">All Products</Link></li>
        <li><Link to="/about" className="hover:text-primaryColor">About</Link></li>
       
      </ul>

      {/* Right Section: Login / Profile */}
      <div className="hidden md:flex items-center gap-4">
        {!user ? (
          <div className="flex gap-3">
            <Link to="/login">
              <button className="bg-primaryColor text-white px-4 py-2 rounded-md hover:opacity-80">
                Sign In
              </button>
            </Link>
            <Link to="/signup">
              <button className="border border-primaryColor text-primaryColor px-4 py-2 rounded-md hover:bg-primaryColor hover:text-white">
                Sign Up
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link to={`/${Role}/dashboard`} className="font-bold">Dashboard</Link>
            <button onClick={handleLogout} className="border border-red-500 text-red-500 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white">
             
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg md:hidden">
          <ul className="flex flex-col space-y-4 p-4 text-lg font-medium">
            <li><Link to="/" className="hover:text-primaryColor" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/about" className="hover:text-primaryColor" onClick={() => setMenuOpen(false)}>About</Link></li>
            <li><Link to="/contact" className="hover:text-primaryColor" onClick={() => setMenuOpen(false)}>Contact</Link></li>
            {user && (
              <>
                <li><Link to={`/${user?.role}/dashboard`} onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
                <li>
                  <button onClick={handleLogout} className="border border-red-500 text-red-500 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white w-full">
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
