import { baseApi } from "../../api/baseapi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => {
                console.log("Login request body:", userInfo); 
                return {
                    url: '/auth/login',
                    method: 'POST',
                    body: userInfo,
                };
            },
        }),
        register: builder.mutation({
            query: (userInfo) => {
              
                return {
                    url: '/auth/register',
                    method: 'POST',
                    body: userInfo,
                };
            },
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
