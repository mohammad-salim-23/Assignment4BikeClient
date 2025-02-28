import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import logo from "../images/MotorcycleLogo.png"
const Footer = () => {
    return (
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        
          <div className="flex items-center space-x-4">
            <img src={logo} alt="Bike Shop Logo" className="w-16 h-16" />
            <div>
              <h2 className="text-xl font-bold">Bike Shop</h2>
              <p>123 Bike Street, City, Country</p>
              <p>T: +123 456 7890 | E: info@yourbikeshop.com</p>
            </div>
          </div>
  
          {/* Right Side: Links & Social Media */}
          <div className="text-center md:text-right">
           <Link to="/allProducts">
           <button className="bg-orange-500 text-black font-bold py-2 px-4 rounded-full mb-3 mt-2 hover:bg-orange-600">
              View Products →
            </button></Link>
            <div className="flex justify-center md:justify-end space-x-4 text-2xl">
            <a href="#" className="hover:text-gray-400">
  <FaFacebookF />
</a>
<a href="#" className="hover:text-gray-400">
  <FaTwitter />
</a>
<a href="#" className="hover:text-gray-400">
  <FaInstagram />
</a>
<a href="#" className="hover:text-gray-400">
  <FaYoutube />
</a>
<a href="#" className="hover:text-gray-400">
  <FaLinkedinIn />
</a>
            </div>
            <div className="mt-3">
              <Link to="/" className="hover:underline hover:text-orange-400">Home</Link> | 
              <Link to="/about" className="hover:underline hover:text-orange-400">About Us</Link>
            </div>
          </div>
        </div>
        <p className="text-center text-gray-500 mt-4">© {new Date().getFullYear()} Moto Bike Shop. All rights reserved.</p>
      </footer>
    );
  };
  
  export default Footer;
  