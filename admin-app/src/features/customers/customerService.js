import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getUsers = async()=>{
    const response = await axios.get(`${base_url}user/usersinfo`);
   //console.log(response);
    return response.data;
}

const customerService = {
    getUsers,
}

export default customerService;