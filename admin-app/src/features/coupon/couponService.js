import axios from 'axios';
import { config } from '../../utils/axiosconfig';
import { base_url } from '../../utils/base_url';

const getCoupons = async () => {
    const response = await axios.get(`${base_url}coupon/get-all-coupon`, config);
    return response.data;
}

const createCoupon = async (coupon) => {
    const response = await axios.post(`${base_url}coupon/add-coupon`, coupon, config);
    return response.data;
}

const updateCoupon = async (coupon) => {
    //console.log(coupon);
    const response = await axios.post(`${base_url}coupon/update-coupon/${coupon.id}`,
        { 
            name: coupon.couponData.name, 
            expiry: coupon.couponData.expiry, 
            discount: coupon.couponData.discount,
        },
        config);
    return response.data;
}

const getACoupon = async (id) => {
    const response = await axios.get(`${base_url}coupon/get-a-coupon/${id}`, config);
    return response.data;
}

const deleteCoupon = async (id) => {
    const response = await axios.delete(`${base_url}coupon/delete-coupon/${id}`, config);
    return response.data;
}

const couponService = {
    getCoupons, createCoupon, updateCoupon, deleteCoupon, getACoupon,
}

export default couponService;