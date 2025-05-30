import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllBikesQuery } from "../../redux/features/bike/bikeManagement.api";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const AllProducts = () => {
  const { data, isLoading } = useGetAllBikesQuery(undefined);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    price: { min: "", max: "" },
    model: "",
    brand: "",
    category: "",
    availability: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const bikesPerPage = 6;

  if (isLoading) return null;

  const allBikes = data?.data || [];

  const filteredBikes = allBikes.filter((bike) => {
    const matchesSearch =
      bike.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bike.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bike.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilters =
      (!filters.brand || bike.brand.toLowerCase() === filters.brand.toLowerCase()) &&
      (!filters.category || bike.category.toLowerCase() === filters.category.toLowerCase()) &&
      (!filters.model || bike.model.toLowerCase() === filters.model.toLowerCase()) &&
      (!filters.availability ||
        (filters.availability === "true" ? bike.availability === true : bike.availability === false)) &&
      (!filters.price.min || bike.price >= Number(filters.price.min)) &&
      (!filters.price.max || bike.price <= Number(filters.price.max));

    return matchesSearch && matchesFilters;
  });

  const totalPages = Math.ceil(filteredBikes.length / bikesPerPage);
  const startIdx = (currentPage - 1) * bikesPerPage;
  const currentBikes = filteredBikes.slice(startIdx, startIdx + bikesPerPage);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Bikes</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name, brand, or category..."
        className="border p-2 mb-4 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Filters */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <select
          className="border p-2 bg-white text-black"
          onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
        >
          <option value="">All Brands</option>
          {Array.from(new Set(allBikes.map((b) => b.brand))).map((brand) => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>

        <select
          className="border p-2 bg-white text-black"
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">All Categories</option>
          {Array.from(new Set(allBikes.map((b) => b.category))).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          className="border p-2 bg-white text-black"
          onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
        >
          <option value="">All Availability</option>
          <option value="true">Available</option>
          <option value="false">Out of Stock</option>
        </select>

        <input
          type="number"
          placeholder="Min Price"
          className="border p-2"
          onChange={(e) =>
            setFilters({ ...filters, price: { ...filters.price, min: e.target.value } })
          }
        />

        <input
          type="number"
          placeholder="Max Price"
          className="border p-2"
          onChange={(e) =>
            setFilters({ ...filters, price: { ...filters.price, max: e.target.value } })
          }
        />
      </div>

      {/* Bike Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentBikes.length > 0 ? (
          currentBikes.map((bike, index) => (
            <motion.div
              key={bike._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-primaryColor p-4 shadow-md rounded-lg relative"
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

              {/* Buttons */}
              <div className="grid grid-cols-2 mt-3 gap-2">
                <Link
                  to={`/productDetails/${bike._id}`}
                  className="bg-white text-black text-center py-1.5 text-sm font-medium rounded hover:bg-gray-200"
                >
                  View Details
                </Link>
                <button
                  disabled={!bike.availability}
                  onClick={() => {
                    dispatch(
                      addToCart({
                        _id: bike._id,
                        name: bike.name,
                        price: bike.price,
                        image: bike.image,
                        quantity: 1,
                      })
                    );
                    toast.success(
                      <span>
                        <span className="font-bold text-orange-400">{bike.name}</span> added to cart successfully!
                      </span>,
                      {
                        duration: 3000,
                        className: "bg-green-700 text-white shadow px-3 py-2 rounded",
                      }
                    );
                  }}
                  className={`text-sm font-medium py-1.5 rounded ${
                    bike.availability
                      ? "bg-secondaryColor text-black hover:bg-orange-500"
                      : "bg-gray-500 text-gray-300 cursor-not-allowed"
                  }`}
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-white">No bikes found.</p>
        )}
      </div>

      {/* Pagination Controls */}
   {/* Pagination Controls with Prev/Next */}
{totalPages > 1 && (
  <div className="flex justify-center mt-8 space-x-2 items-center">
    <button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className={`p-2 rounded ${currentPage === 1 ? "bg-gray-500 text-gray-300" : "bg-orange-400 text-black hover:bg-orange-500"}`}
    >
      <FaArrowLeft/>
    </button>

    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i + 1}
        onClick={() => setCurrentPage(i + 1)}
        className={`px-3 py-1 border rounded ${
          currentPage === i + 1
            ? "bg-orange-400 text-black font-bold"
            : "bg-gray-800 text-white"
        }`}
      >
        {i + 1}
      </button>
    ))}

    <button
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
      className={`p-2 rounded ${currentPage === totalPages ? "bg-gray-500 text-gray-300" : "bg-gray-400 text-black hover:bg-orange-500"}`}
    >
      <FaArrowRight />
    </button>
  </div>
)}

    </div>
  );
};

export default AllProducts;
