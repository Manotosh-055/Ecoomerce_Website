import axios from 'axios';
import { config } from '../../utils/axiosconfig';
import { base_url } from '../../utils/base_url';

const getPcategories = async()=>{
    const response = await axios.get(`${base_url}prodCategory/get-all-prod-category`);
   //console.log(response);
    return response.data;
}

const createProdCategory = async (pcategory) => {
    const response = await axios.post(`${base_url}prodCategory/add-category`, pcategory, config);
   //console.log(response.data);
    return response.data;
}


const updatePcategory = async (pcategory) => {
    const response = await axios.post(`${base_url}prodCategory/update-category/${pcategory.id}`, {title:pcategory.pcategoryData.title}, config);
    return response.data;
}

const getAProdCategory = async (id) => {
    const response = await axios.get(`${base_url}prodCategory/get-a-prod-category/${id}`, config);
    return response.data;
}

const deletePcategory = async (id) => {
    const response = await axios.delete(`${base_url}prodCategory/delete-category/${id}`, config);
    return response.data;
}


const pcategoryService = {
    getPcategories,createProdCategory,updatePcategory,getAProdCategory,deletePcategory,
}

export default pcategoryService;