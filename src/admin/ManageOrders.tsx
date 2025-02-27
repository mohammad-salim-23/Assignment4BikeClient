import { useGetAllOrdersQuery } from "../order/orderManagement.api.";

const ManageOrders = ()=>{
    const {data : ordersData, isLoading} =  useGetAllOrdersQuery(undefined);
    
    return (
        <div>

        </div>
    )
}

export default ManageOrders;