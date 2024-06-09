import axios from 'axios';
import { config } from '../../utils/axiosconfig';
import { base_url } from '../../utils/base_url';

const getProducts = async(data)=>{
    const response = await axios.get(`${base_url}product/get-all-product?${data?.brand?`brand=${data?.brand}&&`:""}${data?.tag?`tags=${data?.tag}&&`:""}${data?.category?`category=${data?.category}&&`:""}${data?.minPrice?`price[gte]=${data?.minPrice}&&`:""}${data?.maxPrice?`price[lte]=${data?.maxPrice}&&`:""}${data?.sort?`sort=${data?.sort}&&`:""}`);
    if(response.data){
        return response.data;
    } 
}

const getProduct = async(id)=>{
    const response = await axios.get(`${base_url}product/get-a-product/${id}`);
    if(response.data){
        return response.data;
    }  
}

const addToWishlist = async(prodId)=>{
    const response = await axios.put(`${base_url}product/add-to-wishlist`, {prodId}, config);
    if(response.data){
        return response.data;
    }   
}

const addToCompare = async(prodId)=>{
    const response = await axios.put(`${base_url}product/add-to-compare`, {prodId}, config);
    if(response.data){
        return response.data;
    }   
}

const rateProduct = async(data)=>{
    const response = await axios.put(`${base_url}product/rating`, data, config);
    if(response.data){
        return response.data;
    }
    
}

const productService = {
    getProducts,addToWishlist,getProduct,rateProduct,addToCompare
}

export default productService;