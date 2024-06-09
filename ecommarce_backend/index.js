import express from 'express';
import dbConnect from './config/dbConnect.js';
const app = express();
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const PORT = process.env.PORT || 4000;
//const PORT = 5000;
import authRouter from './routes/authRoute.js';
import productRouter from './routes/productRoute.js';
import blogRouter from './routes/blogRoute.js';
import prodCategoryRouter from './routes/prodCategoryRoute.js';
import blogCategoryRouter from './routes/blogCategoryRoute.js';
import brandRouter from './routes/brandRoute.js';
import couponRouter from './routes/couponRoute.js';
import colorRouter from './routes/colorRoute.js';
import enqRouter from './routes/enqRoute.js';
import uploadRouter from './routes/uploadRoute.js';

dbConnect();
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send("<h1>API is running Successfully</h1>");
})

//app.use(morgan('dev'));

app.use('/api/user', authRouter);
app.use('/api/product', productRouter);
app.use('/api/blog', blogRouter);
app.use('/api/prodCategory', prodCategoryRouter);
app.use('/api/blogCategory', blogCategoryRouter);
app.use('/api/brand', brandRouter);
app.use('/api/coupon', couponRouter);
app.use('/api/color', colorRouter);
app.use('/api/enquiry', enqRouter);
app.use('/api/img', uploadRouter);

app.listen(PORT,() => {
    console.log(`Server is running at port ${PORT}`);
})