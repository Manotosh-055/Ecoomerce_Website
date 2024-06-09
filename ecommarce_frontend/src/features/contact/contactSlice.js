import { createSlice, createAsyncThunk,createAction } from "@reduxjs/toolkit";
import contactService from "./contactService";
import { toast } from 'react-toastify';


export const createQuery = createAsyncThunk('contact/query', async (contactData,thunkAPI) => {
    try {
        return await contactService.postQuery(contactData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const contactState = {
    contact: "",
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
};

export const resetState  = createAction('Reset_all');

export const contactSlice = createSlice({
    name: "product",
    initialState: contactState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createQuery.pending, (state) => {
                state.isLoading = true;
            }).addCase(createQuery.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.contact = action.payload;
                if(state.isSuccess === true) {
                    toast.success("Submitted Successfully");
                }

            }).addCase(createQuery.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
                if(state.isError === true) {
                    toast.error("Something went wrong");
                }
            }).addCase(resetState, () => contactState);

    },
});

export default contactSlice.reducer;