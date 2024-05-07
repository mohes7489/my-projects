import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginAsync = createAsyncThunk(
  'auth/loginAsync',
  async ({ email, password }, { dispatch }) => {
    try {
      const res = await axios.post('http://localhost:3001/api/login', { email, password }, {withCredentials: true});
      return res.data;
    } catch (error) {
      console.error('Failed to log in:', error);
      throw error;
    }
  }
);

export const logoutAsync = createAsyncThunk(
  'auth/logoutAsync',
  async (_, { dispatch }) => {
    try {
      // Optionally you can perform any necessary cleanup here
      dispatch(logOut());
    } catch (error) {
      console.error('Failed to log out:', error);
      throw error;
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post('http://localhost:3001/api/register', { name, email, password });
      return res.data;
    } catch (error) {
      console.error('Failed to register:', error);
      throw error;
    }
  }
);

const initialState = {
  id: '', 
  name: '', 
  email: '', 
  role: 'guest',
  isLoggedIn: false,
  loading: false,
  error: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : initialState,
  reducers: {
    setError: (state, action) => {
      state.isLoggedIn = false;
      state.loading = false;
      state.id = '';
      state.name = '';
      state.error = true;
      state.email = '';
      state.role = 'guest' ;
    },
    setLoading: (state, action) => {
      state.isLoggedIn = false;
      state.loading = true;
      state.id = '';
      state.name = '';
      state.email = '';
      state.error = false;
      state.role = 'guest' ;
    },
    setCredentials: (state, action) => {
      state.isLoggedIn = true;
      const { id, name, email, role } = action.payload.user;
      localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
      state.loading = false;
      state.id = id;
      state.name = name;
      state.email = email;
      state.error = false;
      state.role = role;
    },
    logOut: (state, action) => {
      localStorage.clear();
      state.isLoggedIn = false;
      state.loading = false;
      state.id = '';
      state.name = '';
      state.email = '';
      state.role = 'guest' ;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isLoggedIn = true;
        const { id, name, email, role } = action.payload.user;
        localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
        state.id = id;
        state.name = name;
        state.email = email;
        state.role = role;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isLoggedIn = false;
      })
      .addCase(logoutAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.isLoggedIn = false;
        localStorage.clear();
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isLoggedIn = true;
        const { id, name, email, role } = action.payload.user;
        localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
        state.id = id;
        state.name = name;
        state.email = email;
        state.role = role;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isLoggedIn = false;
      });
  },
});

export const { setCredentials, logOut, setLoading, setError } = authSlice.actions;
export const authReducer = authSlice.reducer;
export const selectCurrentUser = (state) => state.auth.email;

