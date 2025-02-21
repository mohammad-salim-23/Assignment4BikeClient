import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { useCurrenttoken } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";



const Navbar = () => {
const token = useAppSelector(useCurrenttoken);
    let  user ; 
    if(token){
        user = verifyToken(token);
    }

  


  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* Left Section: Logo */}
     
      
      {/* Center Section: Navigation Items */}
      <ul className="hidden md:flex space-x-6 text-lg font-medium">
        <li><Link to="/" className="hover:text-primaryColor">Home</Link></li>
      </ul>
      
      {/* Right Section: Login / Profile */}
      <div className="flex items-center gap-4">
        {!user ? (
          <div className="flex gap-3">
            <Link to="/signin">
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
           <Link to={`$role/dashboard`}> <h2 className="font-bold">Dashboard</h2></Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
