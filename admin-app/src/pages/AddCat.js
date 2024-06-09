import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { createProdCategory, getAProdCategory, resetState, updatePcategory } from '../features/pcategory/pcategorySlice';
import { useLocation } from 'react-router-dom';

let schema = Yup.object({
  title: Yup.string().required("Product category is required*"),
});

const AddCat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  //console.log(location);
  const getPcategoryId = location.pathname.split("/")[3];

  //console.log(getPcategoryId);

  const newPcategory = useSelector((state) => state.pcategory);
  const { isSuccess, isError, isLoading, createdPcategory, pcategoryName, updatedPcategory } = newPcategory;

  useEffect(() => {
    if (getPcategoryId !== undefined) {
      dispatch(getAProdCategory(getPcategoryId));
    } else {
      dispatch(resetState());
    }
  }, [getPcategoryId])

  useEffect(() => {
    if (isSuccess && createdPcategory) {
      toast.success("Product Category Added Successfully!!");
    }
    if (isSuccess && updatedPcategory) {
      toast.success("Product Category updated Successfully!!");
      navigate("/admin/category-list");
    }
    if (isError) {
      toast.error("Something went wrong!!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: pcategoryName || "",
    },
    validationSchema: schema,
    onSubmit: values => {
      if (getPcategoryId !== undefined) {
        const data = { id: getPcategoryId, pcategoryData: values };
        dispatch(updatePcategory(data));
        dispatch(resetState());
      }
      else {
        dispatch(createProdCategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });


  return (
    <div>
      <h3 className="mb-4 title">{getPcategoryId !== undefined ? "Edit" : "Add"} Product Category</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Product Category"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button type='submit' className='btn btn-success border-0 rounded-3 my-4'>{getPcategoryId !== undefined ? "Edit" : "Add"} Category</button>
        </form>
      </div>
    </div>
  );
}

export default AddCat;