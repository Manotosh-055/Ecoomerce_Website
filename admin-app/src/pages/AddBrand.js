import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createBrand, getABrand, resetState, updateBrand } from '../features/brand/brandSlice';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

let schema = Yup.object({
  title: Yup.string().required("Brand name is required*"),
});

const AddBrand = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getBrandId = location.pathname.split("/")[3];

  const newBrand = useSelector((state) => state.brand);
  //console.log(newBrand);
  const { isSuccess, isError, isLoading, createdBrand, brandName, updatedBrand } = newBrand;

  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getABrand(getBrandId));
    } else {
      dispatch(resetState());
    }
  }, [getBrandId])

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Brand Added Successfully!!");
    }
    if (isSuccess && updatedBrand) {
      toast.success("Brand updated Successfully!!");
      navigate("/admin/brand-list");
    }
    if (isError) {
      toast.error("Something went wrong!!");
    }
  }, [isSuccess, isError, isLoading]);


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
    },
    validationSchema: schema,
    onSubmit: values => {
      if (getBrandId !== undefined) {
        const data = { id: getBrandId, brandData: values };
        dispatch(updateBrand(data));
        dispatch(resetState());
      }
      else {
        dispatch(createBrand(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }

    },
  });


  return (
    <div>
      <h3 className="mb-4 title">{getBrandId !== undefined ? "Edit" : "Add"} Brand</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>

          <CustomInput
            type="text"
            label="Enter Brand"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button type='submit' className='btn btn-success border-0 rounded-3 my-4'>{getBrandId !== undefined ? "Edit" : "Add"} Brand</button>
        </form>
      </div>
    </div>
  );
}

export default AddBrand;