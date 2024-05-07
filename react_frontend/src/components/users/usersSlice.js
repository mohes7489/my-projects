/* import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import axios from "axios";
const initialState = {
    items: [],
    status: null,
};

export const usersFetch = createAsyncThunk(
    "users/usersFetch",
    async(id = null, { rejectWithValue }) => {
        try {
            const response = await axios.get("http://localhost:3001/api/users", {withCredentials: true,})
            console.log("........", response.data);
        return response?.data
        } catch (error) {
            return rejectWithValue("an error occured!");
        }
    }
)

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(usersFetch.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(usersFetch.fulfilled, (state, action) => {
                state.status = "success";
                state.items = action.payload;
            })
            .addCase(usersFetch.rejected, (state, action) => {
                state.status = "rejected";
            });
    },
});


export default usersSlice.reducer; 
 */


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import axios from "axios";

const initialState = {
    items: [],
    status: null,
};

export const usersFetch = createAsyncThunk(
    "users/usersFetch",
    async (id = null, { rejectWithValue }) => {
        try {
            const response = await axios.get("http://localhost:3001/api/users", { withCredentials: true });
            return response?.data;
        } catch (error) {
            return rejectWithValue("An error occurred while fetching users.");
        }
    }
);

export const deleteUser = createAsyncThunk(
    "users/deleteUser",
    async (userId, { rejectWithValue }) => {
        try {
            await axios.delete(`http://localhost:3001/api/users/${userId}`, { withCredentials: true });
            return userId; // Return the ID of the deleted user
        } catch (error) {
            return rejectWithValue("An error occurred while deleting the user.");
        }
    }
);

export const modifyUserRole = createAsyncThunk(
    'users/modifyUserRole',
    async ({ userId, role }, { rejectWithValue }) => {
      try {
        const response = await axios.put(`http://localhost:3001/api/users/${userId}`, { role }, { withCredentials: true });
        return response.data;
      } catch (error) {
        return rejectWithValue('An error occurred while modifying the user role.');
      }
    }
  );

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(usersFetch.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(usersFetch.fulfilled, (state, action) => {
                state.status = "success";
                state.items = action.payload;
            })
            .addCase(usersFetch.rejected, (state, action) => {
                state.status = "rejected";
            })
            .addCase(deleteUser.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.status = "success";
                // Remove the deleted user from the state
                state.items = state.items.filter(user => user.id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.status = "rejected";
            })
            .addCase(modifyUserRole.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(modifyUserRole.fulfilled, (state, action) => {
                state.status = 'success';
                // Update the user's role in the state
                const updatedUser = action.payload;
                state.items = state.items.map((user) => (user.id === updatedUser.id ? updatedUser : user));
            })
              .addCase(modifyUserRole.rejected, (state) => {
                state.status = 'rejected';
            });
    },
});

export default usersSlice.reducer;
