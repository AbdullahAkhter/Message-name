import conversation from "../Models/converstionSchema.js";
import messages from "../Models/messageSchema.js";
import { getReceiverSocketId, io } from "../Socket/socketio.js";

const sending_logic=async(req,resp)=>{
    try {
        const{message}=req.body;
        
        const receiverID=req.params.id;
        
        const senderID =req.user._id
        let chats=await conversation.findOne({participants:{$all:[ senderID,receiverID]}})
        if(!chats){
            chats=await conversation.create({
                participants:[senderID,receiverID]
            })
            chats.save()
        }
            
        const new_message=await new messages({
            senderID,
            receiverID,
            message,
            conversationID:chats._id
            

        })
        
        if(new_message){
            chats.message.push(new_message._id)
           await  chats.save()
            resp.send({message:new_message,success:true})
            const receiversocket=getReceiverSocketId(receiverID.toString())
        if(receiversocket){
            io.to(receiversocket).emit('new_Message',new_message)
            
        }
       
    
            
        }
        new_message.save();
         
       
    } catch (error) {
        resp.send({message:error,success:false})
        console.log(error)
    }
}
export default sending_logic