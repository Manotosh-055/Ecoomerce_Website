import React, { useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropzone from 'react-dropzone';
import { deleteImg, uploadProdImg } from '../features/upload/uploadSlice';
import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getBcategories } from '../features/bcategory/bcategorySlice';
import { createBlog, getABlog, resetState, updateBlog } from '../features/blog/blogSlice';

let schema = Yup.object({
    title: Yup.string().required("Title is required*"),
    description: Yup.string().required("Description is required*"),
    category: Yup.string().required("Category is required*"),

});

const AddBlog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const getBlogId = location.pathname.split("/")[3];
    const [images, setImages] = useState([]);

    const imgstate = useSelector((state) => state.upload.images);
    const bcatstate = useSelector((state) => state.bcategory.bcategories);
    const newBlog = useSelector((state) => state.blog);
    const { isSuccess, isError, isLoading, createdBlog, blogTitle, blogDescription, blogCategory, blogImages, updatedBlog } = newBlog;


    useEffect(() => {
        dispatch(resetState());
        dispatch(getBcategories());
    }, []);

    const img = [];
    useEffect(() => {
        if (getBlogId !== undefined) {
            dispatch(getABlog(getBlogId));
            img.push(blogImages);
        } else {
            dispatch(resetState());
        }
    }, [getBlogId]);


    imgstate.forEach(i => {
        img.push({
            public_id: i.public_id,
            url: i.url,
        });
    });

    useEffect(() => {
        formik.values.images = img;
    }, [imgstate]);


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: blogTitle || "",
            description: blogDescription || "",
            category: blogCategory || "",
            images: [],
        },
        validationSchema: schema,
        onSubmit: values => {

            if (getBlogId !== undefined) {
                const data = { id: getBlogId, blogData: values };
                dispatch(updateBlog(data));
                dispatch(resetState());
            }
            else {
                //alert(JSON.stringify(values));
                dispatch(createBlog(values));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState());
                    dispatch(getBcategories());
                }, 300);
            }
        },
    });

    useEffect(() => {
        if (isSuccess && createdBlog) {
            toast.success("Blog Added Successfully!!");
        }
        if (isSuccess && updatedBlog) {
            toast.success("Blog updated Successfully!!");
            navigate("/admin/blog-list");
        }
        if (isError) {
            toast.error("Something went wrong!!");
        }
    }, [isSuccess, isError, isLoading]);


    return (
        <div>
            <h2 className="mb-4 title">{getBlogId !== undefined ? "Edit" : "Add"} Blog</h2>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mt-4">
                        <CustomInput
                            type="text"
                            label="Enter Blog Title"
                            name="title"
                            onChng={formik.handleChange("title")}
                            onBlr={formik.handleBlur("title")}
                            val={formik.values.title}
                        />
                    </div>
                    <div className="error">
                        {formik.touched.title && formik.errors.title}
                    </div>
                    <select
                        name="category"
                        className="form-control py-3 mt-3"
                        onChange={formik.handleChange("category")}
                        onBlur={formik.handleBlur("category")}
                        value={formik.values.category}
                        id="">
                        <option value="">Select Blog Category</option>
                        {
                            bcatstate.map((i, j) => {
                                return (
                                    <option key={j} value={i.title}>
                                        {i.title}
                                    </option>
                                );
                            })
                        }
                    </select>
                    <div className="error mb-3">
                        {formik.touched.category && formik.errors.category}
                    </div>
                    <ReactQuill
                        theme="snow"
                        name="description"
                        onChange={formik.handleChange("description")}
                        value={formik.values.description}
                    />
                    <div className="error">
                        {formik.touched.description && formik.errors.description}
                    </div>
                    <div className="mt-3 bg-white border-1 text-center p-5">
                        <Dropzone onDrop={acceptedFiles => dispatch(uploadProdImg(acceptedFiles))}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                    <div className="showimages d-flex flex-wrap gap-3 mt-3">
                        {imgstate.map((i, j) => {
                            return (
                                <div className='position-relative' key={j}>
                                    <button
                                        type='button'
                                        onClick={() => dispatch(deleteImg(i.public_id))}
                                        className="btn-close position-absolute"
                                        style={{ top: "10px", right: "10px" }}>

                                    </button>
                                    <img src={i.url} width={200} height={200} alt="" />
                                </div>
                            );
                        })}
                    </div>
                    <button type='submit' className='btn btn-success border-0 rounded-3 my-4'>{getBlogId !== undefined ? "Edit" : "Add"} Blog</button>
                </form>
            </div>
        </div>
    );
};

export default AddBlog