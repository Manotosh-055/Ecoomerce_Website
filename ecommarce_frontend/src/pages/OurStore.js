import React, { useEffect, useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import ReactStars from 'react-rating-stars-component';
import ProductCard from '../components/ProductCard';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../features/products/productSlice';

const OurStore = () => {
    const [grid, setGrid] = useState(3);
    const productstate = useSelector((state) => state.product.product);
    const dispatch = useDispatch();
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    // Filter state
    const [tag, setTag] = useState(null);
    const [category, setCategory] = useState(null);
    const [brand, setBrand] = useState(null);
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);
    const [sort, setSort] = useState(null);


    useEffect(() => {
        let newBrands = [];
        let category = [];
        let newTags = [];
        for (let index = 0; index < productstate.length; index++) {
            const element = productstate[index];
            newBrands.push(element.brand);
            category.push(element.category);
            newTags.push(element.tags);
        }
        setBrands(newBrands);
        setCategories(category);
        setTags(newTags);
    }, [productstate]);


    useEffect(() => {
        getProducts();
    }, [sort, tag, brand, category, minPrice, maxPrice]);


    const getProducts = () => {
        dispatch(getAllProducts({ sort, tag, brand, category, minPrice, maxPrice }));

    }
    return (
        <>
            <Meta title="Our Store" />
            <BreadCrumb title="Our Store" />
            <Container class1="store-wrapper home-wrapper-2 py-3">
                <div className="row">
                    <div className="col-3">
                        <div className='filter-card mb-3'>
                            <h3 className="filter-title">
                                Shop By Categories
                            </h3>
                            <ul className='ps-0'>
                                {
                                    categories && [...new Set(categories)].map((item, index) => {
                                        return (
                                            <span
                                                key={index}
                                                onClick={() => setCategory(item)}
                                                style={{ fontSize: "12px" }}
                                                className="badge bg-light text-secondary rounded-3 py-2 px-3 mx-1 mt-2"
                                            >{item}</span>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className='filter-card mb-3'>
                            <h3 className="filter-title">
                                Filter By
                            </h3>
                            <div>
                                <h5 className="filter-title">Product Price</h5>
                                <div className='d-flex align-items-center gap-10'>
                                    <div className="form-floating">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="From"
                                            onChange={(e) => setMinPrice(e.target.value)}
                                        />
                                        <label htmlFor="floatingInput">From</label>
                                    </div>
                                    <div className="form-floating">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="To"
                                            onChange={(e) => setMaxPrice(e.target.value)}
                                        />
                                        <label htmlFor="floatingInput">To</label>
                                    </div>
                                </div>
                                {/* <h5 className="sub-title">Colors</h5>
                                <div>
                                    <div>
                                        <Colors />
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className='filter-card mb-3'>
                            <h3 className="filter-title">Shop By Brands</h3>
                            <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                                {
                                    brands && [...new Set(brands)].map((item, index) => {
                                        return (
                                            <span key={index} style={{ fontSize: "12px" }} onClick={() => setBrand(item)} className="text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3">{item}</span>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className='filter-card mb-3'>
                            <h3 className="filter-title">Product Tags</h3>
                            <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                                {
                                    tags && [...new Set(tags)].map((item, index) => {
                                        return (
                                            <span key={index} style={{ fontSize: "12px" }} onClick={() => setTag(item)} className="text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3">{item}</span>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className='filter-card mb-3'>
                            <h3 className="filter-title">
                                Random Products
                            </h3>
                            <div>
                                <div className="random-products mb-3 d-flex">
                                    <div className="w-50">
                                        <img src="images/famous-5.webp" className='img-fluid' alt="watch" />
                                    </div>
                                    <div className="w-50">
                                        <h6>Smart Watch for Men with Bluetooth && Touch Screen</h6>
                                        <ReactStars count={5} size={24} value={4} edit={false} activeColor="#ffd700" />
                                        <b>$100.00</b>
                                    </div>
                                </div>
                                <div className="random-products d-flex">
                                    <div className="w-50">
                                        <img src="images/headphone-1.jpg" className='img-fluid' alt="watch" />
                                    </div>
                                    <div className="w-50">
                                        <h6>Sony WH-CH510 Bluetooth Wireless On Ear Headphones</h6>
                                        <ReactStars count={5} size={24} value={3} edit={false} activeColor="#ffd700" />
                                        <b>$80.00</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="filter-sort-grid mb-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center gap-10">
                                    <p className="mb-0" style={{ "width": "100px" }}>Sort By :</p>
                                    <select
                                        name=""
                                        className='form-control form-select'
                                        id=""
                                        onChange={(e) => setSort(e.target.value)}
                                    >
                                        <option value="title">Alphabetically, A-Z</option>
                                        <option value="-title">Alphabetically, Z-A</option>
                                        <option value="price">Price, low to high</option>
                                        <option value="-price">Price, high to low</option>
                                        <option value="createdAt">Date, old to new</option>
                                        <option value="-createdAt">Date, new to old</option>
                                    </select>
                                </div>
                                <div className='d-flex align-items-center gap-10'>
                                    <p className="totalproducts mb-0">{productstate?.length} Products</p>
                                    <div className='d-flex align-items-center gap-10 grid'>
                                        <img onClick={() => { setGrid(3); }} src="images/gr4.svg" className='d-block img-fluid' alt="grid" />
                                        <img onClick={() => { setGrid(4); }} src="images/gr3.svg" className='d-block img-fluid' alt="grid" />
                                        <img onClick={() => { setGrid(6); }} src="images/gr2.svg" className='d-block img-fluid' alt="grid" />
                                        <img onClick={() => { setGrid(12); }} src="images/gr.svg" className='d-block img-fluid' alt="grid" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="products-list pb-5">
                            <div className="d-flex gap-15 flex-wrap">
                                <ProductCard data={productstate} grid={grid} />
                            </div>
                        </div>


                    </div>
                </div>
            </Container>
        </>
    );
}

export default OurStore;
