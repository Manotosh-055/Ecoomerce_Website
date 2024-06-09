import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user",
    },
    cart: {
        type: Array,
        default: [],
    },
    address: {
        type: String,
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    compare: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    
},
    {
        timestamps: true,
    }
);


//Export the model
export default mongoose.model('User', userSchema);