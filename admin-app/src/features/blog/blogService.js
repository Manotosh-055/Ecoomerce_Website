import axios from 'axios';
import { config } from '../../utils/axiosconfig';
import { base_url } from '../../utils/base_url';

const getBlogs = async()=>{
    const response = await axios.get(`${base_url}blog/get-all-blog-post`);
    return response.data;
}

const createBlog = async (blog) => {
    const response = await axios.post(`${base_url}blog/add-blog-post`, blog, config);
    return response.data;
}

const updateBlog = async (blog) => {
    const response = await axios.post(`${base_url}blog/update-blog-post/${blog.id}`,
        { 
            title: blog.blogData.title, 
            description: blog.blogData.description, 
            category: blog.blogData.category,
            images: blog.blogData.images,
        },
        config);
    return response.data;
}

const getABlog = async (id) => {
    const response = await axios.get(`${base_url}blog/get-a-blog/${id}`, config);
    return response.data;
}

const deleteBlog = async (id) => {
    const response = await axios.delete(`${base_url}blog/delete-blog-post/${id}`, config);
    return response.data;
}


const blogService = {
    getBlogs,createBlog,updateBlog,deleteBlog,getABlog
}

export default blogService;