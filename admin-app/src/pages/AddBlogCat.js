import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { createBlogCategory, getABlogCategory, resetState, updateBcategory } from '../features/bcategory/bcategorySlice';


let schema = Yup.object({
  title: Yup.string().required("Blog Category is required*"),
});


const AddBlogCat = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const getBcategoryId = location.pathname.split("/")[3];
  useEffect(() => {
    if (getBcategoryId !== undefined) {
      dispatch(getABlogCategory(getBcategoryId));
    } else {
      dispatch(resetState());
    }
  }, [getBcategoryId])

  const newBcategory = useSelector((state) => state.bcategory);
  const { isSuccess, isError, isLoading, createdBcategory, bcategoryName, updatedBcategory } = newBcategory;

  useEffect(() => {
    if (isSuccess && createdBcategory) {
      toast.success("Blog Category Added Successfully!!");
    }
    if (isSuccess && updatedBcategory) {
      toast.success("Blog Category updated Successfully!!");
      navigate("/admin/blog-category-list");
    }
    if (isError) {
      toast.error("Something went wrong!!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: bcategoryName || "",
    },
    validationSchema: schema,
    onSubmit: values => {
      if (getBcategoryId !== undefined) {
        const data = { id: getBcategoryId, bcategoryData: values };
        dispatch(updateBcategory(data));
        dispatch(resetState());
      }
      else {
        dispatch(createBlogCategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">{getBcategoryId !== undefined ? "Edit" : "Add"} Blog Category</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Blog Category"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button type='submit' className='btn btn-success border-0 rounded-3 my-4'>{getBcategoryId !== undefined ? "Edit" : "Add"} Blog Category</button>
        </form>
      </div>
    </div>
  );
}

export default AddBlogCat;