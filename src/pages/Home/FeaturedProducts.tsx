const FeaturedProducts = ()=>{

    return (
        <div>
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
              <Link to={`/bike/${bike._id}`} className="btn bg-secondaryColor mt-3  text-center font-bold flex items-center">
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p>No bikes found.</p>
        )}
      </div>
        </div>
    )
}
export default FeaturedProducts;