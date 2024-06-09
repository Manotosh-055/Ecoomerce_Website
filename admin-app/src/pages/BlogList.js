import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { FaRegEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteABlog, getBlogs, resetState } from '../features/blog/blogSlice';
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
    title: 'Category',
    dataIndex: 'category',
  },
  {
    title: 'Views',
    dataIndex: 'views',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const BlogList = () => {
  const [open, setOpen] = useState(false);
  const [blogId, setblogId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setblogId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogs());
  }, []);
  const blogstate = useSelector((state) => state.blog.blogs);
  const data1 = [];
  for (let i = 0; i <blogstate?.length; i++) {
    data1.push({
      key: i+1,
      name: blogstate[i]?.title,
      category: blogstate[i]?.category,
      views: blogstate[i]?.numViews,
      action: (
        <>
          <Link className='fs-5 text-success' to={`/admin/blog/${blogstate[i]._id}`}><FaRegEdit /></Link>
          <button className='ms-3 fs-5 text-danger bg-transparent border-0' 
          onClick={() => showModal(blogstate[i]?._id)}
          to="/"><AiFillDelete /></button>
        </>
      )
    });
  }

  const deleteBlog = (e) => {
    dispatch(deleteABlog(e));
    setOpen(false);
    toast.success("Blog deleted Successfully!!");
    setTimeout(() => {
      dispatch(getBlogs());
    }, 100);
    
  }

  return (
    <div>
      <h2 className="mb-4 title">Blogs List</h2>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModel
        hideModal={hideModal}
        open={open}
        performAction={() => {deleteBlog(blogId)}}
        title="Are you sure to delete this blog ?"
      />
    </div>
  );
};

export default BlogList;