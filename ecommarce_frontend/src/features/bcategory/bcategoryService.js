import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getBcategories = async()=>{
    const response = await axios.get(`${base_url}blogCategory/get-all-blog-category`);
    return response.data;
}

const bcategoryService = {
    getBcategories
}

export default bcategoryService;