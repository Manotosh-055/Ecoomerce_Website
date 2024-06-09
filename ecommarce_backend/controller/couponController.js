import Coupon from "../models/couponModel.js";

class couponController{
    static createCoupon = async (req, res, next) => {
        try {
            const { name , expiry , discount } = req.body;
            if (!name || !expiry || !discount) {
                res.status(400).send({ "message": "All fields are required" });
            }
            const newCoupon = new Coupon({
                name: name,
                expiry: expiry,
                discount: discount,
            })
            const new_coupon = await newCoupon.save();
            res.status(200).send(new_coupon);
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ "message": "failed" })
        }
    }

    static getallCoupon = async (req, res) => {
        try {
            const allCoupon = await Coupon.find();
            res.status(200).send(allCoupon);
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ "message": "failed" })
        }
    }

    static getaCoupon = async (req, res) => {
        const {id} = req.params;
        const findCoupon = await Coupon.findById(id);
        try {
            if(!findCoupon){
                res.status(404).send({ "status": "error", "message": "couponId is not found" });
            }
            res.status(200).send(findCoupon);
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ "message": "failed" })
        }
    }

    static updateCoupon = async (req, res) => {
        const {id} = req.params;
        const {name,expiry,discount} = req.body;
        const findCoupon = await Coupon.findById(id);
        try {
            if(!findCoupon){
                res.status(404).send({ "status": "error", "message": "couponId is not found" });
            }
            const update_coupon = await Coupon.findOneAndUpdate(
                { _id: id},
                { name:name, expiry:expiry,discount:discount},
                { new: true }
            )
            
            res.status(200).json(update_coupon);
        }
        catch(error) {
            console.log(error);
            res.status(500).send({ "message": "failed" })
        }
    }

    static deleteCoupon = async (req,res) => {
        const {id} = req.params;
        const findCoupon = await Coupon.findById(id);
        try{
            if(!findCoupon) { 
                res.status(404).send({ "status": "error", "message": "couponId is not found" });
            }
            const delete_coupon = await Coupon.deleteOne({_id:id});
            res.status(200).send({ "status": "success", "message": "Coupon deleted successfully",delete_coupon});
 
        }catch(err){
            res.status(404).json(err);
        }
    }
} 
export default couponController;


