import React, { useEffect } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { registerUser, resetState } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

let signupschema = Yup.object({
    name: Yup.string().required("Name is required*"),
    email: Yup.string().email("Email should be valid").required("Email is required*"),
    mobile: Yup.string().required("Mobile is required*"),
    password: Yup.string().required("Password is required*"),
    confirm_password: Yup.string().required("Confirm Password is required*"),

});

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authstate = useSelector((state) => state.auth);
   // console.log(authstate);
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            mobile: '',
            password: '',
            confirm_password: '',
        },
        validationSchema: signupschema,
        onSubmit: values => {
            dispatch(registerUser(values));
        },
    });
    useEffect(() => {
        if (authstate?.isError === true && authstate?.message?.message === "Rejected") {
            toast.error("Mobile Number must be 10 digit");
            setTimeout(() => {
                formik.resetForm();
                dispatch(resetState());
            }, 400);
        }
        else if (authstate?.isSuccess === true && authstate?.reg_user) {
            if (authstate?.reg_user?.message === "User") {
                toast.info("User already exist");

            }
            else if (authstate?.reg_user?.message === "notPassMatch") {
                toast.error("Password is not matched");
            }
            else {
                toast.info("Registered Successfully!, Please login to continue");
                navigate("/login");
            }
            setTimeout(() => {
                formik.resetForm();
                dispatch(resetState());
            }, 400);
        }

    });

    return (
        <>
            <Meta title="SignUp" />
            <BreadCrumb title="SignUp" />
            <Container class1="login-wrapper py-3 home-wrapper-2">

                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className='text-center mb-3'>Create Account</h3>
                            <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-10'>
                                <CustomInput
                                    type="text"
                                    name='name'
                                    placeholder='Name'
                                    value={formik.values.name}
                                    onChange={formik.handleChange("name")}
                                    onBlur={formik.handleBlur("name")}
                                />
                                <div className="error">
                                    {formik.touched.name && formik.errors.name}
                                </div>
                                <CustomInput
                                    type="email"
                                    name='email'
                                    placeholder='Email'
                                    value={formik.values.email}
                                    onChange={formik.handleChange("email")}
                                    onBlur={formik.handleBlur("email")}
                                />
                                <div className="error">
                                    {formik.touched.email && formik.errors.email}
                                </div>
                                <CustomInput
                                    type="tel"
                                    name='mobile'
                                    placeholder='Mobile Number'
                                    value={formik.values.mobile}
                                    onChange={formik.handleChange("mobile")}
                                    onBlur={formik.handleBlur("mobile")}
                                />
                                <div className="error">
                                    {formik.touched.mobile && formik.errors.mobile}
                                </div>
                                <CustomInput
                                    type="password"
                                    name='password'
                                    placeholder='Password'
                                    value={formik.values.password}
                                    onChange={formik.handleChange("password")}
                                    onBlur={formik.handleBlur("password")}
                                />
                                <div className="error">
                                    {formik.touched.password && formik.errors.password}
                                </div>
                                <CustomInput
                                    type="confirm_password"
                                    name='confirm_password'
                                    placeholder='Confirm Password'
                                    value={formik.values.confirm_password}
                                    onChange={formik.handleChange("confirm_password")}
                                    onBlur={formik.handleBlur("confirm_password")}
                                />
                                <div className="error">
                                    {formik.touched.confirm_password && formik.errors.confirm_password}
                                </div>
                                <div>
                                    <div className='mt-2 d-flex justify-content-center align-items-center'>
                                        <button className='button border-0 w-100 fs-6'>Sign Up</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </Container>
        </>
    );
}

export default Signup;
