import  express from 'express'
import isLogin from '../middlewares/isLogin.js';
import sending_logic from '../Routes_Logic/sending_logic.js';
import receiving_logic from "../Routes_Logic/receiving_logic.js"
const app=express();
const messaging_routes=express.Router();
messaging_routes.post('/send/:id', isLogin ,sending_logic

)
messaging_routes.get('/:id',isLogin,receiving_logic)

export default messaging_routes

