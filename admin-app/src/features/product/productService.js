import axios from 'axios';
import { config } from '../../utils/axiosconfig';
import { base_url } from '../../utils/base_url';


const getProducts = async()=>{
    const response = await axios.get(`${base_url}product/get-all-product`);
    return response.data;
}

const createProduct = async (product) => {
    const response = await axios.post(`${base_url}product/create-product`, product, config);
    return response.data;
}

const deleteProduct = async (id) => {
    const response = await axios.delete(`${base_url}product/delete-product/${id}`, config);
    return response.data;
}

const productService = {
    getProducts,createProduct,deleteProduct
}

export default productService;