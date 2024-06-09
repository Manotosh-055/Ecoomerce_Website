import axios from 'axios';
import { config } from '../../utils/axiosconfig';
import { base_url } from '../../utils/base_url';

const getBrands = async()=>{
    const response = await axios.get(`${base_url}brand/get-all-brand`);
   //console.log(response);
    return response.data;
}

const createBrand = async (brand) => {
    const response = await axios.post(`${base_url}brand/add-brand`, brand, config);
    return response.data;
}

const updateBrand = async (brand) => {
    const response = await axios.post(`${base_url}brand/update-brand/${brand.id}`, {title:brand.brandData.title}, config);
    return response.data;
}

const getABrand = async (id) => {
    const response = await axios.get(`${base_url}brand/get-a-brand/${id}`, config);
    return response.data;
}

const deleteBrand = async (id) => {
    const response = await axios.delete(`${base_url}brand/delete-brand/${id}`, config);
    return response.data;
}



const brandService = {
    getBrands,createBrand,getABrand,updateBrand,deleteBrand,
}

export default brandService;