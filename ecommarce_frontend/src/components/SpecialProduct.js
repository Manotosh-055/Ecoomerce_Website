import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';
const SpecialProduct = (props) => {
    const { id,title, brand, rating, price, count, sold,images } = props;
    return (
        <div className='col-6 mb-3'>
            <div className="special-product-card">
                <div className='d-flex justify-content-between col-11'>
                    <div>
                        <img src={images?.[0]?.url} className='img-fluid' alt="watch" />
                    </div>
                    <div className="special-product-content">
                        <h5 className="brand">{brand}</h5>
                        <h6 className="title">
                            {title}
                        </h6>
                        <ReactStars count={5} size={24} value={Number(rating)} edit={false} activeColor="#ffd700" />
                        <p className="price">
                            <span className="red-p">$ {price}</span>&nbsp;<strike>$200</strike>
                        </p>
                        <div className="discount-till d-flex align-items-center gap-10">
                            <p className='mb-0'>
                                <b>5<br/> days</b>
                            </p>
                            <div className="d-flex gap-10 align-items-center">
                                <span className='badge rounded-circle p-2 bg-danger'>05</span>:
                                <span className='badge rounded-circle p-2 bg-danger'>10</span>:
                                <span className='badge rounded-circle p-2 bg-danger'>25</span>
                            </div>
                        </div>
                        <div className="prod-count my-3">
                            <p>Products : {count}</p>
                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{ "width": (count/(count+sold))*100+"%" }}
                                    aria-valuenow={(count/(count+sold))*100}
                                    aria-valuemin={count}
                                    aria-valuemax={sold+count}>
                                </div>
                            </div>
                        </div>
                        <Link className='button' to={"/product/"+id}>View</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpecialProduct;
