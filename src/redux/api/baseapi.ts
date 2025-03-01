
import { BaseQueryApi, BaseQueryFn, createApi, DefinitionType, FetchArgs, fetchBaseQuery, } from "@reduxjs/toolkit/query/react";

// import { logout, setUser } from "../features/auth/authSlice";
import { toast } from "sonner";
import { RootState } from "../store";
const baseQuery = fetchBaseQuery({
    baseUrl:'https://bikeshopserver-two.vercel.app/api',
    credentials: 'include',
    prepareHeaders: (headers, {getState})=>{
        const token = (getState() as RootState).auth.token;

        if(token){
            headers.set('authorization',`${token}`);
        }
        headers.set('Content-Type', 'application/json');
        return headers;
    }
});
//Customizing queries with baseQuery (Redux)
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 const baseQueryWithRefreshToken : BaseQueryFn<FetchArgs, BaseQueryApi, DefinitionType>  = async( args , api , extraOptions) : Promise<any>=>{
    const result = await baseQuery(args , api , extraOptions);
    
    if(result?.error?.status === 404){
        toast.error((result.error.data as { message: string }).message)
    }
    if(result?.error?.status === 403){
        toast.error((result.error.data as { message: string }).message)
    }
    // if(result?.error?.status === 401){
    //     console.log('Sending Refresh token');
    //     const res = await fetch('http://localhost:5000/api/auth/refresh-token',{
    //         method:'POST',
    //         credentials:'include',
    //     });
    //    const data = await res.json();
    //    console.log(data);
    //    if(data?.data?.accessToken){
    //     const user = (api.getState() as RootState).auth.user;
    //     api.dispatch(
    //      setUser({
    //          user,
    //          token:data.data.accessToken
    //      })
    //     );
    //     result = await baseQuery(args , api, extraOptions);
    //  }else{
    //     api.dispatch(logout());
    //  }
    //    }
       
    return result;
 }
export const baseApi = createApi({
    reducerPath: 'baseApi',
      baseQuery:baseQueryWithRefreshToken,
    //   tagTypes : ['semester', 'courses'],
    endpoints: () =>({})
})