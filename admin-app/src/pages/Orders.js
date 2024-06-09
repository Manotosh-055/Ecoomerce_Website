import React, { useEffect } from 'react'
import { Table } from 'antd';
import { getOrders, updateOrder } from '../features/auth/authSlice';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Product Cart',
    dataIndex: 'product',
  },
  {
    title: 'Total Amount',
    dataIndex: 'price',
  },
  {
    title: 'Order Date',
    dataIndex: 'date',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  }
];

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const orderstate = useSelector((state) => state?.auth?.orders);
  const data1 = [];
  for (let i = 0; i < orderstate?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderstate[i]?.user?.name,
      product: <Link to={`/admin/order/${orderstate[i]?._id}`}>View Orders</Link>,
      price: orderstate[i]?.totalPrice,
      date:new Date(orderstate[i]?.createdAt).toLocaleString(),
      action: (
        <>
          <select name="" defaultValue={orderstate[i]?.orderStatus} onClick={(e)=>updateOrderStatus(orderstate[i]?._id, e.target.value)} className='form-control form-select' id="">
            <option value="Ordered" disabled selected>Ordered</option>
            <option value="Processed">Processed</option>
            <option value="Shipped">Shipped</option>
            <option value="Out For Delivery">Out For Delivery</option>
            <option value="Deliverd">Deliverd</option>
          </select>
        </>
      ),
    });
  }

  const updateOrderStatus = (a,b) => {
    dispatch(updateOrder({id:a,status:b}));
  }

  return (
    <div>
      <h2 className="mb-4 title">Orders List</h2>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Orders;