import React from 'react'
import { Link } from 'react-router-dom';
import{BsLinkedin,BsGithub,BsYoutube,BsInstagram} from 'react-icons/bs';
import newsletter from '../images/newsletter.png';
const Footer = () => {
    return (
        <>
            <footer className='py-3'>
                <div className="container-xxl">
                    <div className="row align-items-center">
                        <div className="col-5">
                            <div className="footer-top-data d-flex gap-30 align-items-center">
                                <img src={newsletter} width="25px" height="25px"alt="newsletter" />
                                <h5 className='mb-0 text-white'>Sign Up for Newsletter</h5>
                            </div>
                        </div>
                        <div className="col-7">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Your Email Address" aria-label="Your Email Address" aria-describedby="basic-addon2" />
                                <span className="input-group-text" id="basic-addon2">Subscribe</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <footer className='py-3'>
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-4">
                            <h6 className='text-white mb-4'>Contact Us</h6>
                            <div className='text-white'>
                                <address>
                                    Hno : 345 Near vill - Gayeshpur <br/> Gobardanga, North 24 parganas <br/>
                                    WEST BENGAL , PIN-743252
                                </address>
                                <a href="tel:+91 7452362545" className="mt-2 d-block mb-2 text-white">+91 7452362545</a>
                                <a href="mail to:abcde123@gmail.com" className="mt-2 d-block mb-2 text-white">abcde123@gmail.com</a>
                                <div className="social_icons d-flex align-items-center gap-30">
                                    <a href="/#" className='text-white'>
                                        <BsLinkedin className='fs-5'/>
                                    </a>
                                    <a href="/#" className='text-white'>
                                        <BsGithub className='fs-5'/>
                                    </a>
                                    <a href="/#" className='text-white'>
                                        <BsYoutube className='fs-5'/>
                                    </a>
                                    <a href="/#" className='text-white'>
                                        <BsInstagram className='fs-5'/>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <h6 className='text-white mb-4'>Information</h6>
                            <div className='footer-links d-flex flex-column'>
                                <Link to="/privacy-policy" className="text-white py-1 mb-1">Privacy Policy</Link>
                                <Link to="/refund-policy" className="text-white py-1 mb-1">Refund Policy</Link>
                                <Link to="/shipping-policy" className="text-white py-1 mb-1">Shipping Policy</Link>
                                <Link to="/terms-and-conditions" className="text-white py-1 mb-1">Terms & Conditions</Link>
                                <Link to="blogs" className="text-white py-1 mb-1">Blogs</Link>
                            </div>
                        </div>
                        <div className="col-3">
                            <h6 className='text-white mb-4'>Account</h6>
                            <div className='footer-links d-flex flex-column'>
                                <Link className="text-white py-1 mb-1">Search</Link>
                                <Link to="about" className="text-white py-1 mb-1">About Us</Link>
                                <Link className="text-white py-1 mb-1">Faq</Link>
                                <Link to='/contact' className="text-white py-1 mb-1">Contact</Link>
                            </div>
                        </div>
                        <div className="col-2">
                            <h6 className='text-white mb-4'>Quick Links</h6>
                            <div className='footer-links d-flex flex-column'>
                                <Link to='/brands' className="text-white py-1 mb-1">Brands</Link>
                                <Link to='/categories' className="text-white py-1 mb-1">Categories</Link>
                                <Link className="text-white py-1 mb-1">Laptops</Link>
                                <Link className="text-white py-1 mb-1">Headphones</Link>
                                <Link className="text-white py-1 mb-1">Watch</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <footer className='py-3'>
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <p className='text-center mb-0 text-white'>&copy; {new Date().getFullYear()} ; Powered by Developers</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
export default Footer;
