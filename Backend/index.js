import express from "express";
import route from "./Routes/Authentication_Routes.js";
import Connect from "./DB/connection.js"
import message_route from "./Routes/message_Routes.js";
import cookieParser from "cookie-parser";
import receiving_logic from "./Routes/message_Routes.js"
import searching from "./Routes/search_routes.js"
import{app,server,io} from "./Socket/socketio.js"

app.use(express.json());
app.use('/api/auth',route);
app.use(cookieParser())

app.use('/api/message',message_route)
app.use('/api/message',receiving_logic)
app.use('/api/searching',searching)

Connect('/api/message',);
server.listen(3000,()=>{
    console.log("The server is runiing at port:3000")
})