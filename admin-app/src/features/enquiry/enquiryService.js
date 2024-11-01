import axios from 'axios';
import { config } from '../../utils/axiosconfig';
import { base_url } from '../../utils/base_url';

const getEnquiries = async()=>{
    const response = await axios.get(`${base_url}enquiry/get-all-enquiry`);
   //console.log(response);
    return response.data;
}

const getEnquiry = async(id)=>{
    const response = await axios.get(`${base_url}enquiry/get-a-enquiry/${id}`);
    return response.data;
}

const updateEnquiry = async(enq)=>{
    const response = await axios.post(`${base_url}enquiry/update-enquiry/${enq.id}`,
    {status : enq.enqData},
    config);
    return response.data;
}

const deleteEnquiry = async (id) => {
    const response = await axios.delete(`${base_url}enquiry/delete-enquiry/${id}`, config);
    return response.data;
}

const enquiryService = {
    getEnquiries,deleteEnquiry,getEnquiry,updateEnquiry,
}

export default enquiryService;