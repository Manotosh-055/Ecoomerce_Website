import jwt from "jsonwebtoken";
import User from "../models/userModel.js";


class userAuthMiddleware {
    static checkUserAuth = async (req, res, next) => {
        let token;
        const { authorization } = req.headers;
        try {
            if (authorization && authorization?.startsWith('Bearer')) {
                token = authorization.split(' ')[1]
                const { userId } = jwt.verify(token, process.env.jwt_secret_key)
    
                req.user = await User.findById(userId).select('-password');
                next();
            }
            else{
                res.status(401).send({ "status": "401", "message": "No Token" })
            }
        }
        catch (error) {
            //process.exit(1);
            res.status(401).send({ "status": "401", "message": "Unauthorized User" })
        }
    }
    
    static isAdmin = async (req,res,next) => {
        const userId = req.user._id;
        try{
            const adminUser = await User.findById(userId);
            if(adminUser.role !== "admin"){
                res.status(401).send({ "status": "401", "message": "Unauthorized User, you are not admin" })
            }
            else{
                next();
            }
        }
        catch(err){
            res.status(401).send(err);
        }
    }
}

export default userAuthMiddleware;