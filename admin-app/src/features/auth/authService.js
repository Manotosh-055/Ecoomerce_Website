import axios from 'axios';
import { config } from '../../utils/axiosconfig';
import { base_url } from '../../utils/base_url';

const login = async(user)=>{
    const response = await axios.post(`${base_url}user/admin-login`, user);
    if(response?.data?.token){
      localStorage.setItem("user",JSON.stringify(response.data));
    }
    return response.data;
    
}

const getOrders = async()=>{
    const response = await axios.get(`${base_url}user/get-all-order`, config);
    return response.data;
}

const getSingleProductOrder = async(id)=>{
    const response = await axios.get(`${base_url}user/get-single-order/${id}`, config);
    return response.data;
}
const updateOrderStatus = async(data)=>{
    const response = await axios.put(`${base_url}user/update-order/${data?.id}`,{status:data?.status}, config);
    return response.data;
}

const getMonthlyOrders = async()=>{
    const response = await axios.get(`${base_url}user/getMonthWiseOrderIncome`, config);
    return response.data;
}

const getYearlyStats = async()=>{
    const response = await axios.get(`${base_url}user/getYearlyTotalOrders`, config);
    return response.data;
}

const authService = {
    login,getOrders,getSingleProductOrder,updateOrderStatus,getMonthlyOrders,getYearlyStats
}

export default authService;