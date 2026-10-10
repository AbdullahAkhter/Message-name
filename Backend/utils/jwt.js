import jswt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();
const jwtToken=(userid,resp)=>{
    const token=jswt.sign({userid},process.env.STRING,{
        expiresIn:'30d'
    });
    resp.cookie('jwt',token,{maxAge:30*24*60*60*1000,
        httpOnly:true,
        sameSite:'lax',
        secure:false
    })


}
export default jwtToken