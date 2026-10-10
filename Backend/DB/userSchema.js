import mongoose from "mongoose"
const userShema=mongoose.Schema({
    fullname:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String
        
    },
    profile_image:{
        type:String
    }
})
export const User=mongoose.model('users',userShema)