import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createCoupon, getACoupon, resetState, updateCoupon } from '../features/coupon/couponSlice';
import { useLocation, useNavigate } from 'react-router-dom';

let schema = Yup.object({
    name: Yup.string().required("Coupon name is required*"),
    expiry: Yup.date().required("Expiry Date is required*"),
    discount: Yup.number().required("Discount is required*"),
});

const AddCoupon = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const getCouponId = location.pathname.split("/")[3];
    const newCoupon = useSelector((state) => state.coupon);
    const { isSuccess, isError, isLoading, createdCoupon, couponName, couponExpiry, couponDiscount, updatedCoupon} = newCoupon;
    
    const changeDateFormat = (date) => {
        const newDate = new Date(date).toLocaleDateString();
        let [day,month,year] = newDate.split("/");
        if(1<=Number(month) && Number(month)<=9 ) month = '0'+ month;
        if(1<=Number(day) && Number(day)<=9 ) day = '0'+ day;
        return [year,month,day].join("-");
    }
    
    useEffect(() => {
        if (getCouponId !== undefined) {
            dispatch(getACoupon(getCouponId));
        } else {
            dispatch(resetState());
        }
    }, [getCouponId])

    useEffect(() => {
        if (isSuccess && createdCoupon) {
            toast.success("Coupon Added Successfully!!");
        }
        if (isSuccess && updatedCoupon) {
            toast.success("Coupon updated Successfully!!");
            navigate("/admin/coupon-list");
        }
        if (isError) {
            toast.error("Something went wrong!!");
        }
    }, [isSuccess, isError, isLoading]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: couponName || "",
            expiry: changeDateFormat(couponExpiry) || "",
            discount: couponDiscount || "",
        },
        validationSchema: schema,
        onSubmit: values => {

            if (getCouponId !== undefined) {
                const data = { id: getCouponId, couponData: values };
                dispatch(updateCoupon(data));
                dispatch(resetState());
            }
            else {
                dispatch(createCoupon(values));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState());
                }, 300);
            }
        },
    });

    return (
        <div>
            <h3 className="mb-4 title">{getCouponId !== undefined ? "Edit" : "Add"} Coupon</h3>
            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type="text"
                        label="Enter Coupon Name"
                        name="name"
                        onChng={formik.handleChange("name")}
                        onBlr={formik.handleBlur("name")}
                        val={formik.values.name}
                    />
                    <div className="error">
                        {formik.touched.name && formik.errors.name}
                    </div>
                    <CustomInput
                        type="date"
                        label="Enter expiry date"
                        name="expiry"
                        onChng={formik.handleChange("expiry")}
                        onBlr={formik.handleBlur("expiry")}
                        val={formik.values.expiry}
                    />
                    <div className="error">
                        {formik.touched.expiry && formik.errors.expiry}
                    </div>
                    <CustomInput
                        type="number"
                        label="Enter Discount"
                        name="discount"
                        onChng={formik.handleChange("discount")}
                        onBlr={formik.handleBlur("discount")}
                        val={formik.values.discount}
                    />
                    <div className="error">
                        {formik.touched.discount && formik.errors.discount}
                    </div>
                    <button type='submit' className='btn btn-success border-0 rounded-3 my-4'>{getCouponId !== undefined ? "Edit" : "Add"} Coupon</button>
                </form>
            </div>
        </div>
    );
}

export default AddCoupon;