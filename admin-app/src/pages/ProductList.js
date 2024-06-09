import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAProduct, getProducts, resetState } from '../features/product/productSlice';
import { Link } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import CustomModel from '../components/CustomModel';
import {toast} from 'react-toastify';
const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: 'Category',
    dataIndex: 'category',
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: 'Color',
    dataIndex: 'color',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];



const ProductList = () => {
  const [open, setOpen] = useState(false);
  const [productId, setproductId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setproductId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getProducts());
  }, []);

  const productState = useSelector((state) => state.product.products);
  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      title: productState[i].title,
      category: productState[i].category,
      brand: productState[i].brand,
      color: productState[i].color,
      quantity: productState[i].quantity,
      price: `${productState[i].price}`,
      action: (
        <>
          <Link className='fs-5 text-success' to="/"><FaRegEdit /></Link>
          <button className='ms-3 fs-5 text-danger bg-transparent border-0'
            onClick={() => showModal(productState[i]._id)}
            to="/"><AiFillDelete /></button>
        </>
      ),
    });
  }

  const deleteProduct = (e) => {
    dispatch(deleteAProduct(e));
    setOpen(false);
    toast.success("Product deleted Successfully!!");
    setTimeout(() => {
      dispatch(getProducts());
    }, 100);
    
  }

  return (
    <div>
      <h2 className="mb-4 title">Products</h2>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModel
        hideModal={hideModal}
        open={open}
        performAction={() => {deleteProduct(productId)}}
        title="Are you sure to delete this product ?"
      />
    </div>
  );
};

export default ProductList;