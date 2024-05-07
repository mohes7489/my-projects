import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import axios from "axios";
const initialState = {
    items: [],
    status: null,
};

export const ordersFetch = createAsyncThunk(
    "orders/ordersFetch",
    async(id = null, { rejectWithValue }) => {
        try {
            const response = await axios.get("http://localhost:3001/api/orders", {withCredentials: true})
            return response?.data
        } catch (error) {
            return rejectWithValue("an error occured!");
        }
    }
)

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(ordersFetch.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(ordersFetch.fulfilled, (state, action) => {
                state.status = "success";
                state.items = action.payload;
            })
            .addCase(ordersFetch.rejected, (state, action) => {
                state.status = "rejected";
            });
    },
});


export default ordersSlice.reducer; 

 