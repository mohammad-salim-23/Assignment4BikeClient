import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../../CSSdesign/All.css";
import bike1 from "../../images/bike3.mp4";
import bike2 from "../../images/bgVideoBike.mp4";

const Banner = () => {
  return (
    <div className="carousel w-full img-style mt-4 h-[40vh] md:h-[70vh] rounded-xl overflow-hidden">
      {/* Slide 1 */}
      <div id="slide1" className="carousel-item relative w-full">
        <video 
          src={bike1} 
          autoPlay 
          loop 
          muted 
          className="w-full h-full object-cover"
        ></video>

        <motion.div 
          initial={{ y: 100, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-0 flex items-center bg-gradient-to-r from-[#1E3A8A] to-[rgba(255, 255, 255, 0.7)]"
        >
          <div className="text-white space-y-4 px-4 md:px-12 max-w-md w-full">
            <h2 className="text-2xl md:text-5xl font-bold">
              Discover Your Perfect Ride 🚴‍♂️
            </h2>
            <p className="text-base md:text-xl">
              Explore top-quality bikes and accessories for every adventure.
            </p>
            <motion.div 
              animate={{ opacity: [0.7, 1, 0.7] }} 
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Link 
                to="/allProducts"
                className="btn text-base md:text-lg px-6 py-2 rounded-lg shadow-md bg-secondaryColor hover:bg-orange-600"
              >
                Shop Now
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <div className="absolute flex justify-between items-center w-full px-4 bottom-4">
          <a href="#slide2" className="btn btn-circle">❮</a>
          <a href="#slide2" className="btn btn-circle">❯</a>
        </div>
      </div>

      {/* Slide 2 */}
      <div id="slide2" className="carousel-item relative w-full">
        <video 
          src={bike2} 
          autoPlay 
          loop 
          muted 
          className="w-full h-full object-cover"
        ></video>

        <motion.div 
          initial={{ y: 100, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="absolute inset-0 flex items-center bg-gradient-to-r from-[#1E3A8A] to-[rgba(255, 255, 255, 0.7)]"
        >
          <div className="text-white space-y-4 px-4 md:px-12 max-w-md w-full">
            <h2 className="text-2xl md:text-5xl font-bold">
              Unleash Your Cycling Passion
            </h2>
            <p className="text-base md:text-xl">
              Premium bikes designed for every terrain and adventure.
            </p>
            <motion.div 
              animate={{ opacity: [0.7, 1, 0.7] }} 
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Link 
                to="/allProducts"
                className="btn text-base md:text-lg px-6 py-2 rounded-lg shadow-md bg-secondaryColor hover:bg-orange-600"
              >
                Shop Now
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <div className="absolute flex justify-between items-center w-full px-4 bottom-4">
          <a href="#slide1" className="btn btn-circle">❮</a>
          <a href="#slide1" className="btn btn-circle">❯</a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
