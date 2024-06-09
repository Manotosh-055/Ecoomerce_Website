import React, { useEffect } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import BlogCard from '../components/BlogCard';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from '../features/blogs/blogSlice';
import moment from 'moment';
import { getBcategories } from '../features/bcategory/bcategorySlice';
const Blog = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        getBlogs();

    }, []);
    const blogstate = useSelector((state) => state?.blog?.blog);
    const blogcatState = useSelector((state) => state?.bcategory?.bcategories);
    console.log(blogstate);

    const getBlogs = () => {
        dispatch(getAllBlogs());
        dispatch(getBcategories());

    }
    return (
        <>
            <Meta title="Blogs" />
            <BreadCrumb title="Blogs" />
            <Container class1="blog-wrapper home-wrapper-2 py-3">

                <div className="row">
                    <div className="col-3">
                        <div className='filter-card mb-3'>
                            <h3 className="filter-title">
                                Find By Blog Categories
                            </h3>
                            <ul className='ps-0'>
                                {
                                    blogcatState && blogcatState?.map((item, index) => {
                                        return (
                                            <span
                                                key={index}
                                                style={{ fontSize: "12px" }}
                                                className="badge bg-light text-secondary rounded-3 py-2 px-3 mt-2 mx-1"
                                            >{item?.title}</span>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="row">
                            {
                                blogstate && blogstate.map((item, index) => {
                                    return (
                                        <div className="col-6 mb-3" key={index}>
                                            <BlogCard
                                                id={item?._id}
                                                title={item?.title}
                                                description={item?.description}
                                                date={moment(item?.createdAt).format('MMMM Do YYYY, h:mm a')}
                                                images={item?.images}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default Blog;
