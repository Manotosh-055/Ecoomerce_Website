import axios from 'axios';
import { config } from '../../utils/axiosconfig';
import { base_url } from '../../utils/base_url';

const getColors = async()=>{
    const response = await axios.get(`${base_url}color/get-all-color`);
   //console.log(response);
    return response.data;
}

const createColor = async (color) => {
    const response = await axios.post(`${base_url}color/add-color`, color, config);
    return response.data;
}

const updateColor = async (color) => {
    const response = await axios.post(`${base_url}color/update-color/${color.id}`, {title:color.colorData.title}, config);
    return response.data;
}

const getAColor = async (id) => {
    const response = await axios.get(`${base_url}color/get-a-color/${id}`, config);
    return response.data;
}

const deleteColor = async (id) => {
    const response = await axios.delete(`${base_url}color/delete-color/${id}`, config);
    return response.data;
}

const colorService = {
    getColors,createColor,updateColor,deleteColor,getAColor,
}

export default colorService;