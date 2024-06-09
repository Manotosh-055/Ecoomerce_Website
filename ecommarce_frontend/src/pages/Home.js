import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import BlogCard from '../components/BlogCard';
import SpecialProduct from '../components/SpecialProduct';
import Container from '../components/Container';
import { services } from '../utils/Data';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from '../features/blogs/blogSlice';
import moment from 'moment';
import { addToCompare, getAllProducts } from '../features/products/productSlice';
import { addToWishlist } from '../features/products/productSlice';
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import watch from "../images/watch.jpg";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import ReactStars from 'react-rating-stars-component';
import { toast } from 'react-toastify';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [idx, setIdx] = useState(0);
    const [specidx, setSpecIdx] = useState(0);
    const [fidx, setFidx] = useState(0);

    useEffect(() => {
        getBlogs();
        getProducts();
    }, []);
    const blogstate = useSelector((state) => state?.blog?.blog);
    const productstate = useSelector((state) => state?.product?.product);
    const authstate = useSelector((state) => state?.auth);

    useEffect(() => {
        let cnt = 0;
        let scnt = 0;
        let fcnt = 0;
        for (let index = 0; index < productstate?.length; index++) {
            if (productstate[index]?.tags === "popular") {
                cnt = cnt + 1;
            }
            if (productstate[index]?.tags === "Special") {
                scnt = scnt + 1;
            }
            if (productstate[index]?.tags === "featured") {
                fcnt = fcnt + 1;
            }
            if (cnt === 4) setIdx(index);
            if (scnt === 2) setSpecIdx(index);
            if (fcnt === 4) setFidx(index);
        }

    }, [productstate]);

    const getBlogs = () => {
        dispatch(getAllBlogs());
    }
    const getProducts = () => {
        dispatch(getAllProducts());
    }

    const addToWish = (id) => {
        dispatch(addToWishlist(id));
        toast.info("Product added to Wishlist");
    }

    const func = () => {
        toast.info("Please, login to coninue");
        navigate("/login");
    }

    const addToComPd = (id) => {
        dispatch(addToCompare(id));
        toast.info("Added to Compare Products");
    }


    return (
        <>
            <Container class1="home-wrapper-1 py-3">
                <div className="row">
                    <div className="col-6">
                        <div className="main-banner position-relative ">
                            <img src="images/main-banner-1.jpg" className='img-fluid rounded-3' alt="main banner" />
                            <div className="main-banner-content position-absolute">
                                <h4>SUPER CHARGED FOR PROS.</h4>
                                <h5>iPad S13+ Pro.</h5>
                                <p>From $999.00 or $41.62/mo.</p>
                                <Link className='button'>BUY NOW</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
                            <div className="small-banner position-relative">
                                <img src="images/catbanner-01.jpg" className='img-fluid rounded-3' alt="main banner" />
                                <div className="small-banner-content position-absolute">
                                    <h4>Best Sale</h4>
                                    <h5>iPad S13+ Pro.</h5>
                                    <p>From $999.00 <br />or $41.62/mo.</p>
                                </div>
                            </div>
                            <div className="small-banner position-relative ">
                                <img src="images/catbanner-02.jpg" className='img-fluid rounded-3' alt="main banner" />
                                <div className="small-banner-content position-absolute">
                                    <h4>New Arrival</h4>
                                    <h5>Buy IPad Air</h5>
                                    <p>From $591.00 <br />or $49.62/mo.</p>
                                </div>
                            </div>
                            <div className="small-banner position-relative">
                                <img src="images/catbanner-03.jpg" className='img-fluid rounded-3' alt="main banner" />
                                <div className="small-banner-content position-absolute">
                                    <h4>New Arrival</h4>
                                    <h5>Buy IPad Air</h5>
                                    <p>From $591.00 <br /> or $49.62/mo.</p>
                                </div>
                            </div>
                            <div className="small-banner position-relative">
                                <img src="images/catbanner-04.jpg" className='img-fluid rounded-3' alt="main banner" />
                                <div className="small-banner-content position-absolute">
                                    <h4>New Arrival</h4>
                                    <h5>Buy IPad Air</h5>
                                    <p>From $591.00 <br /> or $49.62/mo.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="services d-flex align-items-center justify-content-between">
                            {
                                services?.map((i, j) => {
                                    return (
                                        <div className='d-flex align-items-center gap-15' key={j}>
                                            <img src={i.image} alt="services" />
                                            <div>
                                                <h6>{i.title}</h6>
                                                <p className='mb-0'>{i.tags}</p>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="home-wrapper-2 py-3">
                <div className="row">
                    <div className="col-12">
                        <div className="categories d-flex justify-content-between flex-wrap align-items-center">
                            <div className='d-flex gap-30 align-items-center'>
                                <div>
                                    <h6>Cameras</h6>
                                    <p>10 Items</p>
                                </div>
                                <img src="images/camera.jpg" alt="camera" />
                            </div>
                            <div className='d-flex gap-30 align-items-center'>
                                <div>
                                    <h6>Smart Tvs</h6>
                                    <p>10 Items</p>
                                </div>
                                <img src="images/tv.jpg" alt="camera" />
                            </div>
                            <div className='d-flex gap-30 align-items-center'>
                                <div>
                                    <h6>Headphones</h6>
                                    <p>10 Items</p>
                                </div>
                                <img src="images/headphone.jpg" alt="camera" />
                            </div>
                            <div className='d-flex gap-30 align-items-center'>
                                <div>
                                    <h6>Laptops</h6>
                                    <p>10 Items</p>
                                </div>
                                <img src="images/laptop.jpg" alt="camera" />
                            </div>
                            <div className='d-flex gap-30 align-items-center'>
                                <div>
                                    <h6>Cameras</h6>
                                    <p>10 Items</p>
                                </div>
                                <img src="images/camera.jpg" alt="camera" />
                            </div>
                            <div className='d-flex gap-30 align-items-center'>
                                <div>
                                    <h6>Smart Tvs</h6>
                                    <p>10 Items</p>
                                </div>
                                <img src="images/tv.jpg" alt="camera" />
                            </div>
                            <div className='d-flex gap-30 align-items-center'>
                                <div>
                                    <h6>Headphones</h6>
                                    <p>10 Items</p>
                                </div>
                                <img src="images/headphone.jpg" alt="camera" />
                            </div>
                            <div className='d-flex gap-30 align-items-center'>
                                <div>
                                    <h6>Laptops</h6>
                                    <p>10 Items</p>
                                </div>
                                <img src="images/laptop.jpg" alt="camera" />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="featured-wrapper py-3 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading">Featured Collections</h3>
                    </div>
                    {
                        productstate && productstate?.map((item, index) => {
                            if (index <= fidx && item?.tags === "featured") {
                                return (
                                    <div key={index} className="col-3">
                                        <div
                                            className="product-card position-relative">
                                            <div className="wishlist-icon position-absolute">
                                                <button className='border-0 bg-transparent'
                                                    onClick={(e) => { authstate?.user === null ? func() : addToWish(item?._id) }}
                                                ><img src={wish} alt="wishlist" /></button>
                                            </div>
                                            <div className="product-image">
                                                <img src={item?.images?.[0]?.url ? item?.images?.[0]?.url : watch} className='img-fluid' alt="product" />
                                                <img src={item?.images?.[0]?.url ? item?.images?.[0]?.url : watch} width="220px" className='img-fluid' alt="product" />
                                            </div>
                                            <div className="product-details">
                                                <h6 className="brand">{item?.brand}</h6>
                                                <h5 className="product-title">
                                                    {item?.title}
                                                </h5>
                                                <ReactStars count={5} size={24} value={Number(item?.totalratings)} edit={false} activeColor="#ffd700" />
                                                <p className="price">$ {item?.price}</p>
                                            </div>
                                            <div className="action-bar position-absolute">
                                                <div className="d-flex flex-column gap-15">
                                                    <button onClick={(e) => { authstate?.user === null ? func() : addToComPd(item?._id) }} className='border-0 bg-transparent'>
                                                        <img src={prodcompare} alt="compare" />
                                                    </button>
                                                    <button className='border-0 bg-transparent'>
                                                        <img onClick={() => navigate("/product/" + item?._id)} src={view} alt="view" />
                                                    </button>
                                                    <button className='border-0 bg-transparent'>
                                                        <img src={addcart} alt="addcart" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </Container>

            <Container class1="famous-wrapper py-3 home-wrapper-2">
                <div className="row">
                    <div className="col-3">
                        <div className="famous-card position-relative">
                            <img src="images/famous-9.jpg" className='rounded-3' width="305px" height="400px" alt="famous" />
                            <div className="famous-content position-absolute">
                                <h5>Big Screen</h5>
                                <h6>Smart Watch Series 7</h6>
                                <p>From $399 or $16.62/mo. for 24 mo.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="famous-card position-relative">
                            <img src="images/laptop-1.jpg" width="305px" height="400px" alt="famous" />
                            <div className="famous-content position-absolute">
                                <h5>Studio Display</h5>
                                <h6>Galaxy Book2 Pro </h6>
                                <p>From $599 or $56.62/mo. for 24 mo.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="famous-card position-relative">
                            <img src="images/phone-3.jpg" width="305px" height="400px" alt="famous" />
                            <div className="famous-content position-absolute">
                                <h5>Studio Display</h5>
                                <h6>DXOMARK Smartphone</h6>
                                <p>From $451 or $36.62/mo. for 24 mo.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="famous-card position-relative">
                            <img src="images/speaker-3.jpg" width="305px" height="400px" alt="famous" />
                            <div className="famous-content position-absolute">
                                <h5>Studio Display</h5>
                                <h6>DXOMARK Speaker</h6>
                                <p>From $291 or $6.62/mo. for 24 mo.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="special-wrapper py-3 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading">Special Products</h3>
                    </div>
                </div>
                <div className="row">
                    {
                        productstate && productstate?.map((item, index) => {
                            if (index <= specidx && item?.tags === "Special") {
                                return (
                                    <SpecialProduct key={index}
                                        id={item?._id}
                                        title={item?.title}
                                        brand={item?.brand}
                                        rating={item?.totalratings}
                                        price={item?.price}
                                        count={item?.quantity}
                                        sold={item?.sold}
                                        images={item?.images}
                                    />
                                )
                            }
                        })
                    }

                </div>
            </Container>
            <Container class1="popular-wrapper py-3 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading">Our Popular Products</h3>
                    </div>
                </div>
                <div className="row">
                    {
                        productstate && productstate?.map((item, index) => {
                            if (index <= idx && item?.tags === "popular") {
                                return (
                                    <div key={index} className="col-3">
                                        <div
                                            className="product-card position-relative">
                                            <div className="wishlist-icon position-absolute">
                                                <button
                                                    className='border-0 bg-transparent'
                                                    onClick={(e) => { authstate?.user === null ? func() : addToWish(item._id) }}
                                                ><img src={wish} alt="wishlist" /></button>
                                            </div>
                                            <div className="product-image">
                                                <img src={item?.images?.[0]?.url ? item?.images?.[0]?.url : watch} className='img-fluid' alt="product" />
                                                <img src={item?.images?.[0]?.url ? item?.images?.[0]?.url : watch} width="220px" className='img-fluid' alt="product" />
                                            </div>
                                            <div className="product-details">
                                                <h6 className="brand">{item?.brand}</h6>
                                                <h5 className="product-title">
                                                    {item?.title}
                                                </h5>
                                                <ReactStars count={5} size={24} value={Number(item?.totalratings)} edit={false} activeColor="#ffd700" />
                                                <p className="price">$ {item?.price}</p>
                                            </div>
                                            <div className="action-bar position-absolute">
                                                <div className="d-flex flex-column gap-15">
                                                    <button onClick={(e) => { authstate?.user === null ? func() : addToComPd(item?._id) }} className='border-0 bg-transparent'>
                                                        <img src={prodcompare} alt="compare" />
                                                    </button>
                                                    <button className='border-0 bg-transparent'>
                                                        <img onClick={() => navigate("/product/" + item?._id)} src={view} alt="view" />
                                                    </button>
                                                    <button className='border-0 bg-transparent'>
                                                        <img src={addcart} alt="addcart" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </Container>
            <Container class1="marque-wrapper home-wrapper-2 py-3">
                <div className="row">
                    <div className="col-12">
                        <div className="marquee-inner-wrapper card-wrapper">
                            <Marquee className='d-flex'>
                                <div className='mx-4 w-20'>
                                    <img src="images/brand-01.png" alt="brand" />
                                </div>
                                <div className='mx-4 w-20'>
                                    <img src="images/brand-02.png" alt="brand" />
                                </div>
                                <div className='mx-4 w-20'>
                                    <img src="images/brand-03.png" alt="brand" />
                                </div>
                                <div className='mx-4 w-20'>
                                    <img src="images/brand-04.png" alt="brand" />
                                </div>
                                <div className='mx-4 w-20'>
                                    <img src="images/brand-05.png" alt="brand" />
                                </div>
                                <div className='mx-4 w-20'>
                                    <img src="images/brand-06.png" alt="brand" />
                                </div>
                                <div className='mx-4 w-20'>
                                    <img src="images/brand-07.png" alt="brand" />
                                </div>
                                <div className='mx-4 w-20'>
                                    <img src="images/brand-08.png" alt="brand" />
                                </div>
                            </Marquee>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="blog-wrapper py-3 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading">
                            Our Latest Blogs
                        </h3>
                    </div>
                </div>
                <div className="row">
                    {
                        blogstate && blogstate.map((item, index) => {
                            if (index < 4) {
                                return (
                                    <div className="col-3 mb-3" key={index}>
                                        <BlogCard
                                            id={item?._id}
                                            title={item?.title}
                                            description={item?.description}
                                            date={moment(item?.createdAt).format('MMMM Do YYYY, h:mm a')}
                                            images={item?.images}
                                        />
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </Container>
        </>
    );

}

export default Home;
