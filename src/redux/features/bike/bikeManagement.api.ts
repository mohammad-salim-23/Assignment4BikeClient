import { TBike, TQueryParam, TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseapi";

const bikeManagementApi = baseApi.injectEndpoints({
    endpoints : (builder) =>({
        getAllBikes: builder.query({
            query: (args)=>{
                const params = new URLSearchParams()
                
             
          if(args){
            args.forEach((item : TQueryParam)=>{
                params.append(item.name, item.value as string);
            })
          }
                return {
                url: '/bike',
                method:'GET',
                params: params
                }
            },
            
            transformResponse: (response : TResponseRedux<TBike[]>)=>{
        //    console.log(response);
                return{
                data: response?.data,
                    meta: response?.meta
                }
            }
        }),
        getSingleBike : builder.query({
            query: (id)=>({
                url : `/bike/${id}`,
                method: "GET",
            }),
            transformResponse: (response : TResponseRedux<TBike>)=>{
                return {
                    data : response?.data
                }
            }
        }),
        createBike : builder.mutation({
            query: (newBike)=>({
                url : "/bike",
                method : "POST",
                body :newBike
            })
        })
    })
})
export const {useGetAllBikesQuery,  useGetSingleBikeQuery,useCreateBikeMutation} = bikeManagementApi;