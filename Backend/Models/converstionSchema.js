import { Timestamp } from "mongodb"
import mongoose from "mongoose"
const conversationSchema=mongoose.Schema({
    participants:[
        {type:mongoose.Schema.Types.ObjectId,
            ref:'users'
        }
    ],
    message:[{type:mongoose.Schema.Types.ObjectId,
        ref:"messages",
        default:[]
    }]
},{Timestamp:true})
const conversation=mongoose.model('conversations',conversationSchema);
export default conversation