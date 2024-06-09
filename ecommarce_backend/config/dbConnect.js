import mongoose from "mongoose";

// const dbConnect = async () => {
//     try{

//         const conn = await mongoose.connect(process.env.MONGODB_URL,{
//             dbName:"apnamarket",
//             useNewUrlParser:true,
//             useUnifiedTopology:true
//         });
//         console.log("Database Connected Successfully");
//     }
//     catch(error){
//         console.log(error)
//         console.log("Error");
//     }
   
// }

// For MongoDB Atlas
// const DATABASE_URL = `process.env.MONGODB_URL`;
const dbConnect = async() => {
  try {
      const DB_OPTIONS = {
          dbName:"TechMarket",
          useNewUrlParser: true,
          useUnifiedTopology: true,
      }
      await mongoose.connect(process.env.MONGODB_URL, DB_OPTIONS)
      console.log("Connected Sucessfully......")

  } catch (error) {
      console.log(error)
  }
}

export default dbConnect;