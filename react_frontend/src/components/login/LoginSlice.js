/* import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import axios from "axios";
const initialState = {
    items: [],
    status: null,
};

export const loginsUser = createAsyncThunk(
    "logins/loginsUser",
    async (requestData, { rejectWithValue }) => {
        const { email, password } = requestData;
        try {
            const response = await axios.post("http://localhost:3001/api/login", { email, password }, { withCredentials: true })
            return response?.data
        } catch (error) {
            return rejectWithValue("an error occurred!");
        }
    }
);

const loginsSlice = createSlice({
    name: "logins",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginsUser.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(loginsUser.fulfilled, (state, action) => {
                state.status = "success";
                state.items = action.payload;
            })
            .addCase(loginsUser.rejected, (state, action) => {
                state.status = "rejected";
            });
    },
});


export default loginsSlice.reducer;  */