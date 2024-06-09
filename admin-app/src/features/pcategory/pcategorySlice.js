import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import pcategoryService from "./pcategoryService";

export const getPcategories = createAsyncThunk('pcategory/get-pcategorys', async (thunkAPI) => {
    try {
        return await pcategoryService.getPcategories();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getAProdCategory = createAsyncThunk('pcategory/get-pcategory', async (id,thunkAPI) => {
    try {
        return await pcategoryService.getAProdCategory(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const createProdCategory = createAsyncThunk('pcategory/create-pcategory', async (pcategoryData,thunkAPI) => {
    try {
        return await pcategoryService.createProdCategory(pcategoryData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updatePcategory = createAsyncThunk('pcategory/update-pcategory', async (pcategory,thunkAPI) => {
    try {
        return await pcategoryService.updatePcategory(pcategory);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteAPcategory = createAsyncThunk('pcategory/delete-pcategory', async (id,thunkAPI) => {
    try {
        return await pcategoryService.deletePcategory(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const resetState  = createAction('Reset_all');

const initialState = {
    pcategories:[],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
};

export const pcategorySlice = createSlice({
    name: "prodCategories",
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder.addCase(getPcategories.pending,(state)=>{
            state.isLoading = true;
        }).addCase(getPcategories.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.pcategories = action.payload;
        }).addCase(getPcategories.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(createProdCategory.pending,(state)=>{
            state.isLoading = true;
        }).addCase(createProdCategory.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdPcategory = action.payload;
        }).addCase(createProdCategory.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(getAProdCategory.pending,(state)=>{
            state.isLoading = true;
        }).addCase(getAProdCategory.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.pcategoryName = action.payload.title;
        }).addCase(getAProdCategory.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(updatePcategory.pending,(state)=>{
            state.isLoading = true;
        }).addCase(updatePcategory.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedPcategory = action.payload;
        }).addCase(updatePcategory.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(deleteAPcategory.pending,(state)=>{
            state.isLoading = true;
        }).addCase(deleteAPcategory.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deletedPcategory = action.payload;
        }).addCase(deleteAPcategory.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(resetState, () => initialState);
    },
})
export default pcategorySlice.reducer;