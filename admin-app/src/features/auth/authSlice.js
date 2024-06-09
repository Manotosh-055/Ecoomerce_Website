import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { toast } from 'react-toastify';

export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
    try {
        return await authService.login(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getOrders = createAsyncThunk('auth/get-orders', async (thunkAPI) => {
    try {
        return await authService.getOrders();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getAOrder = createAsyncThunk('auth/get-single-order', async (id,thunkAPI) => {
    try {
        return await authService.getSingleProductOrder(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateOrder = createAsyncThunk('auth/update-order', async (data,thunkAPI) => {
    try {
        return await authService.updateOrderStatus(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getMonthlyData = createAsyncThunk('auth/get-month-data', async (thunkAPI) => {
    try {
        return await authService.getMonthlyOrders();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getYearlyData = createAsyncThunk('auth/get-year-data', async (thunkAPI) => {
    try {
        return await authService.getYearlyStats();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const getUserfromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))
    : null;

const initialState = {
    user: getUserfromLocalStorage,
    orders: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
};



export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            }).addCase(login.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.message = "success";
                if(state?.isSuccess === true){
                    toast.success("Login Successfully !!");
                }

            }).addCase(login.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            }).addCase(getOrders.pending, (state) => {
                state.isLoading = true;
            }).addCase(getOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.orders = action.payload;
            }).addCase(getOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }).addCase(getAOrder.pending, (state) => {
                state.isLoading = true;
            }).addCase(getAOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.singleOrder = action.payload;
            }).addCase(getAOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }).addCase(updateOrder.pending, (state) => {
                state.isLoading = true;
            }).addCase(updateOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedOrder = action.payload;
            }).addCase(updateOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }).addCase(getMonthlyData.pending, (state) => {
                state.isLoading = true;
            }).addCase(getMonthlyData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.monthlyData = action.payload;
            }).addCase(getMonthlyData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }).addCase(getYearlyData.pending, (state) => {
                state.isLoading = true;
            }).addCase(getYearlyData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.yearlyData = action.payload;
            }).addCase(getYearlyData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })

    },
});

export default authSlice.reducer;