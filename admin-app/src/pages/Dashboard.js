import React, { useEffect, useState } from 'react';
import { Column } from '@ant-design/plots';
import { Table } from 'antd';
import { BsArrowUpRight } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { getMonthlyData, getOrders, getYearlyData } from '../features/auth/authSlice';

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
    title: 'Product Count',
    dataIndex: 'count',
  },
  {
    title: 'Total Amount',
    dataIndex: 'price',
  },
  {
    title: 'Total Amount After Discount',
    dataIndex: 'dprice',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const orderstate = useSelector((state) => state?.auth?.orders);
  const monthlyDataState = useSelector((state) => state?.auth?.monthlyData);
  const yearlyDataState = useSelector((state) => state?.auth?.yearlyData);
  const [dataMonthly, setDataMonthly] = useState([]);
  const [dataMonthlySales, setDataMonthlySales] = useState([]);

  useEffect(() => {
    dispatch(getMonthlyData());
    dispatch(getYearlyData());
    dispatch(getOrders());
  }, []);

  useEffect(() => {
    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let data = [];
    let monthlyOrderCount = [];
    for (let index = 0; index < monthlyDataState?.length; index++) {
      const element = monthlyDataState[index];
      data.push({ type: monthNames[element?._id?.month], income: element?.amount });
      monthlyOrderCount.push({ type: monthNames[element?._id?.month], sales: element?.count });
    }
    setDataMonthly(data);
    setDataMonthlySales(monthlyOrderCount);
  }, [monthlyDataState]);

  //console.log(yearlyDataState);
  const data1 = [];
  for (let i = orderstate?.length - 1; i>=0; i--) {
    data1.push({
      key: orderstate?.length - i,
      name: orderstate[i]?.user?.name,
      count: orderstate[i]?.orderItems?.length,
      price: orderstate[i]?.totalPrice,
      dprice: orderstate[i]?.totalPriceAfterDiscount,
      status: orderstate[i]?.orderStatus,
    });
  }

  const config = {
    data: dataMonthly,
    xField: 'type',
    yField: 'income',
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Month',
      },
      sales: {
        alias: 'Income',
      },
    },
  };
  const config2 = {
    data: dataMonthlySales,
    xField: 'type',
    yField: 'sales',
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Month',
      },
      sales: {
        alias: 'Sales',
      },
    },
  };

  return (
    <div>
      <h2 className='mb-4 title'>Dashboard</h2>
      <div className='d-flex justify-content-between align-items-center gap-3'>
        <div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
          <div>
            <p className='desc'>Total Income</p>
            <h4 className='mb-0 sub-title'>${yearlyDataState?.[0]?.amount}</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            <h6><BsArrowUpRight />42%</h6>
            <p className='mb-0 desc'>Income from last year till Today</p>
          </div>
        </div>
        <div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
          <div>
            <p className='desc'>Total Sales</p>
            <h4 className='mb-0 sub-title'>{yearlyDataState?.[0]?.count}</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            <h6 className='red'><BsArrowUpRight />32%</h6>
            <p className='mb-0 desc'>Sales from last year till Today</p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between gap-5">
        <div className='mt-5 flex-grow-1 w-50'>
          <h3 className='mb-4 title'>Income Statistics</h3>
          <div><Column {...config} /></div>
        </div>
        <div className='mt-5 flex-grow-1 w-50'>
          <h3 className='mb-4 title'>Sales Statistics</h3>
          <div><Column {...config2} /></div>
        </div>
      </div>
      <div className="mt-5">
        <h3 className='mb-4 title'>Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;