/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";
import { useCreateOrderMutation } from "./orderManagement.api";
import { useUpdateBikeMutation } from "../admin/adminManagement.api";

const Purchase = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bikeData, quantity, userEmail} = location.state || {};
  console.log("QUANTITY:", quantity);

  const [updateBike] = useUpdateBikeMutation();
  const [createOrder] = useCreateOrderMutation();

  useEffect(() => {
    if (!bikeData || !quantity || !userEmail) {
      navigate("/checkout");
    }
  }, [bikeData, quantity, userEmail, navigate]);

  const handleToken = async (token: any) => {
    if (!token) {
      return toast.error("Payment failed! Try again.");
    }

    const newOrder = {
      userEmail: userEmail ?? "N/A",
      productName: bikeData?.name ?? "Unknown Product",
      productBrand: bikeData?.brand ?? "Unknown Brand",
      productPrice: Number(bikeData?.price) || 0,
      productImage: bikeData?.image ?? "",
      quantity: quantity ?? 1,
      totalPrice: (bikeData?.price ?? 0) * (quantity ?? 1),
      paymentMethod: "stripe",
      paymentStatus: "paid",
    };

    try {
      await createOrder(newOrder).unwrap(); 

      // Update stock only if stock is available
      const updatedStock = (bikeData?.stock ?? 0) - Number(quantity);
      if (updatedStock >= 0) {
        await updateBike({
          id: bikeData?._id,
          bikeInfo: { stock: updatedStock },
        }).unwrap(); 
      }

      toast.success("Payment successful! Order placed.");
      Swal.fire({
        icon: "success",
        title: "Order placed successfully!",
        showConfirmButton: false,
        timer: 2000,
      });

 
      navigate("/allProducts");
    } catch (error: any) {
      console.error("Order failed:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Error: ${error?.message}`,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-6">
      <div className="border border-gray-700 bg-gray-900 shadow-xl p-6 rounded-lg max-w-4xl w-full">
        <h2 className="text-3xl font-bold text-center text-white mb-6 uppercase">
          Purchase
        </h2>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Product Image */}
          <div className="md:w-1/2 w-full">
            <img
              src={bikeData?.image}
              alt={bikeData?.name}
              className="w-full h-auto max-h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
          {/* Product Details */}
          <div className="md:w-1/2 w-full text-center md:text-left">
            <h3 className="text-2xl font-semibold text-white">{bikeData?.name}</h3>
            <p className="text-gray-400 mt-1">Brand: {bikeData?.brand}</p>
            <p className="text-gray-300 font-semibold text-lg mt-2">
              Price: <span className="text-orange-400">${bikeData?.price}</span>
            </p>
            <p className="text-gray-400">Quantity: {quantity}</p>
            <p className="text-xl font-medium text-gray-300 mt-4">
              Total Price:{" "}
              <span className="text-orange-400">
                ${(bikeData?.price ?? 0) * quantity}
              </span>
            </p>

            <div className="mt-6">
              <StripeCheckout
                stripeKey={import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY || ""}
                token={handleToken}
                amount={(bikeData?.price ?? 0) * quantity * 100}
                name="Order Payment"
                currency="USD"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
