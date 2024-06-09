import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var cartSchema = new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
        productId: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
        },
        quantity:{
            type: String,
            required:true,

        },
        price:{
            type: Number,
            required:true,

        },
        color:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Color",

        }
    },
    {
        timestamps:true,
    }
);

//Export the model
export default mongoose.model('Cart', cartSchema);