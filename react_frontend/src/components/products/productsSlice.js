import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import axios from "axios";
const initialState = {
    items: [],
    status: null,
};

export const productsFetch = createAsyncThunk(
    "products/productsFetch",
    async(id = null, { rejectWithValue }) => {
        try {
            const response = await axios.get("http://localhost:3001/api/products", {withCredentials: true})
            return response?.data;
        } catch (error) {
            return rejectWithValue("an error occured!");
        }
        
    }
);

export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (productId, { rejectWithValue }) => {
        try {
            await axios.delete(`http://localhost:3001/api/products/${productId}`, { withCredentials: true })
        } catch (error) {
            return rejectWithValue("An error occurred while deleting the product.")
        }
    }
);

export const modifyProduct = createAsyncThunk(
    "products/modifyProduct",
    async ({productId ,price, name, description}, { rejectWithValue }) => {
        try {
            await axios.put(`http://localhost:3001/api/products/${productId}`, {price, name, description}, { withCredentials: true });
        } catch (error) {
            return rejectWithValue("An error occurred while modifying the product.")
        }
    }
);


const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(productsFetch.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(productsFetch.fulfilled, (state, action) => {
                state.status = "success";
                state.items = action.payload;
            })
            .addCase(productsFetch.rejected, (state, action) => {
                state.status = "rejected";
            })
            .addCase(deleteProduct.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.status = "success";
                state.items = state.items.filter(product => product.id !== action.payload);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.status = "rejected";
            })
            .addCase(modifyProduct.pending, (state) => {
                state.status = "pending";
            })
            .addCase(modifyProduct.fulfilled, (state, action) => {
                state.status = "success";
                state.items = action.payload;
            })
            .addCase(modifyProduct.rejected, (state) => {
                state.status = "rejected";
            });
    }
});

export default productsSlice.reducer; 

 