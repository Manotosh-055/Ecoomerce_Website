import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { useFormik } from 'formik';
//import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../features/brand/brandSlice';
import { getPcategories } from '../features/pcategory/pcategorySlice';
import { getColors } from '../features/color/colorSlice';
import { Select } from 'antd';
import Dropzone from 'react-dropzone';
import { deleteImg, uploadProdImg } from '../features/upload/uploadSlice';
import { createProduct, resetState } from '../features/product/productSlice';
import { toast } from 'react-toastify';

let schema = Yup.object({
    title: Yup.string().required("Title is required*"),
    description: Yup.string().required("Description is required*"),
    price: Yup.number().required("Price is required*"),
    brand: Yup.string().required("Brand is required*"),
    pcategory: Yup.string().required("Product Category is required*"),
    tags: Yup.string().required("Tag is required*"),
    color: Yup.array().min(1, "Pick atleast one color").required("Color is required*"),
    quantity: Yup.number().required("Quantity is required*"),
});

const AddProduct = () => {
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const [color, setColor] = useState([]);
    const [images, setImages] = useState([]);

    const handleColors = (e) => {
        setColor(e);
    };

    useEffect(() => {
        dispatch(getBrands());
        dispatch(getPcategories());
        dispatch(getColors());
    }, []);

    const brandstate = useSelector((state) => state.brand.brands);
    const colorstate = useSelector((state) => state.color.colors);
    const pcategorystate = useSelector((state) => state.pcategory.pcategories);
    const imgstate = useSelector((state) => state.upload.images);
    const newProduct = useSelector((state) => state.product);
    //console.log(newProduct);
    const { isSuccess, isError, isLoading, createdProduct } = newProduct;

    const coloropt = [];
    colorstate.forEach((i) => {
        coloropt.push({
            label: i.title,
            value: i._id,
        });
    });

    const img = [];
    imgstate.forEach(i => {
        img.push({
            public_id: i.public_id,
            url: i.url,
        });
    });

    useEffect(() => {
        formik.values.color = color ? color : " ";
        formik.values.images = img;
    }, [color, img]);

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            price: '',
            brand: '',
            pcategory: '',
            tags: '',
            color: '',
            quantity: '',
            images: '',
        },
        validationSchema: schema,
        onSubmit: values => {
            //alert(JSON.stringify(values));
            dispatch(createProduct(values));
            formik.resetForm();
            setColor(null);
            setTimeout(() => {
                dispatch(resetState());
                dispatch(getBrands());
                dispatch(getPcategories());
                dispatch(getColors());
            }, 2000);
        },
    });


    useEffect(() => {
        if (isSuccess && createdProduct) {
            toast.success("Product Added Successfully!!");
        }
        if (isError) {
            toast.error("Something went wrong!!");
        }
    }, [isSuccess, isError, isLoading]);

    return (
        <div>
            <h3 className="mb-4 title">Add a product</h3>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type="text"
                        label="Enter Product Title"
                        name="title"
                        onChng={formik.handleChange("title")}
                        onBlr={formik.handleBlur("title")}
                        val={formik.values.title}
                    />
                    <div className="error">
                        {formik.touched.title && formik.errors.title}
                    </div>
                    <div className="mt-3">
                        <ReactQuill
                            theme="snow"
                            name="description"
                            onChange={formik.handleChange("description")}
                            //onBlur={formik.handleBlur("description")}
                            value={formik.values.description}
                        />
                    </div>
                    <div className="error">
                        {formik.touched.description && formik.errors.description}
                    </div>
                    <CustomInput
                        type="number"
                        label="Enter Product Price"
                        name="price"
                        onChng={formik.handleChange("price")}
                        onBlr={formik.handleBlur("price")}
                        val={formik.values.price}
                    />
                    <div className="error">
                        {formik.touched.price && formik.errors.price}
                    </div>
                    <select
                        name="brand"
                        onChange={formik.handleChange("brand")}
                        onBlur={formik.handleBlur("brand")}
                        value={formik.values.brand}
                        className="form-control py-3 mt-3"
                        id="">
                        <option value="">Select Brand</option>
                        {
                            brandstate.map((i, j) => {
                                return (
                                    <option key={j} value={i.title}>
                                        {i.title}
                                    </option>
                                );
                            })
                        }
                    </select>
                    <div className="error">
                        {formik.touched.brand && formik.errors.brand}
                    </div>
                    <select
                        name="pcategory"
                        onChange={formik.handleChange("pcategory")}
                        onBlur={formik.handleBlur("pcategory")}
                        value={formik.values.pcategory}
                        className="form-control py-3 mt-3"
                        id="">
                        <option value="">Select Category</option>
                        {
                            pcategorystate.map((i, j) => {
                                return (
                                    <option key={j} value={i.title}>
                                        {i.title}
                                    </option>
                                );
                            })
                        }
                    </select>
                    <div className="error">
                        {formik.touched.pcategory && formik.errors.pcategory}
                    </div>
                    <select
                        name="tags"
                        onChange={formik.handleChange("tags")}
                        onBlur={formik.handleBlur("tags")}
                        value={formik.values.tags}
                        className="form-control py-3 mt-3"
                        id="">
                        <option value="" disabled>Select Tags</option>
                        <option value="featured">Featured</option>
                        <option value="popular">Popular</option>
                        <option value="Special">Special</option>

                    </select>
                    <div className="error">
                        {formik.touched.tags && formik.errors.tags}
                    </div>
                    <Select mode="multiple"
                        allowClear
                        className='w-100 mt-3'
                        placeholder="Select colors"
                        defaultValue={color}
                        onChange={(i) => handleColors(i)}
                        options={coloropt}
                    />
                    <div className="error">
                        {formik.touched.color && formik.errors.color}
                    </div>
                    <CustomInput
                        type="number"
                        label="Enter Quantity of Products"
                        name="quantity"
                        onChng={formik.handleChange("quantity")}
                        onBlr={formik.handleBlur("quantity")}
                        val={formik.values.quantity}
                    />
                    <div className="error">
                        {formik.touched.quantity && formik.errors.quantity}
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
                    <button type='submit' className='btn btn-success border-0 rounded-3 my-4'>Add Product</button>
                </form>
            </div>
        </div>
    )
}

export default AddProduct