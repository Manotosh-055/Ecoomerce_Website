import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { useLocation, useNavigate } from 'react-router-dom';
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import watch from "../images/watch.jpg";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, addToCompare } from '../features/products/productSlice';
import { toast } from 'react-toastify';

const ProductCard = (props) => {
  const { grid, data } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let location = useLocation();
  const authstate = useSelector((state) => state?.auth);
 
  const addToWish = (id) => {
    dispatch(addToWishlist(id));
    toast.info("Product added to Wishlist");
  }

  const addToComPd = (id) => {
    dispatch(addToCompare(id));
    toast.info("Added to Compare Products");
  }

  const func = () => {
    toast.info("Please, login to coninue");
    navigate("/login");
  }

  return (
    <>
      {data && data.map((item, index) => {
        return (
          <div key={index} className={`${location.pathname === "/store" ? `gr-${grid}` : "col-3"}`}>
            <div
              className="product-card position-relative">
              <div className="wishlist-icon position-absolute">
                <button className='border-0 bg-transparent'
                  onClick={(e) => { authstate?.user === null ? func() : addToWish(item?._id) }}
                ><img src={wish} alt="wishlist" /></button>
              </div>
              <div className="product-image">
                <img src={item?.images?.[0]?.url?item?.images?.[0]?.url : watch} className='img-fluid' alt="product" />
                <img src={item?.images?.[0]?.url?item?.images?.[0]?.url : watch} width="220px"  className='img-fluid' alt="product" />
              </div>
              <div className="product-details">
                <h6 className="brand">{item.brand}</h6>
                <h5 className="product-title">
                  {item.title}
                </h5>
                <ReactStars count={5} size={24} value={Number(item.totalratings)} edit={false} activeColor="#ffd700" />
                <p className={`description ${grid === 12 ? "d-block" : "d-none"}`} dangerouslySetInnerHTML={{ __html: item?.description }}></p>
                <p className="price">$ {item.price}</p>
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
      })
      }

    </>
  );
}

export default ProductCard;
