import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import bcategoryService from "./bcategoryService";

export const getBcategories = createAsyncThunk('bcategory/get-bcategorys', async (thunkAPI) => {
    try {
        return await bcategoryService.getBcategories();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getABlogCategory = createAsyncThunk('bcategory/get-bcategory', async (id,thunkAPI) => {
    try {
        return await bcategoryService.getABlogCategory(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const createBlogCategory = createAsyncThunk('bcategory/create-bcategory', async (bcategoryData,thunkAPI) => {
    try {
        return await bcategoryService.createBlogCategory(bcategoryData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateBcategory = createAsyncThunk('bcategory/update-bcategory', async (bcategory,thunkAPI) => {
    try {
        return await bcategoryService.updateBcategory(bcategory);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteABcategory = createAsyncThunk('bcategory/delete-bcategory', async (id,thunkAPI) => {
    try {
        return await bcategoryService.deleteBcategory(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const resetState  = createAction('Reset_all');

const initialState = {
    bcategories:[],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
};

export const bcategorySlice = createSlice({
    name: "blogCategories",
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder.addCase(getBcategories.pending,(state)=>{
            state.isLoading = true;
        }).addCase(getBcategories.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.bcategories = action.payload;
        }).addCase(getBcategories.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(createBlogCategory.pending,(state)=>{
            state.isLoading = true;
        }).addCase(createBlogCategory.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdBcategory = action.payload;
        }).addCase(createBlogCategory.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(getABlogCategory.pending,(state)=>{
            state.isLoading = true;
        }).addCase(getABlogCategory.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.bcategoryName = action.payload.title;
        }).addCase(getABlogCategory.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(updateBcategory.pending,(state)=>{
            state.isLoading = true;
        }).addCase(updateBcategory.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedBcategory = action.payload;
        }).addCase(updateBcategory.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(deleteABcategory.pending,(state)=>{
            state.isLoading = true;
        }).addCase(deleteABcategory.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deletedBcategory = action.payload;
        }).addCase(deleteABcategory.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(resetState, () => initialState);
    },
})
export default bcategorySlice.reducer;