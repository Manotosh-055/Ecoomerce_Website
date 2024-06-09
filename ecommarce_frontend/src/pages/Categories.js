import React, { useEffect } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getPcategories } from '../features/pcategory/pcategorySlice';

const Categories = () => {
    const dispatch = useDispatch();
    const categorystate = useSelector((state) => state.pcategory.pcategories);
    useEffect(() => {
        dispatch(getPcategories());
    }, []);
    return (
        <>
            <Meta title="Our Categories" />
            <BreadCrumb title="Our Categories" />
            <Container class1="compare-product-wrapper py-3 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="compare-product-card position-relative">
                            <h2 style={{ color: "#777777", fontSize: "23px", fontWeight: "bold" }} className='text-center mb-3'>Our Categories</h2>
                            <div className="compare-product-details">
                                {
                                    categorystate && categorystate?.map((item, index) => {
                                        return (
                                            <span key={index} style={{ fontSize: "15px" }} className="text-capitalize badge bg-light text-secondary rounded-3 py-3 px-3 mx-2 my-2">{item?.title}</span>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Categories