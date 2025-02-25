/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";
import { useCreateOrderMutation } from "./orderManagement.api.";

const Purchase = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bikeData, quantity, userEmail } = location.state || {};
  const [createOrder] = useCreateOrderMutation();
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    if (!bikeData || !quantity || !userEmail) {
      navigate("/checkout");
    }
  }, [bikeData, quantity, userEmail, navigate]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleToken = async (token : any) => {
    if (!token) {
      return toast.error("Payment failed! Try again.");
    }
    setPaid(true);
    toast.success("Payment successful!");
  };

  const handleConfirmPurchase = async () => {
    if (!paid) {
      return toast.error("Please complete the payment first!");
    }
    const newOrder = {
      userEmail,
      productName: bikeData?.name,
      productBrand: bikeData?.brand,
      productPrice: bikeData?.price,
      productImage: bikeData?.image,
      quantity,
      totalPrice: (bikeData?.price ?? 0) * quantity,
      paymentMethod: "stripe",
    };
    try {
      await createOrder(newOrder).unwrap();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Order placed successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/allProducts");
    } catch (error : any) {
      console.error("Order failed:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Error: ${(error)?.message}`,
      });
    }
  };

  return (
    <div>
      <h2>Purchase</h2>
      <div>
        <img src={bikeData?.image} alt={bikeData?.name} />
        <h3>{bikeData?.name}</h3>
        <p>Brand: {bikeData?.brand}</p>
        <p>Price: ${bikeData?.price}</p>
        <p>Quantity: {quantity}</p>
        <p>Total Price: ${(bikeData?.price ?? 0) * quantity}</p>
        <StripeCheckout
          stripeKey={import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY || ""}
          token={handleToken}
          amount={(bikeData?.price ?? 0) * quantity * 100}
          name="Order Payment"
          currency="USD"
        />
        <button onClick={handleConfirmPurchase} disabled={!paid}>
          Purchase Confirm
        </button>
      </div>
    </div>
  );
};

export default Purchase;