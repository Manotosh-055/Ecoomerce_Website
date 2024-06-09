import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/user/userSlice';
import productReducer from '../features/products/productSlice';
import blogReducer from '../features/blogs/blogSlice';
import contactReducer from '../features/contact/contactSlice';
import brandReducer from '../features/brand/brandSlice';
import pcategoryReducer from '../features/pcategory/pcategorySlice';
import bcategoryReducer from '../features/bcategory/bcategorySlice';
export const store = configureStore({
  reducer: {
   auth:authReducer,
   product:productReducer,
   blog:blogReducer,
   contact:contactReducer,
   brand:brandReducer,
   pcategory:pcategoryReducer,
   bcategory: bcategoryReducer,
  },
});
