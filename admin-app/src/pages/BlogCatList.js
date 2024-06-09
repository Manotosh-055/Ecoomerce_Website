import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { FaRegEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteABcategory, getBcategories, resetState } from '../features/bcategory/bcategorySlice';
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

const BlogCatList = () => {
  const [open, setOpen] = useState(false);
  const [bcategoryId, setbcategoryId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setbcategoryId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBcategories());
  }, []);
  const bcategorystate = useSelector((state) => state.bcategory.bcategories);
  const data1 = [];
  for (let i = 0; i < bcategorystate.length; i++) {
    data1.push({
      key: i + 1,
      name: bcategorystate[i].title,
      product: 14,
      status: `In Stock`,
      action: (
        <>
          <Link className='fs-5 text-success' to={`/admin/blog-category/${bcategorystate[i]._id}`}><FaRegEdit /></Link>
          <button className='ms-3 fs-5 text-danger bg-transparent border-0' 
          onClick={() => showModal(bcategorystate[i]._id)}
          to="/"><AiFillDelete /></button>
        </>
      )
    });
  }

  const deleteBcategory = (e) => {
    dispatch(deleteABcategory(e));
    setOpen(false);
    toast.success("Blog Category deleted Successfully!!");
    setTimeout(() => {
      dispatch(getBcategories());
    }, 100);
    
  }

  return (
    <div>
      <h2 className="mb-4 title">Blog Categories</h2>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModel
        hideModal={hideModal}
        open={open}
        performAction={() => {deleteBcategory(bcategoryId)}}
        title="Are you sure to delete this blog category ?"
      />
    </div>
  );
};

export default BlogCatList;