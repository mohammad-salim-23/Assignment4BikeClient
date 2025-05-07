import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useGetAllBikesQuery } from "../../redux/features/bike/bikeManagement.api";

const FeaturedProducts = () => {
  const { data, isLoading } = useGetAllBikesQuery(undefined);

  if (isLoading) return <p>Loading featured bikes...</p>;

  const allBikes = data?.data || [];
  const featuredBikes = allBikes.slice(0, 4); 
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Featured Bikes</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {featuredBikes.length > 0 ? (
          featuredBikes.map((bike, index) => (
            <motion.div 
              key={bike._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }} // Delay for stagger effect
              whileHover={{ scale: 1.05 }}
              className="bg-primaryColor p-4 shadow-md rounded-lg cursor-pointer"
            >
              <img
                src={bike.image}
                alt={bike.name}
                className="w-full h-48 object-cover mb-3 rounded"
              />
              <h3 className="text-lg font-bold text-white">{bike.name}</h3>
              <p className="text-gray-300"><strong>Brand:</strong> {bike.brand}</p>
              <p className="text-gray-300"><strong>Model:</strong> {bike.model}</p>
              <p className="text-gray-300"><strong>Category:</strong> {bike.category}</p>
              <p className="text-gray-300"><strong>Price:</strong> ${bike.price}</p>
              <p className="text-gray-300">
                <strong>Availability:</strong> {bike.availability ? 
                  <span className="text-orange-400"> In Stock</span> : 
                  <span className="text-red-400"> Out of Stock</span>}
              </p>
              <Link
                to={`/productDetails/${bike._id}`}
                className=" bg-secondaryColor mt-3 text-center flex items-center justify-center text-black font-bold py-2 px-4 rounded hover:bg-orange-600"
              >
                View Details
              </Link>
            </motion.div>
          ))
        ) : (
          <p className="text-white">No featured bikes available.</p>
        )}
      </div>

      {/* View All Button */}
      <div className="text-center mt-6">
        <Link
          to="/allProducts"
          className="bg-secondaryColor text-black px-6 py-2 rounded-md font-bold btn hover:bg-orange-600"
        >
          more...
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProducts;
