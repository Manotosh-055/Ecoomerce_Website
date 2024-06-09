import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login } from '../features/auth/authSlice';
import {useDispatch,useSelector} from 'react-redux';

let schema = Yup.object({
  email: Yup.string().email("Email must be valid").required("Email is required*"),
  password: Yup.string().required("Password  is required*"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: values => {
      dispatch(login(values));
    },
  });
  const authState = useSelector((state)=>state);
  const {user,isError,isSuccess,isLoading,message} = authState.auth;

  useEffect(()=>{
    if(user?.message === "notAdmin")  {
      navigate("");
    }
    if(isSuccess === true && user?.message !== "notAdmin"){
      navigate("admin");
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    }
  },[user,isError,isSuccess,isLoading]);
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-5">
        <h3 className="text-center title">Login</h3>
        <p className="text-center">Login to your account to continue.</p>
        <div className="error text-center">
            {user?.message === "notAdmin" || message.message === "Rejected"? "Invalid Credintials" : ""}

        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput type='text' name="email" label='Email Address' id="email" val={formik.values.email} onChng={formik.handleChange("email")} onBlr={formik.handleBlur("email")} />
          <div className="error">
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </div>
          <CustomInput type='password' name="password" label='Password' id="passwd" val={formik.values.password} onChng={formik.handleChange("password")} onBlr={formik.handleBlur("password")}/>
          <div className="error">
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="mb-3 text-end mt-1">
            <Link to="forgot-password" className='text-decoration-none'>Forgot Password</Link>
          </div>
          <button className='border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5' style={{ background: "#ffd333" }} type='submit'>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
