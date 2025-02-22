import { Link } from "react-router-dom";
import { useGetAllBikesQuery } from "../../redux/features/bike/bikeManagement.api";

const FeaturedProducts = () => {
  const { data, isLoading } = useGetAllBikesQuery(undefined);

  if (isLoading) return <p>Loading featured bikes...</p>;

  const allBikes = data?.data || [];
  const featuredBikes = allBikes.slice(0, 6); // Get only 6 bikes

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Featured Bikes</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {featuredBikes.length > 0 ? (
          featuredBikes.map((bike) => (
            <div key={bike._id} className="border p-4 shadow-md">
              <img
                src={bike.image}
                alt={bike.name}
                className="w-full h-48 object-cover mb-3"
              />
              <h3 className="text-lg font-bold">{bike.name}</h3>
              <p><strong>Brand:</strong> {bike.brand}</p>
              <p><strong>Model:</strong> {bike.model}</p>
              <p><strong>Category:</strong> {bike.category}</p>
              <p><strong>Price:</strong> ${bike.price}</p>
              <p><strong>Availability:</strong> {bike.availability ? "In Stock" : "Out of Stock"}</p>
              <Link
                to={`/productDetails/${bike._id}`}
                className="btn bg-secondaryColor mt-3  text-center font-bold flex items-center"
              >
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p>No featured bikes available.</p>
        )}
      </div>

      {/* View All Button */}
      <div className="text-center mt-6">
        <Link
          to="/allProducts"
          className="bg-secondaryColor text-white px-6 py-2 rounded-md font-bold"
        >
          View All
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProducts;
