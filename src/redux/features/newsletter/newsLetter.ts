/* eslint-disable @typescript-eslint/no-unused-vars */
import { baseApi } from "../../api/baseapi";

const newsLetterApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        subscribeToNewsLetter: builder.mutation({
            query: (email) => ({
                url: '/newsletter/subscribe',
                method: 'POST',
                body: { email },
            }),
           
        })
    })
})
export const {useSubscribeToNewsLetterMutation} = newsLetterApi;