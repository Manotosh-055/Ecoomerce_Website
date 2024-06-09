import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getBlogs = async()=>{
    const response = await axios.get(`${base_url}blog/get-all-blog-post`);
    if(response.data){
        return response.data;
    }
    
}

const getBlog = async(id)=>{
    const response = await axios.get(`${base_url}blog/get-a-blog/${id}`);
    if(response.data){
        return response.data;
    }   
}

const blogService = {
    getBlogs,getBlog,
}

export default blogService;