import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteABrand, getBrands, resetState } from '../features/brand/brandSlice';
import { FaRegEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import CustomModel from '../components/CustomModel';
import { toast } from 'react-toastify';

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Brand',
    dataIndex: 'title',
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: 'Product',
    dataIndex: 'product',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const BrandList = () => {
  const [open, setOpen] = useState(false);
  const [brandId, setbrandId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setbrandId(e);
  };
  //console.log(brandId);
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBrands());
  }, []);
  const brandstate = useSelector((state) => state.brand.brands);
  //console.log(brandstate);
  const data1 = [];
  for (let i = 0; i < brandstate.length; i++) {
    data1.push({
      key: i + 1,
      title: brandstate[i].title,
      product: 32,
      status: `In Stock`,
      action: (
        <>
          <Link className='fs-5 text-success' to={`/admin/brand/${brandstate[i]._id}`}><FaRegEdit /></Link>
          <button className='ms-3 fs-5 text-danger bg-transparent border-0'
            onClick={() => showModal(brandstate[i]._id)}
            to="/"
          ><AiFillDelete /></button>
        </>
      )
    });
  }

  const deleteBrand = (e) => {
    dispatch(deleteABrand(e));
    setOpen(false);
    toast.success("Brand deleted Successfully!!");
    setTimeout(() => {
      dispatch(getBrands());
    }, 100);
    
  }

  return (
    <div>
      <h2 className="mb-4 title">Brands List</h2>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModel
        hideModal={hideModal}
        open={open}
        performAction={() => {deleteBrand(brandId)}}
        title="Are you sure to delete this brand ?"
      />
    </div>
  );
};

export default BrandList;