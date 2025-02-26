import { Link, useParams } from "react-router-dom";
import { useGetSingleBikeQuery, useGetAllBikesQuery } from "../redux/features/bike/bikeManagement.api";


const ProductDetails = () => {
    const { id } = useParams();
    console.log(id);
    const { data, isLoading, error } = useGetSingleBikeQuery(id);
    const bike = data?.data;
    const { data: allBikes } = useGetAllBikesQuery(undefined);
    console.log(allBikes);
  console.log(bike);
    if (isLoading) return <p className="text-center text-xl">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error fetching bike details.</p>;

    // Filter similar products based on category
    const similarBikes = allBikes?.data?.filter(b => b.category === bike?.category && b._id !== bike?._id);

    return (
        <div>
        
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6 flex flex-col md:flex-row gap-8 items-center md:items-start">
    {/* Left Side: Image Gallery */}
    <div className="md:w-2/5 flex flex-col items-center">
        <img src={bike?.image} alt={bike?.name} 
            className="w-full h-[400px] object-contain rounded-lg shadow-md" 
        />
        <div className="flex gap-2 mt-2">
            {bike?.color?.map((color, index) => (
                <span key={index} className="w-6 h-6 rounded-full border border-gray-400" style={{ backgroundColor: color.toLowerCase() }}></span>
            ))}
        </div>
    </div>

    {/* Right Side: Product Info */}
    <div className="md:w-3/5 flex flex-col justify-center space-y-3">
        <h2 className="text-2xl font-bold">{bike?.name}</h2>
        <p className="text-gray-600"><strong>Brand:</strong> {bike?.brand}</p>
        <p className="text-gray-600"><strong>Description:</strong> {bike?.description}</p>
        <p className="text-gray-600"><strong>Model:</strong> {bike?.model}</p>
        <p className="text-gray-600"><strong>Category:</strong> {bike?.category}</p>
        <p className="text-gray-600"><strong>Engine Capacity:</strong> {bike?.engineCapacity}cc</p>
        <p className="text-gray-600"><strong>Stock:</strong> {bike?.stock}</p>
        <p className="text-gray-600"><strong>Price:</strong> ${bike?.price}</p>

        {/* Add to Cart & Service Booking */}
        <div className="flex gap-4 mt-4">
        <Link to={`/checkout/${bike?._id}`}>
    <button className="bg-secondaryColor text-white px-6 py-2 rounded-lg shadow-md hover:bg-orange-600 transition">
        Buy Now
    </button>
</Link>
        </div>
    </div>
</div>

            

            {/* Similar Products Section */}
            <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
                <h3 className="text-xl font-bold mb-4">Similar Products</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {similarBikes && similarBikes.length > 0 ? (
                        similarBikes.map(similarBike => (
                            <div key={similarBike._id} className="p-4 border rounded-lg shadow-md">
                                <img src={similarBike.image} alt={similarBike.name} className="w-full h-40 object-cover rounded-lg" />
                                <h4 className="text-lg font-semibold mt-2">{similarBike.name}</h4>
                                <p className="text-gray-600">${similarBike.price}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No similar products available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
