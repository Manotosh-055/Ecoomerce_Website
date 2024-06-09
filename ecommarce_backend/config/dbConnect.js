import mongoose from "mongoose";

const dbConnect = async () => {
    try{

        const conn = await mongoose.connect(process.env.MONGODB_URL,{
            dbName:"apnamarket",
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log("Database Connected Successfully");
    }
    catch(error){
        console.log(error)
        console.log("Error");
    }
   
}
export default dbConnect;