import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getallBrands = async()=>{
    const response = await axios.get(`${base_url}brand/get-all-brand`);
    return response.data;
}
const brandService = {
    getallBrands
}

export default brandService;