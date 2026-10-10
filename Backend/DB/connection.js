import mongoose from "mongoose"
import dotenv from "dotenv"
const Connect=async()=>{
    try {
         dotenv.config();
    await mongoose.connect(process.env.URI);
    console.log("The database is connected successfully")
    } catch (error) {
        console.log(error)
        
    }
   
}
export default Connect;