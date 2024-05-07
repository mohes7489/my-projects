import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { useRegisterMutation } from './registerApi';

const initialState = {
  loading: false,
  error: null,
  success: false,
};

export const registerAsync = createAsyncThunk(
  'register/registerAsync',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3001/api/register", {
        name,
        email,
        password,
      })
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerAsync.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setLoading, setError, setSuccess } = registerSlice.actions;

export default registerSlice.reducer;
