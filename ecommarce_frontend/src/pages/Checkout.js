import React, { useEffect, useState } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineArrowLeft } from "react-icons/hi";
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { createUserOrder, emptyUserCart, getUserCart } from '../features/user/userSlice';
import { useFormik } from 'formik';
import * as Yup from "yup";

let shippingschema = Yup.object({
    firstName: Yup.string().required("First Name is required*"),
    lastName: Yup.string().required("Last Name is required*"),
    address: Yup.string().required("Address Details are required*"),
    other: Yup.string().required("Other Details are required*"),
    city: Yup.string().required("City is required*"),
    state: Yup.string().required("State is required*"),
    country: Yup.string().required("Country is required*"),
    pincode: Yup.string().required("Pincode is required*"),
});

const Checkout = () => {
    const dispatch = useDispatch();
    const cartstate = useSelector((state) => state?.auth?.userCart);
    const [totalAmount, setTotalAmount] = useState(0);
    const navigate = useNavigate();
    const paymentInfo = {
        razorpayOrderId: "647b4afc985dc0a27e322eb2",
        razorpayPaymentId: "647b4afc985dc0a27e322fad"
    };
    const [cartProduct, setCartProduct] = useState([]);

    useEffect(() => {
        dispatch(getUserCart());
    }, []);

    useEffect(() => {
        let sum = 0;
        for (let index = 0; index < cartstate?.length; index++) {
            sum = sum + Number(cartstate[index]?.quantity) * Number(cartstate[index]?.price);
        }
        setTotalAmount(sum);

        let items = [];
        for (let index = 0; index < cartstate?.length; index++) {
            items.push({
                product: cartstate[index]?.productId?._id,
                quantity: cartstate[index]?.quantity,
                color: cartstate[index]?.color?._id,
                price: cartstate[index]?.price,
            })
        }
        setCartProduct(items);
    }, [cartstate]);

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            address: "",
            other: "",
            city: "",
            state: "",
            country: "",
            pincode: "",
        },
        validationSchema: shippingschema,
        onSubmit: (values) => {
            dispatch(createUserOrder({
                shippingInfo: values,
                orderItems: cartProduct,
                totalPrice: totalAmount + 7,
                totalPriceAfterDiscount: totalAmount + 7,
                paymentInfo
            }));
            navigate("/my-orders");
            setTimeout(() => {
                dispatch(emptyUserCart());
                dispatch(getUserCart());
            }, 500);
        },

    });


    return (
        <>
            <Meta title="Checkout" />
            <BreadCrumb title="Checkout" />
            <Container class1="checkout-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-7">
                        <div className="check-left-data mb-5">
                            <h3 className="website-name">ApnaMarket</h3>
                            <nav style={{ "--bs-breadcrumb-divider": '>' }} aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item active">
                                        <Link to="/cart" className='total-price'>Cart</Link>
                                    </li>
                                    &nbsp;/
                                    <li className="breadcrumb-item active" aria-current="page">Information</li>
                                    &nbsp;/
                                    <li className="breadcrumb-item active">Shipping</li>
                                    &nbsp;/
                                    <li className="breadcrumb-item active" aria-current="page">Payment</li>
                                </ol>
                            </nav>
                            <h3 className="title total">Contact information :</h3>
                            <p className="user_details total">Manotosh Karmakar</p>
                            <p className="user_details total">manotsoh12345@techmart.com</p>
                            <h4 className='mb-3 ship-add'>Shipping Address</h4>
                            <form onSubmit={formik.handleSubmit} action="" className='d-flex flex-wrap gap-15 justify-content-between'>
                                <div className='w-100'>
                                    <select
                                        className='form-control form-select'
                                        name="country"
                                        onChange={formik.handleChange("country")}
                                        onBlur={formik.handleBlur("country")}
                                        value={formik.values.country}
                                        id=""
                                    >
                                        <option value="" selected disabled>Select Country</option>
                                        <option value="America">America</option>
                                        <option value="Australica">Australia</option>
                                        <option value="India">India</option>
                                        <option value="France">France</option>
                                        <option value="Newzeland">Newzeland</option>
                                    </select>
                                    <div className="error ms-1 ">
                                        {formik.touched.country && formik.errors.country}
                                    </div>
                                </div>
                                <div className='flex-grow-1'>
                                    <input
                                        type="text"
                                        placeholder='First Name'
                                        className="form-control"
                                        name="firstName"
                                        onChange={formik.handleChange("firstName")}
                                        onBlur={formik.handleBlur("firstName")}
                                        value={formik.values.firstName}
                                    />
                                    <div className="error ms-1 ">
                                        {formik.touched.firstName && formik.errors.firstName}
                                    </div>
                                </div>
                                <div className='flex-grow-1'>
                                    <input
                                        type="text"
                                        placeholder='Last Name'
                                        className="form-control"
                                        name="lastName"
                                        onChange={formik.handleChange("lastName")}
                                        onBlur={formik.handleBlur("lastName")}
                                        value={formik.values.lastName}
                                    />
                                    <div className="error ms-1 ">
                                        {formik.touched.lastName && formik.errors.lastName}
                                    </div>
                                </div>
                                <div className='w-100'>
                                    <input
                                        type="text"
                                        placeholder='Address'
                                        className="form-control"
                                        name="address"
                                        onChange={formik.handleChange("address")}
                                        onBlur={formik.handleBlur("address")}
                                        value={formik.values.address}
                                    />
                                </div>
                                <div className="error ms-1 ">
                                    {formik.touched.address && formik.errors.address}
                                </div>
                                <div className='w-100'>
                                    <input
                                        type="text"
                                        placeholder='Apartment, Suite, Landmark etc.'
                                        className="form-control"
                                        name="other"
                                        onChange={formik.handleChange("other")}
                                        onBlur={formik.handleBlur("other")}
                                        value={formik.values.other}
                                    />
                                    <div className="error ms-1">
                                        {formik.touched.other && formik.errors.other}
                                    </div>
                                </div>
                                <div className='flex-grow-1'>
                                    <input
                                        type="text"
                                        placeholder='City'
                                        className="form-control"
                                        name="city"
                                        onChange={formik.handleChange("city")}
                                        onBlur={formik.handleBlur("city")}
                                        value={formik.values.city}
                                    />
                                    <div className="error ms-1 ">
                                        {formik.touched.city && formik.errors.city}
                                    </div>
                                </div>

                                <div className='flex-grow-1'>
                                    <select
                                        className='form-control form-select'
                                        name="state"
                                        onChange={formik.handleChange("state")}
                                        onBlur={formik.handleBlur("state")}
                                        value={formik.values.state}
                                        id=""
                                    >
                                        <option value="" selected disabled>Select State</option>
                                        <option value="TamilNadu">TamilNadu</option>
                                        <option value="WestBengal">West Bengal</option>
                                        <option value="Mumbai">Mumbai</option>
                                    </select>
                                    <div className="error ms-1 ">
                                        {formik.touched.state && formik.errors.state}
                                    </div>
                                </div>

                                <div className='flex-grow-1'>
                                    <input
                                        type="number"
                                        placeholder='ZIP code'
                                        className="form-control"
                                        name="pincode"
                                        onChange={formik.handleChange("pincode")}
                                        onBlur={formik.handleBlur("pincode")}
                                        value={formik.values.pincode}
                                    />
                                    <div className="error ms-1 ">
                                        {formik.touched.pincode && formik.errors.pincode}
                                    </div>
                                </div>

                                <div className="w-100">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Link to='/cart' className='text-dark d-flex gap-10 align-items-center'><HiOutlineArrowLeft className='fs-6' />Return to Cart</Link>
                                        <Link to="/store" className='button'>Continue to Shopping</Link>
                                        <button type='submit' className='button'>Place Order</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className='border-bottom py-3'>
                            {
                                cartstate && cartstate?.map((item, index) => {
                                    return (
                                        <div key={index} className="d-flex gap-10 mb-2 align-items-center">
                                            <div className='w-75 d-flex gap-10'>
                                                <div className='w-25 position-relative'>
                                                    <span
                                                        style={{ top: "0px", left: "75px" }}
                                                        className='badge bg-danger text-white rounded-circle position-absolute'
                                                    >{item?.quantity}</span>
                                                    <img className='img-fluid' src={item?.productId?.images?.[0]?.url} alt="Product" />
                                                </div>
                                                <div>
                                                    <h5 className="total-price">{item?.productId?.title}</h5>
                                                    <p className='total-price'>{item?.color?.title}</p>
                                                </div>
                                            </div>
                                            <div className='flex-grow-1'>
                                                <h6 className='total'>${item?.price * item?.quantity}</h6>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className='border-bottom py-3'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className='total'>Product cost :</p>
                                <p className='total-price'>$ {totalAmount}</p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center mb-3'>
                                <p className='total mb-0'>Shipping Charges :</p>
                                <p className='total-price mb-0'>$ 5</p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className='total mb-0'>Tax Charges :</p>
                                <p className='total-price mb-0'>$ 2</p>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between align-items-center py-3'>
                            <h5 className='total'>Total :</h5>
                            <h4 className='total-price'>$ {totalAmount + 7}</h4>
                        </div>

                    </div>
                </div>
            </Container>
        </>
    );
}

export default Checkout;