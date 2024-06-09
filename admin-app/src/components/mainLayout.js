import React, { useState } from 'react';
import { Layout, Menu, Button, theme } from 'antd';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineDashboard, AiFillFileAdd, AiOutlineBgColors, AiOutlineSearch,AiOutlineMenuFold } from 'react-icons/ai';
import { BiUserCircle, BiListUl, BiCategory } from 'react-icons/bi';
import { BsCardChecklist, BsCartCheck } from 'react-icons/bs';
import { SiBrandfolder, SiMicrodotblog } from 'react-icons/si';
import { TiThMenu } from 'react-icons/ti';
import { TbLogout } from 'react-icons/tb';
import { FaBlogger } from 'react-icons/fa';
import { MdQuestionAnswer } from 'react-icons/md';
import { IoMdNotifications } from 'react-icons/io';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import { RiCouponLine } from 'react-icons/ri';
import { CiLogout } from 'react-icons/ci';
import { useSelector } from 'react-redux';
const { Header, Sider, Content } = Layout;


const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  const authstate = useSelector((state) => state?.auth?.user);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className='text-white fs-4 text-center py-3 mb-0'>
            <span className="sm-logo">TM</span>
            <span className='lg-logo'>TechMart<sub className='bg-dark text-warning rounded-3 justify-content-center pb-1 px-2 ms-1 fs-6'>admin</sub></span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({ key }) => {
            if (key === "signout") {
              localStorage.clear();
              window.location.reload();
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: '',
              icon: <AiOutlineDashboard className='fs-4' />,
              label: 'Dashboard',
            },
            {
              key: 'customers',
              icon: <BiUserCircle className='fs-4' />,
              label: 'Customers',
            },
            {
              key: 'catalog',
              icon: <BsCardChecklist className='fs-4' />,
              label: 'Catalog',
              children: [
                {
                  key: 'product',
                  icon: <AiFillFileAdd className='fs-5' />,
                  label: 'Add Product',
                },
                {
                  key: 'product-list',
                  icon: <BiListUl className='fs-5' />,
                  label: 'Product List',
                },
                {
                  key: 'brand',
                  icon: <SiBrandfolder className='fs-5' />,
                  label: 'Brand',
                },
                {
                  key: 'brand-list',
                  icon: <BiCategory className='fs-5' />,
                  label: 'Brand List',
                },
                {
                  key: 'category',
                  icon: <SiBrandfolder className='fs-5' />,
                  label: 'Category',
                },
                {
                  key: 'category-list',
                  icon: <BiCategory className='fs-5' />,
                  label: 'Category List',
                },
                {
                  key: 'color',
                  icon: <AiOutlineBgColors className='fs-5' />,
                  label: 'Color',
                },
                {
                  key: 'color-list',
                  icon: <AiOutlineBgColors className='fs-5' />,
                  label: 'Color List',
                },
              ]
            },
            {
              key: 'order',
              icon: <BsCartCheck className='fs-4' />,
              label: 'Orders',
            },
            {
              key: 'marketing',
              icon: <RiCouponLine className='fs-4' />,
              label: 'Marketing',
              children: [
                {
                  key: 'coupon',
                  icon: <TbLogout className='fs-5' />,
                  label: 'Add Coupon',
                },
                {
                  key: 'coupon-list',
                  icon: <RiCouponLine className='fs-5' />,
                  label: 'Coupon List',
                },
              ]
            },
            {
              key: 'blogs',
              icon: <SiMicrodotblog className='fs-4' />,
              label: 'Blogs',
              children: [
                {
                  key: 'blog',
                  icon: <TbLogout className='fs-5' />,
                  label: 'Add Blog',
                },
                {
                  key: 'blog-list',
                  icon: <FaBlogger className='fs-5' />,
                  label: 'Blog List',
                },
                {
                  key: 'blog-category',
                  icon: <TbLogout className='fs-5' />,
                  label: 'Add Blog Category',
                },
                {
                  key: 'blog-category-list',
                  icon: <FaBlogger className='fs-5' />,
                  label: 'Blog Category List',
                },
              ]
            },
            {
              key: 'enquiries',
              icon: <MdQuestionAnswer className='fs-4' />,
              label: 'Enquiries',
            },
            {
              key: 'signout',
              icon: <CiLogout className='fs-4' />,
              label: 'Sign Out',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header className="d-flex justify-content-between pe-5 ps-2" style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <TiThMenu /> : <AiOutlineMenuFold />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '24px',
              width: 64,
              height: 64,
            }}
          />
          <div className='mt-2 mb-2 py-1 d-flex justify-content-between'>
            <input type="search" name="search" id="form1" className='form-control' placeholder='Search Here. . .' />
            <button type='button' className='btn btn-secondary'><AiOutlineSearch className='fs-5'/></button>
          </div>
          <div className="d-flex gap-4 align-items-center">
            <div className='position-relative'>
              <IoMdNotifications className='fs-4' />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">3</span>
            </div>
            <div className="d-flex gap-3 align-items-center dropdown">
              <div>
                <img width={35} height={35} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-fMXEWyzl7MNd3Q15JOeyzHxasfVIHK6K_A&usqp=CAU" className='im' alt="" />
              </div>
              <div role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                <h5 className='mb-0'>{authstate?.name}</h5>
                <p className='mb-0'>{authstate?.email}</p>
              </div>
              <div className="dropdown-menu py-0 mt-1" aria-labelledby="dropdownMenuLink">
                <li><Link className="dropdown-item" style={{ height: "auto", lineHeight: "25px" }} to="/profile">Profile</Link></li>
                <li><Link className="dropdown-item" style={{ height: "auto", lineHeight: "25px" }} to="/settings">Settings</Link></li>
                <li><Link className="dropdown-item" style={{ height: "auto", lineHeight: "25px" }} to="/logout">Sign Out</Link></li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;