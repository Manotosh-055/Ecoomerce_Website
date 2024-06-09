import React, { useEffect } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ReactStars from 'react-rating-stars-component';
import { getCompareProducts } from '../features/user/userSlice';
import { addToCompare } from '../features/products/productSlice';
const CompareProduct = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        getComparefromDB();
    },[]);
    const getComparefromDB = () => {
        dispatch(getCompareProducts());
    }
    const comparestate = useSelector((state) => state.auth?.compare?.compare);
    const removefromCompare = (id) => {
        dispatch(addToCompare(id));
        toast.info("Item remove from Compare Products");
        setTimeout(() => {
            dispatch(getCompareProducts());
        }, 300);
    }

    return (
        <>
            <Meta title="Compare Products" />
            <BreadCrumb title="Compare Products" />
            <Container class1="wishlist-wrapper home-wrapper-2 py-2">
                <div className="row">
                    {
                        comparestate?.length === 0 && <div className="text-center text-secondary mt-3 mb-3 fs-4">Compare products is empty!</div>
                    }
                    {
                        comparestate && comparestate.map((item, index) => {
                            return (
                                <div key={index} className="col-3 mt-3">
                                    <div
                                        className="product-card position-relative">
                                        <div className="wishlist-card position-relative">
                                            <img
                                                src="images/cross.svg"
                                                alt="cross"
                                                className='position-absolute cross img-fluid'
                                                onClick={(e) => removefromCompare(item?._id)}
                                            />
                                        </div>
                                        <div className="product-image">
                                            <img src={item?.images?.[0]?.url} className='img-fluid' alt="product" />
                                            <img src={item?.images?.[0]?.url} width="220px" className='img-fluid' alt="product" />
                                        </div>
                                        <div className="product-details px-3 mt-3">
                                            <h5 className="product-title">
                                                {item?.title}
                                            </h5>
                                            <ReactStars count={5} size={24} value={Number(item?.totalratings)} edit={false} activeColor="#ffd700" />
                                            <p className="price">$ {item?.price}</p>
                                        </div>
                                        <div className='d-flex gap-10 justify-content-between align-items-center px-3'>
                                            <h4 className='product-heading'>Brand :</h4>
                                            <p className='product-heading'>{item?.brand}</p>
                                        </div>
                                        <div className='d-flex gap-10 justify-content-between align-items-center px-3'>
                                            <h4 className='product-heading'>Category :</h4>
                                            <p className='product-heading'>{item?.category}</p>
                                        </div>
                                        <div className='d-flex gap-10 justify-content-between align-items-center px-3'>
                                            <h4 className='product-heading'>Type :</h4>
                                            <p className='product-heading'>products</p>
                                        </div>
                                        <div className='d-flex gap-10 justify-content-between align-items-center px-3'>
                                            <h4 className='product-heading'>Quantity :</h4>
                                            <p className='product-heading'>{item?.quantity !== 0 ? item?.quantity : "Out of Stock"}</p>
                                        </div>
                                        <div className='d-flex gap-10 justify-content-between align-items-center px-3'>
                                            <h4 className='product-heading'>Tags :</h4>
                                            <p className='product-heading'>{item?.tags}</p>
                                        </div>
                                        <div className='d-flex gap-10 justify-content-between align-items-center px-3'>
                                            <h4 className='product-heading'>SKU :</h4>
                                            <p className='product-heading'>sku342</p>
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

export default CompareProduct;
