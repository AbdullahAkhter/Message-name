import mongoose from "mongoose"
import { User } from "../DB/userSchema.js"
import { Timestamp } from "mongodb"
const messageSchema=mongoose.Schema({
    senderID:{
        type:mongoose.Types.ObjectId,
        ref:'users',
        required:true
    },
    receiverID:{
        type:mongoose.Types.ObjectId,
        ref:'users',
        requiredID:true
    },
    conversationID:{
        type:mongoose.Types.ObjectId,
        ref:'conversation',
        default:[]
    },
    message:{
        type:String,
        required:true
    },
    createdAt: {
    type: Date,
    default: Date.now
  }
},{timestamp:true})
const messages= await mongoose.model('messages',messageSchema)
export default messages
