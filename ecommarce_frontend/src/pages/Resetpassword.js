import React, { useEffect } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { ResetPassword } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

let resetschema = Yup.object({
    password: Yup.string().required("Password is required*"),
    confirm_password: Yup.string().required("Confirm Password is required*"),
});

const Resetpassword = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const userid = location.pathname.split("/")[2];
    const getToken = location.pathname.split("/")[3];
    const authstate = useSelector((state) => state?.auth?.message);
    const formik = useFormik({
        initialValues: {
            password: '',
            confirm_password: '',
        },
        validationSchema: resetschema,
        onSubmit: values => {
            dispatch(ResetPassword({ id: userid, token: getToken, password: values.password, confirm_password: values.confirm_password }))
        },
    });
    useEffect(() => {
        if (authstate.message === "Rejected") {
            toast.success("Password is not matched. Please try again");
        }
        if (authstate === "success") {
            toast.success("Password updated successfully.Login to continue...");
            setTimeout(() => {
                navigate("/login");
            }, 1500);
        }
    }, [authstate]);

    return (
        <>
            <Meta title="Reset Password" />
            <BreadCrumb title="Reset Password" />
            <Container class1="login-wrapper py-3 home-wrapper-2">

                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className='text-center mb-3'>Reset Password</h3>
                            <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                                <CustomInput
                                    type="password"
                                    name='password'
                                    placeholder='New Password'
                                    onChange={formik.handleChange('password')}
                                    onBlur={formik.handleBlur('password')}
                                    value={formik.values.password}
                                />
                                <div style={{ color: "red", fontSize: "14px" }} className="errors ms-2">
                                    {formik.touched.password && formik.errors.password}
                                </div>
                                <CustomInput
                                    type="password"
                                    name='confirm_password'
                                    placeholder='Confirm Password'
                                    onChange={formik.handleChange('confirm_password')}
                                    onBlur={formik.handleBlur('confirm_password')}
                                    value={formik.values.confirm_password}
                                />
                                <div style={{ color: "red", fontSize: "14px" }} className="errors ms-2">
                                    {formik.touched.confirm_password && formik.errors.confirm_password}
                                </div>
                                <div>
                                    <div className='mt-2 d-flex justify-content-center align-items-center'>
                                        <button type='submit' className='button border-0 w-100 fs-6'>Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </Container>
        </>
    )
}

export default Resetpassword;
