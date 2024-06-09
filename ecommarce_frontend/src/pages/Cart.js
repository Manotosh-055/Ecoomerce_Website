import React, { useEffect, useState } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCart, removeProductCart } from '../features/user/userSlice';

const AddCart = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const dispatch = useDispatch();
  const cartstate = useSelector((state) => state?.auth?.userCart);

  useEffect(() => {
    dispatch(getUserCart());
  }, [cartstate]);
  const removeUserProductCart = (id) => {
    dispatch(removeProductCart(id));
    setTimeout(() => {
      dispatch(getUserCart());
    }, 300);
  }

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartstate?.length; index++) {
      sum = sum + Number(cartstate[index]?.quantity) * Number(cartstate[index]?.price);
    }
    setTotalAmount(sum);
  }, [cartstate]);
  return (
    <>
      <Meta title="Add to Cart" />
      <BreadCrumb title="Add to Cart" />
      <Container class1="cart-wrapper home-wrapper-2 py-3">
        <div className="row">
          <div className="col-12">
            <div className="cart-heading d-flex justify-content-between align-items-center py-3">
              <h4 className="cart-col-1">Product</h4>
              <h4 className="cart-col-2">Price</h4>
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="cart-col-4">Total</h4>
            </div>
            {
              cartstate?.length === 0 && <div className="text-center text-secondary mt-4 fs-4">Your cart is empty!</div>
            }
            {
              cartstate && cartstate.map((item, index) => {
                return (
                  <div key={index} className="cart-data d-flex justify-content-between align-items-center py-3">
                    <div className="cart-col-1 gap-30 d-flex align-items-center">
                      <div className='w-25'>
                        <img
                          src={item?.productId?.images?.[0]?.url}
                          className='img-fluid'
                          alt="Product pic"
                        />
                      </div>
                      <div className='w-75 '>
                        <p>{item?.productId?.title}</p>
                        <p className='d-flex gap-2'>
                          Color :
                          <ul className='colors ps-0'>
                            <li style={{ backgroundColor: item?.color?.title }}></li>
                          </ul>
                        </p>
                        <p>Size : S</p>
                      </div>
                    </div>
                    <div className="cart-col-2">
                      <h5 className="price">$ {item?.price}</h5>
                    </div>
                    <div className="cart-col-3 gap-15 d-flex align-items-center">
                      <div>
                        <input
                          className='form-control'
                          min={1}
                          max={10}
                          type="number"
                          name=""
                          id=""
                          value={item?.quantity}
                        />
                      </div>
                      <div><MdDelete onClick={() => { removeUserProductCart(item?._id) }} className='delete-icon' /></div>
                    </div>
                    <div className="cart-col-4">
                      <h5 className="price">$ {item?.price * item?.quantity}</h5>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className="col-12 py-3 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/store" className='button'>Continue Shopping</Link>
              {
                totalAmount !== 0 &&
                <div className="d-flex flex-column align-items-end">
                  <h4>
                    SubTotal : ${totalAmount}
                  </h4>
                  <p>Taxes and Shipping are calculated at checkout</p>
                  <Link to="/checkout" className='button'>Checkout</Link>
                </div>
              }
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default AddCart;