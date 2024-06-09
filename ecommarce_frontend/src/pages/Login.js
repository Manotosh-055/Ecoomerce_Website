import React, { useEffect } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { loginUser, resetState } from '../features/user/userSlice';
import { toast } from 'react-toastify';

let loginschema = Yup.object({
    email: Yup.string().email("Email should be valid").required("Email is required*"),
    password: Yup.string().required("Password is required*"),
});

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authstate = useSelector((state) => state?.auth);
    console.log(authstate);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginschema,
        onSubmit: values => {
            dispatch(loginUser(values));
        },
    });

    useEffect(() => {
        if (authstate?.isSuccess === true && authstate?.user) {
            if (authstate?.user?.message === "NotUser") {
                toast.info("User is not Exist !!, Please Sign up");
                setTimeout(() => {
                    formik.resetForm();
                    dispatch(resetState());
                }, 300);
            }
            else {
                toast.info("Login Successfully");
                navigate("/");
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }

        }
        if (authstate?.isError === true && authstate?.message?.message === "Rejected") {
            formik.resetForm();
            dispatch(resetState());

        }

    });

    return (
        <>
            <Meta title="Login" />
            <BreadCrumb title="Login" />
            <Container class1="login-wrapper py-3 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className='text-center mb-3'>Login</h3>
                            <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-10'>
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
                                <div>
                                    <div className="mx-2">
                                        <Link to="/forgot-password">Forgot Password?</Link>
                                    </div>
                                    <div className='mt-3 d-flex justify-content-center'>
                                        <button className='button border-0 w-100 fs-6' type='submit'>Login</button>
                                    </div>
                                    <Link to="/signup" className='mt-3 d-flex justify-content-center'>New User? SignUp</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </Container>
        </>
    )
}

export default Login;
