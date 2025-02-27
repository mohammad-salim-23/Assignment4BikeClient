import { toast } from "sonner";
import { useGetOrderByUserQuery } from "../order/orderManagement.api.";
import { useCurrenttoken } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";

const MyOrders = () => {
    const token = useAppSelector(useCurrenttoken);
    const user = token ? verifyToken(token) : null;
    const userEmail = user?.userId;

    const { data: OrderData, isLoading } = useGetOrderByUserQuery(userEmail, { skip: !userEmail });

    if (isLoading) {
        toast.loading("Loading data...");
    }

    return (
        <div className="container mx-auto mt-8 p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">My Orders</h2>

            {OrderData?.data?.length ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="py-3 px-6 text-center">Image</th>
                                <th className="py-3 px-6 text-left">Name</th>
                                <th className="py-3 px-6 text-left">Category</th>
                                <th className="py-3 px-6 text-center">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {OrderData.data.map((order) => (
                                <tr key={order.id} className="border-b border-gray-300 hover:bg-gray-100 transition">
                                    <td className="py-3 px-6 text-center">
                                        <img src={order.productImage} alt={order.productName} className="w-16 h-16 object-cover mx-auto rounded" />
                                    </td>
                                    <td className="py-3 px-6">{order.productName}</td>
                                    <td className="py-3 px-6">{order.productBrand}</td>
                                    <td className="py-3 px-6 text-center font-semibold text-green-600">${order.totalPrice}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-lg text-gray-600">No orders found.</p>
            )}
        </div>
    );
};

export default MyOrders;
