import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
import sendEmail from "./emailCtrl.js";

class userController {
    static UserReg = async (req, res) => {
        const { name, email, mobile, password, confirm_password } = req.body;
        //console.log(req.body);
        const findUser = await User.findOne({ email: email });
        try {
            if (!findUser) {
                //console.log("mobile:" + mobile);
                if (mobile.toString().length == 10) {
                    if (password === confirm_password) {
                        const salt = await bcrypt.genSalt(15);
                        const hashPassword = await bcrypt.hash(password, salt);
                        const newUser = await User.create({
                            name: name,
                            email: email,
                            mobile: mobile,
                            password: hashPassword
                        });

                        await newUser.save();
                        res.json(newUser);
                    }
                    else {
                        return res.status(200).json({ message: "notPassMatch" });
                    }
                }
                else {
                    return res.status(400).json({ message: "mobile number must be 10 digit" })
                }
            }
            else {
                return res.json({
                    message: "User",
                    Success: false
                })
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json(error);
        }

    }

    static UserLog = async (req, res) => {
        const { email, password } = req.body;
        //console.log(email, password);
        const findUser = await User.findOne({ email: email });
        if (findUser) {
            const isMatch = await bcrypt.compare(password, findUser.password)
            if (isMatch) {
                const token = jwt.sign({ userId: findUser._id }, process.env.jwt_secret_key, { expiresIn: '1d' })
                res.json({
                    _id: findUser._id,
                    name: findUser.name,
                    email: findUser.email,
                    mobile: findUser.mobile,
                    token: token,
                })
            }
            else {
                return res.status(400).json({ message: "Invalid Credintials" })
            }
        }
        else {
            return res.json({
                message: "NotUser",
                Success: false
            })
        }
    }

    static AdminLog = async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(403).json({ message: "all fields are required" })
        }
        const findAdmin = await User.findOne({ email: email });
        if (findAdmin) {
            if (findAdmin.role !== "admin") return res.status(400).json({ message: "NotAdmin" });
            const isMatch = await bcrypt.compare(password, findAdmin.password)
            if (isMatch) {
                const token = jwt.sign({ userId: findAdmin._id }, process.env.jwt_secret_key, { expiresIn: '5d' })
                res.json({
                    _id: findAdmin._id,
                    name: findAdmin.name,
                    email: findAdmin.email,
                    token: token,
                })
            }
            else {
                return res.status(400).json({ message: "notAdmin" });
            }
        }
        else {
            return res.json({
                message: "notAdmin",
                Success: false
            })
        }
    }

    static getAllUser = async (req, res) => {
        try {
            const getUser = await User.find();
            res.json(getUser);
        } catch (error) {
            console.log(error)
            return res.status(500).json(error);
        }
    }

    static getSingleUser = async (req, res) => {
        const { id } = req.params;
        const findUser = await User.findById(id);
        if (findUser) {
            try {
                const getuser = await User.findById(id);
                res.json(getuser);

            }
            catch (error) {
                console.log(error)
                return res.status(500).json(error);
            }
        }
        else {
            return res.json({
                message: "User is not exist",
                Success: false
            })
        }
    }

    static deleteSingleUser = async (req, res) => {
        const { id } = req.params;
        const findUser = await User.findById(id);
        if (findUser) {
            try {
                const deletedUser = await User.findByIdAndDelete(id);
                res.json(deletedUser);
            }
            catch (err) {
                console.log(err)
                return res.status(500).json(err);
            }
        }
        else {
            return res.json({
                message: "User is not exist",
                Success: false
            })
        }

    }

    static updateAUser = async (req, res) => {
        const userId = req.user._id;
        const findUser = await User.findById(userId);
        if (findUser) {
            try {
                const updatedUser = await User.findByIdAndUpdate(
                    {
                        _id: userId
                    },
                    {
                        name: req?.body?.name,
                        email: req?.body?.email,
                        mobile: req?.body?.mobile,
                    },
                    {
                        new: true
                    }
                );
                res.json(updatedUser);
            }
            catch (error) {
                console.log(error)
                return res.status(500).json(error);
            }
        }
        else {
            return res.json({
                message: "User is not exist",
                Success: false
            })
        }

    }

    static userChangePassword = async (req, res) => {
        const { password, confirm_password } = req.body;
        if (password && confirm_password) {
            if (password === confirm_password) {
                const salt = await bcrypt.genSalt(15);
                const newHashPassword = await bcrypt.hash(password, salt);
                await User.findByIdAndUpdate(req.user._id, { $set: { password: newHashPassword } });
                res.status(201).send({ status: "success", message: "Password Changed Successfully" });
            }
            else {
                res.status(400).send({ status: "bad request", message: "Both Password are not matched" });
            }
        }
        else {
            res.status(400).send({ status: "bad request", message: "all fields are required" });
        }
    }

    static resetPasswordSendMail = async (req, res) => {
        const { email } = req.body;
        const user = await User.findOne({ email: email });
        if (user) {
            try {
                const secret = user._id + process.env.jwt_secret_key
                const token = jwt.sign({ userId: user._id }, secret, { expiresIn: "15m" })
                const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid for 10 minutes from now. <a href='http://localhost:3000/reset-password/${user._id}/${token}'>Click here</a>`;
                const data = {
                    to: email,
                    text: "Hey User, Here is the link to reset Your Password",
                    subject: "Forgot Password Link",
                    htm: resetURL
                }
                sendEmail(data);
                res.json(token);
            }
            catch (error) {
                console.log(error);
                res.status(500).send({ status: "error", message: "unable to send email" });
            }
        }
        else{
            res.status(500).send({ success: "false", message: "NotUser" }); 
        }

    }

    static resetPassword = async (req, res) => {
        const { password, confirm_password } = req.body;
        const { id, token } = req.params;
        const user = await User.findById(id);
        const new_secret = user._id + process.env.jwt_secret_key;
        try {
            jwt.verify(token, new_secret);
            if (password === confirm_password) {
                const salt = await bcrypt.genSalt(15);
                const newHashPassword = await bcrypt.hash(password, salt);
                await User.findByIdAndUpdate(user._id, { $set: { password: newHashPassword } });
                res.json(user);
            }
            else {
                res.status(400).send({ status: "bad request", message: "Both Password are not matched" });
            }
        }
        catch (err) {
            res.status(500).send({ status: "error", message: "invalid token" })
        }

    }

    static getWishlist = async (req, res) => {
        const userId = req.user?._id;
        try {
            const findUser = await User.findById(userId).populate('wishlist');
            res.json(findUser);
        } catch (err) {
            res.status(404).json(err);
        }
    }

    static getCompare = async (req, res) => {
        const userId = req.user?._id;
        try {
            const findUser = await User.findById(userId).populate('compare');
            res.json(findUser);
        } catch (err) {
            res.status(404).json(err);
        }
    }

    static userAddress = async (req, res) => {
        const userId = req.user?._id;
        const { address } = req.body;
        try {
            const updatedUser = await User.findByIdAndUpdate(
                {
                    _id: userId
                },
                {
                    address: address
                },
                {
                    new: true
                }
            );
            res.json(updatedUser);
        }
        catch (error) {
            console.log(error)
            return res.status(500).json(error);
        }
    }

    static userCart = async (req, res) => {
        const { productId, quantity, color, price } = req.body;
        const userId = req.user?._id;
        try {

            let newCart = await new Cart({
                userId: userId,
                productId,
                color,
                price,
                quantity
            }).save();
            res.json(newCart);
        } catch (err) {
            res.status(404).json(err);
        }
    }

    static getUserCart = async (req, res) => {
        const userId = req.user?._id;
        try {
            const usercart = await Cart.find({ userId: userId }).populate("productId").populate("color");
            res.json(usercart);
        } catch (err) {
            res.status(404).json(err);
        }
    }

    static removeCart = async (req, res) => {
        const userId = req.user?._id;
        const { id } = req.params;
        try {
            const deletedCart = await Cart.deleteOne({ _id: id, userId: userId });
            res.json(deletedCart);
        } catch (err) {
            res.status(404).json(err);
        }
    }

    static emptyCart = async (req, res) => {
        const userId = req.user?._id;
        try {
            await Cart.deleteMany({userId: userId });
            res.json({success: true, message: "deletedCart"});
        } catch (err) {
            res.status(404).json(err);
        }
    }

    static createOrder = async (req, res) => {
        const { shippingInfo, orderItems, totalPrice, totalPriceAfterDiscount, paymentInfo } = req.body;
        const userId = req.user?._id;
        try {
            const order = await Order.create({
                shippingInfo, orderItems, totalPrice, totalPriceAfterDiscount, paymentInfo, user: userId
            })
            for (let index = 0; index < orderItems?.length; index++) {
                const order_count = orderItems[index]?.quantity;
                const productId = orderItems[index]?.product;
                const fetchProduct = await Product.findOne({ _id: productId });
                const fetchQuantity = fetchProduct?.quantity;
                const fetchSold = fetchProduct?.sold;
                const newSold = Number(fetchSold) + Number(order_count);
                const remainingQuantity = fetchQuantity - order_count;

                await Product.findByIdAndUpdate(
                    {
                        _id: productId
                    },
                    {
                        quantity: remainingQuantity,
                        sold: newSold
                    },
                    {
                        new: true,
                    }
                )
            }
            res.json({ order, success: true });
        } catch (err) {
            res.status(404).json(err);
        }
    }

    static getAllOrders = async (req, res) => {
        try {
            const getOrders = await Order.find().populate("user");
            res.json(getOrders);
        } catch (error) {
            console.log(error)
            return res.status(500).json(error);
        }
    }

    static getMyOrder = async (req, res) => {
        const userId = req.user._id;
        try {
            const userOrder = await Order.find({ user: userId }).populate("user").populate("orderItems.product").populate("orderItems.color");
            res.json(userOrder);
        } catch (err) {
            res.status(404).json(err);
        }
    }

    static getSingleOrder = async (req, res) => {
        const { id } = req.params;
        try {
            const singleOrder = await Order.findOne({ _id: id }).populate("orderItems.product").populate("orderItems.color");
            res.json(singleOrder);
        } catch (err) {
            res.status(404).json(err);
        }
    }

    static updateOrder = async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;
        try {
            const updateorder = await Order.findByIdAndUpdate(
                {
                    _id: id
                },
                {
                    orderStatus: status
                },
                {
                    new: true
                }
            );
            res.json(updateorder);
        } catch (err) {
            res.status(404).json(err);
        }
    }

    static getMonthWiseOrderIncome = async (req, res) => {
        let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let d = new Date();
        let endDate = "";
        d.setDate(1);
        for (let index = 0; index < 11; index++) {
            d.setMonth(d.getMonth() - 1);
            endDate = monthNames[d.getMonth()] + " " + d.getFullYear();
        }
        const data = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $lte: new Date(),
                        $gte: new Date(endDate)
                    }
                }
            },
            {
                $group: {
                    _id: {
                        month: "$month"
                    },
                    amount: {
                        $sum: "$totalPriceAfterDiscount"
                    },
                    count: {
                        $sum: 1
                    }
                }
            }
        ])
        res.json(data);
    }

    static getYearlyTotalOrders = async (req, res) => {
        let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let d = new Date();
        let endDate = "";
        d.setDate(1);
        for (let index = 0; index < 11; index++) {
            d.setMonth(d.getMonth() - 1);
            endDate = monthNames[d.getMonth()] + " " + d.getFullYear();
        }
        const data = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $lte: new Date(),
                        $gte: new Date(endDate)
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    count: {
                        $sum: 1
                    },
                    amount: {
                        $sum: "$totalPriceAfterDiscount"
                    }
                }
            }
        ])
        res.json(data);
    }

}

export default userController;