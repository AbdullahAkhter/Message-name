import conversation from "../Models/converstionSchema.js"
import { User } from "../DB/userSchema.js";

const getcurrentCharters = async (req, resp) => {
  try {
    const current_userID = req.user._id
  
     const currentChaters = await conversation.find({participants:current_userID.toString()}).sort({ updatedAt: -1 });
    

    if (!currentChaters || currentChaters.length == 0) return resp.send([])

    const participantIDS = currentChaters.reduce((ids, conversation) => {
      const otherParticipants = conversation.participants.filter(id=>id.toString()!==current_userID.toString());
     
      return [...ids, ...otherParticipants]

    }, [])
  
    const otherparticipants = participantIDS.filter((id => id.toString() !== current_userID.toString()))
    const user = await User.find({ _id: { $in: otherparticipants } })
    const users = participantIDS.map(id => user.find(user => user._id.toString() === id.toString()))
    
    resp.send(users)
  } catch (error) {
    resp.send({ message: error,success:false})
    
  }
}
export default getcurrentCharters