import { useParams, useNavigate } from "react-router-dom";
import { useGetSingleBikeQuery } from "../redux/features/bike/bikeManagement.api";
import { useState } from "react";
import { verifyToken } from "../utils/verifyToken";
import { useAppSelector } from "../redux/hooks";
import { useCurrenttoken } from "../redux/features/auth/authSlice";
import { toast } from "sonner";
const CheckOut = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: bikeData } = useGetSingleBikeQuery(id);

  const [quantity, setQuantity] = useState(1);

  const token = useAppSelector(useCurrenttoken);
  const user = token ? verifyToken(token) : null;
  const userEmail = user?.userId;

  if (!bikeData) {
    return toast.loading("Loading bike data...");
  }

  const handleOrder = () => {
    if (bikeData?.data?.stock !== undefined && quantity > bikeData.data.stock) {
      return toast.error("Quantity exceeds available stock!");
    }
    navigate("/purchase", {
      state: {
        bikeData: bikeData?.data,
      
        quantity,
        userEmail,
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primaryColor p-6">
      <div className="border border-gray-700 bg-gray-900 shadow-xl p-6 rounded-lg max-w-4xl w-full">
        <h2 className="text-3xl font-bold text-center text-white mb-6 uppercase">Checkout</h2>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
       
          <div className="md:w-1/2 w-full">
            <img
              src={bikeData?.data?.image}
              alt={bikeData?.data?.name}
              className="w-full h-auto max-h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
          {/* Details Right */}
          <div className="md:w-1/2 w-full text-center md:text-left">
            <h3 className="text-2xl font-semibold text-white">{bikeData?.data?.name}</h3>
            <p className="text-gray-400 mt-1">Brand: {bikeData?.data?.brand}</p>
            <p className="text-gray-300 font-semibold text-lg mt-2">
              Price: <span className="text-orange-400">${bikeData?.data?.price}</span>
            </p>
            <p className="text-gray-400">Stock: {bikeData?.data?.stock}</p>

            <div className="flex justify-center md:justify-start items-center gap-4 mt-4">
              <label className="text-gray-300 font-medium">Quantity:</label>
              <input
                type="number"
                value={quantity}
                min="1"
                max={bikeData?.data?.stock}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-24 p-2 bg-gray-800 text-white border border-gray-600 rounded-md text-center"
              />
            </div>
            <p className="text-xl font-medium text-gray-300 mt-4">
              Total: <span className="text-orange-400">${(bikeData?.data?.price ?? 0) * quantity}</span>
            </p>
            <button
              onClick={handleOrder}
              className="bg-secondaryColor hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg mt-6 transition duration-300 w-full md:w-auto"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
