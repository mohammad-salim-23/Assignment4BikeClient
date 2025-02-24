import { useParams } from "react-router-dom";
import { useGetSingleBikeQuery } from "../redux/features/bike/bikeManagement.api";
import { useState } from "react";
import { verifyToken } from "../utils/verifyToken";
import { useAppSelector } from "../redux/hooks";
import { useCurrenttoken } from "../redux/features/auth/authSlice";
import { useCreateOrderMutation } from "./orderManagement.api.";
import { toast } from "sonner";
import Swal from "sweetalert2";

const CheckOut = ()=>{
   const {id} = useParams();
   const { data : bikeData} = useGetSingleBikeQuery(id);
   const [quantity , setQuantity] = useState(1);
      const token = useAppSelector(useCurrenttoken);
       const user = token ? verifyToken(token) : null;
       const userEmail = user?.userId;
        const [createOrder] = useCreateOrderMutation();

        if(!bikeData) {
            return toast.loading("Loading bike data...");
        }
        const handleOrder = async () =>{
            if(bikeData?.data?.stock !== undefined && quantity > bikeData.data.stock){
              toast.error("Quantity exceeds available stock!");
            }
           const newOrder = {
            userEmail,
            productName: bikeData?.data?.name,
            productBrand: bikeData?.data?.brand,
            productPrice: bikeData?.data?.price,
            productImage: bikeData?.data?.image,
            quantity,
            totalPrice : (bikeData?.data?.price ?? 0) * quantity,
             paymentMethod : "stripe"

           };
           try{
            await createOrder(newOrder);
             
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
              });
           }catch(error){
            console.error("Order failed: ", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Error: ${error}`,
               
              });
           }
        }
    return (
        <div>
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
                <p>Total Price: ${(bikeData?.data?.price ?? 0)* quantity}</p>
                <button onClick={handleOrder}>Order Now</button>
            </div>
        </div>
        </div>
    )
}
export default CheckOut;