import React from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { AiOutlineHome, AiOutlineMail } from 'react-icons/ai';
import { BiInfoCircle, BiPhoneCall } from "react-icons/bi";
import Container from '../components/Container';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createQuery, resetState } from '../features/contact/contactSlice';
import { useDispatch } from 'react-redux';

let contactschema = Yup.object({
  name: Yup.string().required("Name is required*"),
  email: Yup.string().nullable().email("Email should be valid").required("Email is required*"),
  mobile: Yup.string().default('').nullable().required("Mobile Number is required*"),
  comment: Yup.string().default('').nullable().required("Comment is required*"),
});

const Contact = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      comment: '',
    },
    validationSchema: contactschema,
    onSubmit: values => {
      //alert(JSON.stringify(values));
      dispatch(createQuery(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 2000);
    },
  });
  return (
    <>
      <Meta title="Contact" />
      <BreadCrumb title="Contact" />
      <Container class1="contact-wrapper py-3 home-wrapper-2">

        <div className="row">
          <div className="col-12">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.652710822381!2d78.80676881474884!3d10.761225892331817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baa8d3beb869ba3%3A0x50c84f0724e3fa3a!2sNIT%20Trichy%20%3A%20OJAS%20-%20Department%20Of%20Physics%20And%20Chemistry!5e0!3m2!1sen!2sin!4v1678141611776!5m2!1sen!2sin" width="550" height="400" className='border-0 w-100' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <div className="col-12 mt-5">
            <div className="contact-inner-wrapper d-flex justify-content-between">
              <div>
                <h5 className="contact-title mb-4">Contact Us</h5>
                <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                  <div >
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder='Name'
                      onChange={formik.handleChange('name')}
                      onBlur={formik.handleBlur('name')}
                      value={formik.values.name}
                    />
                    <div className="errors">
                      {formik.touched.name && formik.errors.name}
                    </div>
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder='Email'
                      onChange={formik.handleChange('email')}
                      onBlur={formik.handleBlur('email')}
                      value={formik.values.email}
                    />
                    <div className="errors">
                      {formik.touched.email && formik.errors.email}
                    </div>
                  </div>
                  <div>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder='Mobile Number'
                      name="mobile"
                      onChange={formik.handleChange('mobile')}
                      onBlur={formik.handleBlur('mobile')}
                      value={formik.values.mobile}
                    />
                    <div className="errors">
                      {formik.touched.mobile && formik.errors.mobile}
                    </div>
                  </div>
                  <div>
                    <textarea
                      name="comment"
                      id=""
                      className='w-100 form-control'
                      cols="30"
                      rows="4"
                      placeholder='Comments'
                      onChange={formik.handleChange('comment')}
                      onBlur={formik.handleBlur('comment')}
                      value={formik.values.comment}
                    >
                    </textarea>
                    <div className="errors">
                      {formik.touched.comment && formik.errors.comment}
                    </div>
                  </div>
                  <div><button className="button border-0 w-100 mt-2 fs-6">Submit</button></div>
                </form>
              </div>
              <div>
                <h5 className="contact-title">Get In Touch</h5>
                <div>
                  <ul className="ps-0">
                    <li className='mb-3 d-flex gap-15 align-items-center'><AiOutlineHome className='fs-5' />
                      <address className='mb-0'> Hno : 345 Near, vill - Gayeshpur, Gobardanga, North 24 parganas, WB</address>
                    </li>
                    <li className='mb-3 d-flex gap-15 align-items-center'><BiPhoneCall className='fs-5' />
                      <a href="tel:+91 8562345650">+91 8562345650</a>
                    </li>
                    <li className='mb-3 d-flex gap-15 align-items-center'><AiOutlineMail className='fs-5' />
                      <a href="mailto:abcd123@gmail.com">abcd123@gmail.com</a>
                    </li>
                    <li className='mb-3 d-flex gap-15 align-items-center'><BiInfoCircle className='fs-5' />
                      <p className="mb-0">Monday - Friday, 10AM - 6AM</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Contact;
