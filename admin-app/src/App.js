// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Resetpassword from './pages/Resetpassword';
import Login from './pages/Login';
import Forgotpassword from './pages/Forgotpassword';
import Dashboard from './pages/Dashboard';
import MainLayout from './components/mainLayout';
import Enquiries from './pages/Enquiries';
import BlogList from './pages/BlogList';
import BlogCatList from './pages/BlogCatList';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import ProductList from './pages/ProductList';
import BrandList from './pages/BrandList';
import ColorList from './pages/ColorList';
import CategoryList from './pages/CategoryList';
import AddBlog from './pages/AddBlog';
import AddBlogCat from './pages/AddBlogCat';
import AddColor from './pages/AddColor';
import AddCat from './pages/AddCat';
import AddBrand from './pages/AddBrand';
import AddProduct from './pages/AddProduct';
import AddCoupon from './pages/AddCoupon';
import CouponList from './pages/CouponList';
import ViewEnq from './pages/ViewEnq';
import ViewOrder from './pages/ViewOrder';
import PrivateRoutes from './routing/PrivateRoutes';
import OpenRoutes from './routing/OpenRoutes';

function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<OpenRoutes><Login/></OpenRoutes>}/>
      <Route path="/reset-password" element={<Resetpassword/>}/>
      <Route path="/forgot-password" element={<Forgotpassword/>}/>
      <Route path="/admin" element={<PrivateRoutes><MainLayout/></PrivateRoutes>}>
        <Route index element={<Dashboard/>} />
        <Route path='enquiries' element={<Enquiries/>} />
        <Route path='enquiries/:id' element={<ViewEnq/>} />
        <Route path='blog-list' element={<BlogList/>} />
        <Route path='blog' element={<AddBlog/>} />
        <Route path='blog/:id' element={<AddBlog/>} />
        <Route path='coupon' element={<AddCoupon/>} />
        <Route path='coupon/:id' element={<AddCoupon/>} />
        <Route path='coupon-list' element={<CouponList/>} />
        <Route path='blog-category-list' element={<BlogCatList/>} />
        <Route path='order' element={<Orders/>} />
        <Route path='order/:id' element={<ViewOrder/>} />
        <Route path='customers' element={<Customers/>} />
        <Route path='product-list' element={<ProductList/>} />
        <Route path='product' element={<AddProduct/>} />
        <Route path='brand-list' element={<BrandList/>} />
        <Route path='brand' element={<AddBrand/>} />
        <Route path='brand/:id' element={<AddBrand/>} />
        <Route path='color-list' element={<ColorList/>} />
        <Route path='color' element={<AddColor/>} />
        <Route path='color/:id' element={<AddColor/>} />
        <Route path='category-list' element={<CategoryList/>} />
        <Route path='category' element={<AddCat/>} />
        <Route path='category/:id' element={<AddCat/>} />
        <Route path='blog-category' element={<AddBlogCat/>} />
        <Route path='blog-category/:id' element={<AddBlogCat/>} />
      </Route>
    </Routes>
   </Router>
  );
}

export default App;
