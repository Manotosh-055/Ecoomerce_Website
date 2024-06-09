import axios from "axios";
import {config} from "../../utils/axiosconfig.js";
import { base_url } from "../../utils/base_url.js";

const uploadProdImg = async (data) =>{
    
    console.log(data);
    const response = await axios.post(`${base_url}img/upload-product-img`,data,config);
    return response.data;
}

const deleteImg = async (id) =>{
    const response = await axios.delete(`${base_url}img/delete-img/${id}`,config);
    return response.data;
}

const uploadService = {
    uploadProdImg,deleteImg,
};

export default uploadService;