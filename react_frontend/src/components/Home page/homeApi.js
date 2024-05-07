/* import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState();
        
        //console.log("the headers is: ", token)
        return headers;
    }
});

export const homeApi = createApi({
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        checkUserRole: builder.query({
            query: () => 'api/check-status',
            transformResponse: (response) => {
                // Log the response to see what's coming from the server
                console.log(response);
                return response;
            },
        }),
    }),
});

export const { useCheckUserRoleQuery } = homeApi;
 */