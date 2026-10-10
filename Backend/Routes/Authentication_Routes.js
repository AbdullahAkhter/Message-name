import express from "express";
import{logout_logic} from"../Routes_Logic/Autentication_logic.js"
import user_registeration from "../Routes_Logic/Autentication_logic.js";
import { login_logic } from "../Routes_Logic/Autentication_logic.js";
import upload from "../middlewares/multer.js";
const route=express.Router();
route.post('/register',upload.single('profile_image'),user_registeration)
route.post('/login',login_logic)
route.post('/logout',logout_logic)
export default route