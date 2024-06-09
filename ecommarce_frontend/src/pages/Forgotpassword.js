import React from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { forgotPasswordToken } from '../features/user/userSlice';


let forgotschema = Yup.object({
    email: Yup.string().nullable().email("Email should be valid").required("Email is required*"),
});

const Forgotpassword = () => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: forgotschema,
        onSubmit: values => {
            dispatch(forgotPasswordToken(values));
        },
    });

   

    return (
        <>
            <Meta title="Forgot Password" />
            <BreadCrumb title="Forgot Password" />
            <Container class1="login-wrapper py-3 home-wrapper-2">

                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className='text-center mb-3'>Reset Your Password</h3>
                            <p className="text-center mt-2 mb-3">We will send an email to reset your password</p>
                            <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                                <CustomInput
                                    type="email"
                                    name='email'
                                    placeholder='Email'
                                    onChange={formik.handleChange('email')}
                                    onBlur={formik.handleBlur('email')}
                                    value={formik.values.email}
                                  />
                                  <div style={{color:"red"}} className="errors text-center">
                                    {formik.touched.email && formik.errors.email}
                                  </div>
                                <div>
                                    <div className='mt-1 d-flex gap-15 justify-content-center flex-column align-items-center'>
                                        <button className='button border-0 w-100 fs-6' type="submit">Submit</button>
                                        <Link to="/login">Cancel</Link>
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

export default Forgotpassword;
