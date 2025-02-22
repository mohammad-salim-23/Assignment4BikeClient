import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllBikesQuery } from "../../redux/features/bike/bikeManagement.api";

const AllProducts = () => {
  const { data, isLoading } = useGetAllBikesQuery(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    price: { min: 0, max: 100000 },
    model: "",
    brand: "",
    category: "",
    availability: "",
  });
console.log(data);
  if (isLoading) return <p>Loading bikes...</p>;


  const allBikes = data?.data || [];

  //  Filter bikes based on search & filters
  const filteredBikes = allBikes.filter((bike) => {
    const matchesSearch =
    bike.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bike.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bike.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilters =
      (!filters.brand || bike.brand.toLowerCase() === filters.brand.toLowerCase()) &&
      (!filters.category || bike.category.toLowerCase() === filters.category.toLowerCase()) &&
      (!filters.model || bike.model.toLowerCase()===(filters.model.toLowerCase())) &&
      (!filters.availability || (filters.availability === "true" ? bike.availability : !bike.availability)) &&
      bike.price >= filters.price.min &&
      bike.price <= filters.price.max;

    return matchesSearch && matchesFilters;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Bikes</h2>

      {/*Search Bar */}
      <input
        type="text"
        placeholder="Search by name, brand, or category..."
        className="border p-2 mb-4 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/*Filters */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <select
          className="border p-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-secondaryColor "
          onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
        >
          <option className="hover:bg-secondaryColor" value="">All Brands</option>
          {Array.from(new Set(allBikes.map((b) => b.brand))).map((brand) => (
            <option className="hover:bg-secondaryColor" key={brand} value={brand}>{brand}</option>
          ))}
        </select>

        <select
          className="border p-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-secondaryColor"
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">All Categories</option>
          {Array.from(new Set(allBikes.map((b) => b.category))).map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <select
        className="border p-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-secondaryColor"
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
          onChange={(e) => setFilters({ ...filters, price: { ...filters.price, min: Number(e.target.value) } })}
        />

        <input
          type="number"
          placeholder="Max Price"
          className="border p-2"
          onChange={(e) => setFilters({ ...filters, price: { ...filters.price, max: Number(e.target.value) } })}
        />
      </div>

      {/* Bike Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBikes.length > 0 ? (
          filteredBikes.map((bike) => (
            <div key={bike._id} className="border p-4 shadow-md">
              <img src={bike.image} alt={bike.name} className="w-full h-48 object-cover mb-3" />
              <h3 className="text-lg font-bold">{bike.name}</h3>
              <p><strong>Brand:</strong> {bike.brand}</p>
              <p><strong>Model:</strong> {bike.model}</p>
              <p><strong>Category:</strong> {bike.category}</p>
              <p><strong>Price:</strong> ${bike.price}</p>
              <p><strong>Availability:</strong> {bike.availability ? "In Stock" : "Out of Stock"}</p>
              <Link to={`/productDetails/${bike._id}`} className="btn bg-secondaryColor mt-3  text-center font-bold flex items-center">
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p>No bikes found.</p>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
