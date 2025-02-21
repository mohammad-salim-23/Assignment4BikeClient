import { baseApi } from "../../api/baseapi";
const authApi = baseApi.injectEndpoints({
    endpoints: (builder)=>({
        login: builder.mutation({
            query:(userInfo)=>({
                url:'/auth/login',
                method: 'POST',
                body: userInfo,
            })
        })
    })
})
export const {useLoginMutation} = authApi;