import express from "express";
import searching_logic from "../Routes_Logic/searching_logic.js";
import isLogin from "../middlewares/isLogin.js";
import getcurrentCharters from "../Routes_Logic/charters.logic.js";
const searching=express.Router();
searching.get('/user',isLogin,searching_logic)
searching.get('/current_chatters',isLogin,getcurrentCharters)
export default searching