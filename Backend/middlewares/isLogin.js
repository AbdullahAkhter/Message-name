import jswt from 'jsonwebtoken'
import dotenv from "dotenv"
import { User } from '../DB/userSchema.js'
dotenv.config()
const isLogin=async(req,resp,next)=>{
const token=req.cookies.jwt
console.log("token",token)
if(!token)return resp.send({message:"user is logged out"})
  const decode=jswt.verify(token,process.env.STRING);
if(!decode)return resp.send({message:"user is not verified"});
  const user=await User.findById(decode.userid);
req.user=user
next();
}
export default isLogin;