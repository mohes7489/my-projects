import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
    credentials: 'include',
})

export const registerApi = createApi({
    baseQuery: baseQuery,
    endpoints: builder => ({
        register: builder.mutation({
            query: credentials => ({
                url: 'api/register',
                method: 'POST',
                body: credentials
            })
        }),
    })
}) 
 
export const { useRegisterMutation } = registerApi;