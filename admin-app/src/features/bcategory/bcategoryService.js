import axios from 'axios';
import { config } from '../../utils/axiosconfig';
import { base_url } from '../../utils/base_url';

const getBcategories = async()=>{
    const response = await axios.get(`${base_url}blogCategory/get-all-blog-category`);
    return response.data;
}

const createBlogCategory = async (bcategory) => {
    const response = await axios.post(`${base_url}blogCategory/add-blog-category`, bcategory, config);
    return response.data;
}

const updateBcategory = async (bcategory) => {
    const response = await axios.post(`${base_url}blogCategory/update-blog-category/${bcategory.id}`, {title:bcategory.bcategoryData.title}, config);
    return response.data;
}

const getABlogCategory = async (id) => {
    const response = await axios.get(`${base_url}blogCategory/get-a-blog-category/${id}`, config);
    return response.data;
}

const deleteBcategory = async (id) => {
    const response = await axios.delete(`${base_url}blogCategory/delete-blog-category/${id}`, config);
    return response.data;
}

const bcategoryService = {
    getBcategories,createBlogCategory,updateBcategory,getABlogCategory,deleteBcategory,
}

export default bcategoryService;