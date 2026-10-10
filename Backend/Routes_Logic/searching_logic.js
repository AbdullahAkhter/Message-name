import { User } from "../DB/userSchema.js";

const searching_logic = async (req, resp) => {
    try {
        const search = req.query.search;

        console.log(req.query)
        console.log(search)
        const current_userID = req.user._id;
        const users = await User.find({ $and:[{$or:[{fullname:{$regex:'.*'+search+'.*',$options:'i'}}]},
            {
                 _id:{$ne:current_userID}
        }]})
        console.log('users are are',users)

        resp.send(users)


    } catch (error) {
        resp.send({
            message: error, success: false

        })
        console.log(`searching error ${error}`)
    }

}
export default searching_logic