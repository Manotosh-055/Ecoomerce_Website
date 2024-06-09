import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAPcategory, getPcategories, resetState } from '../features/pcategory/pcategorySlice';
import { AiFillDelete } from 'react-icons/ai';
import { FaRegEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomModel from '../components/CustomModel';

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'title',
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: 'Product',
    dataIndex: 'product',
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

const CategoryList = () => {
  const [open, setOpen] = useState(false);
  const [pcategoryId, setpcategoryId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setpcategoryId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getPcategories());
  }, []);
  const pcategorystate = useSelector((state) => state.pcategory.pcategories);

  const data1 = [];
  for (let i = 0; i < pcategorystate.length; i++) {
    data1.push({
      key: i + 1,
      title: pcategorystate[i].title,
      product: 15,
      status: `In Stock`,
      action: (
        <>
          <Link className='fs-5 text-success' to={`/admin/category/${pcategorystate[i]._id}`}><FaRegEdit /></Link>
          <button className='ms-3 fs-5 text-danger bg-transparent border-0'
            onClick={() => showModal(pcategorystate[i]._id)}
            to="/"><AiFillDelete /></button>
        </>
      )
    });
  }

  const deletePcategory = (e) => {
    dispatch(deleteAPcategory(e));
    setOpen(false);
    toast.success("Product Category deleted Successfully!!");
    setTimeout(() => {
      dispatch(getPcategories());
    }, 100);
    
  }

  return (
    <div>
      <h2 className="mb-4 title">Product Categories</h2>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModel
        hideModal={hideModal}
        open={open}
        performAction={() => {deletePcategory(pcategoryId)}}
        title="Are you sure to delete this product category ?"
      />
    </div>
  );
};

export default CategoryList;