import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const LogoutApi = createApi({
    reducerPath: 'LogoutApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001",
        credentials: 'include',
        prepareHeaders: (headers) => {
            headers.set('Accept', 'application/json');
            return headers;
        }
    }),
    endpoints: (builder) => ({
        logout: builder.mutation({
            query: () => ({
                url: "api/logout",
            }),
        }),
    }),
});

export const { useLogoutMutation } = LogoutApi;