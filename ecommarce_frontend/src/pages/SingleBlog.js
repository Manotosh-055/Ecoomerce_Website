import React, { useEffect } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineArrowLeft } from "react-icons/hi";
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getABlog } from '../features/blogs/blogSlice';

const SingleBlog = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[2];
  useEffect(() => {
    getBlog();
  }, []);
  const blogstate = useSelector((state) => state?.blog?.singleBlog);
  const getBlog = () => {
    dispatch(getABlog(getBlogId));

  }
  return (
    <>
      <Meta title={blogstate?.title} />
      <BreadCrumb title={blogstate?.title} />
      <Container class1="blog-wrapper home-wrapper-2 py-3">

        <div className="row">
          <div className="col-12"></div>
          <div className="single-blog-card">
            <Link to="/blogs" className='d-flex gap-10 align-items-center'><HiOutlineArrowLeft className='fs-6' />Back to Blogs</Link>
            <h3 className="title">{blogstate?.title}</h3>
            <img src={blogstate?.images?.[0]?.url} className='img-fluid my-4' alt="blog" />
            <p dangerouslySetInnerHTML={{__html:blogstate?.description}}></p>
          </div>
        </div>
      </Container>
    </>
  );
}

export default SingleBlog;
