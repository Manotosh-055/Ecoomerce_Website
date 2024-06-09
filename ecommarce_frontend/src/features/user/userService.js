import axios from 'axios';
import { config } from '../../utils/axiosconfig';
import { base_url } from '../../utils/base_url';

const register = async (user) => {
    console.log(user);
    const response = await axios.post(`${base_url}user/register`, user);
    if (response.data) {
        return response.data;
    }

}

const login = async (user) => {
    //console.log(user);
    const response = await axios.post(`${base_url}user/login`, user);
    if (response?.data?.token) {
        localStorage.setItem("customer", JSON.stringify(response?.data));
    }
    return response.data;

}

const updateProfile = async (user) => {
    const response = await axios.put(`${base_url}user/update-user`, user, config);
    if (response?.data) {
        return response.data;
    }

}

const getWishlist = async () => {
    const response = await axios.get(`${base_url}user/get-wishlist`, config);
    if (response.data) {
        return response.data;
    }
}

const getCompare = async () => {
    const response = await axios.get(`${base_url}user/get-compare`, config);
    if (response.data) {
        return response.data;
    }
}

const addToCart = async (cartData) => {
    const response = await axios.post(`${base_url}user/cart`, cartData, config);
    if (response.data) {
        return response.data;
    }
}

const getCart = async () => {
    const response = await axios.get(`${base_url}user/user-cart`, config);
    if (response.data) {
        return response.data;
    }
}
const removeACart = async (id) => {
    const response = await axios.delete(`${base_url}user/delete-product-cart/${id}`, config);
    if (response.data) {
        return response.data;
    }
}
const createOrder = async (orderDetails) => {
    const response = await axios.post(`${base_url}user/cart/create-order`, orderDetails, config);
    if (response.data) {
        return response.data;
    }
}
const userOrder = async () => {
    const response = await axios.get(`${base_url}user/get-myorder`, config);
    if (response.data) {
        return response.data;
    }
}

const forgotPassToken = async (data) => {
    const response = await axios.post(`${base_url}user/forgot-password-token`, data);
    if (response.data) {
        return response.data;
    }
}

const resetPassword = async (data) => {
    const response = await axios.post(`${base_url}user/reset-password/${data.id}/${data.token}`, {password: data?.password,confirm_password: data?.confirm_password});
    if (response.data) {
        return response.data;
    }
}

const emptyCart = async () => {
    const response = await axios.delete(`${base_url}user/empty-cart`, config);
    if (response.data) {
        return response.data;
    }
}

const authService = {
    register, login, getWishlist, addToCart, getCart,
    removeACart, createOrder, userOrder, updateProfile, forgotPassToken, resetPassword, emptyCart, getCompare
}

export default authService;