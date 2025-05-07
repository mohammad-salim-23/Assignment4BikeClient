import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllBikesQuery } from "../../redux/features/bike/bikeManagement.api";
import { motion } from "framer-motion";
import { toast } from "sonner";

const AllOfferProducts = () => {
  const { data, isLoading, isError } = useGetAllBikesQuery(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    price: { min: "", max: "" },
    model: "",
    brand: "",
    category: "",
    availability: "",
  });

  const allBikes = data?.data || [];
  const offerBikes = allBikes.filter((bike) => bike?.offerPrice);
  // Error or Loading UI
  if (isLoading) {
    toast.loading("Loading data...");
    return <p className="text-white text-center mt-10">Loading bikes...</p>;
  }

  if (isError) {
    toast.error("Failed to load data");
    return <p className="text-red-500 text-center mt-10">Error loading bikes.</p>;
  }

  // Filtering Logic
  const filteredBikes = offerBikes.filter((bike) => {
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

  // Unique values for select dropdowns
interface Bike {
    _id: string;
    name: string;
    brand: string;
    model: string;
    category: string;
    price: number;
    availability: boolean;
    image: string;
}



const uniqueValues = (key: keyof Bike): string[] => [...new Set(allBikes.map((b) => b[key] as string))];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">All Bikes</h2>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search by name, brand, or category..."
        className="border p-2 mb-4 w-full rounded text-black"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* 🧪 Filters */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <select
          className="border p-2 bg-white text-black rounded"
          value={filters.brand}
          onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
        >
          <option value="">All Brands</option>
          {uniqueValues("brand").map((brand) => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>

        <select
          className="border p-2 bg-white text-black rounded"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">All Categories</option>
          {uniqueValues("category").map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          className="border p-2 bg-white text-black rounded"
          value={filters.availability}
          onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
        >
          <option value="">All Availability</option>
          <option value="true">Available</option>
          <option value="false">Out of Stock</option>
        </select>

        <input
          type="number"
          placeholder="Min Price"
          className="border p-2 text-black rounded"
          value={filters.price.min}
          onChange={(e) => setFilters({ ...filters, price: { ...filters.price, min: e.target.value } })}
        />
        <input
          type="number"
          placeholder="Max Price"
          className="border p-2 text-black rounded"
          value={filters.price.max}
          onChange={(e) => setFilters({ ...filters, price: { ...filters.price, max: e.target.value } })}
        />
      </div>

      {/* 🚲 Bike Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBikes.length > 0 ? (
          filteredBikes.map((bike, index) => (
            <motion.div
              key={bike._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-primaryColor p-4 shadow-md rounded-lg"
            >
              <motion.img
                src={bike.image}
                alt={bike.name}
                className="w-full h-48 object-cover mb-3 rounded"
                transition={{ duration: 0.6, repeatType: "mirror" }}
              />
              <h3 className="text-lg font-bold text-white">{bike.name}</h3>
              <p className="text-gray-300"><strong>Brand:</strong> {bike.brand}</p>
              <p className="text-gray-300"><strong>Model:</strong> {bike.model}</p>
              <p className="text-gray-300"><strong>Category:</strong> {bike.category}</p>
              <p className="text-gray-300"><strong>Price:</strong> ${bike.price}</p>
              <p className="text-gray-300">
                <strong>Availability:</strong>{" "}
                {bike.availability ? (
                  <span className="text-orange-400">In Stock</span>
                ) : (
                  <span className="text-red-400">Out of Stock</span>
                )}
              </p>
              <Link
                to={`/productDetails/${bike._id}`}
                className=" bg-secondaryColor mt-3 text-center flex items-center justify-center text-black  hover:bg-orange-600 py-2 px-4 font-bold rounded"
              >
                View Details
              </Link>
            </motion.div>
          ))
        ) : (
          <p className="text-white col-span-full text-center">No bikes found with current filters.</p>
        )}
      </div>
    </div>
  );
};

export default AllOfferProducts;
