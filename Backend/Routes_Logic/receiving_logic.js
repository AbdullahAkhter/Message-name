import conversation from "../Models/converstionSchema.js";

const receiving_logic=async(req,resp)=>{
    try {
         const senderID=req.user._id;
    const receiverID=req.params.id;
    const chats=await conversation.findOne({
        participants:{$all:[senderID,receiverID]}}).populate('message')
        console.log("chats are ",chats)
    if(!chats)return resp.send([]);
    const message=chats.message
    console.log("messeges in backend",message)
resp.send({message:message,success:true})

    } catch (error) {
        resp.send({message:error,success:false})
        console.log(`error is happened:${error}`)
    }
   
}
export default receiving_logic