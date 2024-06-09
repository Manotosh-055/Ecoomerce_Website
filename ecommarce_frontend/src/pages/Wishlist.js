import React, { useEffect } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getUserWishlist } from '../features/user/userSlice';
import { addToWishlist } from '../features/products/productSlice';
import { toast } from 'react-toastify';
import ReactStars from 'react-rating-stars-component';
const Wishlist = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        getWishlistfromDB();
    });
    const getWishlistfromDB = () => {
        dispatch(getUserWishlist());
    }
    const wishliststate = useSelector((state) => state.auth?.wishlist?.wishlist);
    console.log(wishliststate);
    const removefromwishlist = (id) => {
        dispatch(addToWishlist(id));
        toast.info("Product removed from Wishlist");
        setTimeout(() => {
            dispatch(getUserWishlist());
        }, 300);
    }
    return (
        <>
            <Meta title="Wishlist" />
            <BreadCrumb title="Wishlist" />
            <Container class1="wishlist-wrapper home-wrapper-2 py-3">
                <div className="row">
                    {
                        wishliststate?.length === 0 && <div className="text-center text-secondary mt-3 fs-4 mb-2">Wishlist is empty!</div>
                    }
                    {
                        wishliststate && wishliststate.map((item, index) => {
                            return (
                                <div key={index} className="col-3 mt-3">
                                    <div
                                        className="product-card position-relative">
                                        <div className="wishlist-card position-relative">
                                            <img
                                                src="images/cross.svg"
                                                alt="cross"
                                                className='position-absolute cross img-fluid'
                                                onClick={(e) => removefromwishlist(item?._id)} />
                                        </div>
                                        <div className="product-image">
                                            <img src={item?.images?.[0]?.url} className='img-fluid' alt="product" />
                                            <img src={item?.images?.[0]?.url} width="220px" className='img-fluid' alt="product" />
                                        </div>
                                        <div className="product-details">
                                            <h6 className="brand">{item?.brand}</h6>
                                            <h5 className="product-title">
                                                {item?.title}
                                            </h5>
                                            <ReactStars count={5} size={24} value={Number(item?.totalratings)} edit={false} activeColor="#ffd700" />
                                            <p className="price">$ {item?.price}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </Container>
        </>
    );
}

export default Wishlist;
