import { User } from "../DB/userSchema.js";
import bcryptjs from "bcryptjs";
import jwtToken from "../utils/jwt.js";


const user_registeration=async(req,resp)=>{
try {
    const{fullname,email,password,gender}=req.body;
        const image_boy=`https://avatar.iran.liara.run/public/boy?username=${fullname}`
         const image_girl=`https://avatar.iran.liara.run/public/girl?username=${fullname}`
    
    console.log(password)
    const user=await User.findOne({fullname,email});
    if(user)return resp.send({message:"The user already exists",success:false})
const hashpassword=bcryptjs.hashSync(password,10);
   const new_user=await new User({
    fullname,
    email,
    password:hashpassword,
    gender,
    profile_image:gender==="male"?image_boy:image_girl

   })
   
   if(new_user){
    await new_user.save();
    jwtToken(new_user._id,resp)
    resp.send({message:"The data is inserted",success:true});
    

   }
   else{
    resp.send({message:"please enter valid data",success:false})
   }
   
} catch (error) {
    console.log(error)
    resp.send({message:"error is happened",success:false})
}
}
export default user_registeration
export const login_logic=async(req,resp)=>{
    try {
        const{email,password}=req.body;
        
        const user=await User.findOne({email});
    
        
        if(!user)return resp.send({message:"Email or password does not exist",success:false});
        const compare=bcryptjs.compareSync(password,user.password);
        if(!compare){
            resp.send({message:"Please enter a valid password",success:false})
        }
        else{
            jwtToken(user._id,resp);
            resp.send({message:user,success:true})
           
        }
        
    } catch (error) {
        console.log(error)
        
    }
   

}
 export const logout_logic=async(req,resp)=>{
        try {
            
            resp.cookie('jwt','',{maxAge:0})
            resp.send({message:"you are successfully logged out",success:true})
        } catch (error) {
            resp.send({message:"logout fail",success:false})
            console.log(error)
        }
    }