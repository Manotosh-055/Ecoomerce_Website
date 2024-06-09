import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogService from "./blogService";


export const getAllBlogs = createAsyncThunk('blog/get-all-blog', async (thunkAPI) => {
    try {
        return await blogService.getBlogs();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getABlog = createAsyncThunk('blog/get-a-blog', async (id,thunkAPI) => {
    try {
        return await blogService.getBlog(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


const blogState = {
    blog: "",
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
};


export const blogSlice = createSlice({
    name: "blog",
    initialState: blogState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllBlogs.pending, (state) => {
                state.isLoading = true;
            }).addCase(getAllBlogs.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.blog = action.payload;

            }).addCase(getAllBlogs.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            }).addCase(getABlog.pending, (state) => {
                state.isLoading = true;
            }).addCase(getABlog.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.singleBlog = action.payload;

            }).addCase(getABlog.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })

    },
});

export default blogSlice.reducer;