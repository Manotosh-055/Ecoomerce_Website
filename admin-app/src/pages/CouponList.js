import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteACoupon, getCoupons, resetState } from '../features/coupon/couponSlice';
import { FaRegEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomModel from '../components/CustomModel';

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Coupon',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: 'Expiry',
    dataIndex: 'expiry',
  },
  {
    title: 'Discount',
    dataIndex: 'discount',
    sorter: (a, b) => a.discount - b.discount,
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const CouponList = () => {
  const [open, setOpen] = useState(false);
  const [couponId, setcouponId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setcouponId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCoupons());
  }, []);
  const couponstate = useSelector((state) => state.coupon.coupons);

  const data1 = [];
  for (let i = 0; i < couponstate.length; i++) {
    data1.push({
      key: i + 1,
      name: couponstate[i].name,
      expiry: new Date(couponstate[i].expiry).toLocaleString(),
      discount: couponstate[i].discount,
      action: (
        <>
          <Link className='fs-5 text-success' to={`/admin/coupon/${couponstate[i]._id}`}><FaRegEdit /></Link>
          <button className='ms-3 fs-5 text-danger bg-transparent border-0'
            onClick={() => showModal(couponstate[i]._id)}
            to="/"><AiFillDelete /></button>
        </>
      )
    });
  }

  const deleteCoupon = (e) => {
    dispatch(deleteACoupon(e));
    setOpen(false);
    toast.success("Coupon deleted Successfully!!");
    setTimeout(() => {
      dispatch(getCoupons());
    }, 100);
    
  }

  return (
    <div>
      <h2 className="mb-4 title">Coupons List</h2>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModel
        hideModal={hideModal}
        open={open}
        performAction={() => {deleteCoupon(couponId)}}
        title="Are you sure to delete this coupon ?"
      />
    </div>
  );
};

export default CouponList;