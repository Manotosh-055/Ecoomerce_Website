import React, { useEffect, useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import menu from '../images/menu.svg';
import compare from '../images/compare.svg';
import wishlist from "../images/wishlist.svg";
import user from "../images/user.svg";
import cart from "../images/cart.svg";
import { useDispatch, useSelector } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { getAProduct } from '../features/products/productSlice';
import { getUserCart } from '../features/user/userSlice';

const Header = () => {
    const dispatch = useDispatch();
    const authstate = useSelector((state) => state?.auth);
    const cartstate = useSelector((state) => state?.auth?.userCart);
    const productstate = useSelector((state) => state?.product?.product);
    const [totalAmount, setTotalAmount] = useState(0);
    const [paginate, setPaginate] = useState(true);
    const [productOpt, setProductOpt] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getUserCart());
    }, []);
    console.log(cartstate);

    useEffect(() => {
        let sum = 0;
        for (let index = 0; index < cartstate?.length; index++) {
            sum = sum + Number(cartstate[index]?.quantity) * Number(cartstate[index]?.price);
        }
        setTotalAmount(sum);
    }, [cartstate]);


    useEffect(() => {
        let data = [];
        for (let index = 0; index < productstate.length; index++) {
            const element = productstate[index];
            data.push({ id: index, prodId: element?._id, name: element?.title });
        }
        setProductOpt(data);
    }, [productstate]);

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <>
            <header className="header-top-strip py-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-6">
                            <p className='text-white mb-0'>Free Shiping Over $100 & Free Returns</p>
                        </div>
                        <div className="col-6">
                            <p className="text-end text-white mb-0">Hotline :<a className="text-white" href="tel:+91 7584325634">+91 7584325634</a></p>
                        </div>
                    </div>
                </div>
            </header>
            <header className="header-upper py-2 ">
                <div className="container-xxl">
                    <div className="row align-items-center mb-0">
                        <div className="col-2">
                            <h4>
                                <Link className='text-white'>TechMart</Link>
                            </h4>
                        </div>
                        <div className="col-5">
                            <div className="input-group">
                                <Typeahead
                                    id="pagination-example"
                                    onPaginate={() => console.log('Results paginated')}
                                    onChange={(selected) => {
                                        selected[0]?.prodId !== undefined && navigate(`/product/${selected[0]?.prodId}`);
                                        selected[0]?.prodId !== undefined && dispatch(getAProduct(selected[0]?.prodId));
                                    }}
                                    options={productOpt}
                                    paginate={paginate}
                                    labelKey={"name"}
                                    minLength={1}
                                    placeholder="Search Products here..."
                                />
                                <span className="input-group-text" id="basic-addon2"><BsSearch className="fs-6" /></span>
                            </div>

                        </div>
                        <div className="col-5">
                            <div className="header-upper-links d-flex align-items-center justify-content-between">
                                <div>
                                    <Link to="/compare-product" className='d-flex align-items-center gap-10 text-white'>
                                        <img src={compare} alt="comapre" />
                                        <p className='mb-0'>Compare<br />Products</p>
                                    </Link>
                                </div>
                                <div>
                                    <Link to="/wishlist" className='d-flex align-items-center gap-10 text-white'>
                                        <img src={wishlist} alt="wishlist" />
                                        <p className='mb-0'>Favorite <br /> Wishlist</p>
                                    </Link>
                                </div>
                                <div>
                                    <Link to={authstate?.user === null || authstate?.user?.message === "NotUser" ? "/login" : "/my-profile"} className='d-flex align-items-center gap-10 text-white'>
                                        <img src={user} alt="user" />
                                        {
                                            authstate?.user === null || authstate?.user?.message === "NotUser" ?
                                                <p className='mb-0'>Login in <br /> My Account</p> : <p className='mb-0'>Welcome<br />{authstate?.user?.name}</p>
                                        }
                                    </Link>
                                </div>
                                <div>
                                    <Link to="/cart" className='d-flex align-items-center gap-10 text-white'>
                                        <img src={cart} alt="cart" />
                                        <div className='d-flex flex-column gap-10'>
                                            <span className="badge bg-white text-dark">{cartstate?.length ? cartstate.length : 0}</span>
                                            <p className='mb-0'>$ {totalAmount}</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <header className="header-bottom py-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <div className="menu-bottom d-flex align-items-center gap-30">
                                <div>
                                    <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img src={menu} alt="menu" /><span className='me-5 d-inline-blocLink'>Shop Categories</span>
                                        </button>
                                        <ul className="dropdown-menu p-0" aria-labelledby="dropdownMenuButton1">
                                            <li><Link className="dropdown-item text-white" to="">Action</Link></li>
                                            <li><Link className="dropdown-item text-white" to="">Another action</Link></li>
                                            <li><Link className="dropdown-item text-white" to="">Something else here</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='menu-links'>
                                    <div className="d-flex align-items-center gap-15">
                                        <NavLink to="">Home</NavLink>
                                        <NavLink to="/store">Our Store</NavLink>
                                        <NavLink to="/my-orders">My Orders</NavLink>
                                        <NavLink to="/blogs">Blogs</NavLink>
                                        <NavLink to="/contact">Contact</NavLink>
                                        <button onClick={() => handleLogout()} style={{ fontSize: "14px" }} className="border border-0 bg-transparent text-white text-uppercase">LogOut</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );

}
export default Header;
