import express from "express";
import http from "http"
import {Server} from "socket.io"
const app=express();
const server=http.createServer(app)
const io=new Server(server,{
    cors:{
        origin:["http://localhost:5173"],
        methods:["GET","POST"]
    }
});

const usersocketmap={};
export const getReceiverSocketId=(receiverid)=>{
    return usersocketmap[receiverid]
}
io.on('connection',(socket)=>{
    const userid=socket.handshake.query.userid;
    if(userid!=undefined){
        usersocketmap[userid]=socket.id;
    }
    io.emit("getOnlineUser",Object.keys(usersocketmap));
    socket.on("disconnect",()=>{
        delete usersocketmap[userid];
    })
})
export{app,io,server}