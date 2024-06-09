import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import authService from "./userService";
import { toast } from 'react-toastify';

export const registerUser = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try {
        return await authService.register(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const loginUser = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
    try {
        return await authService.login(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateUserProfile = createAsyncThunk('auth/user-update', async (userData, thunkAPI) => {
    try {
        return await authService.updateProfile(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getUserWishlist = createAsyncThunk('auth/wishlist', async (thunkAPI) => {
    try {
        return await authService.getWishlist();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getCompareProducts = createAsyncThunk('auth/compare', async (thunkAPI) => {
    try {
        return await authService.getCompare();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getUserOrder = createAsyncThunk('auth/order', async (thunkAPI) => {
    try {
        return await authService.userOrder();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const addProdToCart = createAsyncThunk('auth/cart', async (cartData,thunkAPI) => {
    try {
        return await authService.addToCart(cartData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getUserCart = createAsyncThunk('auth/usercart', async (thunkAPI) => {
    try {
        return await authService.getCart();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const removeProductCart = createAsyncThunk('auth/delete-cart', async (id,thunkAPI) => {
    try {
        return await authService.removeACart(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const createUserOrder = createAsyncThunk('auth/cart/order', async (orderDetails,thunkAPI) => {
    try {
        return await authService.createOrder(orderDetails);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const forgotPasswordToken = createAsyncThunk('auth/forgot-password', async (data,thunkAPI) => {
    try {
        return await authService.forgotPassToken(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const ResetPassword = createAsyncThunk('auth/reset-password', async (data,thunkAPI) => {
    try {
        return await authService.resetPassword(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const emptyUserCart = createAsyncThunk('auth/reset-cart', async (thunkAPI) => {
    try {
        return await authService.emptyCart();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const getCustomerfromLocalStorage = localStorage.getItem('customer') ? JSON.parse(localStorage.getItem('customer'))
    : null;

const initialState = {
    user:getCustomerfromLocalStorage,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
};

export const resetState  = createAction('Reset_all');

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            }).addCase(registerUser.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.reg_user = action.payload;

            }).addCase(registerUser.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
                if(state.isError === true) {
                    toast.error(action.error);
                }
            }).addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            }).addCase(loginUser.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;

            }).addCase(loginUser.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
                if(state.isError === true) {
                    toast.error("Invalid Credintials");
                }
            }).addCase(getUserWishlist.pending, (state) => {
                state.isLoading = true;
            }).addCase(getUserWishlist.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.wishlist = action.payload;
            }).addCase(getUserWishlist.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            }).addCase(getCompareProducts.pending, (state) => {
                state.isLoading = true;
            }).addCase(getCompareProducts.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.compare = action.payload;
            }).addCase(getCompareProducts.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            }).addCase(addProdToCart.pending, (state) => {
                state.isLoading = true;
            }).addCase(addProdToCart.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.productCart = action.payload;
                if(state.isSuccess === true) {
                    toast.success("Product added to Cart");
                }
            }).addCase(addProdToCart.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            }).addCase(getUserCart.pending, (state) => {
                state.isLoading = true;
            }).addCase(getUserCart.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.userCart = action.payload;
            }).addCase(getUserCart.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            }).addCase(removeProductCart.pending, (state) => {
                state.isLoading = true;
            }).addCase(removeProductCart.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.deletedCart = action.payload;
                if(state.isSuccess === true) {
                    toast.success("Product removed from Cart Successfully");
                }
            }).addCase(removeProductCart.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
                if(state.isSuccess === false) {
                    toast.error("Something went wrong");
                }
            }).addCase(createUserOrder.pending, (state) => {
                state.isLoading = true;
            }).addCase(createUserOrder.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.userOrder = action.payload;
                if(state.isSuccess === true) {
                    toast.success("Ordered Successfully");
                }
            }).addCase(createUserOrder.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
                if(state.isSuccess === false) {
                    toast.error("Something went wrong");
                }
            }).addCase(getUserOrder.pending, (state) => {
                state.isLoading = true;
            }).addCase(getUserOrder.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.getOrder = action.payload;
            }).addCase(getUserOrder.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
                
            }).addCase(updateUserProfile.pending, (state) => {
                state.isLoading = true;
            }).addCase(updateUserProfile.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.updatedUserDetails = action.payload;
                if(state.isSuccess === true) {
                    toast.success("Profile updated successfully");
                }
            }).addCase(updateUserProfile.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
                if(state.isError === true) {
                    toast.error("Something went wrong");
                }
            }).addCase(forgotPasswordToken.pending, (state) => {
                state.isLoading = true;
            }).addCase(forgotPasswordToken.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.token = action.payload;
                if(state.isSuccess === true) {
                    toast.success("Verification mail has been sent Successfully to your Email");
                }
            }).addCase(forgotPasswordToken.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
                if(state?.isError === true){
                    toast.info("User is not Exist !!");
                }
            }).addCase(ResetPassword.pending, (state) => {
                state.isLoading = true;
            }).addCase(ResetPassword.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.updatedResetUser = action.payload;
                state.message = "success";
            }).addCase(ResetPassword.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            }).addCase(emptyUserCart.pending, (state) => {
                state.isLoading = true;
            }).addCase(emptyUserCart.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.resetCart = action.payload;
                state.message = "success";
            }).addCase(emptyUserCart.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            }).addCase(resetState, () => initialState);

    },
});

export default authSlice.reducer;