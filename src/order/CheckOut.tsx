/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { useCreateOrderMutation } from "../order/orderManagement.api";
import { MapPin } from "lucide-react";

const Checkout = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Shipping information submitted successfully!");
    console.log(formData);
  };

  const { state } = useLocation();
  const navigate = useNavigate();
  const { cart, subtotal, userEmail } = state || {};
  const [createOrder] = useCreateOrderMutation();

  const handleToken = async (token: any) => {
    if (!token) return toast.error("Payment failed");
    const payload = cart.map((item: any) => ({
      userEmail,
      productName: item.name,
      productBrand: item.brand || "Unknown Brand",
      productPrice: item.price,
      productImage: item.image,
      quantity: item.quantity,
      totalPrice: item.price * item.quantity,
      paymentMethod: "stripe",
      paymentStatus: "paid",
    }));
    
    try {
      await createOrder(payload).unwrap(); // single request
      toast.success("Payment successful!");
      Swal.fire("Success", "Your order has been placed", "success");
      navigate("/allProducts");
    } catch (error: any) {
      console.error("Error creating order:", error.data);
      Swal.fire("Error", error?.data?.message || error?.message || "Order failed", "error");
    }
  }
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Shipping Form */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center mb-4">
              <MapPin className="text-green-600 mr-2" />
              <h2 className="text-xl font-semibold">Shipping Information</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name</label>
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name</label>
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="input"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="018xxxxxxxx"
                    className="input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Main St"
                  className="input"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="New York"
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">State</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="">Select state</option>
                    <option value="NY">New York</option>
                    <option value="CA">California</option>
                    <option value="TX">Texas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">ZIP Code</label>
                  <input
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    placeholder="10001"
                    className="input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-black font-medium py-3 rounded-md"
              >
                Submit Shipping Info
              </button>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded shadow self-start">
          <h2 className="text-lg font-bold mb-2">Order Summary</h2>
          <p>Subtotal: ${subtotal?.toFixed(2)}</p>
          <p>Shipping: Free</p>
          <h3 className="text-xl font-bold mt-2">Total: ${subtotal?.toFixed(2)}</h3>

          <div className="mt-4">
            <StripeCheckout
              stripeKey={import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY}
              token={handleToken}
              amount={subtotal * 100}
              name="Complete Purchase"
              currency="USD"
            />
          </div>
        </div>
      </div>
    </div>
  );
}



export default Checkout;
