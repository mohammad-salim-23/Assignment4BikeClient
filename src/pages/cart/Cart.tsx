import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { removeFromCart, updateQuantity } from "../../redux/features/cart/cartSlice";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { selectCurrentUser } from "../../redux/features/auth/authSlice";


const Cart = () => {

  const cart = useSelector((state: RootState) => state.cart.items);
  const currentUser = useSelector(selectCurrentUser); // Get current user from the auth slice
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate for redirection


  if (!currentUser ) {
    navigate("/login");

    return null; 
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-6 flex flex-col lg:flex-row justify-between gap-8 h-screen">
      <div className="w-full lg:w-2/3">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        {cart.map((item) => (
          <div key={item._id} className="flex items-center justify-between mb-4 border-b pb-4">
            <img src={item.image} className="w-16 h-16 rounded" />
            <div className="flex-1 ml-4">
              <p>{item.name}</p>
              <p>${item.price}</p>
            </div>
            <div className="flex items-center">
              <button onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity - 1 }))}>−</button>
              <span className="mx-2">{item.quantity}</span>
              <button onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity + 1 }))}>+</button>
            </div>
            <p className="w-24 text-right">${(item.price * item.quantity).toFixed(2)}</p>
            <button onClick={() => dispatch(removeFromCart(item._id))}>❌</button>
          </div>
        ))}
      </div>
      <div className="w-full lg:w-1/3 p-4 shadow rounded bg-white">
        <h3 className="text-xl font-bold mb-4">Order Summary</h3>
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Shipping: Free</p>
        <h4 className="text-xl mt-2 font-bold">Total: ${subtotal.toFixed(2)}</h4>
        <button className="bg-teal-600 text-white mt-4 py-2 px-4 rounded w-full">Proceed to Checkout</button>
        <button className="mt-2 w-full text-teal-600">Continue Shopping</button>
      </div>
    </div>
  );
};

export default Cart;
