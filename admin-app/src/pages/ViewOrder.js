import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAOrder } from '../features/auth/authSlice';

const columns = [
    {
        title: 'SNo',
        dataIndex: 'key',
    },
    {
        title: 'Product Name',
        dataIndex: 'name',
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
    },
    {
        title: 'Category',
        dataIndex: 'category',
    },
    {
        title: 'Count',
        dataIndex: 'count',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
    },
    {
        title: 'Color',
        dataIndex: 'color',
    },
];

const ViewOrder = () => {
    const location = useLocation();
    const orderId = location.pathname.split("/")[3];
    const dispatch = useDispatch();

    const orderstate = useSelector((state) => state?.auth?.singleOrder?.orderItems);
    const orderaddress = useSelector((state) => state?.auth?.singleOrder?.shippingInfo);
   // console.log(orderaddress);

    useEffect(() => {
        dispatch(getAOrder(orderId));
    }, [orderId]);

    
    const data1 = [];
    for (let i = 0; i < orderstate?.length; i++) {
        data1.push({
            key: i + 1,
            name: orderstate[i]?.product?.title,
            brand: orderstate[i]?.product?.brand,
            category: orderstate[i]?.product?.category,
            count: orderstate[i]?.quantity,
            amount: orderstate[i]?.price,
            color: orderstate[i]?.color?.title,
        });
    }

    return (
        <div>
            <h2 className="mb-4 title">View Order</h2>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <h3 className="mt-4 title">Shipping Details</h3>
            <div className='mt-2 bg-white d-flex gap-3 flex-column p-4 rounded-3'>
                <div className="d-flex align-items-center gap-3">
                    <h6 className='mb-0'>Name :</h6>
                    <p className="mb-0">{orderaddress?.firstName + " "}{orderaddress?.lastName}</p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className='mb-0'>Address :</h6>
                    <p className="mb-0">{orderaddress?.address}</p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className='mb-0'>Landmark,Apartment etc. :</h6>
                    <p className="mb-0">{orderaddress?.other}</p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className='mb-0'>PinCode :</h6>
                    <p className="mb-0">{orderaddress?.pincode}</p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className='mb-0'>City :</h6>
                    <p className="mb-0">{orderaddress?.city}</p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className='mb-0'>State :</h6>
                    <p className="mb-0">{orderaddress?.state}</p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className='mb-0'>Country :</h6>
                    <p className="mb-0">{orderaddress?.country}</p>
                </div>
            </div>
        </div>
    );
};

export default ViewOrder;
