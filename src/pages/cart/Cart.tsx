import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { removeFromCart, updateQuantity } from "../../redux/features/cart/cartSlice";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
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
  <div>
    <h2 className="text-2xl font-bold px-3 py-3">Your Cart</h2>
    <div className="p-6 flex flex-col lg:flex-row justify-between items-start gap-4">
  <div className="w-full lg:w-2/3">
    {cart.map((item) => (
      <div key={item._id} className="flex items-center justify-between mb-4 border-b pb-4 mt-8">
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
  <div className="w-full lg:w-1/3 p-4 shadow rounded space-y-4">
    <h3 className="text-xl font-bold mb-4">Order Summary</h3>
    <p>Subtotal: ${subtotal.toFixed(2)}</p>
    <p>Shipping: Free</p>
    <h4 className="text-xl mt-2 font-bold">Total: ${subtotal.toFixed(2)}</h4>
    <button className="bg-orange-500 text-black font-bold py-2 px-4 rounded w-full hover:bg-orange-600">Proceed to Checkout</button>
    <Link to="/allProducts"><button className="w-full text-orange-600">Continue Shopping</button></Link>
  </div>
</div>

  </div>
  );
};

export default Cart;
