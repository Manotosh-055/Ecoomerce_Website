import React, { useEffect } from 'react'
import Container from '../components/Container';
import BreadCrumb from '../components/BreadCrumb';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCart, getUserOrder } from '../features/user/userSlice';

const Order = () => {
    const dispatch = useDispatch();
    const orderstate = useSelector((state) => state?.auth?.getOrder);
    useEffect(() => {
        dispatch(getUserOrder());
    }, [])

    return (
        <>
            <BreadCrumb title="My Orders" />
            <Container class1="cart-wrapper home-wrapper-2 py-3">
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-3">
                                <h5>Order Id</h5>
                            </div>
                            <div className="col-3">
                                <h5>Total Amount</h5>
                            </div>
                            <div className="col-3">
                                <h5>Total Amount After Discount</h5>
                            </div>
                            <div className="col-3">
                                <h5>Status</h5>
                            </div>
                        </div>
                    </div>
                    {orderstate?.length === 0 && <div className="text-center fs-5 mt-5">No Order Found</div>}
                    <div className="col-12 mt-1">
                        {
                            orderstate && orderstate?.map((item, index) => {
                                return (
                                    <div style={{ backgroundColor: "#febd69" }} key={index} className="row pt-3 my-3">
                                        <div className="col-3">
                                            <p>{item?._id}</p>
                                        </div>
                                        <div className="col-3">
                                            <p>{item?.totalPrice}</p>
                                        </div>
                                        <div className="col-3">
                                            <p>{item?.totalPriceAfterDiscount}</p>
                                        </div>
                                        <div className="col-3">
                                            <p>{item?.orderStatus}</p>
                                        </div>
                                        <div className="col-12">
                                            <div style={{ backgroundColor: "#131921" }} className="row py-3">
                                                <div className="col-3">
                                                    <h6 className='text-white'>Product Name</h6>
                                                </div>
                                                <div className="col-3">
                                                    <h6 className='text-white'>Quantity</h6>
                                                </div>
                                                <div className="col-3">
                                                    <h6 className='text-white'>Price</h6>
                                                </div>
                                                <div className="col-3">
                                                    <h6 className='text-white'>Color</h6>
                                                </div>
                                                <div className="col-12 mt-3">
                                                    {
                                                        item?.orderItems && item?.orderItems?.map((i, j) => {
                                                            return (
                                                                <div key={j} className="row">
                                                                    <div className="col-3">
                                                                        <p className='text-white'>{i?.product?.title}</p>
                                                                    </div>
                                                                    <div className="col-3">
                                                                        <p className='text-white'>{i?.quantity}</p>
                                                                    </div>
                                                                    <div className="col-3">
                                                                        <p className='text-white'>{i?.price}</p>
                                                                    </div>
                                                                    <div className="col-3">
                                                                        <ul className='colors ps-0'>
                                                                            <li style={{ backgroundColor: i?.color?.title }}></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </Container>
        </>
    );
}
export default Order;

