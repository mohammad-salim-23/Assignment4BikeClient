import { baseApi } from "../redux/api/baseapi";
import { TOrder, TQueryParam, TResponseRedux } from "../types/global";

const orderManagementApi = baseApi.injectEndpoints(
    {
        endpoints : (builder)=>({
           getAllOrders: builder.query({
            query : (args)=>{
                const params = new URLSearchParams();

                if(args){
                    args.forEach((item : TQueryParam)=>{
                        params.append(item.name, item.value as string);
                    })
                }

                return {
                    url : '/orders',
                    method : 'GET',
                    params : params
                };
            },
            transformResponse: (response: TResponseRedux<TOrder[]>) => {
                return {
                    data: response?.data,
                    meta: response?.meta,
                };
            },
           }),
           getSingleOrder : builder.query({
            query : (id)=>({
                url:`/orders/${id}`,
                method: "GET",
            }),
            transformResponse: (response: TResponseRedux<TOrder>) => {
                return {
                    data: response?.data,
                };
            },
           }),
         //getOrder by userEmail
         getOrderByUser: builder.query({
            query : (userEmail)=>({
                url: `/orders/user/${userEmail}`,
                method : "GET",
            }),
            transformResponse : (response : TResponseRedux<TOrder[]>)=>{
                return {
                    data : response?.data,
                }
            }
         }),
           createOrder : builder.mutation({
            query : (newOrder)=>({
                url : "/orders",
                method :"POST",
                body : newOrder,
            })
           }),
        //  update order
        updateOrder : builder.mutation({
            query : ({orderId , updatedData})=>({
                url: `/orders/${orderId}`,
                method: "PATCH",
                body : updatedData
            }),
        }),
        // delete order
        deleteOrder : builder.mutation({
            query : (orderId)=>({
                url : `/orders/${orderId}`,
                method : "DELETE"
            }),
        }),
        }),
    }
);
export const {
   useGetAllOrdersQuery,
   useGetSingleOrderQuery,
   useCreateOrderMutation,
   useGetOrderByUserQuery,
   useUpdateOrderMutation,
   useDeleteOrderMutation
} = orderManagementApi;