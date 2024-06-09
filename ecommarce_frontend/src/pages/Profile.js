import React, { useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../features/user/userSlice';
import { FiEdit } from "react-icons/fi";

let profileschema = Yup.object({
    name: Yup.string().required("Name is required*"),
    email: Yup.string().nullable().email("Email should be valid").required("Email is required*"),
    mobile: Yup.string().default('').nullable().required("Mobile Number is required*"),
});


const Profile = () => {
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(true);
    const userstate = useSelector((state) => state?.auth?.user);
    //console.log(userstate);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: userstate?.name,
            email: userstate?.email,
            mobile: userstate?.mobile,
        },
        validationSchema: profileschema,
        onSubmit: values => {
            // alert(JSON.stringify(values));
            dispatch(updateUserProfile(values));
            setEdit(true);
        },
    });

    return (
        <>
            <BreadCrumb title="My Profile" />
            <Container class1="cart-wrapper home-wrapper-2 py-3">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex align-items-center justify-content-between">
                            <h4>Update Profile</h4>
                            <FiEdit onClick={()=>setEdit(false)} className='fs-3'/>
                        </div>
                    </div>
                    <div className="col-12 mt-3">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="Name" className="form-label">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    disabled={edit}
                                    className="form-control"
                                    id="Name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange("name")}
                                    onBlur={formik.handleBlur("name")}
                                />
                                <div className="error" style={{ color: "red" }}>
                                    {formik.touched.name && formik.errors.name}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Email" className="form-label">Email address</label>
                                <input
                                    type="email"
                                    name="email"
                                    disabled={edit}
                                    className="form-control"
                                    id="Email"
                                    aria-describedby="emailHelp"
                                    value={formik.values.email}
                                    onChange={formik.handleChange("email")}
                                    onBlur={formik.handleBlur("email")}
                                />
                                <div className="error" style={{ color: "red" }}>
                                    {formik.touched.email && formik.errors.email}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Mobile" className="form-label">Password</label>
                                <input
                                    type="tel"
                                    name="mobile"
                                    disabled={edit}
                                    className="form-control"
                                    id="Mobile"
                                    value={formik.values.mobile}
                                    onChange={formik.handleChange("mobile")}
                                    onBlur={formik.handleBlur("mobile")}
                                />
                                <div className="error" style={{ color: "red" }}>
                                    {formik.touched.mobile && formik.errors.mobile}
                                </div>
                            </div>
                            {edit === false && <button type="submit" className="button">Save</button>}
                        </form>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Profile;