import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import uploadService from "./uploadService";

export const uploadProdImg = createAsyncThunk('upload/images', async (data,thunkAPI) => {
    try {
        console.log("1. uploadProdImg " + data );
        const formData = new FormData();
        for(let i = 0; i < data.length; i++) {
            formData.append("images",data[i]);
        } 
        console.log("2 . uploadProdImg " + formData );
        return await uploadService.uploadProdImg(formData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteImg = createAsyncThunk('delete/images', async (id,thunkAPI) => {
    try {
        return await uploadService.deleteImg(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const initialState = {
    images:[],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
};

export const uploadSlice = createSlice({
    name: "images",
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder.addCase(uploadProdImg.pending,(state)=>{
            state.isLoading = true;
        }).addCase(uploadProdImg.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.images = action.payload;
        }).addCase(uploadProdImg.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(deleteImg.pending,(state)=>{
            state.isLoading = true;
        }).addCase(deleteImg.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.images = [];
        }).addCase(deleteImg.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
        })
    },
})
export default uploadSlice.reducer;