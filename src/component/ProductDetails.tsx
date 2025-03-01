import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetSingleBikeQuery, useGetAllBikesQuery } from "../redux/features/bike/bikeManagement.api";
import { useAppSelector } from "../redux/hooks"; 
import { useCurrenttoken } from "../redux/features/auth/authSlice";


const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = useAppSelector(useCurrenttoken); 

    const { data, isLoading, error } = useGetSingleBikeQuery(id);
    const bike = data?.data;
    const { data: allBikes } = useGetAllBikesQuery(undefined);

    if (isLoading) return <p className="text-center text-xl text-white">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error fetching bike details.</p>;

    const similarBikes = allBikes?.data?.filter(b => b.category === bike?.category && b._id !== bike?._id);

    // Function to handle Buy Now click
    const handleBuyNow = () => {
        if (!token) {
            return navigate("/signin"); // Redirect to sign-in if not logged in
        }
        navigate(`/checkout/${bike?._id}`);
    };

    return (
        <div className="bg-black min-h-screen text-white p-6">
            <div className="max-w-6xl mx-auto p-6 bg-gray-900 shadow-lg rounded-lg mt-6 flex flex-col md:flex-row gap-8 items-start">
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
                <div className="md:w-3/5 flex flex-col justify-start self-start space-y-3">
                    <h2 className="text-3xl font-bold text-orange-400">{bike?.name}</h2>
                    <p><strong>Brand:</strong> {bike?.brand}</p>
                    <p><strong>Description:</strong> {bike?.description}</p>
                    <p><strong>Model:</strong> {bike?.model}</p>
                    <p><strong>Category:</strong> {bike?.category}</p>
                    <p><strong>Engine Capacity:</strong> {bike?.engineCapacity}cc</p>
                    <p><strong>Stock:</strong> {bike?.stock}</p>
                    <p className="text-lg font-semibold text-orange-400"><strong>Price:</strong> ${bike?.price}</p>

                    {/* Buy Now Button */}
                    <div className="flex gap-4 mt-4">
                        <button 
                            onClick={handleBuyNow} 
                            className="bg-orange-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-orange-600 transition"
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Similar Products Section */}
            <div className="max-w-6xl mx-auto mt-10 p-6 bg-gray-900 shadow-lg rounded-lg">
                <h3 className="text-2xl font-bold text-orange-400 mb-4">Similar Products</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {similarBikes && similarBikes.length > 0 ? (
                        similarBikes.map(similarBike => (
                            <Link 
                                key={similarBike._id} 
                                to={`/productDetails/${similarBike._id}`} 
                                className="p-4 border border-gray-700 rounded-lg shadow-md bg-gray-800 hover:bg-gray-700 transition transform hover:scale-105"
                            >
                                <img src={similarBike.image} alt={similarBike.name} className="w-full h-40 object-cover rounded-lg" />
                                <h4 className="text-lg font-semibold mt-2 text-white">{similarBike.name}</h4>
                                <p className="text-orange-400 font-semibold">${similarBike.price}</p>
                                <button className="btn bg-secondaryColor mt-3 text-center w-full text-white hover:bg-orange-600 py-2 px-4 font-bold rounded">
                                    View Details
                                </button>
                            </Link>
                        ))
                    ) : (
                        <p className="text-gray-400">No similar products available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
