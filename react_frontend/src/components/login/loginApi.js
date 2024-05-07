import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from '../../auth/authSlice.jsx';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if(token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers;
    }
})

export const loginApi = createApi({
    baseQuery: baseQuery,
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: 'api/login',
                method: 'POST',
                body: {...credentials}
            })
        }),
    })
}) 
 
export const { useLoginMutation } = loginApi;




/* const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if(result?.error?.originalStatus === 403) {
        console.log("sending refresh token");
        const refreshResult = await baseQuery('/api/check-status',api, extraOptions);
        console.log(refreshResult);
        if(refreshResult?.data) {
            const user = api.getState().auth.user;
            api.dispatch(setCredentials({...refreshResult.data, user}));
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logOut());
        }
    }
    return result;
}  */