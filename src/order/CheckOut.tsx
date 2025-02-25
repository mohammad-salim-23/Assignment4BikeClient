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
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div>
        <img src={bikeData?.data?.image} alt={bikeData?.data?.name} />
        <h3>{bikeData?.data?.name}</h3>
        <p>Brand: {bikeData?.data?.brand}</p>
        <p>Price: ${bikeData?.data?.price}</p>
        <p>Available Stock: {bikeData?.data?.stock}</p>
        <input
          type="number"
          value={quantity}
          min="1"
          max={bikeData?.data?.stock}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <p>Total Price: ${(bikeData?.data?.price ?? 0) * quantity}</p>
        <button onClick={handleOrder}>Order Now</button>
      </div>
    </div>
  );
};
export default CheckOut;