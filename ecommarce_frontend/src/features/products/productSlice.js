import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

export const getAllProducts = createAsyncThunk('product/get-all-prod', async (data,thunkAPI) => {
    try {
        return await productService.getProducts(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getAProduct = createAsyncThunk('product/get-a-prod', async (id,thunkAPI) => {
    try {
        return await productService.getProduct(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const addToWishlist = createAsyncThunk('product/wishlist', async (prodId,thunkAPI) => {
    try {
        return await productService.addToWishlist(prodId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const addToCompare = createAsyncThunk('product/compare', async (prodId,thunkAPI) => {
    try {
        return await productService.addToCompare(prodId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const addRating = createAsyncThunk('product/rate-product', async (data,thunkAPI) => {
    try {
        return await productService.rateProduct(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const productState = {
    product: "",
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
};



export const productSlice = createSlice({
    name: "product",
    initialState: productState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true;
            }).addCase(getAllProducts.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.product = action.payload;

            }).addCase(getAllProducts.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            }).addCase(addToWishlist.pending, (state) => {
                state.isLoading = true;
            }).addCase(addToWishlist.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.addToWishlist = action.payload;
            }).addCase(addToWishlist.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            }).addCase(addToCompare.pending, (state) => {
                state.isLoading = true;
            }).addCase(addToCompare.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.addToCompare = action.payload;
            }).addCase(addToCompare.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            }).addCase(getAProduct.pending, (state) => {
                state.isLoading = true;
            }).addCase(getAProduct.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.singleProduct = action.payload;
            }).addCase(getAProduct.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            }).addCase(addRating.pending, (state) => {
                state.isLoading = true;
            }).addCase(addRating.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.ratedProduct = action.payload;
            }).addCase(addRating.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })

    },
});

export default productSlice.reducer;