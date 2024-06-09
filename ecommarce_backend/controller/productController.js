import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import slugify from "slugify";

class productController{
    static createProduct = async (req, res) => {
        const {title, description, price, brand, pcategory, tags, color, quantity, images} = req.body;
        // if(req.body.title){
        //     req.body.slug = slugify(req.body.title);
        // }
        //console.log(req.body);
        try{
           const newProduct = new Product({
                title:title,
                slug:title,
                description:description,
                price:price,
                category:pcategory,
                brand:brand,
                quantity:quantity,
                tags:tags,
                color:color,
                images:images
           })
           const new_product = await newProduct.save();
           res.json(new_product);
        }catch(err){
            return res.status(404).json(err);
        }
    }


    static getaProduct = async (req,res) => {
        const {id} = req.params;
        const findProduct = await Product.findById(id);
        
        if(findProduct) {
            try{
                const getproduct =  await Product.findById(id).populate("color");
                res.json(getproduct);
    
            }
            catch(err){
                console.log(err)
                return res.status(404).json(err);
            }
        }
        else{
            return res.json({
                message :"Product is not exist",
                Success : false
            })
        }
    }


    static getAllProduct = async (req,res) => {
        
        try{
            // Filtering
            const queryobj = { ...req.query };
            const excludeFields = ["page","sort","limit","fields"];
            excludeFields.forEach((ele)=> delete queryobj[ele]);
            let querystr = JSON.stringify(queryobj);
            querystr = querystr.replace(/\b(gte|gt|lte|lt)\b/g, (match)=>`$${match}`);
            let query = Product.find(JSON.parse(querystr));

            //sorting
            if(req.query.sort){
                const sortby = req.query.sort.split(",").join(" ");
                query = query.sort(sortby);
            }
            else{
                query = query.sort("-createdAt");
            }

            //limit fields
            if(req.query.fields){
                const fields = req.query.fields.split(",").join(" ");
                query = query.select(fields);
            }
            else{
                query = query.select("-__v");
            }

            // pagination

            const page = req.query.page;
            const limit = req.query.limit;
            const skip = (page - 1)*limit;
            query = query.skip(skip).limit(limit);
            if(req.query.page){
                const productCount = await Product.countDocuments();
                if(skip>=productCount) throw new Error("This page is not Exist");
            }
            
            const product = await query;
            res.json(product);

            //const getProduct = await Product.find(queryobj);  // also can pass (req.query)
            //res.json(getProduct);
            
        }catch(error){
            console.log(error)
            return res.status(404).json(error);
        }
    }


    static updateProduct = async (req,res) => {
       // const {id} = 
    
        try{
            if(req.body.title){
                req.body.slug = slugify(req.body.title);
            }
            const updateproduct = await Product.findByIdAndUpdate(req.params.id,req.body,{
                new:true,
            });
            res.json(updateproduct);

        }catch(err){
            res.status(404).json(err);
        }
    }


    static deleteProduct = async (req,res) => {
       const {id} = req.params;
    
        try{
            const deleteproduct = await Product.deleteOne({_id:id});
            res.json(deleteproduct);

        }catch(err){
            res.status(404).json(err);
        }
    }

    static AddToWishlist = async (req, res) => {
        const {prodId} = req.body;
        const userId = req.user._id;
        const findProduct = await Product.findById(prodId);
        try{
            if(!findProduct){
                res.status(404).send({ "status": "error", "message": "prodId is not found" });
            }
            const user = await User.findById(userId);
            const alreadyadded = user.wishlist.find((id) => id.toString() === prodId);
            if(alreadyadded){
                let user = await User.findByIdAndUpdate(
                    { _id: userId },
                    { 
                        $pull:{wishlist:prodId},
                    },
                    {new:true},
                );
                res.status(200).send(user);
            }
            else{
                let user = await User.findByIdAndUpdate(
                    { _id: userId },
                    { 
                        $push:{wishlist:prodId},
                    },
                    {new:true},
                );
                res.status(200).send(user);
            }
        }catch(err){
            res.status(404).json(err);
        }
    }

    static AddToCompare = async (req, res) => {
        const {prodId} = req.body;
        const userId = req.user._id;
        const findProduct = await Product.findById(prodId);
        try{
            if(!findProduct){
                res.status(404).send({ "status": "error", "message": "prodId is not found" });
            }
            const user = await User.findById(userId);
            const alreadyadded = user.compare.find((id) => id.toString() === prodId);
            if(alreadyadded){
                let user = await User.findByIdAndUpdate(
                    { _id: userId },
                    { 
                        $pull:{compare:prodId},
                    },
                    {new:true},
                );
                res.status(200).send(user);
            }
            else{
                let user = await User.findByIdAndUpdate(
                    { _id: userId },
                    { 
                        $push:{compare:prodId},
                    },
                    {new:true},
                );
                res.status(200).send(user);
            }
        }catch(err){
            res.status(404).json(err);
        }
    }

    static prodRating = async (req,res) => {
        const Id = req.user._id;
        const {star,prodId,comment} = req.body;
        const findProduct = await Product.findById(prodId);
        try{
            if(!findProduct){
                res.status(404).send({ "status": "error", "message": "prodId is not found" });
            }
            let alreadyrated = findProduct.ratings.find(
                (userId) => userId.postedby.toString() === Id.toString()
            );
            
            if(alreadyrated){
                    await Product.updateOne(
                    { 
                        ratings: { $elemMatch : alreadyrated}
                    },
                    { 
                        $set:{"ratings.$.star": star, "ratings.$.comment": comment},
                    },
                    {new:true},
                );
            }
            else{
                await Product.findByIdAndUpdate(
                    { _id: prodId },
                    { 
                        $push:{
                            ratings:{
                                star : star,
                                comment : comment,
                                postedby:Id,
                            }
                        },
                    },
                    {new:true},
                );
            }
            const getallRatings = await Product.findById(prodId);
            let totalratings = getallRatings.ratings.length;
            
            let ratingsum = getallRatings.ratings.map((item) => item.star).reduce((prev, curr) => prev + curr,0);
            let actualRating = Math.round(ratingsum / totalratings);
            let finalProduct = await Product.findByIdAndUpdate(
                { _id: prodId },
                { 
                    totalratings: actualRating,
                },
                {new:true},
            );
            res.status(200).send(finalProduct);
        }catch(err){
            res.status(404).json(err);
        }
    }
}

export default productController;
