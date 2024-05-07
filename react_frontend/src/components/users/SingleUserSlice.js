import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserDetails = createAsyncThunk(
    'userDetails/fetchUserDetails',
    async (userId, { rejectWithValue }) => {
      try {
        const response = await axios.get(`http://localhost:3001/api/users/${userId}`, { withCredentials: true });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  
  
  const userDetailsSlice = createSlice({
    name: 'userDetails',
    initialState: {
      user: null,
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchUserDetails.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchUserDetails.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
        })
        .addCase(fetchUserDetails.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export const selectUserDetails = (state) => state.userDetails.user;
  export const selectUserLoading = (state) => state.userDetails.loading;
  export const selectUserError = (state) => state.userDetails.error;
  
  export default userDetailsSlice.reducer;