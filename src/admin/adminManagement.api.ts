import { baseApi } from "../redux/api/baseapi";
import { TQueryParam, TResponseRedux } from "../types/global";


const adminManagemintApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createBike: builder.mutation({
            query: (bikeInfo) => ({
                url: '/bike',
                method: 'POST',
                body: bikeInfo,
            }),
        }),

        getAllUser: builder.query({
            query: (args)=>{
                const params = new URLSearchParams()
                
            
          if(args){
            args.forEach((item: TQueryParam)=>{
                params.append(item.name, item.value as string);
            })
          }
                return {
                url: '/auth/users',
                method:'GET',
                params: params
                }
            },
        
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            transformResponse: (response: TResponseRedux<any>)=>{
        //    console.log(response);
                return{
                data: response.data,
                    meta: response.meta
                }
            }
        }),
        updateBike: builder.mutation({
            query: ({ id, bikeInfo }) => ({
                url: `/bike/${id}`,
                method: 'PATCH', 
                body: bikeInfo,
            }),
        }),

       
        deleteBike: builder.mutation({
            query: (id) => ({
                url: `/bike/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useCreateBikeMutation, useGetAllUserQuery, useUpdateBikeMutation, useDeleteBikeMutation } = adminManagemintApi;
