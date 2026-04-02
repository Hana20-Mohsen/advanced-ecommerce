import { Server } from "socket.io"
import registerOrderEvents from "./handlers/order.socket.js"
import registerCartEvents from "./handlers/cart.socket.js"
import registerNotificationEvents from "./handlers/notification.socket.js"
import { setSocketInstance } from "./socketManager.js"
import { verifyToken } from "../utilities/security/token.security.js"
let io

const initSocket = (server) => {
    console.log('init socket');
    
 io = new Server(server,{
  cors:{
   origin:"*"
  }
 })
  setSocketInstance(io)
  io.use((socket , next)=>{

 const token = socket.handshake.auth.token
 console.log(`token from socket : ` , token);
 

//  if(!token){
//   return next(new Error("Authentication error"))
//  } 

 try{
    
  const decoded = verifyToken({token ,signature:process.env.TOKEN_SIGNATURE })

  socket.user = decoded
//   console.log(v);
  

  next()

 }catch(err){
  next(new Error("Invalid token"))
 }

})
 io.on("connection",(socket)=>{

  console.log("user connected:",socket.id)
  

  registerOrderEvents(io , socket)
  registerCartEvents(io , socket)
  registerNotificationEvents(io , socket)

  socket.on("disconnect",(reason)=>{
   console.log("user disconnected")
   console.log("disconnect reason:",reason)
  })

 })

}

export const getIO = ()=>{
 if(!io) throw new Error("socket not initialized")
 return io
}

export default initSocket