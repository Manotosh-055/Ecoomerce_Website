import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { AiFillDelete, AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAEnquiry, getEnquiries } from '../features/enquiry/enquirySlice';
import { toast } from 'react-toastify';
import CustomModel from '../components/CustomModel';

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Mobile',
    dataIndex: 'mobile',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];


const Enquiries = () => {
  const [open, setOpen] = useState(false);
  const [enquiryId, setenquiryId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setenquiryId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEnquiries());
  }, []);


  const enqstate = useSelector((state) => state.enquiry.enquiries);

  const data1 = [];
  for (let i = 0; i < enqstate.length; i++) {
    data1.push({
      key: i + 1,
      name: enqstate[i].name,
      email: enqstate[i].email,
      mobile: enqstate[i].mobile,
      status: enqstate[i].status,
      action: (
        <>
          <Link className='fs-5 text-success' to={`/admin/enquiries/${enqstate[i]._id}`}><AiOutlineEye /></Link>
          <button className='ms-2 fs-5 text-danger bg-transparent border-0'
            onClick={() => showModal(enqstate[i]._id)}
            to="/"><AiFillDelete /></button>
        </>
      ),
    });
  }

  const deleteEnquiry = (e) => {
    dispatch(deleteAEnquiry(e));
    setOpen(false);
    toast.success("Enquiry deleted Successfully!!");
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 100);
  }

  return (
    <div>
      <h2 className="mb-4 title">Enquiries</h2>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModel
        hideModal={hideModal}
        open={open}
        performAction={() => { deleteEnquiry(enquiryId) }}
        title="Are you sure to delete this Enquiry ?"
      />
    </div>
  );
};

export default Enquiries;