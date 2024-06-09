import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getPcategories = async()=>{
    const response = await axios.get(`${base_url}prodCategory/get-all-prod-category`);
    return response.data;
}
const pcategoryService = {
    getPcategories
}

export default pcategoryService;