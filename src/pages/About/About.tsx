import { motion } from "framer-motion";

const About = () => {
    return (
        <motion.div 
            initial={{ rotateY: 180, opacity: 0 }} 
            animate={{ rotateY: 0, opacity: 1 }} 
            transition={{ duration: 1 }}
            className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6 flex flex-col md:flex-row gap-6 items-center"
        >
            {/* Left Side: Image */}
            <div className="md:w-5/12">
                <img 
                    src="https://i.pinimg.com/736x/6c/a6/e1/6ca6e1f148e86b145ee5240082236a31.jpg" 
                    alt="Our Shop" 
                    className="w-full h-auto rounded-lg shadow-md"
                />
            </div>
            
            {/* Right Side: About  */}
            <div className="md:w-7/12 flex flex-col justify-center space-y-4">
                <h2 className="text-3xl font-bold text-gray-800">About Our Bike Shop</h2>
                <p className="text-gray-600 leading-relaxed">
                    Welcome to <strong>Our Shop</strong>, your number one destination for high-quality bikes and accessories. 
                    We are committed to providing you with the best products, focusing on reliability, customer satisfaction, and uniqueness.
                </p>
                <p className="text-gray-600 leading-relaxed">
                    Our <strong>mission</strong> is to make your riding experience smooth and enjoyable by offering top-notch products 
                    and exceptional customer service. Whether you're an enthusiast or a professional rider, we have something for you!
                </p>
                <p className="text-gray-600 leading-relaxed">
                    Thank you for choosing us as your trusted bike shop. Ride with confidence and explore new horizons!
                </p>
            </div>
        </motion.div>
    );
};

export default About;
