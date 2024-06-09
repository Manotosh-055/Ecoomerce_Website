import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAColor, getColors, resetState } from '../features/color/colorSlice';
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
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
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


const ColorList = () => {
  const [open, setOpen] = useState(false);
  const [colorId, setcolorId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setcolorId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getColors());
  }, []);

  const colorstate = useSelector((state) => state.color.colors);

  const data1 = [];
  for (let i = 0; i < colorstate.length; i++) {
    data1.push({
      key: i + 1,
      name: colorstate[i].title,
      product: 25,
      status: `In Stock`,
      action: (
        <>
          <Link className='fs-5 text-success' to={`/admin/color/${colorstate[i]._id}`}><FaRegEdit /></Link>
          <button className='ms-3 fs-5 text-danger bg-transparent border-0'
            onClick={() => showModal(colorstate[i]._id)}
            to="/"><AiFillDelete /></button>
        </>
      )
    });
  }

  const deleteColor = (e) => {
    dispatch(deleteAColor(e));
    setOpen(false);
    toast.success("Color deleted Successfully!!");
    setTimeout(() => {
      dispatch(getColors());
    }, 100);
    
  }

  return (
    <div>
      <h2 className="mb-4 title">Colors List</h2>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModel
        hideModal={hideModal}
        open={open}
        performAction={() => {deleteColor(colorId)}}
        title="Are you sure to delete this color ?"
      />
    </div>
  );
};

export default ColorList;