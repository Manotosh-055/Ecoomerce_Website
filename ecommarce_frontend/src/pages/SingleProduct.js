import React, { useEffect, useState } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
//import ProductCard from '../components/ProductCard';
import ReactStars from 'react-rating-stars-component';
import ReactImageZoom from 'react-image-zoom';
import Colors from '../components/Colors';
import { TbGitCompare } from 'react-icons/tb';
import { AiOutlineHeart } from 'react-icons/ai'
import Container from '../components/Container';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addRating, addToWishlist, getAProduct, getAllProducts } from '../features/products/productSlice';
import { toast } from 'react-toastify';
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import watch from "../images/watch.jpg";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { addProdToCart, getUserCart } from '../features/user/userSlice';
import { AiOutlineCopy } from 'react-icons/ai';

const SingleProduct = () => {
  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const getProdId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const allproductstate = useSelector((state) => state?.product?.product);
  const userstate = useSelector((state) => state?.auth);
  const cartstate = useSelector((state) => state?.auth?.userCart);

  const autstate = useSelector((state) => state?.auth);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);


  useEffect(() => {
    dispatch(getAProduct(getProdId));
    dispatch(getUserCart());
  }, [getProdId]);

  const productstate = useSelector((state) => state?.product?.singleProduct);
  //console.log(productstate);

  useEffect(() => {
    for (let index = 0; index < cartstate?.length; index++) {
      if (getProdId === cartstate[index]?.productId?._id) {
        setAlreadyAdded(true);
      }

    }
  }, []);

  const uploadCart = () => {
    if (autstate?.user === null) {
      toast.error("Please, Login to continue...");
      navigate("/login");
    }
    else if (color === null) {
      toast.error("Please select a color");
      return false;
    }
    else if (quantity > productstate?.quantity) toast.info("Maximum products available " + productstate?.quantity);
    else if (quantity <= 0) toast.info("Please, select product count atleast 1");
    else {
      dispatch(addProdToCart({ productId: productstate?._id, quantity, color, price: productstate?.price }));
      navigate("/cart");
    }
  }

  const addToWish = (id) => {
    dispatch(addToWishlist(id));
    toast.info("Product added to Wishlist");
  }

  const props = {
    width: 500,
    height: 480,
    zoomWidth: 500,
    img: productstate?.images?.[0]?.url ? productstate?.images?.[0]?.url : "https://assets-prd.ignimgs.com/2022/07/06/budget-gaming-headset-1657123288874.jpg"
  };
  const [orderProduct, setorderProduct] = useState(true);
  const copyToClipboard = (text) => {
    toast.info("Product link copied to Clipboard");
    var textField = document.createElement('textarea')
    textField.innerText = text
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
  }

  const addRatingToProduct = () => {
    if (userstate?.isSuccess === false) {
      toast.error("Please Sign in to Continue");
      navigate("/login");
    }
    else if (star === null) {
      toast.error("Please add rating for Product");
      return false;
    }
    else if (comment === null) {
      toast.error("Please, give your Review about Product");
      return false;
    }
    else {
      dispatch(addRating({ star: star, comment: comment, prodId: getProdId }));
      toast.info("Product rated Successfully");
      //window.location.reload();
      setStar(null);
      setComment(null);

    }
  }

  const Func = () => {
    toast.error("Please Sign in to Continue");
    navigate("/login");
  }


  return (
    <>
      <Meta title={productstate?.title} />
      <BreadCrumb title={productstate?.title} />
      <Container class1="main-product-wrapper py-3 home-wrapper-2">
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              <div><ReactImageZoom {...props} /></div>
            </div>
            <div className="other-product-images d-flex flex-wrap gap-15">
              <div><img src="../images/headphone-1.jpg" className='img-fluid' alt="watch" /></div>
              <div><img src="../images/headphone-3.png" className='img-fluid' alt="watch" /></div>
              <div><img src="../images/headphone-2.webp" className='img-fluid' alt="watch" /></div>
              <div><img src="../images/headphone-4.jpg" className='img-fluid' alt="watch" /></div>
            </div>
          </div>
          <div className="col-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h4 className='title'>{productstate?.title}</h4>
              </div>
              <div className="border-bottom py-3">
                <p className="price">$ {productstate?.price}</p>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars count={5} size={22} value={Number(productstate?.totalratings)} edit={false} activeColor="#ffd700" />
                  <p className='mb-0 t-review'>
                  {productstate?.ratings?.length === 0? "No Reviews": productstate?.ratings?.length +"  Reviews"}
                  </p>
                </div>
                <a className='review-btn' href="#review">Write a Review</a>
              </div>
              <div className="">
                <div className='d-flex gap-10 align-items-center my-2'>
                  <h4 className='product-heading'>Type :</h4>
                  <p className='product-data'>Headsets</p>
                </div>
                <div className='d-flex gap-10 align-items-center my-2'>
                  <h4 className='product-heading'>Brand :</h4>
                  <p className='product-data'>{productstate?.brand}</p>
                </div>
                <div className='d-flex gap-10 align-items-center my-2'>
                  <h4 className='product-heading'>Categories :</h4>
                  <p className='product-data'>{productstate?.category}</p>
                </div>
                <div className='d-flex gap-10 align-items-center my-2'>
                  <h4 className='product-heading'>Tags :</h4>
                  <p className='product-data'>{productstate?.tags}</p>
                </div>
                <div className='d-flex gap-10 align-items-center my-2'>
                  <h4 className='product-heading'>SKU :</h4>
                  <p className='product-data'>sku247</p>
                </div>
                <div className='d-flex gap-10 align-items-center my-2'>
                  <h4 className='product-heading'>Availability :</h4>
                  <p className='product-data'>{productstate?.quantity !== 0 ? productstate?.quantity : "Out of Stock"}</p>
                </div>
                <div className='d-flex gap-10 flex-column mt-2 mb-3'>
                  <h4 className='product-heading'>Size :</h4>
                  <div className="d-flex flex-wrap gap-15">
                    <span className="badge border border-1 text-dark border-secondary">S</span>
                    <span className="badge border border-1 text-dark border-secondary">L</span>
                    <span className="badge border border-1 text-dark border-secondary">M</span>
                    <span className="badge border border-1 text-dark border-secondary">XL</span>
                  </div>
                </div>
                {
                  alreadyAdded === false && <>
                    <div className='d-flex gap-10 flex-column mt-2 mb-3'>
                      <h4 className='product-heading'>Colors :</h4>
                      <Colors setColor={setColor} colorData={productstate?.color} />
                    </div>
                  </>
                }
                <div className='d-flex align-items-center gap-15 flex-row mt-2 mb-3'>
                  {
                    alreadyAdded === false && <>
                      <h4 className='product-heading'>Quantity :</h4>
                      <div className="">
                        <input
                          type="number"
                          min={1}
                          max={productstate?.quantity}
                          style={{ width: "70px" }}
                          className='form-control'
                          id=""
                          name=""
                          onChange={(e) => { setQuantity(e.target.value) }}
                          value={quantity}
                        />
                      </div>
                    </>
                  }
                  <div className={alreadyAdded ? "ms-0" : "ms-5" + "d-flex align-items-center gap-15"}>
                    <button
                      className='button border-0'
                      type='submit'
                      onClick={() => { alreadyAdded ? navigate("/cart") : uploadCart() }}
                    >{alreadyAdded ? "Go to Cart" : "Add to Cart"}</button>
                    <button className='button signup ms-4'>Buy Now</button>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-30 mb-3">
                  <div>
                    <a href="/"><TbGitCompare className='font-5 me-2' />Add to Compare</a>
                  </div>
                  <div>
                    <a href="/"><AiOutlineHeart className='font-5 me-2' />Add to Wishlist</a>
                  </div>
                </div>
                <div className='d-flex gap-10 flex-column mt-5'>
                  <h4 className="product-heading">Shipping Returns :</h4>
                  <p className="product-data">
                    Lorem ipsum dolor.hey here you can returns the product<br />
                    these are free service with no cost <b>Within 5-8 days</b>
                  </p>
                </div>
                <div className='d-flex gap-10 flex-column mt-3'>
                  <h4 className="product-heading">materials :</h4>
                  <p className="product-data">
                    Lorem ipsum dolor.hey here you can returns the product<br />
                    this are made with the high level props.
                  </p>
                </div>
                <div className='d-flex gap-10 align-items-center mt-3 mb-2'>
                  <h4 className="product-heading">Product Link :</h4>
                  <a href="javascript: void(0);" onClick={() => {
                    copyToClipboard(window.location.href);
                  }}
                  ><AiOutlineCopy className='fs-5' /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="description-wrapper home-wrapper-2">

        <div className="row">
          <div className="col-12">
            <h4>Description</h4>
            <div className="desc-inner-wrapper">
              <p dangerouslySetInnerHTML={{ __html: productstate?.description }}></p>
            </div>
          </div>
        </div>

      </Container>
      <Container class1="review-wrapper py-3 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4 id='review'>Reviews</h4>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className='mb-2'>Customer Reviews</h4>
                  <div className='d-flex align-items-center gap-10'>
                    <ReactStars count={5} size={24} value={Number(productstate?.totalratings)} edit={false} activeColor="#ffd700" />
                    <p className='mb-0'>
                      {productstate?.ratings?.length === 0? "No Reviews": "Based On " + productstate?.ratings?.length +" Reviews"}
                    </p>
                  </div>
                </div>
                {
                  orderProduct && (
                    <div>
                      <a className='text-dark text-decoration-underline' href="/">Write a Review</a>
                    </div>
                  )}
              </div>
              {

              }
              <div className="review-form py-4">
                <h4> Write a Review</h4>
                <div>
                  <ReactStars
                    count={5}
                    size={22}
                    value={0}
                    edit={true}
                    activeColor="#ffd700"
                    onChange={(e) => { setStar(e) }}
                  />
                </div>
                <div>
                  <textarea
                    name=""
                    id=""
                    className='w-100 form-control mt-3'
                    cols="30"
                    rows="4"
                    placeholder='Comments'
                    onChange={(e) => { setComment(e.target.value) }}
                  ></textarea>
                </div>
                <div className='d-flex justify-content-end mt-3'>
                  <button onClick={addRatingToProduct} className="button border-0" type='submit'>Submit Review</button>
                </div>
              </div>
              <div className="reviews mt-4">
                {
                  productstate?.ratings && productstate?.ratings?.map((item, index) => {
                    return (
                      <div key={index} className="review">
                        <div className="d-flex gap-10 align-items-center">
                          <h5 className="mb-0 text-secondary">Anonymous</h5>
                          <ReactStars
                            count={5}
                            size={24}
                            value={item?.star}
                            edit={false}
                            activeColor="#ffd700"
                          />
                        </div>
                        <p className='mt-2'>{item?.comment}</p>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper py-3 home-wrapper-2">

        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Related Products</h3>
          </div>
        </div>
        <div className="row">
          {
            allproductstate && allproductstate?.map((item, index) => {
              if (index < 4) {
                return (
                  <div key={index} className="col-3">
                    <div
                      className="product-card position-relative">
                      <div className="wishlist-icon position-absolute">
                        <button className='border-0 bg-transparent' onClick={() => { autstate?.user === null ? Func() : addToWish(item._id) }}><img src={wish} alt="wishlist" /></button>
                      </div>
                      <div className="product-image">
                        <img src={item?.images?.[0]?.url ? item?.images?.[0]?.url : watch} className='img-fluid' alt="product" />
                        <img src={item?.images?.[0]?.url ? item?.images?.[0]?.url : watch} width="220px" className='img-fluid' alt="product" />
                      </div>
                      <div className="product-details">
                        <h6 className="brand">{item.brand}</h6>
                        <h5 className="product-title">
                          {item.title}
                        </h5>
                        <ReactStars count={5} size={24} value={0} edit={false} activeColor="#ffd700" />
                        <p className="price">$ {item.price}</p>
                      </div>
                      <div className="action-bar position-absolute">
                        <div className="d-flex flex-column gap-15">
                          <button className='border-0 bg-transparent'>
                            <img src={prodcompare} alt="compare" />
                          </button>
                          <button className='border-0 bg-transparent'>
                            <img src={view} alt="view" />
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
    </>
  );
}

export default SingleProduct;
